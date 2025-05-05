const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const nodemailer = require('nodemailer');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

let db;

(async () => {
  db = await open({
    filename: './database.db',
    driver: sqlite3.Database
  });

  // Create table if it doesn't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS callins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      workplace TEXT,
      position TEXT,
      email TEXT,
      reason TEXT
    );
  `);
})();

// POST to create the data and send email
app.post('/submit', async (req, res) => {
  try {
    const { name, workplace, position, email, reason } = req.body;

    if (!name || !workplace || !position || !email || !reason) {
      return res.status(400).json({ msg: 'Missing required fields' });
    }

    // Save to DB
    await db.run(
      `INSERT INTO callins (name, workplace, position, email, reason) VALUES (?, ?, ?, ?, ?)`,
      [name, workplace, position, email, reason]
    );

    // Create a fake email account using Ethereal
    let testAccount = await nodemailer.createTestAccount();

    // Create transporter
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });

    // Send a test email
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

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
