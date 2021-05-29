import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


//#region Roucoz Added for Redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import allreducers from './components/_redux/reducers/combineReducers';
const store = createStore(allreducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
//to import only one reducer --take replace by bellow 2 lines
//import reducer from './components/_redux/reducers/counter'
//const store = createStore(reducer);
//#endregion


ReactDOM.render(
    <React.StrictMode>
        {/*Provider here added by Roucoz For redux Store*/}
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);


//#region Original File
//ReactDOM.render(
//  <React.StrictMode>
//    <App />
//  </React.StrictMode>,
//  document.getElementById('root')
//);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//#endregion
reportWebVitals();
