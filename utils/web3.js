import Web3 from 'web3';

export const web3 = new Web3(new Web3.providers.HttpProvider('https://data-seed-prebsc-1-s1.binance.org:8545'));

export const getBlockLatest = web3.eth.getBlockNumber;

export const getBlocks = async (numbers) => {

  if (numbers.length < 1) {
    return [];
  }

  let blocks = [];

  try {
    blocks = await Promise.all(numbers.map(number => web3.eth.getBlock(number)));
  } catch (e) {
    console.log('getBlocks', numbers);
    console.log(e);
  }

  return blocks;

};

export const getTransactions = async (hashes) => {

  if (hashes.length < 1) {
    return [];
  }

  let transactions = [];

  try {
    transactions = await Promise.all(hashes.map(hash => web3.eth.getTransaction(hash)));
  } catch (e) {
    console.log('getTransactions', hashes);
    console.log(e);
  }

  return transactions;

};