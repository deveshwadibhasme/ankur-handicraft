import express from 'express';
import Inquiry from './model/Inquiry.js';
import jwt from 'jsonwebtoken';


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

router.post('/api/inquiries', async (req, res) => {
    try {
        const { name, email, phone, message, product } = req.body;
        const newInquiry = new Inquiry({
            name,
            email,
            phone,
            message,
            product
        });
        await newInquiry.save();
        res.status(201).json({ type: 'success', message: 'Inquiry sent successfully' });
    } catch (error) {
        res.status(400).json({ type: 'error', message: error.message });
    }
});

router.get('/api/inquiries', protect, async (req, res) => {
    try {
        const inquiries = await Inquiry.find().sort({ createdAt: -1 });
        res.json(inquiries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/api/inquiries/:id', protect, async (req, res) => {
    try {
        await Inquiry.findByIdAndDelete(req.params.id);
        res.json({ message: 'Inquiry deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
