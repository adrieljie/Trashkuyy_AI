let selectedFile = null;

const categoryStyles = {
    battery: { color: 'bg-battery', icon: '🔋', badge: 'B3 - Berbahaya' },
    biological: { color: 'bg-biological', icon: '🌱', badge: 'Organik' },
    cardboard: { color: 'bg-cardboard', icon: '📦', badge: 'Anorganik' },
    clothes: { color: 'bg-clothes', icon: '👕', badge: 'Anorganik' },
    glass: { color: 'bg-glass', icon: '🫙', badge: 'Anorganik' },
    metal: { color: 'bg-metal', icon: '🔩', badge: 'Anorganik' },
    paper: { color: 'bg-paper', icon: '📄', badge: 'Anorganik' },
    plastic: { color: 'bg-plastic', icon: '🧴', badge: 'Anorganik' },
    shoes: { color: 'bg-shoes', icon: '👟', badge: 'Anorganik' },
    trash: { color: 'bg-trash', icon: '🗑️', badge: 'Residu' }
};

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        selectedFile = file;
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('previewImage').src = e.target.result;
            document.getElementById('uploadArea').style.display = 'none';
            document.getElementById('previewSection').style.display = 'block';
            document.getElementById('errorBox').style.display = 'none';
            document.getElementById('resultPlaceholder').style.display = 'block';
            document.getElementById('resultContent').style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
}

async function analyzeImage() {
    if (!selectedFile) return;

    const analyzeBtn = document.getElementById('analyzeBtn');
    analyzeBtn.disabled = true;
    analyzeBtn.innerHTML = '<span class="spinner">⟳</span> Menganalisis...';
    document.getElementById('errorBox').style.display = 'none';

    try {
        const formData = new FormData();
        formData.append('file', selectedFile);

        const response = await fetch('http://127.0.0.1:8000/predict', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Gagal menganalisis gambar');
        }

        const data = await response.json();
        displayResult(data);
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('errorText').textContent = 
            'Terjadi kesalahan saat menganalisis gambar. Pastikan backend sudah berjalan di http://127.0.0.1:8000';
        document.getElementById('errorBox').style.display = 'flex';
    } finally {
        analyzeBtn.disabled = false;
        analyzeBtn.innerHTML = 'Analisis Gambar';
    }
}

function displayResult(data) {
    const confidence = data.confidence * 100;
    const style = categoryStyles[data.label] || categoryStyles.trash;

    let html = `
        <div class="category-badge ${style.color}">
            <div class="category-header">
                <span class="category-icon">${style.icon}</span>
                <div>
                    <div class="category-title">${data.info.title}</div>
                    <span class="category-label">${style.badge}</span>
                </div>
            </div>
        </div>

        <div class="info-box">
            <h4>Tingkat Kepercayaan AI</h4>
            <div class="confidence-bar">
                <div class="confidence-fill ${style.color}" style="width: ${confidence}%"></div>
            </div>
            <div class="confidence-text">${confidence.toFixed(2)}%</div>
        </div>

        <div class="info-box">
            <h4>Deskripsi</h4>
            <p>${data.info.description}</p>
        </div>

        <div class="info-box">
            <h4>Cara Pengelolaan</h4>
            <ul class="steps-list">
                ${data.info.processing.map((step, idx) => `
                    <li>
                        <span class="step-number ${style.color}">${idx + 1}</span>
                        <span>${step}</span>
                    </li>
                `).join('')}
            </ul>
        </div>

        <div class="impact-box">
            <h4>⚠️ Dampak Lingkungan</h4>
            <ul class="impact-list">
                ${data.info.impact.map(item => `
                    <li>
                        <span>•</span>
                        <span>${item}</span>
                    </li>
                `).join('')}
            </ul>
        </div>
    `;

    document.getElementById('resultPlaceholder').style.display = 'none';
    document.getElementById('resultContent').style.display = 'block';
    document.getElementById('resultContent').innerHTML = html;
}

function resetForm() {
    selectedFile = null;
    document.getElementById('uploadArea').style.display = 'block';
    document.getElementById('previewSection').style.display = 'none';
    document.getElementById('resultPlaceholder').style.display = 'block';
    document.getElementById('resultContent').style.display = 'none';
    document.getElementById('fileInput').value = '';
}

const uploadArea = document.getElementById('uploadArea');

uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = '#10b981';
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.style.borderColor = '#d1d5db';
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = '#d1d5db';
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        document.getElementById('fileInput').files = dataTransfer.files;
        handleFileSelect({ target: { files: [file] } });
    }
});

