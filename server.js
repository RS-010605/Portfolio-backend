import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

try {

  await mongoose.connect(process.env.MONGODB_URI);

  console.log("MongoDB Connected Successfully");

} catch (error) {

  console.log(error);

}

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

app.get('/test-db', (req, res) => {
  res.send('MongoDB Connected');
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

    console.log(error);

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