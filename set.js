
const { createStore } = require('redux');

const { getCards, getAnswers } = require('./set.core');


const initialState = {}

function counter(state = initialState, action) {
  switch (action.type) {
    case 'SETUP':
    const cards = getCards();
    const answers = getAnswers(cards);
    console.log('>>>')
    return {
      ...state,
      cards,
      answers
    }
      // return;
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}


let store = createStore(counter)
store.subscribe(() => console.log(store.getState()))
store.dispatch({ type: 'SETUP' })
// store.dispatch({ type: 'INCREMENT' })
// store.dispatch({ type: 'DECREMENT' })
