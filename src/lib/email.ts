import nodemailer from 'nodemailer';
import crypto from 'crypto';

// SMTP configuration
const smtpHost = process.env.SMTP_HOST;
const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const smtpFrom = process.env.SMTP_FROM || 'SmartLink Rwanda <noreply@smartlinkrwanda.com>';

export async function sendOTPEmail(email: string, otp: string): Promise<{ success: boolean; previewUrl?: string; otp?: string }> {
  const subject = 'Password Reset Verification Code';
  const textBody = `Your verification code is:\n\n${otp}\n\nThis code expires in 10 minutes.\n\nIf you did not request a password reset, please ignore this email.`;

  const htmlBody = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:500px;margin:40px auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
    <div style="background:linear-gradient(135deg,#1e40af,#0891b2);padding:32px 24px;text-align:center;">
      <h1 style="color:#ffffff;margin:0;font-size:22px;font-weight:700;">SmartLink Rwanda</h1>
      <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;font-size:14px;">Password Reset Request</p>
    </div>
    <div style="padding:32px 24px;text-align:center;">
      <p style="color:#475569;font-size:15px;margin:0 0 24px;">Your verification code is:</p>
      <div style="background:#f0f9ff;border:2px solid #bfdbfe;border-radius:12px;padding:20px;margin:0 0 24px;">
        <span style="font-size:36px;font-weight:800;color:#1e40af;letter-spacing:8px;font-family:monospace;">${otp}</span>
      </div>
      <p style="color:#64748b;font-size:13px;margin:0 0 8px;">This code expires in <strong>10 minutes</strong>.</p>
      <p style="color:#64748b;font-size:13px;margin:0;">If you did not request a password reset, please ignore this email.</p>
    </div>
    <div style="background:#f8fafc;padding:16px 24px;text-align:center;">
      <p style="color:#94a3b8;font-size:12px;margin:0;">&copy; ${new Date().getFullYear()} SmartLink Rwanda. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`;

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: smtpFrom,
        to: email,
        subject,
        text: textBody,
        html: htmlBody,
      });

      console.log(`Email sent to ${email} via SMTP`);
      return { success: true };
    } catch (smtpError) {
      console.error('SMTP send error:', smtpError);
    }
  }

  // Fallback: Console log for development
  console.log('\n========================================');
  console.log(`PASSWORD RESET OTP for ${email}`);
  console.log(`Verification code: ${otp}`);
  console.log('Expires in 10 minutes.');
  console.log('========================================\n');
  return { success: true, otp };
}

export function generateOTP(): string {
  let otp = '';
  while (otp.length < 6) {
    const byte = crypto.randomBytes(1)[0];
    if (byte < 250) {
      otp += (byte % 10).toString();
    }
  }
  return otp;
}
