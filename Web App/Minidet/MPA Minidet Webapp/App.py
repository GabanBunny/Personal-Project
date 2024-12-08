from flask import Flask, json,render_template, jsonify, request
from flask_pymongo import PyMongo
from datetime import datetime
from pyxtension.streams import stream
import requests
import threading
import numpy as np
from datetime import datetime
import pytz


# Window PC
app = Flask(__name__, 
            template_folder=r'C:\Users\phuct\Downloads\SyncToChromebook\Personal Project\Minidet Webapp\templates', 
            static_folder=r'C:\Users\phuct\Downloads\SyncToChromebook\Personal Project\Minidet Webapp\static')

#Start MongoDB: net start MongoDB
#Stop MongoDB elevated term: net stop MongoDB 

#Start docker: 
#Stop docker: docker stop minidet-generator-1
#Stop docker: docker stop minidet-detector-1

#LOQ
# app = Flask(__name__, 
#             template_folder=r'C:\Users\phuct\Downloads\Personal Project\Minidet Webapp\templates', 
#             static_folder=r'C:\Users\phuct\Downloads\Personal Project\Minidet Webapp\static')

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
@app.route('/') #Root url
def homepage():
    return render_template('Homepage.html') 

@app.route('/Setting')
def user_setting():
    return render_template('Setting.html')

@app.route('/Help')
def help():
    return render_template('Help.html')

@app.route('/Login')
def login():
    return render_template('Login.html')

@app.route('/Data')
def data():
    return render_template('Data.html')

@app.route('/api/data', methods=['GET'])
def get_data():
    db = mongo.db['data_generator']
    collection = db['input']
    
    page = int(request.args.get('page', 1))
    limit = int(request.args.get('limit', 10))
    skip = (page - 1) * limit

    data = list(collection.find({}, {'_id': 0}).sort('timestamp',-1).skip(skip).limit(limit))
    return jsonify(data)

#Store data
def store_data_generator():
    #Database retrieve
    db = mongo.db['data_generator']
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
