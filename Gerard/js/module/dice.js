import { DIE_AMOUNT, DIE_SIDES } from "../constants.js";
import { dieFactory } from "../factories/die.js";

const dice = [];

export const createDice = () => {
  /** @type {HTMLButtonElement[]} */
  const dieElements = document.getElementsByClassName("dice");
  for (let dieNr = 0; dieNr < DIE_AMOUNT; dieNr++) {
    dice.push(dieFactory(dieElements[dieNr]));
  }
};

export const countDice = () => {
  const count = {};

  // first we fill the count
  for (let dieSide = 1; dieSide <= DIE_SIDES; dieSide++) {
    count[dieSide] = 0;
  }

  for (const die of dice) count[die.side]++;

  return count;
};

export const throwDice = () => {
  for (const die of dice) die.throw();
};
