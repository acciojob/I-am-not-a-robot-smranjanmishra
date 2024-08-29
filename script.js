document.addEventListener("DOMContentLoaded", function () {
    const imageContainer = document.getElementById('images');
    const resetButton = document.getElementById('reset');
    const verifyButton = document.getElementById('verify');
    const message = document.getElementById('para');
    
    const classes = ['img1', 'img2', 'img3', 'img4', 'img5'];
    let selectedImages = [];
    let selectedElements = [];

    function initialize() {
        selectedImages = [];
        selectedElements = [];
        message.textContent = "";
        verifyButton.style.display = "none";
        resetButton.style.display = "none";
        renderImages();
    }

    function renderImages() {
        imageContainer.innerHTML = '';

        // Pick a random image class to duplicate
        const duplicateClass = classes[Math.floor(Math.random() * classes.length)];
        
        // Create an array with one duplicate
        const images = [...classes, duplicateClass];

        // Shuffle the images
        images.sort(() => Math.random() - 0.5);

        // Render images
        images.forEach(imgClass => {
            const img = document.createElement('img');
            img.className = imgClass;
            img.addEventListener('click', () => handleImageClick(img, imgClass));
            imageContainer.appendChild(img);
        });
    }

    function handleImageClick(img, imgClass) {
        if (selectedElements.length < 2 && !selectedElements.includes(img)) {
            img.classList.add('selected');
            selectedElements.push(img);
            selectedImages.push(imgClass);

            if (selectedElements.length > 0) {
                resetButton.style.display = "block";
            }

            if (selectedElements.length === 2) {
                verifyButton.style.display = "block";
            }
        }
    }

    resetButton.addEventListener('click', () => {
        initialize();
    });

    verifyButton.addEventListener('click', () => {
        if (selectedImages[0] === selectedImages[1]) {
            message.textContent = "You are a human. Congratulations!";
        } else {
            message.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
        }
        verifyButton.style.display = "none";
    });

    initialize();
});