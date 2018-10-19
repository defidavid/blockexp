// @flow

import { put, select, call, take, actionChannel } from 'redux-saga/effects';
import * as ActionConstants from '../actions/actionConstants';
import { getBlockTransactions, getBlock, blockPreviousLoaded } from '../actions/blockActions';
import { getOldestBlock } from '../reducers/index';

const MAX_BLOCKS_HISTORY = 50;

function* getPreviousBlock(blockHash) {
    try {
        const blockHeader = yield put.resolve(getBlock(blockHash));
        if (!blockHeader) throw new Error('Did not return block header');
        yield put(blockPreviousLoaded(blockHeader.hash));
        return blockHeader;
    } catch(err) {
        console.log(err);
        return yield call(getPreviousBlock, blockHash);
    }
}

export function* blockTransactionsSaga(): Generator<any, any, any> {
    const channel = yield actionChannel(ActionConstants.BLOCK_LOADED);
    while (true) {
        const { payload } = yield take(channel);
        yield put(getBlockTransactions(payload.hash));
    }
}

export function* getPreviousBlocks(): Generator<any, any, any> {
    yield take(ActionConstants.BLOCK_NEWEST_LOADED);

    const state = yield (select());
    let currentOldestBlock = getOldestBlock(state);
    let numHistoricBlocks = 0;
    while (MAX_BLOCKS_HISTORY > numHistoricBlocks) {
        const blockHeader = yield call(getPreviousBlock, currentOldestBlock);
        currentOldestBlock = blockHeader.parentHash;
        ++numHistoricBlocks;
    }
};
