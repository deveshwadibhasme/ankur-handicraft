import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import connectDB from './db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Admin from './model/Admin.js';
import productRoute from './product.route.js'
import inquiryRouter from './inquiry.routes.js'

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "https://ankurhandicraft.com",
  "https://admin.ankurhandicraft.com",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:8080",
  "https://server.ankurhandicraft.com"
];

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use(
  "/products-image",
  express.static("/home/u969558282/ef5a6c54326d6fc7/files/nodejs/products-image")
);


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

app.use('/', productRoute)
app.use('/inquiry', inquiryRouter)


app.get('/', (req, res) => {
  res.send('Ankur Handicraft Backend is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

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
