import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
}));

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB Connected Successfully');
  })
  .catch((err) => {
    console.log('MongoDB Connection Error:');
    console.log(err);
  });

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

app.get('/', (req, res) => {
  res.send('Backend Running');
});

app.get('/test-db', async (req, res) => {

  try {

    await mongoose.connection.db.admin().ping();

    res.send('MongoDB Connected');

  } catch (error) {

    console.log(error);

    res.status(500).send(error.message);

  }

});

app.post('/api/contact', async (req, res) => {

  try {

    const newMessage = new Contact(req.body);

    await newMessage.save();

    return res.status(200).json({
      success: true,
      message: 'Message Sent Successfully',
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });

  }

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});