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

export const sendMentorSignupMail = async (
  userEmail: string,
  fullName: string,
) => {
  const mailOptions = {
    from: "Mentg - Mentoring Simplified <info@mentg.in>",
    to: userEmail,
    subject: "Welcome to Mentg!",
    html: `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Welcome to MentG</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; line-height: 1.6; color: #777; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f4f4;">
                <tr>
                    <td align="center" style="padding: 20px 0;">
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                            <tr>
                                <td align="center" style="padding: 20px;">
                                    <h2 style="color: #4CAF50; margin: 0 0 20px 0; font-size: 24px; font-family: Arial, sans-serif;">Welcome, ${fullName}!</h2>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" style="padding: 0 20px 20px 20px;">
                                    <img src="https://res.cloudinary.com/dophukeh5/image/upload/v1737840150/welcome-mentor_rx0ehx.jpg" alt="welcome-mentor" width="570" style="max-width: 100%; height: auto; display: block; border-radius: 5px;">
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 0 20px;">
                                    <p style="margin: 0 0 15px 0; font-family: Arial, sans-serif;">Hi,</p>
                                    <p style="margin: 0 0 15px 0; font-family: Arial, sans-serif;">Thank you for signing up with <strong style="font-weight: bold;">MentG</strong>!<br/> <br/>Excited to have you into our mentors club. Your expertise and guidance will play a pivotal role in empowering our mentees to grow and achieve their goals.</p>
                                    
                                    <p style="margin: 0 0 15px 0; font-family: Arial, sans-serif;">Your next step is to <a href="https://mentg.in/login" style="color: #4CAF50; text-decoration: none;">login</a> and follow the below points for setting up your profile and start mentoring journey:</p>
                                    
                                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 15px;">
                                        <tr>
                                            <td style="padding-left: 20px; font-family: Arial, sans-serif;">
                                                <ol style="margin: 0; padding-left: 20px;">
                                                    <li style="margin-bottom: 10px;">Go to Service Icon & add domain with mentoring type.</li>
                                                    <li style="margin-bottom: 10px;">Setup weekly availability from Google Calendar.</li>
                                                    <li style="margin-bottom: 10px;">Update Profile details with Photo, bio with social accounts.</li>
                                                </ol>
                                            </td>
                                        </tr>
                                    </table>
                                    
                                    <p style="margin: 0 0 15px 0; font-family: Arial, sans-serif;">Hurray ! You're all set for mentoring.</p>
                                    
                                    <p style="margin: 0 0 15px 0; font-family: Arial, sans-serif;">Regards,<br style="margin: 0;">Mentg Team</p>
                                </td>
                            </tr>
                            <tr>
                                <td style="border-top: 1px solid #ddd; padding: 20px;" align="center">
                                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                        <tr>
                                            <td align="center" style="font-size: 0.9em; color: #777; font-family: Arial, sans-serif;">
                                                If you have any questions, feel free to contact us at:<br style="margin: 0;">
                                                <a href="mailto:info@mentg.in" style="color: #4CAF50; text-decoration: none; margin: 0 10px;">info@mentg.in</a>
                                                <span style="color: #ddd; margin: 0 5px;">|</span>
                                                <a href="mailto:support@mentg.in" style="color: #4CAF50; text-decoration: none; margin: 0 10px;">support@mentg.in</a>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" style="padding: 20px; font-size: 0.9em; color: #777; font-family: Arial, sans-serif;">
                                    <p style="margin: 0 0 10px 0;">&copy; ${new Date().getFullYear()} Mentg. All rights reserved.</p>
                                    <div style="margin-top: 10px;">
                                        <a href="https://www.linkedin.com/company/mentg" style="color: #4CAF50; text-decoration: none; margin: 0 10px;">LinkedIn</a>
                                        <span style="color: #ddd; margin: 0 5px;">|</span>
                                        <a href="https://www.instagram.com/mentg.in" style="color: #4CAF50; text-decoration: none; margin: 0 10px;">Instagram</a>
                                        <span style="color: #ddd; margin: 0 5px;">|</span>
                                        <a href="https://www.youtube.com/@MentG_in" style="color: #4CAF50; text-decoration: none; margin: 0 10px;">Youtube</a>
                                        <span style="color: #ddd; margin: 0 5px;">|</span>
                                        <a href="https://x.com/mentg_in" style="color: #4CAF50; text-decoration: none; margin: 0 10px;">X (Twitter)</a>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
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

export const sendMenteeSignupMail = async (
  userEmail: string,
  fullName: string,
) => {
  const mailOptions = {
    from: "Mentg - Mentoring Simplified <info@mentg.in>",
    to: userEmail,
    subject: "Welcome to MentG – Your Mentoring Journey Begins!",
    html: `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Welcome to MentG</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; line-height: 1.6; color: #777; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f4f4;">
              <tr>
                  <td align="center" style="padding: 20px 0;">
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                          <tr>
                              <td align="center" style="padding: 20px;">
                                  <h2 style="color: #4CAF50; margin: 0 0 20px 0; font-size: 24px; font-family: Arial, sans-serif;">Welcome, ${fullName}!</h2>
                              </td>
                          </tr>
                          <tr>
                              <td align="center" style="padding: 0 20px 20px 20px;">
                                  <img src="https://res.cloudinary.com/dophukeh5/image/upload/v1737840150/welcome-mentee_ybu64m.jpg" alt="welcome-mentee" width="570" style="max-width: 100%; height: auto; display: block; border-radius: 5px;">
                              </td>
                          </tr>
                          <tr>
                              <td style="padding: 0 20px;">
                                  <p style="margin: 0 0 15px 0; font-family: Arial, sans-serif;">Dear ${fullName},</p>
                                  <p style="margin: 0 0 15px 0; font-family: Arial, sans-serif;">Thank you for joining<strong style="font-weight: bold;">MentG</strong>!<br/><br/>We’re excited to welcome you to our mentee community, where you’ll have the opportunity to connect with top industry experts and gain personalized guidance to advance your professional career.</p>
                                  <br/>
                                  <p>What’s next?<br/>You’re all set to explore and find the mentor best suited to your needs. Once you’ve chosen, book a 1:1 virtual session to kickstart your journey.</p>
                                  <br/>
                                  <p>Let’s get started!</p>
                              </td>
                          </tr>
                          <tr>
                              <td style="padding: 20px;">
                                  <p style="margin: 0 0 15px 0; font-family: Arial, sans-serif;">Best Regards,<br style="margin: 0;">Mentg Team</p>
                              </td>
                          </tr>
                          <tr>
                              <td style="border-top: 1px solid #ddd; padding: 20px;" align="center">
                                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                      <tr>
                                          <td align="center" style="font-size: 0.9em; color: #777; font-family: Arial, sans-serif;">
                                              If you have any questions, feel free to contact us at:<br style="margin: 0;">
                                              <a href="mailto:info@mentg.in" style="color: #4CAF50; text-decoration: none; margin: 0 10px;">info@mentg.in</a>
                                              <span style="color: #ddd; margin: 0 5px;">|</span>
                                              <a href="mailto:support@mentg.in" style="color: #4CAF50; text-decoration: none; margin: 0 10px;">support@mentg.in</a>
                                          </td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                          <tr>
                              <td align="center" style="padding: 20px; font-size: 0.9em; color: #777; font-family: Arial, sans-serif;">
                                  <p style="margin: 0 0 10px 0;">&copy; ${new Date().getFullYear()} Mentg. All rights reserved.</p>
                                  <div style="margin-top: 10px;">
                                        <a href="https://www.linkedin.com/company/mentg" style="color: #4CAF50; text-decoration: none; margin: 0 10px;">LinkedIn</a>
                                        <span style="color: #ddd; margin: 0 5px;">|</span>
                                        <a href="https://www.instagram.com/mentg.in" style="color: #4CAF50; text-decoration: none; margin: 0 10px;">Instagram</a>
                                        <span style="color: #ddd; margin: 0 5px;">|</span>
                                        <a href="https://www.youtube.com/@MentG_in" style="color: #4CAF50; text-decoration: none; margin: 0 10px;">Youtube</a>
                                        <span style="color: #ddd; margin: 0 5px;">|</span>
                                        <a href="https://x.com/mentg_in" style="color: #4CAF50; text-decoration: none; margin: 0 10px;">X (Twitter)</a>
                                    </div>
                              </td>
                          </tr>
                      </table>
                  </td>
              </tr>
          </table>
      </body>
      </html>
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

export const sendforgotpasswordmail = async (
  email: string,
  resetUrl: string
) => {
  const mailOptions = {
    from: "MentG - Mentoring Simplified <info@mentg.in>",
    to: email,
    subject: "Password Reset Request",
    html: `
      <h1>Password Reset Request</h1>
      <p>You requested a password reset. Click the link below to reset your password:</p>
      <a href="${resetUrl}">Reset Password</a>
      <p>This link will expire in 1 hour.</p>
      <p>If you didn't request this, please inform to support@mentg.in.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export const sendBookingDetails = async (
  mentorEmail: string,
  menteeEmail: string,
  serviceName: string,
  mentorName: string,
  menteeName: string,
  dateTime: string,
  duration: string,
  meetLink: string | null | undefined
) => {
  const mailOptions = {
    from: "MentG - Mentoring Simplified <info@mentg.in>",
    to: [`${mentorEmail}`, `${menteeEmail}`],
    subject: "Booking Created Successfully - MentG",
    html: `
        <h2>Booking Confirmation</h2>
        <p>Your 1:1 session has been scheduled successfully!</p>
        <h3>Session Details:</h3>
        <ul>
          <li>Service: ${serviceName}</li>
          <li>Mentor: ${mentorName}</li>
          <li>Mentee: ${menteeName}</li>
          <li>Date: ${new Date(dateTime).toLocaleDateString("en-IN")}</li>
          <li>Time: ${new Date(dateTime).toLocaleTimeString("en-IN")}</li>
          <li>Duration: ${duration} minutes</li>
          <li>Google Meet Link: ${meetLink}</li>
        </ul>
        <p>Click the Google Meet link above to join the session at the scheduled time.</p>
      `,
  };

  await transporter.sendMail(mailOptions);
};
