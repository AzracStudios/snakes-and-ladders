// TODO:
// * Push to github
// * Add name and source code
// * Submit for review
// * Make the necessary changes (if any)
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

let snakes = 0;
let ladders = 0;

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
    displayPositiveNews(2, 6, 0);
  }

  // * 28 --> 84
  else if (playerX == 7 && playerY == 7) {
    displayPositiveNews(3, 1, 1);
  }

  // * 87 --> 94
  else if (playerX == 6 && playerY == 1) {
    displayPositiveNews(6, 0, 2);
    flip = true;
  }

  // * 78 --> 98
  else if (playerX == 2 && playerY == 2) {
    displayPositiveNews(2, 0, 3);
  }

  // * 7 --> 14
  else if (playerX == 6 && playerY == 9) {
    displayPositiveNews(6, 8, 4);
    flip = true;
  }

  // * 8 --> 31
  else if (playerX == 7 && playerY == 9) {
    displayPositiveNews(9, 6, 5);
    flip = true;
  }

  // * 21 --> 42
  else if (playerX == 0 && playerY == 7) {
    displayPositiveNews(1, 5, 6);
  }

  // * 51 --> 67
  else if (playerX == 9 && playerY == 4) {
    flip = false;
    displayPositiveNews(6, 3, 7);
  }

  // * 71 --> 91
  else if (playerX == 9 && playerY == 2) {
    displayPositiveNews(9, 0, 8);
  }

  // * 36 --> 44
  else if (playerX == 4 && playerY == 6) {
    displayPositiveNews(3, 5, 9);
    flip = false;
  }

  // 15 --> 26
  else if (playerX == 5 && playerY == 8) {
    displayPositiveNews(5, 7, 10);
    flip = false;
  }

  //#endregion

  //#region Snakes

  //  * 46 --> 25
  if (playerX == 5 && playerY == 5) {
    displayNegativeNews(4, 7, 0);
  }

  // * 95 --> 75
  else if (playerX == 5 && playerY == 0) {
    displayNegativeNews(5, 2, 1);
  }

  // * 16 --> 6
  else if (playerX == 4 && playerY == 8) {
    displayNegativeNews(5, 9, 2);
    flip = false;
  }

  // * 49 --> 11
  else if (playerX == 8 && playerY == 5) {
    displayNegativeNews(9, 8, 3);
    flip = true;
  }

  // * 92 --> 88
  else if (playerX == 8 && playerY == 0) {
    displayNegativeNews(7, 1, 4);
    flip = false;
  }

  // 62 --> 19
  else if (playerX == 1 && playerY == 3) {
    displayNegativeNews(1, 8, 5);
  }

  // 64 --> 60
  else if (playerX == 3 && playerY == 3) {
    displayNegativeNews(0, 4, 6);
  }

  // 74 --> 53
  else if (playerX == 6 && playerY == 2) {
    displayNegativeNews(7, 4, 7);
  }

  // 89 --> 68
  else if (playerX == 8 && playerY == 1) {
    displayNegativeNews(7, 3, 8);
  }

  // 99 --> 80
  else if (playerX == 1 && playerY == 0) {
    displayNegativeNews(0, 2, 9);
  }

  //#endregion
}

player();

//#endregion

