// TODO:
// * Push to github
// * Add name and source code
// * Submit for review
// * Make the neccessary changes (if any)
// * Deploy to netlify

//#region Variables

//Positive modal
let posMod = document.querySelector(".positive-modal");
let pX = 0;
let pY = 0;

//Negative modal
let negMod = document.querySelector(".negative-modal");
let nX = 0;
let nY = 0;

// Dice
let rolledNum = 0;
let rolledNumOrders = [
  [1, 2, 1, 3, 2, 2, 1, 2, 1, 1, 1, 2],
  [2, 3, 1, 2, 2, 3, 2, 3, 2, 6, 2, 1, 1, 6, 2, 1, 2, 1, 1, 1, 2, 1, 6, 1, 2],
  [5, 2, 5, 5, 2, 2, 2, 5, 1, 1, 1, 3, 5, 2, 1, 1, 1, 6, 1, 6, 3],
];
let randI = Math.floor(Math.random() * 3);
let pickedRollNumOrd = rolledNumOrders[randI];
let num = document.querySelector(".num");
let i = 0;

// Grid
let g = document.querySelector(".grid");
let d = false;

// Numbers
let n = document.querySelector(".numbers");

//Player
let playerDiv = document.querySelector(".player");
let playerX = 0;
let playerY = 9;
let flip = false;
let gameOver = false;
let winModal = document.querySelector(".win-modal");

//#endregion

//#region Utils

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function move(x, y) {
  playerX = x;
  playerY = y;

  playerDiv.style.transform = `translate(${playerX * 100 * 2}%, ${
    playerY * 100 * 2
  }%)`;
}

//#endregion

//#region Dice

function roll() {
  rolledNum = pickedRollNumOrd[i];
  num.innerHTML = rolledNum;

  if (i < pickedRollNumOrd.length - 1) {
    i++;
  }

  player();
}

//#endregion

//#region Grid

function createGrid() {
  for (let i = 0; i < 100; i++) {
    let b = document.createElement("div");
    g.appendChild(b);

    if (i % 10 != 0) {
      d = !d;
    }

    b.className = d == false ? "lg" : "dg";
  }
}

createGrid();

//#endregion

//#region Numbers

function addNumbers() {
  //Row 1
  for (let i = -100; i < -90; i++) {
    let p = document.createElement("p");
    p.innerHTML = Math.abs(i);
    n.appendChild(p);
  }

  //Row 2
  for (let i = 81; i < 91; i++) {
    let p = document.createElement("p");
    p.innerHTML = Math.abs(i);
    n.appendChild(p);
  }

  //Row 3
  for (let i = -80; i < -70; i++) {
    let p = document.createElement("p");
    p.innerHTML = Math.abs(i);
    n.appendChild(p);
  }

  //Row 4
  for (let i = 61; i < 71; i++) {
    let p = document.createElement("p");
    p.innerHTML = Math.abs(i);
    n.appendChild(p);
  }

  //Row 5
  for (let i = -60; i < -50; i++) {
    let p = document.createElement("p");
    p.innerHTML = Math.abs(i);
    n.appendChild(p);
  }

  //Row 6
  for (let i = 41; i < 51; i++) {
    let p = document.createElement("p");
    p.innerHTML = Math.abs(i);
    n.appendChild(p);
  }

  //Row 7
  for (let i = -40; i < -30; i++) {
    let p = document.createElement("p");
    p.innerHTML = Math.abs(i);
    n.appendChild(p);
  }

  //Row 8
  for (let i = 21; i < 31; i++) {
    let p = document.createElement("p");
    p.innerHTML = Math.abs(i);
    n.appendChild(p);
  }

  //Row 9
  for (let i = -20; i < -10; i++) {
    let p = document.createElement("p");
    p.innerHTML = Math.abs(i);
    n.appendChild(p);
  }

  //Row 10
  for (let i = 1; i - 11; i++) {
    let p = document.createElement("p");
    p.innerHTML = Math.abs(i);
    n.appendChild(p);
  }
}

addNumbers();

//#endregion

//#region Player

async function endGame() {
  await sleep(600);
  winModal.classList.remove("hidden");
  winModal.classList.add("visible");
}

