
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { feedbackType, subject, description, email } = await request.json();
  
  if (!feedbackType || !subject || !description) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail', 
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    await transporter.sendMail({
      from: email || process.env.EMAIL_USER, 
      to: process.env.ADMIN_EMAIL,
      subject: `Feedback: ${feedbackType} - ${subject}`,
      text: `Feedback Type: ${feedbackType}\n\nDescription:\n${description}\n\nFrom: ${email || 'Anonymous'}`,
    });

    return NextResponse.json({ message: 'Feedback sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Failed to send feedback' }, { status: 500 });
  }
}
