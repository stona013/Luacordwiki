function scaleCoordinates(input, sourceWidth, sourceHeight, targetWidth, targetHeight) {
  const coords = input.split(',').map(Number);

  if (coords.length % 2 !== 0) {
    throw new Error("Ungültige Koordinatenanzahl – es müssen x/y-Paare sein.");
  }

  const scaleX = targetWidth / sourceWidth;
  const scaleY = targetHeight / sourceHeight;

  const scaled = [];

  for (let i = 0; i < coords.length; i += 2) {
    const x = Math.round(coords[i] * scaleX);
    const y = Math.round(coords[i + 1] * scaleY);
    scaled.push(x, y);
  }

  return scaled.join(',');
}

// Beispielnutzung:
const inputCoords = "1610,1861"; // usw.
const sourceWidth = 4096;
const sourceHeight = 2458;
const targetWidth = 1279;
const targetHeight = 768;

const result = scaleCoordinates(inputCoords, sourceWidth, sourceHeight, targetWidth, targetHeight);
console.log(result);


