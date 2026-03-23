import dotenv from 'dotenv';
import ImageKit from 'imagekit';
import multer from 'multer';
dotenv.config();


export const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

const storage = multer.memoryStorage();
export const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

