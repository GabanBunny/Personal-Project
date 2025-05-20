from flask import Flask,request,jsonify
import AI_Models.ImageDetection.MobileNetV2FineTuned
import AI_Models.ChatFeature.TinyLlama
from flask_cors import CORS
app = Flask(__name__)
CORS(app, resources={r"/api-MobileNetV2": {"origins": "*"}})

@app.route('/api-MobileNetV2', methods=['POST'])
def getPrediction():
    data = request.json
    base64Image = data.get("base64Image")
    diseaseName = AI_Models.ImageDetection.MobileNetV2FineTuned.predict(base64Image)
    # description = AI_Models.ChatFeature.TinyLlama.generate(diseaseName['class'],40,"description")
    # biological = AI_Models.ChatFeature.TinyLlama.generate(diseaseName['class'],10,"biological treatment")
    # chemical = AI_Models.ChatFeature.TinyLlama.generate(diseaseName['class'],10,"chemical treatment")
    # prevention = AI_Models.ChatFeature.TinyLlama.generate(diseaseName['class'],10,"prevention treatment")

    response = {
    "plantName": diseaseName['class'].split("___")[0],
    "disease": diseaseName['class'].split("___")[1],
    # "All": diseaseName['class']
    # "description": description,
    # "biological_treatment": biological,
    # "chemical_treatment": chemical,
    # "prevention": prevention
    } 
    print("Raw data received:", diseaseName['class'].split("___"))    
    return jsonify(response), 200


    
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5001)
