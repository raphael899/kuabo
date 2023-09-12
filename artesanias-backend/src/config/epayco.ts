// @ts-ignore
import dotenv from 'dotenv';

dotenv.config();

var epayco = require('epayco-sdk-node')({
    apiKey:process.env.PUBLIC_KEY,
    privateKey:process.env.PRIVATE_KEY,
    lang: 'ES',
    test: true
})

export default epayco;