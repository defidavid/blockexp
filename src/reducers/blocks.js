// @flow

import { handleActions } from 'redux-actions';
import { Record, Map, List, Set } from 'immutable';
import * as ActionConstants from '../actions/actionConstants';

export class BlockRecord extends Record({
    timestamp: -1,
    transactions: List(),
    hash: '',
    parentHash: '',
    number: ''
}) {
    timestamp: number;
    transactions: List<string>;
    hash: string;
    parentHash: string;
    number: string;
}

export class BlocksStateRecord extends Record({
    blocks: Map(),
    blockIds: List(),
    completedBlocks: Set()
}) {
    blocks: Map<string, BlockRecord>;
    blockIds: List<string>;
    completedBlocks: Set<string>;
}

export const _getBlockIds = (state: BlocksStateRecord) => state.blockIds;
export const _getBlocks = (state: BlocksStateRecord) => state.blocks;
export const _getCompletedBlocks = (state: BlocksStateRecord) => state.completedBlocks;
export const _getBlock = (state: BlocksStateRecord, blockHash: string) => {
    return state.blocks.get(blockHash);
}

let reducers = {};

reducers[ActionConstants.BLOCK_LOADED] = (state: BlocksStateRecord, { payload }) => {
    return state.setIn(['blocks', payload.hash], new BlockRecord({
        timestamp: payload.timestamp,
        transactions: List(payload.transactions),
        hash: payload.hash,
        parentHash: payload.parentHash,
        number: payload.number
    }));
};

reducers[ActionConstants.BLOCK_NEWEST_LOADED] = (state: BlocksStateRecord, { payload }) => {
    return state.set('blockIds', state.blockIds.unshift(payload));
};

reducers[ActionConstants.BLOCK_PREVIOUS_LOADED] = (state: BlocksStateRecord, { payload }) => {
    return state.set('blockIds', state.blockIds.push(payload));
};

reducers[ActionConstants.BLOCK_TXS_COMPLETED] = (state: BlocksStateRecord, { payload }) => {
    return state.set('completedBlocks', state.completedBlocks.add(payload));
}

export default handleActions(reducers, new BlocksStateRecord());
