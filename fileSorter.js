const fs = require('fs').promises;
const path = require('path');
const readline = require('readline');

async function main() {
  // Absoluter Pfad zu diesem Skript
  const scriptDir = path.resolve(__dirname);

  // Quellordner "pages" ermitteln
  const sourceDir = process.argv[2]
    ? path.resolve(process.argv[2])
    : path.join(scriptDir, 'pages');

  // Zielordner "not-used" auf gleicher Ebene wie "pages"
  const targetDir = path.join(path.dirname(sourceDir), 'not-used');

  // Existenz des Quellordners pruefen
  try {
    await fs.access(sourceDir);
  } catch {
    console.error(`Quellordner nicht gefunden: ${sourceDir}`);
    process.exit(1);
  }

  // Zielordner anlegen, falls nicht vorhanden
  await fs.mkdir(targetDir, { recursive: true });

  // Eintraege im Quellordner lesen
  const entries = await fs.readdir(sourceDir, { withFileTypes: true });
  const files = entries.filter(e => e.isFile()).map(e => e.name);

  if (files.length === 0) {
    console.log('Keine Dateien im Ordner pages gefunden.');
    return;
  }

  // Readline-Schnittstelle fuer Benutzereingaben
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  for (const name of files) {
    const answer = await new Promise(resolve =>
      rl.question(`Datei: ${name}\nAktion [b]ehalten / [v]erschieben / [q]uit: `, resolve)
    );
    const a = answer.trim().toLowerCase();

    if (a === 'q') {
      console.log('Vorgang beendet.');
      break;
    }

    if (a === 'v') {
      const sourcePath = path.join(sourceDir, name);
      const targetPath = path.join(targetDir, name);
      try {
        await fs.rename(sourcePath, targetPath);
        console.log(`Verschoben: ${name}`);
      } catch (err) {
        console.error(`Fehler beim Verschieben von ${name}: ${err.message}`);
      }
    } else {
      console.log(`Behalten: ${name}`);
    }
  }

  rl.close();
}

main().catch(err => console.error('Unerwarteter Fehler:', err));
