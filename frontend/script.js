let selectedFile = null;
let selectedImageData = null;

const icons = {
    battery: `
        <svg viewBox="0 0 24 24" class="svg-icon">
            <path d="M8 2h8c1.1 0 2 .9 2 2v16c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2zm3-1h2c.6 0 1 .4 1 1v1h-4V2c0-.6.4-1 1-1z"/>
        </svg>
    `,
    biological: `
        <svg viewBox="0 0 24 24" class="svg-icon">
            <path d="M11 22h2v-7.1c3.8-.5 7-3.8 7-8.4V5h-1.5C15.5 5 13 7.5 13 10.5V4H11v5.6C11 6.5 8.5 4 5.5 4H4v1.5c0 4.6 3.2 7.9 7 8.4V22z"/>
        </svg>
    `,
    cardboard: `
        <svg viewBox="0 0 24 24" class="svg-icon">
            <path d="M12 2 3 6.5V17.5L12 22l9-4.5V6.5L12 2zm0 2.2 5.8 2.9L12 9.9 6.2 7.1 12 4.2zm-7 4.2 6 3v7.8l-6-3V8.4zm8 10.8v-7.8l6-3v7.8l-6 3z"/>
        </svg>
    `,
    clothes: `
        <svg viewBox="0 0 24 24" class="svg-icon">
            <path d="M9 3 7 6 3 8l2 5 3-1.2V21h8v-9.2L19 13l2-5-4-2-2-3H9z"/>
        </svg>
    `,
    glass: `
        <svg viewBox="0 0 24 24" class="svg-icon">
            <path d="M9 2h6v2h-1v3.5l1.8 3V19l2 3H6l2-3v-8.5L10 7V4H9V2z"/>
        </svg>
    `,
    metal: `
        <svg viewBox="0 0 24 24" class="svg-icon">
            <path d="M8 3h8l1 2v14c0 1.7-2.2 3-5 3s-5-1.3-5-3V5l1-2zm1.5 4v11H11V7H9.5zm3 0v11H14V7h-1.5z"/>
        </svg>
    `,
    paper: `
        <svg viewBox="0 0 24 24" class="svg-icon">
            <path fill-rule="evenodd" d="M6 2h8l6 6v14H6V2zm8 1.5V8h4.5L14 3.5z"/>
        </svg>
    `,
    plastic: `
        <svg viewBox="0 0 24 24" class="svg-icon">
            <path d="M10 2h4v2h-1v1.2l2.3 3.5c.5.7.7 1.6.7 2.5V20c0 1.1-.9 2-2 2h-4c-1.1 0-2-.9-2-2v-8.8c0-.9.2-1.8.7-2.5L11 5.2V4h-1V2z"/>
        </svg>
    `,
    shoes: `
        <svg viewBox="0 0 24 24" class="svg-icon">
            <path d="M8.5 4H11v5.2c0 .5.3 1 .8 1.2l4.4 1.8c2.2.9 3.7 3 3.8 5.3V19H3.5C2.7 19 2 18.3 2 17.5 2 15 4 13 6.5 13h1.2c1.6 0 2.8-.6 3.8-1.7l1-1.1V4z"/>
        </svg>
    `,
    trash: `
        <svg viewBox="0 0 24 24" class="svg-icon">
            <path fill-rule="evenodd" d="M9 2h6c.6 0 1 .4 1 1v2h4v2H4V5h4V3c0-.6.4-1 1-1zm1 3h4V4h-4v1zm-3 4h10l-.8 11.2c-.1 1-.9 1.8-1.9 1.8H9.7c-1 0-1.8-.8-1.9-1.8L7 9z"/>
        </svg>
    `,
    image: `
        <svg viewBox="0 0 24 24" class="svg-icon">
            <path fill-rule="evenodd" d="M5 4h14c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm3 2.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm-3 9.5V6h14v10H5zm1.8 0h10.4l-2.9-3.8-2.6 3-2.1-2.2L6.8 16z"/>
        </svg>
    `,
    close: `
        <svg viewBox="0 0 24 24" class="svg-icon">
            <path d="M7.4 6 6 7.4 10.6 12 6 16.6 7.4 18l4.6-4.6 4.6 4.6 1.4-1.4-4.6-4.6L18 7.4 16.6 6 12 10.6 7.4 6z"/>
        </svg>
    `,
    home: `
        <svg viewBox="0 0 24 24" class="svg-icon">
            <path d="M12 3 2.5 11h2.5v9h5v-5h4v5h5v-9h2.5L12 3z"/>
        </svg>
    `,
    history: `
        <svg viewBox="0 0 24 24" class="svg-icon">
            <path fill-rule="evenodd" d="M12 3a9 9 0 1 1-8.7 11.4H1l3.5-4L8 14H5.5A6.5 6.5 0 1 0 12 5.5c-1.6 0-3.1.6-4.3 1.7L6 5.8A8.9 8.9 0 0 1 12 3zm-1 4h2v5.2l3.4 2-1 1.7L11 13V7z"/>
        </svg>
    `
};

