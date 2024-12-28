const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();


const senderMail = process.env.GMAIL;
const appPassword = process.env.APP_PASSWORD;
const receiverMail = 'kaungmyatzawwin3@gmail.com';

exports.sendEmail = async (
    name,
    title,
    dueDate,
    pickupDeliveryChoice,
    reciverEmail
) =>{
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: senderMail,
            pass: appPassword,
        },
    });

    const mailOptions = {
        from: senderMail,
        to: reciverEmail,
        subject: "Borrowing information",
        text: "Your borrowed media information.",
        html: `
    <body
  style="
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
    font-family: Arial, sans-serif;
  "
>
  <table
    cellspacing="0"
    cellpadding="0"
    align="center"
    style="
      max-width: 600px;
      margin: 50px auto;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      width: 100%;
    "
  >
    <tr>
      <td>
        <table
          cellspacing="0"
          cellpadding="0"
          align="center"
          style="width: 100%"
        >
          <tr>
            <td
              style="
                background-color: #0a5687;
                padding: 20px;
                text-align: center;
              "
            >
              <h3 style="color: #ffffff; margin: 0; font-size: 20px">
                Borrowing Confirmation
              </h3>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px; border-bottom: 2px solid #01577d">
              <h2
                style="color: #0a5687; font-size: 18px; margin-bottom: 20px"
              >
                Dear ${name},
              </h2>
              <p style="color: #444444; font-size: 18px; margin-bottom: 20px">
                Thank you for borrowing from our library. Below are the details of your borrowed media:
              </p>
              <table
                style="
                  width: 100%;
                  border-collapse: collapse;
                  margin-bottom: 20px;
                  color: #444444;
                "
              >
                <tr style="background-color: #f9f9f9">
                  <th style="padding: 10px; text-align: left; border: 1px solid #ddd">Title</th>
                  <td style="padding: 10px; border: 1px solid #ddd">${title}</td>
                </tr>
                <tr>
                  <th style="padding: 10px; text-align: left; border: 1px solid #ddd">Due Date</th>
                  <td style="padding: 10px; border: 1px solid #ddd">${dueDate}</td>
                </tr>
                <tr style="background-color: #f9f9f9">
                  <th style="padding: 10px; text-align: left; border: 1px solid #ddd">Pickup/Delivery</th>
                  <td style="padding: 10px; border: 1px solid #ddd">${pickupDeliveryChoice}</td>
                </tr>
              </table>
              <p style="color: #444444; font-size: 18px; margin-bottom: 20px">
                Please ensure the media is returned by the due date to avoid fines. If you have any questions, feel free to contact us.
              </p>
              <p style="color: #444444; font-size: 18px; margin-bottom: 20px">
                Happy reading!
              </p>
              <p style="color: #444444; font-size: 18px; margin-bottom: 0">
                Best regards,<br />Tech Yoke Library Team
              </p>
            </td>
          </tr>
        </table>
        <table
          cellspacing="0"
          cellpadding="0"
          align="center"
          style="width: 100%"
        >
          <tr>
            <td
              style="
                text-align: center;
                padding: 20px;
                font-size: 12px;
                color: #999999;
                background-color: #0a5687;
              "
            >
              <p style="margin: 0">
                &copy; 2024 Tech Yoke Library. All rights reserved.
              </p>
              <p style="margin: 0">
                <a href="#" style="color: #999999; text-decoration: none"
                  >Privacy Policy</a
                >
                |
                <a href="#" style="color: #999999; text-decoration: none"
                  >Terms of Service</a
                >
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>

`,
    };

    const info = transporter.sendMail(mailOptions);
    return info;
}
