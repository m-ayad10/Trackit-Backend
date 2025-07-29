require("dotenv").config();
const nodemailer = require("nodemailer");

const sendOtpEmail = async (email, otp) => {
  try {
    if (!email) {
      throw new Error("Recipient email is missing");
    }


    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"Trackit" <${process.env.EMAIL}>`,
      to: email,
      subject: "Trackit: Email Verification",
      text: `${otp} is your Trackit verification code.\n\nPlease enter this code to verify your email.\n\nThank you, \nTrackit Team.`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);

    return { success: true, message: "OTP email sent successfully." };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Failed to send OTP email.", error };
  }
};

module.exports = { sendOtpEmail };