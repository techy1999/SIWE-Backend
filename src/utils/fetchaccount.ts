import { toHex } from 'alchemy-sdk';
import axios from 'axios';

const NUMBER_TRANSACTION=5;

export const getTransactionHistory = async (address: `0x${string}`) => {

    //TODO: SDK is taking time to load data
        // const accountHistory = await alchemy.core.getAssetTransfers({
        //     fromBlock: "0x0",
        //     fromAddress: address,
        //     category: ["external", "internal", "erc20", "erc721", "erc1155"] as AssetTransfersCategory[],
        //     maxCount: 5,
        //     order: "desc" as SortingOrder | undefined
        // });
        // return accountHistory.transfers;

    const hexMaxCount = toHex(NUMBER_TRANSACTION);

    const url = `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`;
    const data = {
        id: 1,
        jsonrpc: "2.0",
        method: "alchemy_getAssetTransfers",
        params: [
            {
                toBlock: "latest",
                withMetadata: false,
                excludeZeroValue: true,
                order: "desc",
                fromAddress: address,
                category: ["external", "internal", "erc20", "erc721"],
                maxCount: hexMaxCount
            }
        ]
    };

    try {
        const response = await axios.post(url, data, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching asset transfers:', error); //TODO:add to logger in production
    }
  
}


