import nodemailer from 'nodemailer';
import { env } from '../config/env.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const sendContactMessage = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) return res.status(400).json({ message: 'Name, email, and message are required.' });

  if (!env.smtp.host || !env.smtp.user || !env.smtp.pass) {
    return res.status(503).json({ message: 'Email service is not configured yet.' });
  }

  const transporter = nodemailer.createTransport({
    host: env.smtp.host,
    port: env.smtp.port,
    secure: env.smtp.port === 465,
    auth: { user: env.smtp.user, pass: env.smtp.pass }
  });

  await transporter.sendMail({
    from: `Portfolio Contact <${env.smtp.user}>`,
    to: env.smtp.receiver,
    replyTo: email,
    subject: subject || `New portfolio message from ${name}`,
    html: `
      <h2>New Portfolio Message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject || 'General inquiry'}</p>
      <p><strong>Message:</strong></p>
      <p>${String(message).replace(/\n/g, '<br/>')}</p>
    `
  });

  res.json({ message: 'Message sent successfully.' });
});
