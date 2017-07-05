import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';

// yarn add redux @types/redux
import {createStore, Store} from 'redux';
import * as PropTypes from 'prop-types';

// 타입 정의
const ADD_AGE = 'ADD_AGE';

// 타입 생성 함수
export function addAge(): { type: string; } {
  return {
    type: ADD_AGE
  };
}

// 리듀서
function ageApp(state: { age: number; } = {age: 35}, action: { type: string; }): { age: number; } {
  if (action.type === ADD_AGE) {
    return {age: state.age + 1};
  }
  return state;
}

// 스토어 만들기
const store = createStore<{ age: number; }>(ageApp);

// Provider 만들기
class Provider extends React.Component<{ store: Store<{ age: number; }>; children: JSX.Element; }, {}> {
  public static childContextTypes = {
    store: PropTypes.object // React.PropTypes.object
  };
  getChildContext() {
    return {
      store: this.props.store
    }; 
  }
  render() {
    return this.props.children;
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);