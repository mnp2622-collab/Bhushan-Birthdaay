import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const ADMIN_EMAIL = process.env.REGISTERED_ADMIN_EMAIL || 'manavpadghan2622@gmail.com';
const ADMIN_NAME = process.env.REGISTERED_ADMIN_NAME || 'Manav';

// Setup Nodemailer Transporter
const createTransporter = () => {
  const user = process.env.EMAIL_USER || ADMIN_EMAIL;
  const pass = process.env.EMAIL_PASS;

  if (!pass || pass === 'your_gmail_app_password') {
    return null; // Transporter not configured with real App Password
  }

  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: { user, pass }
  });
};

// API Endpoint to Send OTP Email
app.post('/api/send-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ success: false, message: 'Email and OTP are required' });
    }

    if (email.trim().toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
      return res.status(400).json({ success: false, message: 'Email is not registered as an authorized Admin.' });
    }

    const transporter = createTransporter();

    const mailOptions = {
      from: `"FitSphere Gym Management" <${process.env.EMAIL_USER || ADMIN_EMAIL}>`,
      to: email,
      subject: 'Gym Management - Password Reset OTP',
      text: `Hello ${ADMIN_NAME},\n\nYour OTP for resetting your Gym Management System password is:\n\n${otp}\n\nThis OTP is valid for 5 minutes.\n\nIf you did not request a password reset, ignore this email.`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #0B0B0B; color: #FFFFFF; padding: 25px; border-radius: 12px; max-width: 500px; margin: auto; border: 1px solid rgba(255,255,255,0.1);">
          <h2 style="color: #8DFF2F; margin-top: 0;">FITSPHERE GYM MANAGEMENT</h2>
          <p>Hello <strong>${ADMIN_NAME}</strong>,</p>
          <p>Your OTP for resetting your Gym Management System password is:</p>
          <div style="background-color: #18181C; border: 1px solid #8DFF2F; color: #8DFF2F; font-size: 28px; font-weight: bold; letter-spacing: 6px; text-align: center; padding: 15px; border-radius: 10px; margin: 20px 0;">
            ${otp}
          </div>
          <p style="color: #A1A1AA; font-size: 13px;">This OTP is valid for <strong>5 minutes</strong>.</p>
          <p style="color: #71717A; font-size: 12px; margin-top: 20px; border-t: 1px solid #27272A; padding-top: 10px;">
            If you did not request a password reset, please ignore this email.
          </p>
        </div>
      `
    };

    if (transporter) {
      await transporter.sendMail(mailOptions);
      console.log(`[EMAIL SERVER] Real email sent successfully to ${email} via Nodemailer`);
      return res.json({ success: true, message: 'OTP sent successfully to your registered email.' });
    } else {
      // Server log notification for development mode
      console.log(`\n======================================================`);
      console.log(`[OTP GENERATED & SENT] To: ${email}`);
      console.log(`[OTP CODE]: ${otp} (Valid for 5 minutes)`);
      console.log(`======================================================\n`);
      return res.json({
        success: true,
        message: 'OTP sent successfully to your registered email.',
        simulated: true
      });
    }
  } catch (error) {
    console.error('[EMAIL ERROR]', error);
    return res.status(500).json({ success: false, message: 'Failed to send OTP email: ' + error.message });
  }
});

app.listen(PORT, () => {
  console.log(`⚡ FitSphere Backend Email Server running on port ${PORT}`);
});
