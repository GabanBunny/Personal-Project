from flask import Flask, jsonify, request
import moondream as md
from PIL import Image
from tempfile import NamedTemporaryFile
import base64


app = Flask(__name__)

model = md.vl(model="C:\\Users\\phuct\\Downloads\\Project\\Personal-Project\\Mobile App\\Farmers Friend\\backend\\moondream-0_5b-int8.mf.gz")
@app.route('/api-ollama', methods = ['POST'])
def getImage():
    try:
        data = request.json
        image_path = data.get("base64Image")
        imgdata = base64.b64decode(image_path)
        filename ="tmp.jpg"
        with open(filename,'wb') as f:
            f.write(imgdata)
            
        image = Image.open(filename)
        encoded_image = model.encode_image(image)
        
        caption = model.caption(encoded_image)["caption"]
        # print("Caption:", caption)
        
        ans = model.query(
    encoded_image, "What is the disease of this plant? How to treat the disease?")["answer"]


        return jsonify({"ans": ans}),200
    except Exception as e:
        return jsonify({"error": str(e)}),400

if __name__ == "__main__":
    # host 0.0.0.0 to run on all port
    app.run(debug = True,host= "0.0.0.0",port = 5000)