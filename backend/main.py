from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image
import uvicorn
import os
import shutil
import json
import tempfile

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(BASE_DIR)

MODEL_PATH = os.path.join(BASE_DIR, "model", "waste_classifier_transfer.h5")
INFO_PATH = os.path.join(BASE_DIR, "data", "waste_info.json")

model = tf.keras.models.load_model(MODEL_PATH)
class_names = [
    "battery",
    "biological",
    "cardboard",
    "clothes",
    "glass",
    "metal",
    "paper",
    "plastic",
    "shoes",
    "trash"
]

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

@app.get("/")
def root():
    return {"message": "TRASHKUYY backend is running"}

def predict(img_path):
    img = image.load_img(img_path, target_size=(224, 224))
    img_array = np.expand_dims(image.img_to_array(img) / 255.0, axis=0)
    
    result = model.predict(img_array)
    idx = np.argmax(result)
    return class_names[idx], float(np.max(result))


@app.post("/predict")
async def predict_api(file: UploadFile = File(...)):
    suffix = os.path.splitext(file.filename)[1]

    with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as temp:
        shutil.copyfileobj(file.file, temp)
        temp_path = temp.name

    try:
        label, conf = predict(temp_path)
    finally:
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