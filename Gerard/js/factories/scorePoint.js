/**
 *
 * @param {HTMLTableCellElement} element
 */
export const scorePointFactory = (element, calculator) => {
  const scorePoint = {
    selected: false,
    keep: false,
    points: 0,
    keepScore: () => {},
    selectScore: () => {},
    deSelectScore: () => {},
    calculateScore: () => {},
  };

  scorePoint.keepScore = () => (scorePoint.keep = true);

  scorePoint.selectScore = () => {
    if (scorePoint.keep) return;
    scorePoint.selected = true;
    element.classList.add("selected");
  };

  scorePoint.deSelectScore = () => {
    if (scorePoint.keep) return;
    scorePoint.selected = false;
    element.classList.remove("selected");
  };

  scorePoint.calculateScore = (...args) => {
    if (scorePoint.keep) return;
    scorePoint.points = calculator(...args);
    element.innerHTML = scorePoint.points;
  };

  return scorePoint;
};
