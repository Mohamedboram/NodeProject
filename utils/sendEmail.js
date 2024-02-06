const nodemailer = require('nodemailer');

const sendEmail = async (req, res) => {
  try {
    const { email, subject, message } = req.body;

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Define email options
    const mailOpts = {
      from: 'E-shop App <mibrahimmsaad7@gmail.com>',
      to: email,
      subject: subject,
      text: message,
    };

    // Send email
    await transporter.sendMail(mailOpts);

    // Respond to the client
    res.status(200).json({ status: 'success', message: 'Email sent successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Failed to send email.' });
  }
};

module.exports = sendEmail;
