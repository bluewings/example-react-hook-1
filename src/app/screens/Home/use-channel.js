import { useState, useMemo, useEffect, useReducer } from 'react';
import { Map } from 'immutable';
import entries from 'object.entries';

const { firebase } = window;

const initialState = Map({
  _users: [],
  _state: null,
});

const BATCH_ACTIONS = '__BATCH_ACTIONS__';
const USER_JOIN = '__USER_JOIN__';
const USER_LEAVE = '__USER_LEAVE__';

function useChannel(channel, reducer) {
  const [ready, setReady] = useState(false);
  const userId = useMemo(() => Math.random().toString(36).substr(-6), [null]);

  const localReducer = useMemo(() => (state, action) => {
    const { type, payload = {} } = action;
    const { userId } = payload;
    switch (type) {
      case USER_JOIN:
        return state.set('_users', [...state.get('_users'), { userId }]);
      case USER_LEAVE:
        return state.set('_users', state.get('_users').filter(user => user.userId !== userId));
      default:  
        return state.set('_state', reducer(state.get('_state'), action));
    }
  }, [reducer]);
  
  const rootReducer = useMemo(() => (state, action) => {
    const { type, payload } = action;
    switch (type) {
      case BATCH_ACTIONS:        
        return payload.reduce(localReducer, state);
      default:
        return localReducer(state, action);
    }
  }, [localReducer]);
  
  const [rootState, rootDispatch] = useReducer(rootReducer, initialState.set('_state', reducer(undefined, {})));
  
  const reset = () => {
    firebase.database().ref(channel).remove();
  };

  const dispatch = (type, payload = null) => {
    const newPostKey = firebase.database().ref(channel).push().key;
    firebase.database().ref().update({
      [`${channel}/${newPostKey}`]: { type, userId, userIndex, payload },
    });
  };

  useEffect(() => {
    dispatch(USER_JOIN, { userId });
    const userLeave = () => dispatch(USER_LEAVE, { userId });
    window.addEventListener('beforeunload', userLeave);
    return () => {
      userLeave();
      window.removeEventListener('beforeunload', userLeave);
    };
  }, [null]);

  useMemo(() => {
    firebase.database().ref(channel).once('value').then((snapshot) => {
      const initialData = snapshot.val() || {};
      const payload = entries(initialData).map(([, e]) => e);
      rootDispatch({ type: BATCH_ACTIONS, payload });
      setReady({ batchedKeys: Object.keys(initialData) });
    });
  }, [channel]);

  useEffect(() => {
    if (ready) {
      firebase.database().ref(channel).on('child_added', (snapshot) => {
        if (ready.batchedKeys.indexOf(snapshot.key) === -1) {
          rootDispatch(snapshot.val());
        }
      });
      return () => {
        firebase.database().ref(channel).off('child_added');
      };
    }
  }, [channel, ready]);

  const state = rootState.get('_state');
  const users = rootState.get('_users');
  const userIndex = users.findIndex(e => e.userId === userId);

  return { state, users, userId, userIndex, dispatch, reset };
}

export default useChannel;
