import { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';
// Initialize the cors middleware


export default async function handler(req: VercelRequest, res: VercelResponse) {

  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*'); // Adjust for production environment
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    // Handle preflight request
    res.status(200).end();
    return;
  }

  
  const { name, email, phone, company, message } = req.body;

  try {
    // Create a test account
    const testAccount = await nodemailer.createTestAccount();

    // Create a transporter
    let transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    // Send mail
    let info = await transporter.sendMail({
      from: '"M2Asolutions" <no-reply@yourdomain.com>',
      to: 'ferchichibaha7@gmail.com',
      subject: 'New Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nCompany: ${company}\nMessage: ${message}`,
      html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Phone: ${phone}</p><p>Company: ${company}</p><p>Message: ${message}</p>`,
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    res.status(200).json({ message: 'Email sent successfully!', previewUrl: nodemailer.getTestMessageUrl(info) });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }

}
