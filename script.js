// Get DOM elements
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const imageUpload = document.getElementById('imageUpload');
const textInput = document.getElementById('textInput');
const sendToBackBtn = document.getElementById('sendToBack');
const bringToFrontBtn = document.getElementById('bringToFront');
const downloadBtn = document.getElementById('downloadImage');

// Global variables
let image = null;
let text = '';
let textInFront = true;

// Function to draw the canvas
function drawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (!textInFront && image) {
        drawImage();
    }
    
    drawText();
    
    if (textInFront && image) {
        drawImage();
    }
}

// Function to draw the image
function drawImage() {
    const ratio = Math.min(canvas.width / image.width, canvas.height / image.height);
    const newWidth = image.width * ratio;
    const newHeight = image.height * ratio;
    const x = (canvas.width - newWidth) / 2;
    const y = (canvas.height - newHeight) / 2;
    ctx.drawImage(image, x, y, newWidth, newHeight);
}

// Function to draw the text
function drawText() {
    ctx.font = 'bold 60px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 8;
    ctx.strokeText(text, canvas.width / 2, canvas.height / 2);
    ctx.fillStyle = 'white';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
}

// Event listener for image upload
imageUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
        image = new Image();
        image.onload = () => {
            drawCanvas();
        };
        image.src = event.target.result;
    };
    reader.readAsDataURL(file);
});

// Event listener for text input
textInput.addEventListener('input', (e) => {
    text = e.target.value;
    drawCanvas();
});

// Event listeners for layer control buttons
sendToBackBtn.addEventListener('click', () => {
    textInFront = false;
    drawCanvas();
});

bringToFrontBtn.addEventListener('click', () => {
    textInFront = true;
    drawCanvas();
});

// Event listener for download button
downloadBtn.addEventListener('click', () => {
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'text-behind-image.png';
    link.href = dataURL;
    link.click();
});

// Initial canvas setup
ctx.fillStyle = '#f0f0f0';
ctx.fillRect(0, 0, canvas.width, canvas.height);