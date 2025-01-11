import nodemailer from "nodemailer";
import dotenv from "dotenv";
import Imap from "node-imap";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_SMTPHOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_ID,
    pass: process.env.MAIL_PASS,
  },
});

const mailId = process.env.MAIL_ID ?? "";
const pass = process.env.MAIL_PASS ?? "";
const imaphost = process.env.MAIL_IMAPHOST ?? "";

export const sendSignupMail = async (userEmail: string, fullName: string) => {
  const mailOptions = {
    from: "Mentg - Mentoring Simplified <info@mentg.in>",
    to: userEmail,
    subject: "Welcome to Mentg!",
    text: `Hi there,\n\nThank you for signing up at Mentg! We are thrilled to have you on board.\n\nBest Regards,\nThe Mentg Team`,
    html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #777;">
        <div style="max-width: 600px; margin: auto; padding: 20px; border-radius: 5px;">
            <h1 style="color: #4CAF50;">Welcome, ${fullName}!</h1>
            <p>Hi,</p>
            <p>Thank you for signing up at <strong>Mentg</strong>! We are thrilled to have you on board.</p>
            <p>Best Regards,<br>The Mentg Team</p>
            <hr style="border-top: 1px solid #ddd;">
            <footer style="font-size: 0.9em; color: #777; text-align: center;">
                <p>If you have any questions, feel free to contact us at<br/>
                    <a href="mailto:info@mentg.in" style="margin-right: 10px;">info@mentg.in</a>
                    <span style="margin-right: 10px;">|</span>
                    <a href="mailto:support@mentg.in">support@mentg.in</a>.
                </p>
                <p>&copy; ${new Date().getFullYear()} Mentg. All rights reserved.</p>
                <div style="margin-top: 10px;">
                    <a href="https://x.com/mentg_in" style="margin-right: 10px;">X (Twitter)</a>
                    <span style="margin-right: 10px;">|</span>
                    <a href="https://www.instagram.com/mentg.in" style="margin-right: 10px;">Instagram</a>
                    <span style="margin-right: 10px;">|</span>
                    <a href="https://www.linkedin.com/company/mentg">LinkedIn</a>
                </div>
            </footer>
        </div>
    </div>
    `,
  };

  try {
    // Send mail with defined transport object.
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);

    // Now save a copy to Sent folder using IMAP.
    const imap = new Imap({
      user: mailId,
      password: pass,
      host: imaphost, // Replace with your IMAP server host.
      port: 993,
      tls: true,
    });

    imap.once("ready", () => {
      const emailToAppend = [
        `From: ${mailOptions.from}\r\n`,
        `To: ${mailOptions.to}\r\n`,
        `Subject: ${mailOptions.subject}\r\n`,
        `Date: ${new Date().toUTCString()}\r\n`,
        `Content-Type: text/html; charset=UTF-8\r\n`,
        "\r\n",
        mailOptions.html,
      ].join("");

      imap.append(
        emailToAppend,
        {
          mailbox: "Sent",
          flags: ["\\Seen"],
        },
        (err) => {
          if (err) throw err;
          console.log("Email saved to Sent folder");
          imap.end();
        }
      );
    });

    imap.connect();
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
