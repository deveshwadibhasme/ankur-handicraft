import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;


// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const app = express();

// // 1. Configure Multer to use NVMe storage path
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     // Replace with your actual NVMe mount point
//     cb(null, '/mnt/nvme/uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });

// const upload = multer({ storage: storage });

