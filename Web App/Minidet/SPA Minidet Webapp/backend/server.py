import os
from flask import Flask, app, json, jsonify, request, send_from_directory
from flask_pymongo import PyMongo
from datetime import datetime
from pyxtension.streams import stream
import requests
import threading
from datetime import datetime
import pytz
import sqlparse
from sqlparse.sql import Token, Identifier, IdentifierList, Where
from sqlparse.tokens import Keyword, Wildcard, Whitespace

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

#Query API
@app.route('/api/query', methods = ['POST'])
def query_db():
    # Extract url parameters
    current_page = int(request.args.get('currentPage',0))# current page number
    page_size = int(request.args.get("pageSize", 10)) # Number of records per page
    skip = current_page*page_size
    try:
       
        # Parse query from input of frontend and remove all whitespaces
        input_query = str(request.json).strip()
        
        SQLkeywordSet = {"SELECT", "UPDATE", "DELETE", "INSERT INTO", "CREATE DATABASE", "ALTER DATABASE", "ALTER TABLE", "CREATE TABLE", "DROP TABLE", "CREATE INDEX", "DROP INDEX" }
        
        # Parse to see if the query ? sql : mongo
        sql_query = sqlparse.parse(input_query)
        
        isSQL = False
        for tokens in sql_query[0].tokens:
            if(str(tokens).upper() in SQLkeywordSet):
                isSQL = True
        
        selectAll = False
        selectAB = False
        if isSQL:
            db = mongo.db
            for tokens in sql_query[0].tokens:
                # Select source_ip from input where source_ip = 59.166.0.1
                if isinstance(tokens,Identifier):
                    selectAB = False
                
                if isinstance(tokens,Where):
                    newToken = str(tokens).lower().replace("where", "").strip().replace("=",":").split()
                    sFirst = f'"{newToken[0]}"'
                    sMiddle = newToken[1]
                    sLast = f'"{newToken[-1]}"'
                    filter_part = json.loads("{" +sFirst + sMiddle + sLast +"}")
                    if(selectAB == False):
                        projection_part = ({"_id": 0})    
                    else:
                        projection_part = str(projection_part).strip().split(",")
                        for idx, x in enumerate(projection_part):
                            x ='"' + x.strip() + '"'
                            x = x + ": 1"
                            projection_part[idx] = x.strip()
                        projection_part.append('"_id": 0')                        
                        projection_part =json.loads( "{" + ", ".join(projection_part) + "}")
                
                # Select A, B
                # Select source_ip, destination_ip from input where source_ip = 59.166.0.1
                if isinstance(tokens,IdentifierList):
                    selectAB = True
                    projection_part = str(tokens)
                
                # Select *
                if tokens.ttype == Wildcard:
                    if(str(tokens).upper() == "*"):
                        filter_part = json.loads("{}")
                        projection_part = ({"_id": 0})
                
                # From A 
                if tokens.ttype == Keyword and selectAll:
                    collection = db[str(tokens)]
                    selectAll = False
                
                if tokens.ttype == Keyword:
                    if(str(tokens).upper() == "FROM"):
                        selectAll = True
            
            print("filter part:", (filter_part))
            print("projection_part:", projection_part)
            ans = list(collection.find(filter_part, projection_part).sort('timestamp', -1).skip(skip).limit(page_size))
            total_page = collection.count_documents(filter_part)
        else:
            # Remove mongo.db.input.find(
            mongoDB_query = input_query.split("(")[1]
            
            # Filter the collection name
            collection_name = input_query.split("(")[0].split(".")[2]
            
            # Remove the last bracket )
            mongoDB_query = mongoDB_query[:-1]
            db = mongo.db
            collection = db[collection_name]
            
            if len(mongoDB_query.split(", {")) > 1:
                # Yes Projection
                # 2. mongo.db.input.find({"attack_name": "Benign"}, {"_id": 0}) 
                mongoDB_query = mongoDB_query.split(",")
                filter_part = json.loads(mongoDB_query[0])
                total_page = collection.count_documents(filter_part)
                projection_part = json.loads(mongoDB_query[1])
                ans = list(collection.find(filter_part, projection_part).sort('timestamp', -1).skip(skip).limit(page_size))
            else :
                # No projection
                # 1. mongo.db.input.find({"attack_name": "Benign"}) 
                # 3. mongo.db.input.find({"attack_name": "Benign", "protocol": 6}) 
                total_page = mongoDB_query
                mongoDB_query = json.loads(mongoDB_query)
                ans = list(collection.find(mongoDB_query, {"_id": 0}))
                total_page = collection.count_documents(mongoDB_query)
        return jsonify({'query': ans, "total_page":total_page}),200
    
    except Exception as e:
        print(e)
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
@app.route('/api/data/table', methods=['GET'])
def get_data_forTable():
    # Server side pagination reduce overhead and stress
    current_page = int(request.args.get('currentPage',0))# current page number
    page_size = int(request.args.get("pageSize", 10)) # Number of records per page
    skip = current_page*page_size
    db = mongo.db
    collection = db.input
    # Exclude id and sort time stamp
    data = list(collection.find({}, {'_id': 0}).sort('timestamp', -1).skip(skip).limit(page_size))
    # Total number of rows in input page
    total_page = collection.count_documents({})
    return jsonify({"data" :data,
                    "total_page":total_page})

