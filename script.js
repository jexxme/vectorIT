document.getElementById('drop-area').ondragover = function (event) {
    event.preventDefault();
};

document.getElementById('drop-area').ondrop = function (event) {
    event.preventDefault();
    let files = event.dataTransfer.files;
    handleFiles(files);
};

function handleFiles(files) {
    // Handle the files (only the first if multiple)
    // For example, you can read the file and then pass it to the conversion function
}

function convertToSVG() {
    let fileInput = document.getElementById('fileElem');
    if (fileInput.files.length === 0) {
        alert('Please select a PNG file first!');
        return;
    }

    let file = fileInput.files[0];
    let reader = new FileReader();
    reader.onload = function (event) {
        let img = new Image();
        img.onload = function () {
            // Get options from the form
            let ltres = document.getElementById('ltres').value;
            let qtres = document.getElementById('qtres').value;
            let scale = document.getElementById('scale').value;
            let strokewidth = document.getElementById('strokewidth').value;

            // Convert image to SVG
            ImageTracer.imageToSVG(img.src, function (svgString) {
                displaySVG(svgString);
            }, { ltres, qtres, scale, strokewidth });
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
}

function displaySVG(svgString) {
    let resultDiv = document.getElementById('result');
    resultDiv.innerHTML = ''; // Clear previous results
    let imgElement = document.createElement('img');
    imgElement.src = 'data:image/svg+xml;base64,' + window.btoa(svgString);
    resultDiv.appendChild(imgElement);
}

document.getElementById('optionsBtn').addEventListener('click', function () {
    var menu = document.getElementById('optionsMenu');
    if (menu.style.display === 'none') {
        menu.style.display = 'block';
    } else {
        menu.style.display = 'none';
    }
});
