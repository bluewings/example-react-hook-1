const _ = require('lodash');
const shuffle = require('knuth-shuffle-seeded');

const SHAPES = ['square', 'triangle', 'circle'];
const COLORS = ['yellow', 'green', 'red'];
const BG_COLORS = ['black', 'grey', 'white'];

const getAnswers = (cards) => {
  let answers = []
  for (let i = 0; i < cards.length - 2; i++) {
    for (let j = i + 1; j < cards.length - 1; j++) {
      for (let k = j + 1; k < cards.length; k++) {      
        const shapes = _.uniq([cards[i].shape, cards[j].shape, cards[k].shape]).length
        const colors = _.uniq([cards[i].color, cards[j].color, cards[k].color]).length
        const bgColors = _.uniq([cards[i].bgColor, cards[j].bgColor, cards[k].bgColor]).length
        if ([1, SHAPES.length].indexOf(shapes) !== -1 &&
        [1, COLORS.length].indexOf(colors) !== -1 &&
        [1, BG_COLORS.length].indexOf(bgColors) !== -1) {
          answers = [...answers, [i + 1, j + 1, k + 1]]
        }
      }
    }
  }
  return answers;
}

const getCards = (seed, count = 9) => {
  const allCards =
  SHAPES.reduce((prev1, shape) =>
    COLORS.reduce((prev2, color) =>
      BG_COLORS.reduce((prev3, bgColor) => [
        ...prev3, { shape, color, bgColor },
      ], prev2), prev1), []);

  const picked = shuffle(allCards, seed).slice(0, count);
  return picked;
}

module.exports.getCards = getCards;
module.exports.getAnswers = getAnswers;
