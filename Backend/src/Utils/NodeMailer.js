const nodemailer = require("nodemailer")

const NodeMailer = (email, otp) => {

  const transporter = nodemailer.createTransport({

    service: "gmail",
    auth: {
      user: process.env.GMAIL,
      pass: process.env.GMAIL_PW
    }

  })

  const emailObj = {

    from: process.env.GMAIL,
    to: email,
    subject: "Confirm Your Email",
    text: "Your OTP is "+otp+" this OTP is valid for 5 minutes."
  }

  return transporter.sendMail(emailObj)

}

module.exports = NodeMailer;