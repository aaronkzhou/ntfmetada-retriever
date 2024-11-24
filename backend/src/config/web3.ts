import Web3 from 'web3';

// Use a public provider (Infura, Alchemy, or any other)
const PROVIDER_URL = process.env.WEB3_PROVIDER_URL || "https://ethereum-rpc.publicnode.com";
export const web3 = new Web3(PROVIDER_URL);