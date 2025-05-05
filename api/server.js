const { MongoClient } = require('mongodb');
const nodemailer = require('nodemailer');

const password = encodeURIComponent(process.env.MONGODB_PASSWORD);
const uri = `mongodb+srv://afifarif07:${password}@cluster00.qlfycla.mongodb.net/?retryWrites=true&w=majority&appName=Cluster00`;
const client = new MongoClient(uri);

let callinsCollection;

async function initMongo() {
  if (!callinsCollection) {
    await client.connect();
    const db = client.db("callinDB");
    callinsCollection = db.collection("callins");
  }
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send({ msg: 'Only POST allowed' });
  }

  const { name, workplace, position, email, reason } = req.body;

  if (!name || !workplace || !position || !email || !reason) {
    return res.status(400).json({ msg: 'Missing fields' });
  }

  try {
    await initMongo();
    await callinsCollection.insertOne({
      name,
      workplace,
      position,
      email,
      reason,
      createdAt: new Date(),
    });

    const testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });

    const info = await transporter.sendMail({
      from: '"Call-In" <no-reply@example.com>',
      to: email,
      subject: "Sick Day Confirmation",
      text: `Hi ${name},\n\nWe’ve received your sick leave notice for your position as ${position} at ${workplace}.\n\nReason: ${reason}\n\nTake care.`,
    });

    const previewUrl = nodemailer.getTestMessageUrl(info);
    console.log("Email preview URL: ", previewUrl);

    res.status(200).json({ msg: "Saved and email sent (test only)", preview: previewUrl });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal server error" });
  }
};
