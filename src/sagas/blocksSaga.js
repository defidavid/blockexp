// @flow

import { takeEvery, put, select, fork, call, take } from 'redux-saga/effects';
import * as ActionConstants from '../actions/actionConstants';
import {
    getBlockTransactions as getBlockTransactionsAction,
    blockLoaded
} from '../actions/blockActions';
import { getOldestBlock, getBlock } from '../reducers/index';
import { fetchBlock } from '../apis/blocksApi';

const MAX_BLOCKS_HISTORY = 50;

function* getBlockTransactionsHelper(blockHash) {
    yield put(getBlockTransactionsAction(blockHash))
}

function* getBlockTransactions(action) {
    const blockHeader = action.payload;
    try {
        yield fork(getBlockTransactionsHelper, blockHeader.hash);
    } catch(error) {
        console.log(error);
    }
}

function* getPreviousBlock(blockHash) {
    try {
        const blockHeader = yield call((() => fetchBlock(blockHash)));
        if (!blockHeader) throw new Error('Did not return block header');
        yield put(blockLoaded(blockHeader));
        yield put({ type: ActionConstants.BLOCK_PREVIOUS_LOADED, payload: blockHeader.hash });
    } catch(err) {
        console.log(err);
        yield fork(getPreviousBlock, blockHash);
    }
}

export function* blockTransactionsSaga(): Generator<any, any, any> {
    yield takeEvery(ActionConstants.BLOCK_LOADED, getBlockTransactions);
}

export function* previousBlocksSaga(): Generator<any, any, any> {
    let numHistoricBlocks = 0;
    while (MAX_BLOCKS_HISTORY > numHistoricBlocks) {
        const action = yield take(ActionConstants.BLOCK_TXS_COMPLETED, getPreviousBlock);
        const state = yield (select());
        const currentOldestBlock = getOldestBlock(state);
        if (currentOldestBlock.hash === action.payload) {
            yield fork(getPreviousBlock, currentOldestBlock.parentHash);
            ++numHistoricBlocks;
        }
    }
}
