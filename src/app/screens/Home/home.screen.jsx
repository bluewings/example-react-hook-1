import { useEffect, useMemo, useCallback, useState, useReducer, useRef } from 'react';
// import { createStore } from 'redux';
import entries from 'object.entries';
import useChannel from './use-channel';
import { useClientRect } from 'hooks';
import { default as testa } from '../../shared/styles/variables';
import setReducer from 'games/set/set.reducer';
import { getAttrFromClosest } from 'helpers/util';
import emoji from './emoji';

// jsx
import template from './home.screen.pug';
import { primary } from './home.screen.scss';

console.log(primary);
console.log(testa);

function useSize () {
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  })

  const handleResize = () => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    })
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })

  return size;
}

function Home() {
  const [answer, setAnswer] = useState([]);

  const size = useSize();

  const { state, users, userId, userIndex, dispatch, reset } = useChannel('channel', setReducer);

  const inputEl = useRef();

  const handleClearAllClick = () => {
    reset();
  }

  const handleClearPClick = () => {
    dispatch('clearMessage')
  }

  const handleAddClick = () => {
    dispatch('SETUP', {
      seed: Math.random().toString(36).substr(-8)
    })
  }

  const handleResetClick = () => {
    dispatch('SETUP', {
      seed: Math.random().toString(36).substr(-8),
      reset: true,
    })
  }

  const handleNoMatchClick = () => {
    dispatch('NO_SETS')
  }

  const handleCardClick = (event) => {
    // event.stopPropagation();
    const cardNum = parseInt(getAttrFromClosest(event.target, 'data-card-num'), 10);
    // alert(cardNum);
    let nextAnswer = [...answer];
    if (nextAnswer.indexOf(cardNum) === -1) {
      nextAnswer = [...nextAnswer, cardNum].sort();
    } else {
      nextAnswer = nextAnswer.filter(e => e !== cardNum);
    }
    if (nextAnswer.length === 3) {
      dispatch('SUBMIT_ANSWER', {
        answer: nextAnswer.join('')
      })
      // 정답 제출
      nextAnswer = [];
    }
    setAnswer(nextAnswer);



  }



  const handleClickCancel = (event) => {
    event.preventDefault();
    event.stopProgation();
  }

  const cards = state.get('cards');
  const answers = state.get('answers');
  const solved = state.get('solved');
  const scores = state.get('scores') || {};
  const round = state.get('round');


  useMemo(() => {
    // alert('reset answer')
    setAnswer([]);
  }, [round])

  const _users = users.map(user => {
    return {
      ...user,
      score: scores[user.userId] || 0,
    }
  })

  console.log('%c render ', 'background:red;color:#fff');

  const _shapes = {
    triangle: 'spade',
    square: 'diamond',
    circle: 'heart',
  }
  const shapes = useMemo(() => {

    return cards.map((e, i) => {

      return {
        ...e,
        shape: _shapes[e.shape],
        path: {
          edge: {
            x: (i % 3) * 140 + 20,
            y: Math.floor(i / 3) * 140 + 20,
          }
        }
      }
    });
  }, [cards]);

  var fixedH = 500;

  const _size = {
    width: size.width * fixedH / size.height,
    height: fixedH
  }

  const handleCarzClick = () => {
    alert('click');
  }

  return template({
    // variables
    answer,
    unused_answers: answers,
    unused_cards: cards,
    emoji,
    handleAddClick,
    handleCardClick,
    unused_handleCarzClick: handleCarzClick,
    handleClearAllClick,
    unused_handleClearPClick: handleClearPClick,
    handleClickCancel,
    handleNoMatchClick,
    handleResetClick,
    unused_inputEl: inputEl,
    round,
    unused_sKey: JSON.stringify(size),
    unused_scores: scores,
    shapes,
    size: _size,
    solved,
    unused_state: state,
    userId,
    userId,
    unused_userIndex: userIndex,
    users: _users,
  });
}

export default Home;
