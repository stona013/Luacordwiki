document.addEventListener("DOMContentLoaded", function() {
    // Alle span-Elemente mit Klasse internal-embed und einem src-Attribut finden
    const embeds = document.querySelectorAll("span.internal-embed[src]");
    
    embeds.forEach(function(span) {
      // Ein <img>-Element erstellen
      const img = document.createElement("img");
      // Den src-Wert übernehmen
      img.src = span.getAttribute("src");
      // Klasse übernehmen
      img.className = span.className;
      // Alt-Attribut übernehmen, falls vorhanden
      if (span.hasAttribute("alt")) {
        img.setAttribute("alt", span.getAttribute("alt"));
      } else {
        img.setAttribute("alt", ""); // Falls nicht, leeren Alt-Text setzen
      }
      // Optional: Weitere Attribute kopieren, falls nötig
  
      // Ersetze das span-Element durch das img-Element
      span.parentNode.replaceChild(img, span);
    });
  });
  