async function player() {
  if (playerX < 9 && flip == false && gameOver == false) {
    playerX += rolledNum;
  } else if (playerX >= 9 && flip == false && gameOver == false) {
    flip = true;
    playerY -= 1;
  } else if (flip == true && gameOver == false) {
    playerX -= rolledNum;
  }

  if (playerX < 0 && flip == true && gameOver == false) {
    flip = false;
    playerY -= 1;
  }

  if (playerX < 0) playerX = 0;

  if (playerX == 0 && playerY == 0) {
    gameOver = true;
    endGame();
  }

  playerDiv.style.transform = `translate(${playerX * 100 * 2}%, ${
    playerY * 100 * 2
  }%)`;

  //#region Ladders

  // * 2 --> 38
  if (playerX == 1 && playerY == 9) {
    flip = true;
    displayPositiveNews(2, 6);
  }

  // * 28 --> 84
  else if (playerX == 7 && playerY == 7) {
    displayPositiveNews(3, 1);
  }

  // * 87 --> 94
  else if (playerX == 6 && playerY == 1) {
    displayPositiveNews(6, 0);
    flip = true;
  }

  // * 78 --> 98
  else if (playerX == 2 && playerY == 2) {
    displayPositiveNews(2, 0);
  }

  // * 7 --> 14
  else if (playerX == 6 && playerY == 9) {
    displayPositiveNews(6, 8);
    flip = true;
  }

  // * 8 --> 31
  else if (playerX == 7 && playerY == 9) {
    displayPositiveNews(9, 6);
    flip = true;
  }

  // * 21 --> 42
  else if (playerX == 0 && playerY == 7) {
    displayPositiveNews(1, 5);
  }

  // * 51 --> 67
  else if (playerX == 9 && playerY == 4) {
    flip = false;
    displayPositiveNews(6, 3);
  }

  // * 71 --> 91
  else if (playerX == 9 && playerY == 2) {
    displayPositiveNews(9, 0);
  }

  // * 36 --> 44
  else if (playerX == 4 && playerY == 6) {
    displayPositiveNews(3, 5);
    flip = false;
  }

  // 15 --> 26
  else if (playerX == 5 && playerY == 8) {
    displayPositiveNews(5, 7);
    flip = false;
  }

  //#endregion

  //#region Snakes

  //  * 46 --> 25
  if (playerX == 5 && playerY == 5) {
    displayNegativeNews(4, 7);
  }

  // * 95 --> 75
  else if (playerX == 5 && playerY == 0) {
    displayNegativeNews(5, 2);
  }

  // * 16 --> 6
  else if (playerX == 4 && playerY == 8) {
    displayNegativeNews(5, 9);
    flip = false;
  }

  // * 49 --> 11
  else if (playerX == 8 && playerY == 5) {
    displayNegativeNews(9, 8);
    flip = true;
  }

  // * 92 --> 88
  else if (playerX == 8 && playerY == 0) {
    displayNegativeNews(7, 1);
    flip = false;
  }

  // 62 --> 19
  else if (playerX == 1 && playerY == 3) {
    displayNegativeNews(1, 8);
  }

  // 64 --> 60
  else if (playerX == 3 && playerY == 3) {
    displayNegativeNews(0, 4);
  }

  // 74 --> 53
  else if (playerX == 6 && playerY == 2) {
    displayNegativeNews(7, 4);
  }

  // 89 --> 68
  else if (playerX == 8 && playerY == 1) {
    displayNegativeNews(7, 3);
  }

  // 99 --> 80
  else if (playerX == 1 && playerY == 0) {
    displayNegativeNews(0, 2);
  }

  //#endregion
}

player();

//#endregion

//#region Modal

// Positive
async function displayPositiveNews(x, y) {
  await sleep(500);
  posMod.classList.remove("hidden");
  posMod.classList.add("visible");
  pX = x;
  pY = y;
}

function closePositiveNews() {
  posMod.classList.remove("visible");
  posMod.classList.add("hidden");
  move(pX, pY);
}

// Negative
async function displayNegativeNews(x, y) {
  await sleep(500);
  negMod.classList.remove("hidden");
  negMod.classList.add("visible");
  nX = x;
  nY = y;
}

function closeNegativeNews() {
  negMod.classList.remove("visible");
  negMod.classList.add("hidden");
  move(nX, nY);
}

//#endregion

//#region Reset 

function reset() {
  // Modal
  winModal.classList.remove("visible");
  winModal.classList.add("hidden");

  // Player
  move(0, 9);
  flip = false;
  gameOver = false;

  // Dice
  rolledNum = 0;
  rolledNumOrders = [
    [1, 2, 1, 3, 2, 2, 1, 2, 1, 1, 1, 2],
    [2, 3, 1, 2, 2, 3, 2, 3, 2, 6, 2, 1, 1, 6, 2, 1, 2, 1, 1, 1, 2, 1, 6, 1, 2],
    [5, 2, 5, 5, 2, 2, 2, 5, 1, 1, 1, 3, 5, 2, 1, 1, 1, 6, 1, 6, 3],
  ];
  randI = Math.floor(Math.random() * 3);
  pickedRollNumOrd = rolledNumOrders[randI];
  num = document.querySelector(".num");
  i = 0;
}

//#endregion