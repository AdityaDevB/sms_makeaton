// src/lib/mailer.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_PORT === '465',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
});

export async function sendPasswordResetEmail(toEmail, resetToken) {
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;

    const mailOptions = {
        from: process.env.SMTP_FROM,
        to: toEmail,
        subject: 'Reset Your Brightloop Password',
        html: `
      <div style="font-family: sans-serif; max-w-md; margin: 0 auto; color: #263238;">
        <h2 style="color: #142B50;">Password Reset Request</h2>
        <p>Hello,</p>
        <p>We received a request to reset the password for your Brightloop account. Click the button below to choose a new password. This link will expire in 15 minutes.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}" style="background-color: #142B50; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Reset Password</a>
        </div>
        <p>If you did not request this reset, you can safely ignore this email. Your password will remain unchanged.</p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
        <p style="font-size: 12px; color: #64748B;">Brightloop Software</p>
      </div>
    `,
    };

    await transporter.sendMail(mailOptions);
}