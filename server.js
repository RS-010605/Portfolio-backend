const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/portfolio')
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

export default app;