from transformers import AutoImageProcessor, AutoModelForImageClassification
from PIL import Image
import torch
import base64
import io 
# Load the processor and model
processor = AutoImageProcessor.from_pretrained("Abhiram4/PlantDiseaseDetectorVit2")
model = AutoModelForImageClassification.from_pretrained("Abhiram4/PlantDiseaseDetectorVit2")


def decode_base64_to_image(base64Image):
    base64ImageDecode = base64.b64decode(base64Image)
    return Image.open(io.BytesIO(base64ImageDecode)).convert("RGB")

# Load and preprocess the image
def preprocess(base64Image):
    image = decode_base64_to_image(base64Image)
    return  processor(images=image, return_tensors="pt")

def predict(base64Image):
# Perform inference
    inputs = preprocess(base64Image)
    with torch.no_grad():
        outputs = model(**inputs)
# Get predicted class
    logits = outputs.logits
    predicted_class_idx = logits.argmax(-1).item()
    print(f"Predicted class: {model.config.id2label[predicted_class_idx]}")
    return {"class": model.config.id2label[predicted_class_idx]}

