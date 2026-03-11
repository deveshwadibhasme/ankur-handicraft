import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db.js';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ImageKit from 'imagekit';
import multer from 'multer';
import Admin from './model/Admin.js';
import Product from './model/Product.js';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "*" }));
app.use(express.json());

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

const generateUniqueFileName = (originalName) => {
  return `${Date.now()}-${originalName}`;
};


// app.post('/auth/admin/signup', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const admin = new Admin({ email, password: hashedPassword });
//     await admin.save();

//     res.status(201).json({ type: 'success', message: 'admin registered successfully' });
//   } catch (error) {
//     res.status(400).json({ type: 'error', message: error.message });
//   }
// });

app.post('/auth/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (admin && (await bcrypt.compare(password, admin.password))) {
      const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
      res.status(200).json({ type: 'success', message: 'Login successful', token });
    } else {
      res.status(401).json({ type: 'error', message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ type: 'error', message: error.message });
  }
});

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


app.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.get('/api/products/featured', async (req, res) => {
  try {
    const featuredProducts = await Product.find({ isFeatured: true });
    res.json(featuredProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.post('/api/products', protect, upload.single('image'), async (req, res) => {
  try {
    const { name, description, isFeatured } = req.body;
    console.log(req.body);
    let imageUrl = "";

    if (req.file) {
      const uploadResponse = await imagekit.upload({
        file: req.file.buffer,
        fileName: generateUniqueFileName(req.file.originalname),
        folder: '/products'
      });
      imageUrl = uploadResponse.url;
    }

    const newProduct = new Product({ name, description, image: imageUrl, isFeatured });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/products/:id', protect, upload.single('image'), async (req, res) => {
  try {
    const { name, description, isFeatured } = req.body;
    let updateData = { name, description, isFeatured };

    if (req.file) {
      const uploadResponse = await imagekit.upload({
        file: req.file.buffer,
        fileName: generateUniqueFileName(req.file.originalname),
        folder: '/products'
      });
      updateData.image = uploadResponse.url;
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateData);
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.patch('/api/products/:id', protect, async (req, res) => {
  try {
    const isFeatured = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, isFeatured);
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/products/:id', protect, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/', (req, res) => {
  res.send('Ankur Handicraft Backend is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
