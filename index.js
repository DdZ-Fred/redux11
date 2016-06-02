import expect from 'expect';
import deepfreeze from 'deep-freeze';

// Reducer
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO': {
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false,
        },
      ];
    }
    default: {
      return state;
    }
  }
};

const testAddTodo = () => {
  const stateBefore = [];
  const action = {
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn redux',
  };
  const stateAfter = [
    {
      id: 0,
      text: 'Learn redux',
      completed: false,
    },
  ];

  deepfreeze(stateBefore);
  deepfreeze(action);

  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);
};

testAddTodo();
console.log('All tests passed');
