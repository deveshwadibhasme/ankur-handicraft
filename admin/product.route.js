import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Product from './model/Product.js';
import { imagekit, upload } from './upload.config.js';
import fs from "fs";
const router = express.Router()

dotenv.config();
const generateUniqueFileName = (originalName) => {
    return `${Date.now()}-${originalName}`;
};

const protect = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        req.adminId = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
};


router.get('/api/products/:category', async (req, res) => {
    const { category } = req.params
    if (category === 'all-products') {
        const products = await Product.find();
        return res.json(products);
    }
    const products = await Product.find({ category });
    return res.json(products);
});

router.get('/api/product/featured', async (req, res) => {
    try {
        const featuredProducts = await Product.find({ isFeatured: true });
        return res.status(200).json(featuredProducts);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});


router.post('/api/products', protect, upload.single('image'), async (req, res) => {
    try {
        const { name, description, material, category, price, dimensions, isFeatured } = req.body;
        let imageUrl = "";

        if (req.file) {
            imageUrl = `https://server.ankurhandicraft.com/products-image/${req.file.filename}`;
            console.log(
                'Is This Exist: ', fs.existsSync(`/home/u969558282/files/nodejs/products-image/${req.file.filename}.png`)
            );
        }

        const newProduct = new Product({
            name,
            description,
            material,
            category,
            price,
            dimensions,
            image: imageUrl,
            isFeatured
        });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/api/products/:id', protect, upload.single('image'), async (req, res) => {
    try {
        const { name, description, material, category, price, dimensions, isFeatured } = req.body;
        let updateData = { name, description, material, category, price, dimensions, isFeatured };

        if (req.file) {
            updateData.image = `/products-image/${req.file.filename}`;
        }

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.patch('/api/products/:id', protect, async (req, res) => {
    try {
        const isFeatured = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, isFeatured);
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/api/products/:id', protect, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router