@app.route('/api/data/user', methods = ['GET'])
def get_user_forTable():
     # Server side pagination reduce overhead and stress
    current_page = int(request.args.get('currentPage',0))# current page number
    page_size = int(request.args.get("pageSize", 10)) # Number of records per page
    skip = current_page*page_size
    db = mongo.db
    collection = db.user
    data = list(collection.find({}, {'_id': 0}).sort('timestamp', -1).skip(skip).limit(page_size))
    total_page = collection.count_documents({})
    return jsonify({"data":data, "total_page":total_page})

@app.route('/api/remove/user', methods = ['DELETE'])
def remove_user():
    db = mongo.db
    collection = db.user
    data = request.json
    user = data.get("userRow")
    if(user["role"] == "admin"):
        return jsonify({"delete status": "failed"}),200
    else:
            ans = collection.delete_one(user)
            return jsonify({"delete status": "success"}),200

@app.route('/api/data/chart', methods=['GET'])
def get_data():
    db = mongo.db
    collection = db.input
    # Exclude id and sort time stamp
    data = list(collection.find({}, {'_id': 0}).sort('timestamp', -1))
    return jsonify(data)

@app.route('/api/create/new/user',methods = ['POST'])
def create_new_user():
    db = mongo.db
    collection = db.user
    data = request.json
    userInput = {
        "username" : data.get("username"),
        "password": data.get("password"),
        "first_name": data.get("firstName"),
        "last_name":data.get("lastName"),
        "email": data.get("email"),
        "role": data.get("role"),
    }
    ifUserExist = collection.find_one(userInput)
    if ifUserExist == None:
        collection.insert_one(userInput)
        return jsonify({"Create user status": "success"}),200
    return jsonify({"Create user status": "failed"}),400
    
@app.route('/api/Login',methods = ['POST'])
def get_login():
    db = mongo.db
    collection = db.user
    data = request.json
    username = data.get('saveLogin')
    password = data.get('savePassword')
    
    # Check if username exists in DB
    user = collection.find_one({'username': username})
    if user: 
        if(user['password']) == password:
            return jsonify({"status":"success"}),200
        else:
            return jsonify({"status":"failed"}),200
    else:
        return jsonify({"status":"failed"}),200

@app.route('/api/user/info',methods =['GET'])
def get_user_info():
    db = mongo.db
    collection = db.user
    username = str(request.args.get('userData',""))# current page number
    ans = collection.find_one({'username': username},{'_id': 0})
    return jsonify({"userData": ans})

# Save Edit profile data
@app.route('/api/user/update/profile',methods =['PUT'])
def update_user_info():
    db = mongo.db
    collection = db.user
    data = request.json
    update_query = {"$set":{
        "username":data.get("formData")["username"],
        "password": data.get("formData")["password"],
        "first_name": data.get("formData")["first_name"],        
        "last_name": data.get("formData")["last_name"],


        "email": data.get("formData")["email"],
        "role": data.get("formData")["role"],
    }}
    ans = collection.update_one({"username":data.get("username")},update_query)
    if ans.raw_result.get("updatedExisting"):
        if ans.raw_result.get("nModified") > 1:
            return jsonify({"Update user status": "error"}),200
        else:
            return jsonify({"Update user status": "success"}),200
    else:
        return jsonify({"Update user status": "failed"}),200

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
        data["source_port"][0],
        data["target_ip"][0],
        data["target_port"][0],
        data["protocol"][0],
        data["l7_protocol"][0],
        data["input_bytes"][0],  
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