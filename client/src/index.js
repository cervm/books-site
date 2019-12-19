import React from 'react';
import {render} from 'react-dom'
import App from './App';

import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk'

// Our reducer functions lives inside this module
import reducer from './reducers';

// Logging middleware for the store
const logger = store => next => action => {
    if (!action.type) {
        next(action);
        return;
    }
    console.group(action.type);
    console.info('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    console.groupEnd();
    return result
};

// Create the store with some initial data from a file
const store = createStore(
    reducer,
    applyMiddleware(logger, thunk)
);

render(
// Provide the store to all components from <App> and below
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
