// Funktion zum Laden einer HTML-Datei in ein bestimmtes Element
function loadHTML(file, elementId) {
    fetch(file)
      .then(response => {
        if (!response.ok) {
          throw new Error('Netzwerkfehler beim Laden der Datei');
        }
        return response.text();
      })
      .then(data => {
        document.getElementById(elementId).innerHTML = data;
      })
      .catch(error => {
        console.error('Fehler beim Laden der Datei:', error);
      });
  }
  
  // Laden des Headers und Footers nach dem Laden der Seite
  window.onload = function () {
    loadHTML('partials/header.html', 'header-container');
    loadHTML('partials/footer.html', 'footer-container');
  };
  