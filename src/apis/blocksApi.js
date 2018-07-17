export const fetchBlock = (numOrHash) => {
    return window.web3.eth.getBlock(numOrHash);
}

export const fetchCurrentBlockNumber = () => {
    return window.web3.eth.getBlockNumber();
}
