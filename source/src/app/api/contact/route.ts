import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import * as z from 'zod';

// Zod Input schema matching BD mobile formats
const contactSchema = z.object({
  name: z.string().min(2).max(80),
  phone: z.string().regex(/^01[3-9]\d{8}$/),
  email: z.string().email().optional().or(z.literal('')),
  plotType: z.enum(['general', 'avenue', 'commercial', 'hospital']).optional().or(z.literal('')),
  plotSize: z.string().max(30).optional().or(z.literal('')),
  message: z.string().max(500).optional().or(z.literal('')),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Zod payload validation
    const validationResult = contactSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, errors: validationResult.error.issues },
        { status: 422 }
      );
    }

    const { name, phone, email, plotType, plotSize, message } = validationResult.data;

    // 2. SMTP Transporter config check
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const notificationEmail = process.env.NOTIFICATION_EMAIL || 'hello.atisociety@gmail.com';

    const isSmtpConfigured = !!(smtpHost && smtpPort && smtpUser && smtpPass);

    console.log(`[API Contact] Form submission received. Name: ${name}, Phone: ${phone}`);

    const emailHtml = `
      <h3>New Lead Submission - Ati Model Town Rebuild</h3>
      <table border="1" cellpadding="6" style="border-collapse: collapse; font-family: sans-serif; font-size: 14px;">
        <tr><td><strong>Name</strong></td><td>${name}</td></tr>
        <tr><td><strong>Phone</strong></td><td>${phone}</td></tr>
        <tr><td><strong>Email</strong></td><td>${email || 'N/A'}</td></tr>
        <tr><td><strong>Preferred Plot</strong></td><td>${plotType || 'N/A'}</td></tr>
        <tr><td><strong>Desired Size</strong></td><td>${plotSize || 'N/A'}</td></tr>
        <tr><td><strong>Message</strong></td><td>${message || 'N/A'}</td></tr>
      </table>
    `;

    if (isSmtpConfigured) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: parseInt(smtpPort),
        secure: smtpPort === '465',
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      // Send alert to relationship team
      await transporter.sendMail({
        from: `"Ati Model Town Leads" <${smtpUser}>`,
        to: notificationEmail,
        subject: `New Lead: ${name} (${phone})`,
        html: emailHtml,
      });

      // Send auto-reply to client if email provided
      if (email) {
        const clientReplyHtml = `
          <div style="font-family: sans-serif; max-width: 600px; line-height: 1.6; color: #1c1c1e;">
            <h2 style="color: #192b45;">Thank you for contacting ATI Society</h2>
            <p>Dear ${name},</p>
            <p>We have received your request regarding <strong>Ati Model Town</strong> plot inquiries. Our relationship manager is reviewing your preference for a <strong>${plotType || 'general'} plot</strong> and will contact you within 24 hours.</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <h4 style="color: #b8975a; margin-bottom: 5px;">Office details:</h4>
            <p style="margin: 0; font-size: 13px;">Office Hours: Saturday - Thursday (9:00 AM - 7:00 PM)</p>
            <p style="margin: 0; font-size: 13px;">Hotline: 01805-464882, 01322-924833</p>
            <p style="margin: 0; font-size: 13px;">Address: Ati Model Town, Keraniganj, Dhaka-1312</p>
          </div>
        `;

        await transporter.sendMail({
          from: `"ATI Society Desk" <${smtpUser}>`,
          to: email,
          subject: 'We have received your Site Visit request',
          html: clientReplyHtml,
        });
      }
    } else {
      // Mock mode logging
      console.log('[API Contact] SMTP parameters are missing from environment. Form processed in mock/dev mode.');
      console.log(`[API Contact] Email notification HTML payload:\n`, emailHtml);
    }

    return NextResponse.json(
      { success: true, message: 'Lead recorded successfully. Relationship team notified.' },
      { status: 200 }
    );

  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err);
    console.error('[API Contact] Form processing error:', errMsg);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