const categoryStyles = {
    battery: {
        icon: icons.battery,
        badge: 'Inorganic',
        color: '#D9A300',
        bg: 'rgba(255, 224, 102, 0.55)',
        badgeBg: 'rgba(217, 163, 0, 0.75)'
    },
    biological: {
        icon: icons.biological,
        badge: 'Organic',
        color: '#3E8F3B',
        bg: 'rgba(144, 238, 144, 0.50)',
        badgeBg: 'rgba(62, 143, 59, 0.75)'
    },
    cardboard: {
        icon: icons.cardboard,
        badge: 'Inorganic',
        color: '#A56A2A',
        bg: 'rgba(222, 184, 135, 0.55)',
        badgeBg: 'rgba(165, 106, 42, 0.75)'
    },
    clothes: {
        icon: icons.clothes,
        badge: 'Inorganic',
        color: '#3B82F6',
        bg: 'rgba(147, 197, 253, 0.50)',
        badgeBg: 'rgba(59, 130, 246, 0.75)'
    },
    glass: {
        icon: icons.glass,
        badge: 'Inorganic',
        color: '#00A6A6',
        bg: 'rgba(125, 249, 255, 0.45)',
        badgeBg: 'rgba(0, 166, 166, 0.75)'
    },
    metal: {
        icon: icons.metal,
        badge: 'Inorganic',
        color: '#6B7280',
        bg: 'rgba(209, 213, 219, 0.60)',
        badgeBg: 'rgba(107, 114, 128, 0.75)'
    },
    paper: {
        icon: icons.paper,
        badge: 'Inorganic',
        color: '#C084FC',
        bg: 'rgba(216, 180, 254, 0.45)',
        badgeBg: 'rgba(168, 85, 247, 0.70)'
    },
    plastic: {
        icon: icons.plastic,
        badge: 'Inorganic',
        color: '#F97316',
        bg: 'rgba(253, 186, 116, 0.50)',
        badgeBg: 'rgba(249, 115, 22, 0.75)'
    },
    shoes: {
        icon: icons.shoes,
        badge: 'Inorganic',
        color: '#EC4899',
        bg: 'rgba(249, 168, 212, 0.45)',
        badgeBg: 'rgba(236, 72, 153, 0.75)'
    },
    trash: {
        icon: icons.trash,
        badge: 'Residue',
        color: '#6F4E2B',
        bg: 'rgba(180, 140, 100, 0.45)',
        badgeBg: 'rgba(111, 78, 43, 0.80)'
    }
};

