// loadHeaderFooter.js

function loadHTML(file, elementId) {
    fetch(file)
      .then(response => response.text())
      .then(data => {
        document.getElementById(elementId).innerHTML = data;
      })
      .catch(error => console.error('Error loading HTML:', error));
  }
  
  window.onload = () => {
    loadHTML('partials/header.html', 'header-container');
    loadHTML('partials/footer.html', 'footer-container');
  };
  