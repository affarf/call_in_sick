const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const password = encodeURIComponent(process.env.MONGODB_PASSWORD);
const uri = `mongodb+srv://afifarif07:${password}@cluster00.qlfycla.mongodb.net/?retryWrites=true&w=majority&appName=Cluster00`;
const client = new MongoClient(uri);
let callinsCollection;

(async () => {
  try {
    await client.connect();
    const db = client.db("callinDB");
    callinsCollection = db.collection("callins");
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error('Error connecting to MongoDB', err);
  }
})();

app.post('/submit', async (req, res) => {
  try {
    const { name, workplace, position, email, reason } = req.body;

    if (!name || !workplace || !position || !email || !reason) {
      return res.status(400).json({ msg: 'Missing required fields' });
    }

    await callinsCollection.insertOne({
      name,
      workplace,
      position,
      email,
      reason,
      createdAt: new Date()
    });

    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });

    let info = await transporter.sendMail({
      from: '"Call-In Confirmation" <no-reply@example.com>',
      to: email,
      subject: "Sick Day Confirmation",
      text: `Hi ${name},\n\nWe’ve received your sick leave notice for your position as ${position} at ${workplace}.\n\nReason: ${reason}\n\nTake care.`,
    });

    const previewUrl = nodemailer.getTestMessageUrl(info);
    console.log("Email preview URL: ", previewUrl);

    res.status(200).json({ msg: 'Saved and email sent (test only)', preview: previewUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error saving data or sending email' });
  }
});

// Export the app for Vercel
module.exports = app;