import { topScoreFactory } from "../factories/topScore.js";
import { countDice, createDice, throwDice } from "./dice.js";

let turn = 1;
let game = 1;

const scores = {
  1: {
    top: topScoreFactory(
      document.querySelectorAll(".game-1.upperscore"),
      document.querySelector(".game-1.upperscore.total")
    ),
    bottom: {},
  },
};

const throwButtonPressed = () => {
  if (turn >= 3) return;
  throwDice();
  turn++;

  const count = countDice();
  scores[game].top.calculateScores(count);
};

export const start = () => {
  createDice();

  document
    .getElementById("throw-button")
    .addEventListener("click", throwButtonPressed);
};
