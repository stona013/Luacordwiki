// Theme-Toggle-Button: Event Listener hinzufügen
document.getElementById('theme-toggle').addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
  
    // Theme in LocalStorage speichern
    localStorage.setItem('theme', newTheme);
  });
  
  // Theme beim Laden der Seite setzen
  window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  });
  