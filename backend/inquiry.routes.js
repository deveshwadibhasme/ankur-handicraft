import express from 'express';
import Inquiry from './model/Inquiry.js';
import jwt from 'jsonwebtoken';
import { sendInquiryEmail } from './email.service.js';
import Product from './model/Product.js';


const router = express.Router();

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

router.post('/add', async (req, res) => {
    try {
        const { userName, email, number, message, productId } = req.body;
        const newInquiry = new Inquiry({
            userName,
            email,
            number,
            message,
            product: productId
        });

        const productDoc = productId ? await Product.findById(productId) : null;

        await newInquiry.save();
        // await sendInquiryEmail({ userName, email, number, message, productName: productDoc?.name });
        res.status(201).json({ type: 'success', message: 'Inquiry sent successfully' });
    } catch (error) {
        res.status(400).json({ type: 'error', message: error.message });
    }
});

router.get('/all-inquries', protect, async (req, res) => {
    try {
        const inquiries = await Inquiry.find().populate('product').sort({ createdAt: -1 });
        res.json(inquiries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/remove/:id', protect, async (req, res) => {
    try {
        await Inquiry.findByIdAndDelete(req.params.id);
        res.json({ message: 'Inquiry deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
