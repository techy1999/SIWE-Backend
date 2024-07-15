/**GET account detail */
import { Request } from "express";
import { getTransactionHistory } from "../../../utils/fetchaccount";
import { createResponse } from "../../../utils/helper";

// Define a type for Ethereum address
type EthereumAddress = `0x${string}`;

const infoAccount = async (req: Request) => {
    const { account } = req.query;
    try {
        const accountTxHistory = await getTransactionHistory(account as EthereumAddress)
        return createResponse("authenticated use", 200, "", {
            accountAddress: account,
            accountTxHistory: accountTxHistory?.result?.transfers
        })

    } catch (error) {
        return createResponse("", 500, "Something went wrong, Try again", null)
    }  
}

export default {
    infoAccount
};