function handleFileSelect(event) {
    const file = event.target.files[0];

    if (!file) return;

    selectedFile = file;

    const reader = new FileReader();

    reader.onload = function(e) {
        selectedImageData = e.target.result;

        document.getElementById('previewImage').src = selectedImageData;
        document.getElementById('uploadArea').style.display = 'none';
        document.getElementById('previewSection').style.display = 'block';
        document.getElementById('errorBox').style.display = 'none';

        const resultPlaceholder = document.getElementById('resultPlaceholder');
        const resultContent = document.getElementById('resultContent');

        if (resultPlaceholder && resultContent) {
            resultPlaceholder.style.display = 'flex';
            resultContent.style.display = 'none';
            resultContent.innerHTML = '';
        }
    };

    reader.readAsDataURL(file);
}

async function analyzeImage(event) {
    if (event) event.preventDefault();

    if (!selectedFile) return;

    const analyzeBtn = document.getElementById('analyzeBtn');
    const errorBox = document.getElementById('errorBox');

    analyzeBtn.disabled = true;
    analyzeBtn.innerHTML = 'Analyzing...';
    errorBox.style.display = 'none';

    try {
        const formData = new FormData();
        formData.append('file', selectedFile);

        const response = await fetch('https://adrieljie-trashkuyy-backend.hf.space/predict', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Failed to analyze image');
        }

        const data = await response.json();

        displayResult(data);
        await saveToHistory(data);
        errorBox.style.display = 'none';

    } catch (error) {
        console.error(error);
        errorBox.style.display = 'block';
    } finally {
        analyzeBtn.disabled = false;
        analyzeBtn.innerHTML = 'Analyse Image';
    }
}

function displayResult(data) {
    const resultPlaceholder = document.getElementById('resultPlaceholder');
    const resultContent = document.getElementById('resultContent');

    if (!resultContent) return;

    const confidence = data.confidence * 100;
    const style = categoryStyles[data.label] || categoryStyles.trash;

    const title = data.info.title || capitalize(data.label);
    const description = data.info.description || 'No description available.';
    const processing = Array.isArray(data.info.processing) ? data.info.processing : [];
    const impact = Array.isArray(data.info.impact) ? data.info.impact : [];

    resultContent.innerHTML = `
        <div 
            class="category-box"
            style="
                background: ${style.bg};
                box-shadow: 0 0 18px ${style.bg};
            "
        >
            <div class="category-row">
                <div class="category-icon" style="color: ${style.color};">
                    ${style.icon}
                </div>
                <div>
                    <div class="category-name" style="color: ${style.color};">
                        ${title}
                    </div>
                    <div class="badge" style="background: ${style.badgeBg};">
                        ${style.badge}
                    </div>
                </div>
            </div>
        </div>

        <div class="info-section">
            <h3>Confidence Level</h3>
            <div class="confidence-bar">
                <div 
                    class="confidence-fill" 
                    style="
                        width: ${confidence}%;
                        background: linear-gradient(90deg, ${style.color}, ${style.badgeBg});
                        box-shadow: 0 0 12px ${style.bg};
                    "
                ></div>
            </div>
            <div class="confidence-text">Percentage: ${confidence.toFixed(0)}%</div>
        </div>

        <div class="info-section">
            <h3>Description</h3>
            <p>${description}</p>
        </div>

        <div class="info-section">
            <h3>How to Process</h3>
            <ol>
                ${processing.map(item => `<li>${item}</li>`).join('')}
            </ol>
        </div>

        <div class="impact-section">
            <h3>Impact ⚠</h3>
            <ol>
                ${impact.map(item => `<li>${item}</li>`).join('')}
            </ol>
        </div>
    `;

    resultPlaceholder.style.display = 'none';
    resultContent.style.display = 'block';
}

function resetForm() {
    selectedFile = null;
    selectedImageData = null;

    document.getElementById('fileInput').value = '';
    document.getElementById('uploadArea').style.display = 'flex';
    document.getElementById('previewSection').style.display = 'none';
    document.getElementById('errorBox').style.display = 'none';

    const resultPlaceholder = document.getElementById('resultPlaceholder');
    const resultContent = document.getElementById('resultContent');

    if (resultPlaceholder && resultContent) {
        resultPlaceholder.style.display = 'flex';
        resultContent.style.display = 'none';
        resultContent.innerHTML = '';
    }
}

