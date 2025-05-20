import sys
import os

# Add the project root to Python path
CURRENT_DIR = os.path.dirname(os.path.realpath(__file__))
PROJECT_ROOT = os.path.abspath(os.path.join(CURRENT_DIR, ".."))  
sys.path.insert(0, PROJECT_ROOT)

import random
import shutil
import base64
from backend.AI_Models.ImageDetection.MobileNetV2FineTuned import predict
import csv  
CURRENT_DIR  = os.path.split(os.path.realpath(__file__))[0]
SAMPLES_PER_CLASS = 70  
SUBSET_DIR = os.path.join(CURRENT_DIR,"subset")

import time
from dotenv import load_dotenv
load_dotenv()
import google.generativeai as genai
import PIL.Image
from google.api_core.exceptions import ResourceExhausted

genai.configure(api_key="AIzaSyBJkU9PM6VXtLT4LezxUcqVIBjQauGScBQ")
model = genai.GenerativeModel("gemini-2.0-flash")


# CONFIG
def configure():
    for name in os.listdir(CURRENT_DIR):
        path = os.path.join(CURRENT_DIR, name)
        if os.path.isdir(path) and name == "Plant_Images":
           for content in os.listdir(path):
                if os.path.isdir(os.path.join(path,content)):
                    return os.path.join(path,content)
SOURCE_DIR = configure()

def make_subset():
    # Make subset
    if not os.path.exists(os.path.join(CURRENT_DIR,"subset")):
        os.makedirs(os.path.join(CURRENT_DIR,"subset")) 
    SUBSET_DIR = os.path.join(CURRENT_DIR,"subset")
    # Make Images
    for folder in os.listdir(SOURCE_DIR):
        full_folder_source = os.path.join(SOURCE_DIR, folder)  # Full path to the source directory of current folder
        sample = random.sample(os.listdir(full_folder_source), SAMPLES_PER_CLASS)
        folder_subset_destination = os.path.join(SUBSET_DIR, folder)
        if not os.path.exists(folder_subset_destination):
            os.makedirs(folder_subset_destination)
        for img in sample:
            src_path = os.path.join(full_folder_source, img)  # Full path to source image file
            dst_path = os.path.join(folder_subset_destination, img)  # Full path to destination image file
            shutil.copy(src_path, dst_path)

def encode_image_to_base64(image_path):
    with open(image_path, "rb") as img_file:
        return base64.b64encode(img_file.read()).decode("utf-8")
    
def benchMarkLocal():
    count = 0
    results = []
    for folder in os.listdir(SUBSET_DIR):
        folder_path = os.path.join(SUBSET_DIR, folder)
        for img_file in os.listdir(folder_path):
            img_path = os.path.join(folder_path, img_file)
            base64_img = encode_image_to_base64(img_path)
            predicted = predict(base64_img)
            print("finish img", count)
            count = count + 1
            results.append([folder, img_file, predicted["class"]])
    
    csv_path = os.path.join(CURRENT_DIR, "benchmark_results.csv")
    with open(csv_path, mode='w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(["True Label", "Filename", "Predicted Label"])  # CSV header
        writer.writerows(results)

def benchMarkGemini():
    count = 0
    results = []
    for folder in os.listdir(SUBSET_DIR):
        folder_path = os.path.join(SUBSET_DIR, folder)
        for img_file in os.listdir(folder_path):
            img_path = os.path.join(folder_path, img_file)
            image = PIL.Image.open(img_path)
            predicted_text = "ERROR: No response"
            retry = 10
            while retry > 0:
                try:
                    response = model.generate_content(["You are a plant expert, your expertise is in plant's diagnosis. Your job is to diagnose this plant and respond only with the disease name. If it's healthy, respond only with healthy", image])
                    predicted_text = response.text.strip()
                    break
                except ResourceExhausted as e:
                    retry -= 1
                    print("Rate limited. Sleeping for 10 seconds...")
                    time.sleep(10)
                except Exception as e:
                    predicted_text = f"ERROR: {e}"
                    break

            print(f"Finished image {count}: {img_file}")
            count += 1
            results.append([folder, img_file, predicted_text])
            if count % 500 == 0:
                print("🔄 Saving intermediate results at count =", count)
                save_results_to_csv(results, f"benchmark_gemini_results_{count}.csv")
    save_results_to_csv(results, "benchmark_gemini_results_final.csv")

def save_results_to_csv(results, fileName): 
    # Save results to CSV
    csv_path = os.path.join(CURRENT_DIR, fileName)
    with open(csv_path, mode='w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerow(["True Label", "Filename", "Gemini Prediction"])
        writer.writerows(results)
benchMarkGemini()