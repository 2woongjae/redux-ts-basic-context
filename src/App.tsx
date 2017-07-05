import * as React from 'react';
import './App.css';

import {Unsubscribe} from 'redux';
import {addAge} from './index';
import * as PropTypes from 'prop-types';

import Button from './Button';

const logo = require('./logo.svg');

class App extends React.Component<{}, {}> {
  // App.contextTypes 에 스토어를 받아오도록 정의해야 합니다.
  public static contextTypes = {
    store: PropTypes.object
  };

  private _unsubscribe: Unsubscribe;
  constructor(props: {}) {
    super(props);

    this._addAge = this._addAge.bind(this);
  }
  componentDidMount() {
    const store = this.context.store;
    this._unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }
  componentWillUnmount() {
    if (this._unsubscribe !== null) {
      this._unsubscribe();
    }
  }
  render() {
    const state = this.context.store.getState();
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          나이가 {state.age}
          <button onClick={this._addAge}>한해가 지났다.</button>
          <Button />
        </p>
      </div>
    );
  }
  private _addAge(): void {
    const store = this.context.store;
    const action = addAge();
    store.dispatch(action);
  }
}

export default App;
