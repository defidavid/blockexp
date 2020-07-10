import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Web3 from 'web3';
import store from './createStore';
import { Provider } from 'react-redux';


// Add your token here to avoid throttling by infura
const PROJECT_ID = 'e1b4f6d9e6574eff98fa7c39fe5feeb5';

window.web3 = new Web3(new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/${PROJECT_ID}`));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
