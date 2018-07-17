
import { handleActions } from 'redux-actions';
import { Record, Map, List, Set } from 'immutable';
import * as ActionConstants from '../actions/actionConstants';

export const _getBlockIds = state => state.blockIds;
export const _getBlocks = state => state.blocks;
export const _getCompletedBlocks = state => state.completedBlocks;
export const _getBlock = (state, blockHash) => {
    return state.blocks.get(blockHash);
}

const InitialStateRecord = new Record({
    blocks: Map(),
    blockIds: List(),
    completedBlocks: Set()
});

const BlockRecord = Record({
    timestamp: -1,
    number: -1,
    transactions: List(),
    hash: '',
    parentHash: ''
});

let reducers = {};

reducers[ActionConstants.BLOCK_LOADED] = (state, { payload }) => {
    return state.setIn(['blocks', payload.hash], new BlockRecord({
        number: payload.number,
        timestamp: payload.timestamp,
        transactions: List(payload.transactions),
        hash: payload.hash,
        parentHash: payload.parentHash
    }));
};

reducers[ActionConstants.BLOCK_NEWEST_LOADED] = (state, { payload }) => {
    return state.set('blockIds', state.blockIds.unshift(payload));
};

reducers[ActionConstants.BLOCK_PREVIOUS_LOADED] = (state, { payload }) => {
    return state.set('blockIds', state.blockIds.push(payload));
};

reducers[ActionConstants.BLOCK_TXS_COMPLETED] = (state, { payload }) => {
    return state.set('completedBlocks', state.completedBlocks.add(payload));
}

export default handleActions(reducers, new InitialStateRecord());
