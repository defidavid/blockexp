// @flow

export const fetchBlock = (numOrHash: string | number): Promise<any> => {
    return window.web3.eth.getBlock(numOrHash);
}

export const fetchCurrentBlockNumber = (): Promise<any> => {
    return window.web3.eth.getBlockNumber();
}
