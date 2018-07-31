// @flow

import { handleActions } from 'redux-actions';
import { Record, Map } from 'immutable';
import * as ActionConstants from '../actions/actionConstants';

export class TransactionRecord extends Record({
    value: -1,
    input: '',
    gas: -1,
    gasPrice: -1,
    to: null
}) {
    value: number;
    input: string;
    gas: number;
    gasPrice: number;
    to: string;
}
export class TransactionsStateRecord extends Record({
    transactions: Map()
}) {
    transactions: Map<string, TransactionRecord>
}

export const _getTransactions = (state: TransactionsStateRecord) => state.transactions;

let reducers = {};

reducers[ActionConstants.TRANSACTION_LOADED] = (state: TransactionsStateRecord, { payload }) => {
    return state.setIn(['transactions', payload.hash], new TransactionRecord({
        value: payload.value,
        input: payload.input,
        gas: payload.gas,
        gasPrice: payload.gasPrice,
        to: payload.to
    }));
};

export default handleActions(reducers, new TransactionsStateRecord());
