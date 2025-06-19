document.addEventListener("DOMContentLoaded", () => {
  const isProtected = document.body.dataset.protected === "true";
  if (!isProtected) return;

  // Hier zentral alle Spieler und ihre PINs definieren
  const playerPins = {
    Master: "1303",
    Tessa: "7355",
    Noel: "3141",
    Felix: "1301",
    Tim: "0607",
    Sera: "3108",
    Draco: "2305"
  };

  // Gültige Spieler von der Seite auslesen
  const allowedPlayersRaw = document.body.dataset.allowedPlayers || "";
  const allowedPlayers = allowedPlayersRaw.split(",").map(name => name.trim());

  // Erlaubte PINs anhand der Namen ableiten
  const allowedPins = allowedPlayers
    .map(player => playerPins[player])
    .filter(pin => !!pin); // nur gültige PINs behalten

  const protectedContent = document.getElementById("protected-content");
  if (protectedContent) protectedContent.style.display = "none";

  const lockScreen = document.createElement("div");
  lockScreen.id = "lock-screen";
  lockScreen.style = `
    position: fixed;
    inset: 0;
    background: var(--bg-color, white);
    color: var(--text-color, black);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    padding: 20px;
  `;

  lockScreen.innerHTML = `
    <h2>🔒 Geschützter Artikel</h2>
    <p>Gib deinen persönlichen 4-stelligen Code ein:</p>
    <input type="password" id="access-code" maxlength="4" style="text-align: center; font-size: 1.2rem; padding: 5px; width: 80px;">
    <button id="check-code" style="margin-top: 10px;">Zugang prüfen</button>
    <p id="error-msg" style="color: red; display: none; margin-top: 10px;">Falscher Code!</p>
  `;

  document.body.appendChild(lockScreen);

  document.getElementById("check-code").onclick = () => {
    const input = document.getElementById("access-code").value;
    const error = document.getElementById("error-msg");

    if (allowedPins.includes(input)) {
      lockScreen.remove();
      if (protectedContent) protectedContent.style.display = "block";
    } else {
      error.style.display = "block";
    }
  };
});
