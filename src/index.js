
import {Switch, Redirect, Route, BrowserRouter} from 'react-router-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import React, { Component } from "react";
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';

import styles from  './styles/app.css';


const store = createStore(combineReducers(reducers), applyMiddleware(thunk));


class App extends Component {

    render() {
        return (
            <div className={ styles.app }>
                <div className={ styles.container }>
                    <Switch>
                    </Switch> 
                </div>
            </div>
        );
    }
}

export default App;

ReactDOM.render(
    <Provider  store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>, document.getElementById('root'));
