import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Web3 from 'web3';
import store from './createStore';
import { Provider } from 'react-redux';


// Add your token here to avoid throttling by infura
const INFURA_TOKEN = '';

window.web3 = new Web3(new Web3.providers.HttpProvider(`https://mainnet.infura.io/${INFURA_TOKEN}`));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
