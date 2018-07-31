// @flow

import { createAction } from 'redux-actions';
import * as ActionConstants from './actionConstants';
import { getBlock as getBlockFromHash, getLatestBlock, getBlockIds } from '../reducers/index';
import compact from 'lodash.compact';
import { fetchBlock, fetchCurrentBlockNumber } from '../apis/blocksApi';
import { fetchTransaction } from '../apis/transactionsApi';

import type { Dispatch } from 'redux';
import type { GetState } from '../reducers/index';

export const blockLoaded = createAction(ActionConstants.BLOCK_LOADED);

export const getCurrentBlock = () => {
    return async function (dispatch: Dispatch, getState: GetState) {
        try {
            const num = await fetchCurrentBlockNumber();
            const latestBlock = getLatestBlock(getState());
            if (!latestBlock || latestBlock.number !== num) {
                const blockHeader = await fetchBlock(num);
                if (!blockHeader) {
                    throw new Error('Did not return block header');
                }
                const blockIds = getBlockIds(getState());
                if (blockIds.toJS().indexOf(blockHeader.hash) === -1) {
                    dispatch(blockLoaded(blockHeader));
                    dispatch(createAction(ActionConstants.BLOCK_NEWEST_LOADED)(blockHeader.hash));
                }
            }
        } catch (err) {
            // Log error
            console.log(err);
        }
    };
};

export const getBlockTransactions = (blockHash: string) => {
    return async (dispatch: Dispatch, getState: GetState) => {
        const block = getBlockFromHash(getState(), blockHash);
        const promises = block.transactions.map(txHash => {
            let promise;
            try {
                promise = fetchTransaction(txHash);
                promise.then(txData => {
                    if (txData) {
                        dispatch(createAction(ActionConstants.TRANSACTION_LOADED)(txData));
                    }
                });
                return promise; 
            } catch (err) {
                // Log error
                console.log(err);
            }
        });
        await Promise.all(compact(promises.toArray()));
        dispatch(createAction(ActionConstants.BLOCK_TXS_COMPLETED)(blockHash));
    };
};
