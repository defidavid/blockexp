
import { handleActions } from 'redux-actions';
import { Record, Map } from 'immutable';
import * as ActionConstants from '../actions/actionConstants';

export const _getTransactions = state => state.transactions;

const InitialStateRecord = new Record({
    transactions: Map()
});

const TransactionRecord = Record({
    value: -1,
    input: '',
    gas: -1,
    gasPrice: -1,
    to: null
});

let reducers = {};

reducers[ActionConstants.TRANSACTION_LOADED] = (state, { payload }) => {
    return state.setIn(['transactions', payload.hash], new TransactionRecord({
        value: payload.value,
        input: payload.input,
        gas: payload.gas,
        gasPrice: payload.gasPrice,
        to: payload.to
    }));
};

export default handleActions(reducers, new InitialStateRecord());
