import crypto, { AES } from 'crypto-ts';
import { Request, Response } from 'express';
const key = process.env.ENCRYPTION_KEY || '';
const {v4: uuidv4} = require("uuid");

export const LinkController = {
	getLink: (req: Request, res: Response) => {
		const credentials = getCredentialsObject();
		const masterLink = `${process.env.MEET_PROXY}${generateEncryptedLink(credentials)}`;
		credentials.role = "VIEWER";
		const viewerLink = `${process.env.MEET_PROXY}${generateEncryptedLink(credentials)}`;
		res.send({masterLink, viewerLink});
	}
}

/**
 * encrypt value
 * @param config
 * @returns
 */
function encryptValue(config: {}) {
  const plainText = JSON.stringify(config);
  const cipherText = AES.encrypt(plainText, key).toString();
  return encodeURIComponent(cipherText);
}

/**
 * dencrypt value
 * @param config
 * @returns
 */
function decryptValue(cipherText: string) {
  const bytes = AES.decrypt(cipherText, key);
  const plainText = JSON.parse(bytes.toString(crypto.enc.Utf8));
  return plainText;
}

const getCredentialsObject = () => {
	return {
		region: process.env.AWSRegion,
		accessKeyId: process.env.AWSAccessKeyId,
		secretAccessKey: process.env.AWSSecretKey,
		sessionName: uuidv4(),
		role: "MASTER"
	};
}

const generateEncryptedLink = (credentials: {}) => {
	return encryptValue(credentials);
}