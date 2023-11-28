document.getElementById('drop-area').ondragover = function (event) {
    event.preventDefault();
};

document.getElementById('drop-area').ondrop = function (event) {
    event.preventDefault();
    let files = event.dataTransfer.files;
    handleFiles(files);
};

function handleFiles(files) {
    const selectedFilesDiv = document.getElementById('selected-files');
  
    // Clear the existing file names
    selectedFilesDiv.innerHTML = '';
  
    // Add the file names to the div
    for (const file of files) {
      const fileNameElement = document.createElement('p');
      fileNameElement.textContent = file.name;
      selectedFilesDiv.appendChild(fileNameElement);
    }
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





function showToast(message) {
    const toastContainer = document.getElementById('toastContainer');
    const toastBody = document.createElement('div');
    toastBody.classList.add('toast-body');
    toastBody.textContent = message;
  
    const toast = new bootstrap.Toast(toastContainer);
    toastBody.classList.add('text-danger');
    toastContainer.appendChild(toastBody);
    toast.show();
  }
  