function compressImage(imageData, maxWidth = 500, quality = 0.65) {
    return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = function() {
            const canvas = document.createElement('canvas');

            const scale = Math.min(maxWidth / img.width, 1);
            canvas.width = img.width * scale;
            canvas.height = img.height * scale;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            const compressedData = canvas.toDataURL('image/jpeg', quality);
            resolve(compressedData);
        };

        img.onerror = function() {
            reject(new Error('Failed to compress image'));
        };

        img.src = imageData;
    });
}

async function saveToHistory(data) {
    const history = JSON.parse(localStorage.getItem('classificationHistory')) || [];
    const style = categoryStyles[data.label] || categoryStyles.trash;

    let compressedImage = null;

    if (selectedImageData) {
        compressedImage = await compressImage(selectedImageData, 500, 0.65);
    }

    const newItem = {
        label: data.label,
        title: data.info.title || capitalize(data.label),
        category: style.badge,
        confidence: data.confidence,
        description: data.info.description || 'No description available.',
        date: new Date().toLocaleString('en-US'),
        image: compressedImage
    };

    history.unshift(newItem);

    const limitedHistory = history.slice(0, 10);

    localStorage.setItem('classificationHistory', JSON.stringify(limitedHistory));
}

function loadHistory() {
    const historyList = document.getElementById('historyList');

    if (!historyList) return;

    const history = JSON.parse(localStorage.getItem('classificationHistory')) || [];

    if (history.length === 0) {
        historyList.innerHTML = `
            <div class="no-history">
                <div class="no-history-icon">${icons.close}</div>
                <div>
                    <h3>No classification history yet.</h3>
                    <p>Start classifying and see your impact!</p>
                </div>
            </div>
        `;
        return;
    }

    historyList.innerHTML = history.map(item => {
        const style = categoryStyles[item.label] || categoryStyles.trash;
        const confidence = item.confidence * 100;

        return `
            <div 
                class="history-item"
                style="
                    background: ${style.bg};
                    box-shadow: 0 0 16px ${style.bg};
                "
            >
                <div class="history-icon" style="color: ${style.color};">
                    ${style.icon}
                </div>

                <div class="history-info">
                    <h3>${item.title}</h3>
                    <p>${item.date}</p>
                    <p><strong>Category:</strong> ${item.category}</p>
                    <p><strong>Confidence Score:</strong> ${confidence.toFixed(0)}%</p>
                    <p><strong>Description:</strong> ${item.description}</p>
                </div>

                ${
                    item.image
                    ? `<img src="${item.image}" class="history-img" alt="Classification Image">`
                    : `<div class="history-img"></div>`
                }
            </div>
        `;
    }).join('');
}

function clearHistory() {
    localStorage.removeItem('classificationHistory');
    loadHistory();
}

function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

const uploadArea = document.getElementById('uploadArea');

if (uploadArea) {
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        uploadArea.style.borderColor = '#CDFBCC';
    });

    uploadArea.addEventListener('dragleave', function() {
        uploadArea.style.borderColor = 'rgba(55, 111, 53, 0.65)';
    });

    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        uploadArea.style.borderColor = 'rgba(55, 111, 53, 0.65)';

        const file = e.dataTransfer.files[0];

        if (file && file.type.startsWith('image/')) {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            document.getElementById('fileInput').files = dataTransfer.files;
            handleFileSelect({ target: { files: [file] } });
        }
    });
}

const uploadIcon = document.getElementById('uploadIcon');

if (uploadIcon) {
    uploadIcon.innerHTML = icons.image;
}

const resultIcon = document.getElementById('resultIcon');

if (resultIcon) {
    resultIcon.innerHTML = icons.image;
}

const homeIcon = document.getElementById('homeIcon');
const historyIcon = document.getElementById('historyIcon');

if (homeIcon) {
    homeIcon.innerHTML = icons.home;
}

if (historyIcon) {
    historyIcon.innerHTML = icons.history;
}