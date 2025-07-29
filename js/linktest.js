document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll("a.internal-link");

    links.forEach(link => {
        const originalHref = link.getAttribute("href");

        // Ignoriere Anker und externe Links
        if (!originalHref || originalHref.startsWith("http") || originalHref.startsWith("#")) return;

        const testHref = originalHref.endsWith(".html") ? originalHref : originalHref + ".html";

        fetch(testHref, { method: 'HEAD' })
            .then(response => {
                if (!response.ok) {
                    kennzeichneBrokenLink(link);
                }
            })
            .catch(() => {
                kennzeichneBrokenLink(link);
            });
    });

    function kennzeichneBrokenLink(link) {
        link.style.color = "gray";
        link.setAttribute("title", "Zielseite existiert noch nicht");
        link.classList.add("broken-link");
    }

    // Entferne target=_blank von allen internen Links
document.querySelectorAll("a.internal-link").forEach(link => {
    if (link.getAttribute("target") === "_blank") {
        link.removeAttribute("target");
    }
});

function kennzeichneBrokenLink(link, url) {
    console.log("Fehlender Link:", url);
    link.style.color = "gray";
    link.title = "Zielseite existiert nicht: " + url;
    link.classList.add("broken-link");

    // Klickverhalten blockieren
    link.addEventListener("click", function (e) {
        e.preventDefault();
        alert("Diese Seite existiert noch nicht.");
    });
}

document.querySelectorAll("a.internal-link").forEach(link => {
    let href = link.getAttribute("href");
    if (!href.endsWith(".html") && !href.startsWith("http") && !href.startsWith("#")) {
        link.setAttribute("href", href + ".html");
    }

    // Optional: target="_blank" entfernen
    if (link.getAttribute("target") === "_blank") {
        link.removeAttribute("target");
    }
});


});
