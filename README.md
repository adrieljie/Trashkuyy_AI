# About TRASHKUYY
TRASHKUYY is an AI-powered waste classification website developed as part of an Artificial Intelligence course project. The website allows users to upload an image of waste, analyze it using an AI model, and receive classification results along with confidence score, waste description, processing recommendations, and environmental impact.

This project demonstrates the implementation of artificial intelligence in image classification, specifically for waste recognition and environmental education.

## Live Demo

Frontend: https://trashkuyy.vercel.app  
Backend API: https://adrieljie-trashkuyy-backend.hf.space

## Features

- Upload waste image
- AI-based waste classification
- Classification result with confidence score
- Waste category information
- Processing and recycling recommendations
- Environmental impact explanation
- Classification history using localStorage
- Responsive design for desktop and mobile
- Glassmorphism UI design

## Waste Categories

The system supports the following waste categories:

- Battery
- Biological
- Cardboard
- Clothes
- Glass
- Metal
- Paper
- Plastic
- Shoes
- Trash

## Tech Stack

### Frontend
- HTML
- CSS
- JavaScript
- Vercel

### Backend
- FastAPI
- TensorFlow
- Python
- Hugging Face Spaces
- Docker

## Project Structure

```txt
AOL_AI_NEW 2/
├── frontend/
│   ├── index.html
│   ├── history.html
│   ├── style.css
│   ├── script.js
│   ├── Logo.PNG
│   ├── Icon.png
│   ├── Favicon1.png
│   └── vercel.json
│
└── backend/
    ├── main.py
    ├── requirements.txt
    ├── Dockerfile
    ├── data/
    │   └── waste_info.json
    └── model/
        └── waste_classifier_transfer.h5
```

## How to Run Locally
Run the backend:
```uvicorn main:app --reload```

Open the frontend:
```index.html```

  
