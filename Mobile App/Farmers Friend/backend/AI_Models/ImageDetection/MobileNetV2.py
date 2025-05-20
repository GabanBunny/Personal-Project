import torch
import base64
import io
from PIL import Image
from torchvision import transforms
model = torch.hub.load('pytorch/vision:v0.10.0', 'mobilenet_v2', pretrained=True)
model.eval()

def decode_base64_to_image(base64Image):
    base64ImageDecode = base64.b64decode(base64Image)
    return Image.open(io.BytesIO(base64ImageDecode)).convert("RGB")


def preprocess(base64Image):
    image = decode_base64_to_image(base64Image)
    preprocess = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])
    input_tensor = preprocess(image)
    input_batch = input_tensor.unsqueeze(0) # create a mini-batch as expected by the model
    return input_batch
    
def predict(base64Image):
    input_batch = preprocess(base64Image)
    
    if torch.cuda.is_available():
        input_batch = input_batch.to('cuda')
        model.to('cuda')

    with torch.no_grad():
        output = model(input_batch)
    print(output[0])
    probabilities = torch.nn.functional.softmax(output[0], dim=0)
    print(probabilities)