
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { reportType, contentUrl, description } = await request.json();

  if (!reportType || !contentUrl || !description) {
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
      from: process.env.EMAIL_USER, // Admin email
      to: process.env.ADMIN_EMAIL, // Admin's email address
      subject: `Content Report: ${reportType}`,
      text: `A new content report has been submitted.\n\nType of Report: ${reportType}\nContent URL or ID: ${contentUrl}\nDescription: ${description}`,
    });

    return NextResponse.json({ message: 'Report sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Failed to send report' }, { status: 500 });
  }
}
