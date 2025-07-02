export function getCubeSvg(cubeString) {
  if (cubeString.length !== 54) {
    throw new Error("Cube String must be exactly 54 characters");
  }

  const colorMap = {
    w: "#ffffff", // white
    y: "#ffff00", // yellow
    r: "#ff0000", // red
    o: "#ff8000", // orange
    g: "#00ff00", // green
    b: "#0000ff", // blue
  };

  const faces = {
    up: cubeString.slice(0, 9),
    right: cubeString.slice(9, 18),
    front: cubeString.slice(18, 27),
    down: cubeString.slice(27, 36),
    left: cubeString.slice(36, 45),
    back: cubeString.slice(45, 54),
  };

  const squareSize = 30;
  const gap = 2;
  const faceSize = squareSize * 3 + gap * 2;

  let svg = `<svg width="${faceSize * 4 + gap * 3}" height="${
    faceSize * 3 + gap * 2
  }" xmlns="http://www.w3.org/2000/svg">`;

  // Helper function to draw a face
  function drawface(face, x, y) {
    for (let i = 0; i < 9; i++) {
      const row = Math.floor(i / 3); // 3 x 3
      const col = i % 3;
      const color = colorMap[face[i]] || "#cccccc";
      const squareX = x + col * (squareSize + gap);
      const squareY = y + row * (squareSize + gap);

      svg += `<rect x="${squareX}" y="${squareY}" width="${squareSize}" height="${squareSize}"
              fill="${color}" stroke="#000000" stroke-width="1"/>`;
    }
  }

  // Draw faces in unfolded cube layout
  //       [U]
  //   [L] [F] [R] [B]
  //       [D]
  drawface(faces.up, faceSize + gap, 0); // up
  drawface(faces.left, 0, faceSize + gap); // Left
  drawface(faces.front, faceSize + gap, faceSize + gap); // Front
  drawface(faces.right, (faceSize + gap) * 2, faceSize + gap); // Right
  drawface(faces.back, (faceSize + gap) * 3, faceSize + gap); // Back
  drawface(faces.down, faceSize + gap, (faceSize + gap) * 2); // Down

  svg += "</svg>";
  return svg;
}
