const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, subject, phone, message } = req.body || {};

  if (!name || !email || !subject || !message) {
    return res.status(400).send('Missing required fields');
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Email content
  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: process.env.RECEIVING_EMAIL || 'shahzaib63219@gmail.com',
    subject: subject,
    text: `
From: ${name}
Email: ${email}
${phone ? `Phone: ${phone}\n` : ''}
Message:
${message}
    `,
    html: `<p><strong>From:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p>${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}<p><strong>Message:</strong></p><p>${message.replace(/\n/g, '<br>')}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('OK');
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).send('Failed to send email');
  }
};