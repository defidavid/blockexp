export const fetchTransaction = (txHash) => {
    return window.web3.eth.getTransaction(txHash);
}
