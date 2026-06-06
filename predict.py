import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image
import os

MODEL_PATH = "backend/model/waste_classifier_transfer.h5"
DATASET_DIR = "garbage-dataset"

# Filter hanya folder kategori
class_names = sorted([
    d for d in os.listdir(DATASET_DIR)
    if os.path.isdir(os.path.join(DATASET_DIR, d))
])

model = tf.keras.models.load_model(MODEL_PATH)

def predict_image(img_path):
    img = image.load_img(img_path, target_size=(224, 224))
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    predictions = model.predict(img_array)
    predicted_index = np.argmax(predictions)

    predicted_label = class_names[predicted_index]
    confidence = np.max(predictions)

    return predicted_label, confidence


if __name__ == "__main__":
    img_path = input("Masukkan path gambar: ")

    if not os.path.exists(img_path):
        print("❌ Gambar tidak ditemukan.")
    else:
        label, confidence = predict_image(img_path)
        print("\n==============================")
        print(f"Prediksi : {label}")
        print(f"Akurasi  : {confidence*100:.2f}%")
        print("==============================")


