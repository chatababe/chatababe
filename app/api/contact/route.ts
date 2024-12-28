
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { firstName, lastName, email, subject, message } = await request.json();

  if (!firstName || !lastName || !email || !subject || !message) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Use your email service provider
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app password
      },
    });

    await transporter.sendMail({
      from: email, 
      to: process.env.ADMIN_EMAIL, 
      subject: `Contact Form Submission: ${subject}`,
      text: `You have received a new message from the contact form.\n\nName: ${firstName} ${lastName}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
    });

    return NextResponse.json({ message: 'Message sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Failed to send message' }, { status: 500 });
  }
}
