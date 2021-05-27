import { DIE_SIDES } from "../constants.js";

/**
 *
 * @param {HTMLButtonElement} element
 */
export const dieFactory = (element) => {
  let keep = false;

  const die = { side: undefined };

  die.throw = () => {
    if (keep) return;
    die.side = Math.ceil(Math.random() * DIE_SIDES);
    element.innerHTML = `&#x268${die.side - 1};`;
  };

  die.reset = () => {
    die.side = undefined;
    keep = false;
    element.innerHTML = "";
  };

  element.onclick = () => {
    keep = !keep;
    element.classList.toggle("keep");
  };

  return die;
};