let positive = [
  [
    "After 13 years of playing it cool, two giant pandas at the Ocean Park Zoo in Hong Kong have finally made a move. Conservationists couldn’t be happier. It seems that perhaps all the pair needed was a bit of privacy to mate, as the zoo closed to the public due to the pandemic. We’ll keep our fingers crossed for the patter of tiny paws soon...",
    "Nearly 4 million books were sold the first week that shops reopened from lockdown in England. These sales had a value of nearly £33 million, and was a 31% increase in volume and value compared to the same week in 2019!",
    "Renewable electricity exceeded fossil fuel generation during the first half of 2020! Fossil fuel use fell by 18%, and renewable energy increased by 11%, too.",
    "Google has launched a new hum-to-search feature allowing you to whistle, sing or hum to discover the song.",
  ],
  [
    "Kamala Harris made history as the first woman Vice President of the United States",
    "There’s been positive news for conservationists. As critically endangered blue whales have been spotted in ‘unprecedented numbers’ around Antarctica.",
    "Pulwama district in Kashmir is soon to be called the pencil district of the country as it produces more than 70 per cent slats for making pencils in the country. 'Before the 90's the companies used to get the wood from China, Germany etc. Then they started taking the wood from here.",
    "Scientist develops decomposer capsules to tackle stubble burning. The Indian Agricultural Research Institute (IARI) sprayed the “Pusa De-composer” solution last month in order to prevent stubble burning in Delhi. Shukla told The Sunday Guardian, 'We started working on this decomposer in 2010.'",
    "Kabini Wildlife Sanctuary along the river Kabini is the best wildlife destination in Karnataka, The river separates the Bandipur National Park and Nagarhole National Park. The sanctuary is home to rare species of leopard known as Black panther also known as the Ghost of Kabini.",
    "85-year-old K Kamalathal from Tamil Nadu is selling idlis for just Re 1 from the last 30 years, and despite the lockdown, when most of the people are experiencing losses in their businesses, the old lady continues to provide idlis at a mere Re. 1 so that migrants labourers who are stuck can avail the food.",
  ],
  [
    "The development comes at a time when doctors, medics across the country have been infected with Covid-19 while screening patients, resulting in shutting of hospitals. At the Fortis Hospital in Bengaluru, Karnataka, robots will now do the initial screening work, which was earlier done by doctors. Mitra and Mitri robots screen people who came to the hospital for Covid-19 check-ups.",
    "After 13 years of playing it cool, two giant pandas at the Ocean Park Zoo in Hong Kong have finally made a move. Conservationists couldn’t be happier. It seems that perhaps all the pair needed was a bit of privacy to mate, as the zoo closed to the public due to the pandemic. We’ll keep our fingers crossed for the patter of tiny paws soon...",
    "Pulwama district in Kashmir is soon to be called the pencil district of the country as it produces more than 70 per cent slats for making pencils in the country. 'Before the 90's the companies used to get the wood from China, Germany etc. Then they started taking the wood from here.",
    "85-year-old K Kamalathal from Tamil Nadu is selling idlis for just Re 1 from the last 30 years, and despite the lockdown, when most of the people are experiencing losses in their businesses, the old lady continues to provide idlis at a mere Re. 1 so that migrants labourers who are stuck can avail the food.",
    "Nearly 4 million books were sold the first week that shops reopened from lockdown in England. These sales had a value of nearly £33 million, and was a 31% increase in volume and value compared to the same week in 2019!",
  ],
];

let negative = [
  [
    "One of India's greatest athletes, Milkha Singh, has died from Covid-related complications, aged 91",
    "Famous Tamil veteran Actor Vivek passed away due to heart complications",
  ],
  [
    "Coral reefs harbour the highest biodiversity of any ecosystem globally and directly support over 500 million people worldwide, mostly in poor countries. They are among the most threatened ecosystems on Earth, largely due to unprecedented global warming and climate changes, combined with growing local pressures.",
    "Researchers say that corona considered to be as world's second largest virus disease which heads towards Number 1 position in the next few months ",
    "Complications in the eyes seen a far most used complaint in the eye hospital around India with students due to continuos use of digital media for online classes",
  ],
  [
    "Chinese scientists have set a new world record of achieving a plasma temperature of 120 million degrees Celsius for 101 seconds in the latest experiment on Friday, a key step toward the test running of a fusion reactor. The breakthrough was announced by Gong Xianzu, a researcher at the Institute of Plasma Physics of the Chinese Academy of Sciences (ASIPP), who is in charge of the experiment conducted in Hefei, capital of east China's Anhui Province.",
    "North Korea is facing a severe food crisis with prices of essential commodities shooting through the roof. Prices of essential food items have skyrocketed in country's capital Pyongyang, with a kg of bananas selling for $45, a packet of black tea for $70 and a packet of coffee for $100.",
    "China's plan to acquire the parts of Indian Ocean by taking over the projects of Sri Lankan port city developement. This makes  India pay high tax while passing the Sri  Lankan ports."
  ],
];
let pI = 0;
let nI = 0;

//#region Modal

// Positive

async function displayPositiveNews(x, y) {
  await sleep(500);
  posMod.classList.remove("hidden");
  posMod.classList.add("visible");
  let posContent = document.querySelector(".pos");
  posContent.innerText = positive[randI][pI];
  pX = x;
  pY = y;
  console.log(pI, randI, positive.length);
  let check =
    pI <= positive[randI].length - 1 ? pI++ : (pI = positive[randI].length - 1);

  ladders++;
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
  let negContent = document.querySelector(".neg");
  negContent.innerText = negative[randI][nI];
  nX = x;
  nY = y;
  let check =
    nI <= negative[randI].length ? nI++ : (nI = negative[randI].length);
  snakes++;
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

  console.log(ladders, snakes);

  // Player
  move(0, 9);
  flip = false;
  gameOver = false;
  pI = 0;
  nI = 0;
  snakes = 0;
  ladders = 0;

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
