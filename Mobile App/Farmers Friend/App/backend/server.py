from flask import Flask, jsonify


app = Flask(__name__)

@app.route('/', methods = ['GET'])
def Crops():
    return jsonify({"Hello": "worlds"})

if __name__ == "__main__":
    app.run(debug = True,port =5001)