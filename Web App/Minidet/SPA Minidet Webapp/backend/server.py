import os
from flask import Flask, app, json, jsonify, request, send_from_directory
from flask_pymongo import PyMongo
from datetime import datetime
from pyxtension.streams import stream
import requests
import threading
from datetime import datetime
import pytz

#Start MongoDB: net start MongoDB
#Stop MongoDB elevated term: net stop MongoDB 

#Start docker: 
#Stop docker: docker stop minidet-generator-1
#Stop docker: docker stop minidet-detector-1

app = Flask(__name__, static_folder='../frontend/build')

# Configure MongoDB UR
app.config['MONGO_URI'] = "mongodb://localhost:27017/dataflow_db"

# Intialize Database
mongo = PyMongo(app)

# Data Generator and AI Detector URLs and MAPPING_URL
DATA_GENERATOR_URL = "http://localhost:9090/stream-data"
AI_DETECTOR_URL = "http://localhost:9091/detect"
MAPPING_URL = "http://localhost:9091/mapping"
#attack_mapping retrieve
attack_mapping = requests.get(MAPPING_URL).json()

#When a user click on the html links, it will trigger app.route coressponding to that function
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    print(os.path.abspath(app.static_folder))
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

#Query API
@app.route('/api/query', methods = ['POST'])
def query_db():
    try:
        db = mongo.db
        collection = db.input
        # Parse query from input of frontend
        my_query = request.json
        print(my_query)
        ans = list(collection.find(my_query))
        return jsonify({'query': ans}),200
    except Exception:
        return jsonify({"error": "Error getting query"})

# Anomaly Count API
@app.route('/api/anomaly-count', methods=['GET'])
def get_anomaly_count():
    try:
        db = mongo.db
        collection = db.input
        count = collection.count_documents({'anomality': True})
        return jsonify ({'totalAnomalies': count}),200
    except Exception:
        return jsonify({"Error getting anomaly count"})

# Data from 
@app.route('/api/data', methods=['GET'])
def get_data():
    db = mongo.db
    collection = db.input
    # Exclude id and sort time stamp
    data = list(collection.find({}, {'_id': 0}).sort('timestamp', -1))
    return jsonify(data)

#Store data
def store_data_generator():
    #Database retrieve
    db = mongo.db
    collection = db['input']
    # Fetch the input from data generator
    response = requests.get(DATA_GENERATOR_URL, stream=True)
    if response.status_code == 200:
        stream(response.iter_lines()).map(
            #Decoding data
            lambda data: (json.loads(data.decode('utf-8')))
        ).map(
            #Formatting data
            lambda data:{
            "source_ip": [data["source_ip"]],
            "source_port": [data["source_port"]],
            "target_ip": [data["target_ip"]],
            "target_port": [data["target_port"]],
            "protocol": [data["protocol"]],
            "l7_protocol": [data["l7_protocol"]],
            "input_bytes": [data["input_bytes"]],
            "output_bytes": [data["output_bytes"]],
            "input_packets": [data["input_packets"]],
            "output_packets": [data["output_packets"]],
            "sum_tcp_flags": [data["sum_tcp_flags"]],
            "flow_duration": [data["flow_duration"]]
            }
        ).distinct( 
        lambda data: ( 
        data["source_ip"][0],
        data["target_ip"][0],
        data["protocol"][0],
        data["output_bytes"][0],  
        data["input_packets"][0],  
        data["output_packets"][0],  
        data["sum_tcp_flags"][0], 
        data["flow_duration"][0]  
        )
        ).for_each(
            lambda data:(
                #AI detector
                (detector_response := requests.post(AI_DETECTOR_URL, json=data))
                and (data.update(detector_response.json()[0]),
            data.update({
            "source_ip": data["source_ip"][0],
            "source_port": data["source_port"][0],
            "target_ip": data["target_ip"][0],
            "target_port": data["target_port"][0],
            "protocol": data["protocol"][0],
            "l7_protocol": data["l7_protocol"][0],
            "input_bytes": data["input_bytes"][0],
            "output_bytes": data["output_bytes"][0],
            "input_packets": data["input_packets"][0],
            "output_packets": data["output_packets"][0],
            "sum_tcp_flags": data["sum_tcp_flags"][0],
            "flow_duration": data["flow_duration"][0],
            "anomality": data["anomality"],
            "attack_id": data["attack_id"],
            "conf": data["conf"],
            "attack_name": attack_mapping[str(data["attack_id"])],
            "timestamp": datetime.now(pytz.timezone('Australia/Sydney'))
                    }) 
                )
            ,collection.insert_one(data)
            )
            )
    else:
        print("Generator Error:", response.status_code)

        
if __name__ == "__main__":
        #Use thread to run concurrently
        data_thread = threading.Thread(target = store_data_generator)
        #When shutdown daemon will stop automatically
        data_thread.daemon = True        
        data_thread.start()
        app.run(debug = True, port =5001) 