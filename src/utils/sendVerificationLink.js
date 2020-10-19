import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

export const sendLink = async (res, userInfo) => {
  try {
    const email = userInfo;
    const userId = userInfo.id;
    const tokenLink = await jwt.sign({ email, userId }, process.env.JWTKEY, { expiresIn: '72h' });
    // sending email
    const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: 'muhire416@gmail.com', pass: 'tswwxpuzwlwjjrbl' } });
    const mailOptions = {
      from: 'muhire416@gmail.com', to: email, subject: 'Account Verification', html: `Hello! <br> click  <a https://phoenix-bn-staging.herokuapp.com/users/verify/${tokenLink}'>here</a> to verify your email`,
    };
    const emailsent = await transporter.sendMail(mailOptions);
    if (emailsent) {
      return res.status(200).json({ message: 'check your mail box to verify your email' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
