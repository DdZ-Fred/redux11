import expect from 'expect';
import deepfreeze from 'deep-freeze';
import { createStore } from 'redux';

// Todo reducer
const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO': {
      return {
        id: action.id,
        text: action.text,
        completed: false,
      };
    }
    case 'TOGGLE_TODO': {
      if (state.id !== action.id) {
        return state;
      }
      return Object.assign({}, state, {
        completed: !state.completed,
      });
    }
    default: {
      return state;
    }

  }
};

// Todos reducer
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO': {
      return [
        ...state,
        todo(undefined, action),
      ];
    }
    case 'TOGGLE_TODO': {
      return state.map(t => todo(t, action));
    }
    default: {
      return state;
    }
  }
};

// visibilityFilter reducer
const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER': {
      return action.filter;
    }
    default: {
      return state;
    }
  }
};
// App reducer
const todoApp = (state = {}, action) => {
  return {
    todos: todos(state.todos, action),
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
  };
};

// const testAddTodo = () => {
//   const stateBefore = [];
//   const action = {
//     type: 'ADD_TODO',
//     id: 0,
//     text: 'Learn redux',
//   };
//   const stateAfter = [
//     {
//       id: 0,
//       text: 'Learn redux',
//       completed: false,
//     },
//   ];
//
//   deepfreeze(stateBefore);
//   deepfreeze(action);
//
//   expect(
//     todos(stateBefore, action)
//   ).toEqual(stateAfter);
// };
// const testToggleTodo = () => {
//   const stateBefore = [
//     {
//       id: 0,
//       text: 'Learn Redux',
//       completed: false,
//     },
//     {
//       id: 1,
//       text: 'Go shopping',
//       completed: false,
//     },
//   ];
//   const action = {
//     type: 'TOGGLE_TODO',
//     id: 1,
//   };
//   const stateAfter = [
//     {
//       id: 0,
//       text: 'Learn Redux',
//       completed: false,
//     },
//     {
//       id: 1,
//       text: 'Go shopping',
//       completed: true,
//     },
//   ];
//
//   deepfreeze(stateBefore);
//   deepfreeze(action);
//
//   expect(
//     todos(stateBefore, action)
//   ).toEqual(stateAfter);
// };
// testAddTodo();
// testToggleTodo();
// console.log('All tests passed');
//
const store = createStore(todoApp);

console.log('Initial state:');
console.log(store.getState());
console.log('----------------------');

console.log('Dispatching ADD_TODO');
store.dispatch({
  type: 'ADD_TODO',
  id: 0,
  text: 'Learn Redux',
});
console.log('New state:');
console.log(store.getState());
console.log('----------------------');

console.log('Dispatching TOGGLE_TODO');
store.dispatch({
  type: 'TOGGLE_TODO',
  id: 0,
});
console.log('New state:');
console.log(store.getState());
console.log('----------------------');

console.log('Dispatching ADD_TODO');
store.dispatch({
  type: 'ADD_TODO',
  id: 1,
  text: 'ANOTHER ONE',
});
console.log('New state:');
console.log(store.getState());
console.log('----------------------');

console.log('Dispatching SET_VISIBILITY_FILTER');
store.dispatch({
  type: 'SET_VISIBILITY_FILTER',
  filter: 'SHOW_COMPLETED',
});
console.log('New state:');
console.log(store.getState());
