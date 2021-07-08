const btnTrowDices = document.getElementById("btnTrowDices");
const dicesOutput = document.getElementById("dicesOutput");
const diceCountTableCells = document.getElementsByClassName("scoreTableCell");
const scoreTable = document.getElementById("scoreTable");
const combinationNames = [
  { name: "Ones", class: "SingleNumber" },
  { name: "Twos", class: "SingleNumber" },
  { name: "Threes", class: "SingleNumber" },
  { name: "Fours", class: "SingleNumber" },
  { name: "Fives", class: "SingleNumber" },
  { name: "Sixes", class: "SingleNumber" },
  { name: "Three of a kind", class: "ThreeOfAKind" },
  { name: "Four of a kind", class: "FourOfAKind" },
  { name: "Full House", class: "FullHouse" },
];

let dices = [];
let diceCounter = {};

function Combination(name) {
  this.score = 0;

  let row = scoreTable.insertRow(-1);
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  cell1.innerHTML = name;
  cell2.innerHTML = this.score;
  cell2.classList.add("scoreTableCell");

  this.outputCell = cell2;
}

Combination.prototype.updateScore = function () {
  this.score = this.outputCell.innerHTML = this.calculateScore();
};

Combination.prototype.getDicesSum = function () {
  return dices.reduce((total, number) => {
    return total + number;
  });
};

// extends Combination
function SingleNumber(name) {
  Combination.call(this, name);
  this.number = 1 + SingleNumber.instanceCount++;
}

SingleNumber.instanceCount = 0;

SingleNumber.prototype = Object.create(Combination.prototype);

SingleNumber.prototype.calculateScore = function () {
  return dices.filter((x) => x === this.number).length * this.number;
};

// extends Combination
function ThreeOfAKind(name) {
  Combination.call(this, name);
}

ThreeOfAKind.prototype = Object.create(Combination.prototype);

ThreeOfAKind.prototype.calculateScore = function () {
  if (Object.values(diceCounter).find((number) => number >= 3) !== undefined) {
    return this.getDicesSum();
  } else {
    return 0;
  }
};

// extends Combination
function FourOfAKind(name) {
  Combination.call(this, name);
}

FourOfAKind.prototype = Object.create(Combination.prototype);

FourOfAKind.prototype.calculateScore = function () {
  if (Object.values(diceCounter).find((number) => number >= 4) !== undefined) {
    return this.getDicesSum();
  } else {
    return 0;
  }
};

// extends Combination
function FullHouse(name) {
  Combination.call(this, name);
}

FullHouse.prototype = Object.create(Combination.prototype);

FullHouse.prototype.calculateScore = function () {
  if (Object.values(diceCounter).sort().toString() === [2, 3].toString()) {
    return this.getDicesSum();
  } else {
    return 0;
  }
};

function Game() {
  this.combinations = [];

  combinationNames.forEach((combination) => {
    this.combinations.push(
      new window[combination["class"]](combination["name"])
    );
  });
}

Game.prototype.playTurn = function () {
  this.throwDices();
  this.updateScoreTable();
};

Game.prototype.throwDices = function () {
  diceCounter = {};

  dices = Array(5)
    .fill()
    .map(() => {
      const randomDice = ~~(Math.random() * 6) + 1;
      diceCounter[randomDice] = ++diceCounter[randomDice] || 1;
      return randomDice;
    });

  dicesOutput.innerHTML = dices.sort();
};

Game.prototype.updateScoreTable = function () {
  this.combinations.forEach((combination) => {
    combination.updateScore();
  });
};

(function () {
  let game = new Game();

  btnTrowDices.addEventListener("click", () => {
    game.playTurn();
  });
})();
