const cells = [],
  corners = [],
  margin = 50,
  space = 20;

let numCellsX,
  numCellsY,
  xOff,
  yOff;

function setup() {
  createCanvas(windowWidth, windowHeight);

  numCellsX = floor((width - 2 * margin) / space);
  numCellsY = floor((height - 2 * margin) / space);
  xOff = (width - numCellsX * space) / 2;
  yOff = (height - numCellsY * space) / 2;

  background(51);

  createCorners();
  createCells();

  rect(xOff, yOff, numCellsX * space, numCellsY * space);
}

function createCorners() {
  for (let i = 0; i < numCellsX + 1; i++) {
    corners.push([]);
    for (let j = 0; j < numCellsY + 1; j++) {
      corners[i].push(new cornerObject(xOff + i * space, yOff + j * space));
      corners[i][j].show();
    }
  }
}

function createCells() {
  for (let i = 0; i < numCellsX; i++) {
    cells.push([]);
    for (let j = 0; j < numCellsY; j++) {
      const cellCorners = [corners[i][j], corners[i + 1][j], corners[i + 1][j + 1], corners[i][j + 1]];
      cells[i].push(new cellObject(xOff + i * space, yOff + j * space, cellCorners));
      cells[i][j].drawLine();
    }
  }
}

class cellObject {
  constructor(i, j, cellCorners) {
    this.coord = createVector(i, j);
    this.corners = cellCorners;
    this.configCode = parseInt(`${round(this.corners[0].value)}${round(this.corners[1].value)}${round(this.corners[2].value)}${round(this.corners[3].value)}`, 2);
  }
  drawLine() {
    const a = createVector(this.coord.x + space / 2, this.coord.y),
      b = createVector(this.coord.x + space, this.coord.y + space / 2),
      c = createVector(this.coord.x + space / 2, this.coord.y + space),
      d = createVector(this.coord.x, this.coord.y + space / 2);

    let p0, p1, p2, p3;
    switch (this.configCode) {
      case 1: //0001
        p0 = d;
        p1 = c;
        break;
      case 2: //0010
        p0 = b;
        p1 = c;
        break;
      case 3: //0011
        p0 = d;
        p1 = b;
        break;
      case 4: //0100
        p0 = a;
        p1 = b;
        break;
      case 5: //0101
        p0 = a;
        p1 = b;
        p2 = d;
        p3 = c;
        break;
      case 6: //0110
        p0 = a;
        p1 = c;
        break;
      case 7: //0111
        p0 = d;
        p1 = a;
        break;
      case 8: //1000
        p0 = d;
        p1 = a;
        break;
      case 9: //1001
        p0 = a;
        p1 = c;
        break;
      case 10: //1010
        p0 = d;
        p1 = a;
        p2 = b;
        p3 = c;
        break;
      case 11: //1011
        p0 = a;
        p1 = b;
        break;
      case 12: //1100
        p0 = d;
        p1 = b;
        break;
      case 13: //1101
        p0 = b;
        p1 = c;
        break;
      case 14: //1110
        p0 = d;
        p1 = c;
        break;
    }
    noFill();
    stroke(255, 100);
    strokeWeight(2);
    if (p0 && p1) {
      line(p0.x, p0.y, p1.x, p1.y);
    }
    if (p2 && p3) {
      line(p2.x, p2.y, p3.x, p3.y);
    }
  }
}

class cornerObject {
  constructor(i, j) {
    this.coord = createVector(i, j);
    const inc = 0.01;
    this.value = noise(this.coord.x * inc, this.coord.y * inc);
  }
  show() {
    noFill();
    stroke(this.value * 255, 255);
    strokeWeight(4);

    point(this.coord.x, this.coord.y);
  }
}