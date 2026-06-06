from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image
import uvicorn
import os
import shutil
import json

MODEL_PATH = "model/waste_classifier_transfer.h5"
DATASET_DIR = "garbage-dataset"
INFO_PATH = "backend/data/waste_info.json"

model = tf.keras.models.load_model(MODEL_PATH)
class_names = sorted([
    d for d in os.listdir(DATASET_DIR)
    if os.path.isdir(os.path.join(DATASET_DIR, d))
])

with open(INFO_PATH, "r") as f:
    WASTE_INFO = json.load(f)

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def predict(img_path):
    img = image.load_img(img_path, target_size=(224, 224))
    img_array = np.expand_dims(image.img_to_array(img) / 255.0, axis=0)
    
    result = model.predict(img_array)
    idx = np.argmax(result)
    return class_names[idx], float(np.max(result))


@app.post("/predict")
async def predict_api(file: UploadFile = File(...)):

    temp_path = f"temp_{file.filename}"

    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    label, conf = predict(temp_path)
    os.remove(temp_path)

    info = WASTE_INFO.get(label, {
        "description": "No info available.",
        "processing": "Unknown.",
        "impact": "Unknown."
    })

    return {
        "label": label,
        "confidence": round(conf, 4),
        "info": info
    }


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)