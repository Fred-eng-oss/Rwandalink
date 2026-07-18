import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (local.length <= 2) return `${local[0]}***@${domain}`;
  return `${local[0]}${'*'.repeat(local.length - 2)}${local[local.length - 1]}@${domain}`;
}

export async function sendOTPEmail(email: string, otp: string): Promise<{ success: boolean; previewUrl?: string }> {
  const subject = 'Password Reset Verification Code';

  const html = `<!DOCTYPE html>
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
      <p style="color:#475569;font-size:15px;margin:0 0 24px;">You requested a password reset. Use the verification code below:</p>
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

  if (!resend) {
    console.log('\n========================================');
    console.log(`📧 PASSWORD RESET OTP for ${email}`);
    console.log(`🔐 Your verification code: ${otp}`);
    console.log('⏰ This code expires in 10 minutes.');
    console.log('========================================\n');
    return { success: true };
  }

  try {
    const result = await resend.emails.send({
      from: 'SmartLink Rwanda <noreply@smartlinkrwanda.com>',
      to: email,
      subject,
      html,
    });
    return { success: true, previewUrl: result.data?.id };
  } catch (error) {
    console.error('Email send error:', error);
    console.log('\n========================================');
    console.log(`📧 PASSWORD RESET OTP for ${email}`);
    console.log(`🔐 Your verification code: ${otp}`);
    console.log('⏰ This code expires in 10 minutes.');
    console.log('========================================\n');
    return { success: true };
  }
}

export function generateOTP(): string {
  const array = new Uint8Array(6);
  if (typeof globalThis.crypto !== 'undefined') {
    globalThis.crypto.getRandomValues(array);
  } else {
    require('crypto').randomFillSync(array);
  }
  return Array.from(array, (byte) => byte % 10).join('');
}

export { maskEmail };
