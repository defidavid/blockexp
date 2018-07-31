// @flow

import { createSelectorCreator, defaultMemoize } from 'reselect';
import { getCompletedBlocks, getTransactions, getBlocks, getBlockIds } from '../reducers/index';
import { Set } from 'immutable';
import reverse from 'lodash.reverse';

const customCreateSelector = createSelectorCreator(defaultMemoize, (a, b) => {
    if (Set.isSet(a) && Set.isSet(b)) {
        return a === b;
    }
    return true;
});

export type FeeToValueRatioData = {
    data: { blockNumber: number, timestamp: number, feesValuePercent: number },
    avgFeesPerBlock: number,
    avgValuePerBlock: number
};

export const blocksFeeToValueRatio = customCreateSelector(
    getCompletedBlocks,
    getTransactions,
    getBlocks,
    getBlockIds,
    (completed, transactions, blocks, blockIds) => {
        let data = [];
        let totalFees = 0;
        let totalValue = 0;
        blockIds.forEach(blockId => {
            if (completed.has(blockId)) {
                const block = blocks.get(blockId);
                let totalBlockFees = 0;
                let totalBlockValue = 0;
                block.transactions.forEach(txHash => {
                    const tx = transactions.get(txHash);
                    if (tx) {
                        totalBlockFees += parseInt(tx.gasPrice, 10) * tx.gas;
                        totalBlockValue += parseInt(tx.value, 10);
                    }
                });
                data.push({
                    blockNumber: block.number,
                    timestamp: block.timestamp,
                    feesValuePercent: 100 * (totalBlockValue === 0 ? 0 : (totalBlockFees / totalBlockValue))
                });
                totalFees += totalBlockFees;
                totalValue += totalBlockValue;
            }
        });
        return {
            data: reverse(data),
            avgFeesPerBlock: window.web3.utils.fromWei(`${totalFees / blockIds.size}`),
            avgValuePerBlock: window.web3.utils.fromWei(`${totalValue / blockIds.size}`)
        };
    }
);

export type TransactionsTypeData = {
    data: { timestamp: number, blockNumber: number, accountTxs: number, totalContractTxs: number },
    avgAccountTxsPerBlock: number,
    avgContractTxsPerBlock: number
};

export const blockTransactionsTypeData = customCreateSelector(
    getCompletedBlocks,
    getTransactions,
    getBlocks,
    getBlockIds,
    (completed, transactions, blocks, blockIds) => {
        let data = [];
        let totalAccountTxs = 0;
        let totalContractTxs = 0;
        blockIds.forEach(blockId => {
            if (completed.has(blockId)) {
                const block = blocks.get(blockId);
                let accountTxs = 0;
                let contractTxs = 0;
                block.transactions.forEach(txHash => {
                    const tx = transactions.get(txHash);
                    if (tx) {
                        if (tx.input === '0x' && tx.to !== null) {
                            ++accountTxs;
                        } else {
                            ++contractTxs;
                        }
                    }
                });
                data.push({
                    timestamp: block.timestamp,
                    blockNumber: block.number,
                    accountTxs,
                    contractTxs
                });
                totalAccountTxs += accountTxs;
                totalContractTxs += contractTxs;
            }
        });
        return {
            data: reverse(data),
            avgAccountTxsPerBlock: Math.round(totalAccountTxs / blockIds.size),
            avgContractTxsPerBlock: Math.round(totalContractTxs / blockIds.size)
        };
    }
);
