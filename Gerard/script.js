const DIE_AMOUNT = 5;
const DIE_SIDES = 6;

/**
 *
 * @param {HTMLButtonElement} element
 */
const createDie = element => {
    let keep = false;

    const die = {side: undefined};

    die.throw = () => {
        if (keep) return;
        die.side = Math.ceil(Math.random() * DIE_SIDES);
        element.innerHTML = `&#x268${die.side - 1};`;
    };

    die.reset = () => {
        die.side = undefined;
        keep = false;
        element.innerHTML = '';
    };

    element.onclick = () => {
        keep = !keep;
        element.classList.toggle('keep');
    };

    return die;
};

// Setup
/** @type {HTMLButtonElement[]} */
const dieElements = document.getElementsByClassName('dice');
const dice = [];
for (let dieNr = 0; dieNr < DIE_AMOUNT; dieNr++) {
    dice.push(createDie(dieElements[dieNr]));
}

const countDice = () => {
    const count = {};

    // first we fill the count
    for (let dieSide = 1; dieSide <= DIE_SIDES; dieSide++) {
        count[dieSide] = 0;
    }

    for (const die of dice) count[die.side]++;

    return count;
};

let turn = 0;

const throwDice = () => {
    if (turn >= 3) return;
    for (const die of dice) die.throw();

    countDice();

    turn++;
};

document.getElementById('throw-button').addEventListener('click', throwDice);
