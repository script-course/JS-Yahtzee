import { DIE_SIDES } from "../constants.js";
import { scorePointFactory } from "./scorePoint.js";

export const topScoreFactory = (elements, totalElement) => {
  const score = {
    points: [],
    total: 0,
    calculateScores: (counter) => {},
    keepScore: () => {},
  };

  for (let dieNr = 1; dieNr <= DIE_SIDES; dieNr++) {
    const element = elements[dieNr - 1];
    const scorePoint = scorePointFactory(
      element,
      (counter) => counter[dieNr] * dieNr
    );

    score.points.push(scorePoint);

    element.onclick = () => {
      for (const otherScorePoint of score.points) {
        otherScorePoint.deSelectScore();
      }
      scorePoint.selectScore();
    };
  }

  score.calculateScores = (counter) => {
    for (const scorePoint of score.points) {
      if (scorePoint.keep) continue;
      scorePoint.calculateScore(counter);
    }

    score.total = score.points.reduce(
      (acc, scorePoint) => acc + scorePoint.points,
      0
    );

    totalElement.innerHTML = score.total;
  };

  return score;
};
