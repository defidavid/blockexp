import { combineReducers } from 'redux';
import blocks, { getCurrentNum, _getBlocks, _getBlockIds, _getBlock, _getCompletedBlocks } from './blocks';
import transactions, { _getTransactions } from './transactions';

const rootReducer = combineReducers({
    blocks,
    transactions
});

export const getCurrentBlockNum = state => getCurrentNum(state.blocks);
export const getBlockIds = state => _getBlockIds(state.blocks);
export const getBlocks = state => _getBlocks(state.blocks);
export const getCompletedBlocks = state => _getCompletedBlocks(state.blocks);
export const getBlock = (state, blockHash) => _getBlock(state.blocks, blockHash);
export const getOldestBlock = state => {
    const blockIds = getBlockIds(state);
    const blocks = getBlocks(state);
    return blocks.get(blockIds.last());
}
export const getLatestBlock = state => {
    const blockIds = getBlockIds(state);
    const blocks = getBlocks(state);
    return blocks.get(blockIds.first());
}

export const getTransactions = state => _getTransactions(state.transactions);

export default rootReducer;
