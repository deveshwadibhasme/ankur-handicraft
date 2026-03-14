import express from 'express';
import jwt from 'jsonwebtoken';
import Product from './model/Product.js';
import upload from './upload.config.js';
const router = express.Router()

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

router.get('/api/products/featured', async (req, res) => {
    try {
        const featuredProducts = await Product.find({ isFeatured: true });
        res.json(featuredProducts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post('/api/products', protect, upload.single('image'), async (req, res) => {
    try {
        const { name, description, material, category, price, dimensions, isFeatured } = req.body;
        let imageUrl = "";

        if (req.file) {
            const uploadResponse = await imagekit.upload({
                file: req.file.buffer,
                fileName: generateUniqueFileName(req.file.originalname),
                folder: '/products'
            });
            imageUrl = uploadResponse.url;
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
            const uploadResponse = await imagekit.upload({
                file: req.file.buffer,
                fileName: generateUniqueFileName(req.file.originalname),
                folder: '/products'
            });
            updateData.image = uploadResponse.url;
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