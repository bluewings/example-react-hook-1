import { Map } from 'immutable';

const { getCards, getAnswers } = require('./set.core');

const initialState = Map({
  round: 0,
  cards: [],
  answers: {},
  scores: {},
});

function reducer(state = initialState, action) {
  const { type, userId, payload = {} } = action;
  switch (type) {
    case 'SETUP': {
      const { seed, reset } = payload;
      const cards = getCards(seed);
      const answers = getAnswers(cards);
      const nextState = state
        .set('round', state.get('round') + 1)
        .set('cards', cards)
        .set('answers', answers)
        .set('solved', []);
      return reset ? nextState.set('scores', {}).set('round', 0) : nextState;
    }

    case 'NO_SETS': {
      const answers = state.get('answers');
      let delta = 0;
      if (answers.length === 0) {
        delta = 3;
      } else {
        delta = -1;
      }
      return state
        .setIn(
          ['scores', userId], 
          (state.getIn(['scores', userId]) || 0) + delta,
        );
    }

    case 'SUBMIT_ANSWER': {
      const { answer } = payload;
      const answers = state.get('answers');

      if (answers.indexOf(answer) !== -1) {
        return state.set('answers', answers.filter(e => e !== answer))
          .set('solved', [...state.get('solved'), {
            userId,
            answer,
          }])
          .setIn(
            ['scores', userId], 
            (state.getIn(['scores', userId]) || 0) + 1,
          );
      } else if (typeof answers === 'undefined') {
        return state
          .setIn(
            ['scores', userId], 
            (state.getIn(['scores', userId]) || 0) - 1,
          );
      }


      return state;
    }

    default:
      return state;
  }
}

export default reducer;
