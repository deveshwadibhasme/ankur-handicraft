import dotenv from 'dotenv';
import ImageKit from 'imagekit';
import multer from 'multer';
import path from 'path';
dotenv.config();


export const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Hostinger NVMe storage path (adjust folder name as needed)
        cb(null, 'products/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

export const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});
