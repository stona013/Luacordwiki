const fs = require('fs-extra'); // Importiere das fs-extra Modul, um Dateien zu bearbeiten
const path = require('path');   // Importiere das path Modul, um mit Dateipfaden zu arbeiten

// Header und Footer Templates einlesen (stellen sicher, dass der Pfad korrekt ist)
const headerContent = fs.readFileSync('partials/header.html', 'utf8');
const footerContent = fs.readFileSync('partials/footer.html', 'utf8');

// Funktion, um Header und Footer in die HTML-Datei einzufügen
const addHeaderFooterToFile = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8'); // Lese den Inhalt der HTML-Datei

  // Füge den Header und Footer hinzu
  content = headerContent + '\n' + content + '\n' + footerContent;

  // Schreibe den aktualisierten Inhalt zurück in die Datei
  fs.writeFileSync(filePath, content);
};

// Verzeichnis mit den HTML-Dateien (Verzeichnisname 'Neueeinträge' hier anpassen)
const dirPath = path.join(__dirname, 'Neueeinträge');

// Alle HTML-Dateien im Verzeichnis verarbeiten
fs.readdirSync(dirPath).forEach(file => {
  if (file.endsWith('.html')) {
    const filePath = path.join(dirPath, file);
    addHeaderFooterToFile(filePath); // Die Funktion auf jede HTML-Datei anwenden
  }
});

console.log('Header und Footer wurden zu allen HTML-Dateien hinzugefügt.');
