import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  projectType: String,
  budget: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Contact = mongoose.model('Contact', ContactSchema);

app.post('/api/contact', async (req, res) => {
  try {
    const newMessage = new Contact(req.body);

    await newMessage.save();

    res.json({
      success: true,
      message: 'Message Sent Successfully',
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
});

app.get('/', (req, res) => {
  res.send('Backend Running');
});

export default app;