import { Request } from "express";
import { generateNonce, SiweMessage } from 'siwe';
import jwt from 'jsonwebtoken';
import { createResponse } from "../../../utils/helper";
/**GET nonce from SIWE*/
const getNonce = async (req: Request) => {

    try {
        const nonceRes = generateNonce();
        req.session.nonce = nonceRes
        return createResponse("Nonce creation successful", 200, "", nonceRes)
    } catch (error) {
        return createResponse("", 500, "ERROR fetching transfer events", null)
    }
}

/**POST verify message */
const verifySign = async (req: Request) => {

    const { message: receivedMessage, signature:receivedSignature, } = req.body;
    
    try {
        if (!req.body.message) {
            return {
                message: 'Expected prepareMessage object as body.',
                httpStatus: 422,
                error: '',
                data: null,
            }
        }

        // creating backend msg a/c eip 
        let SIWEObject = new SiweMessage(receivedMessage);
        const { data: message } = await SIWEObject.verify({ signature: receivedSignature, nonce: req.session.nonce });

        const token = jwt.sign(
            { address: message.address },
            process.env.TOKEN_SECRET_KEY!,
            { expiresIn: process.env.TOKEN_EXPIRY } // Token expires in 5 minutes
        );
    
        
        return {
            message: 'Login successful',
            httpStatus: 200,
            error: '',
            data: {
                token,
            },
        }

    } catch (e) {
        return {
            message: '',
            httpStatus: 500,
            error: 'Something went wrong',
            data: null,
        }
           
    }
}

export default {
    getNonce,
    verifySign
};
