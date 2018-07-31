// @flow

import { combineReducers } from 'redux';
import blocks, { _getBlocks, _getBlockIds, _getBlock, _getCompletedBlocks } from './blocks';
import transactions, { _getTransactions } from './transactions';

import type { TransactionsStateRecord } from './transactions';
import type { BlocksStateRecord } from './blocks';

export type ReduxState = {
    blocks: BlocksStateRecord,
    transactions: TransactionsStateRecord
};

export type GetState = () => ReduxState;

export const getBlockIds = (state: ReduxState) => _getBlockIds(state.blocks);
export const getBlocks = (state: ReduxState) => _getBlocks(state.blocks);
export const getCompletedBlocks = (state: ReduxState) => _getCompletedBlocks(state.blocks);
export const getBlock = (state: ReduxState, blockHash: string) => _getBlock(state.blocks, blockHash);
export const getOldestBlock = (state: ReduxState) => {
    const blockIds = getBlockIds(state);
    const blocks = getBlocks(state);
    return blocks.get(blockIds.last());
}
export const getLatestBlock = (state: ReduxState) => {
    const blockIds = getBlockIds(state);
    const blocks = getBlocks(state);
    return blocks.get(blockIds.first());
}

export const getTransactions = (state: ReduxState) => _getTransactions(state.transactions);

const rootReducer = combineReducers({
    blocks,
    transactions
});

export default rootReducer;
