import { Alchemy, Network } from "alchemy-sdk";

const config = {
    apiKey: process.env.ALCHEMY_KEY,
    network: Network.ETH_SEPOLIA,/**TODO: Change for production network */
};

const alchemy = new Alchemy(config);
export default alchemy;