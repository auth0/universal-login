const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "localhost",
  port: 2525,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "test",
    pass: "test",
  },
});

transporter.sendMail({
  from: '"Sender Name" <sender@example.com>',
  to: "nandan.bhat@okta.com",
  subject: "Hello",
  text: "This is a test email",
}).then(info => {
  console.log("Message sent: %s", info.messageId);
}).catch(error => {
  console.error("Error sending email:", error);
});
