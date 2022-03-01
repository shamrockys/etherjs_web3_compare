import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545');


export const getBlockLatest = provider.getBlockNumber;

export const getBlocks = async (numbers) => {

  if (numbers.length < 1) {
    return [];
  }

  let blocks = [];

  try {
    blocks = await Promise.all(numbers.map(number => provider.getBlock(number)));
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
    transactions = await Promise.all(hashes.map(hash => provider.getTransaction(hash)));
  } catch (e) {
    console.log('getTransactions', hashes);
    console.log(e);
  }

  return transactions;

};