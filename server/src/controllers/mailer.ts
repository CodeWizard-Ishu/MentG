import nodemailer from "nodemailer";
import dotenv from "dotenv";
import Imap from "node-imap";

dotenv.config();

export const transporter = nodemailer.createTransport({
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
  fullName: string
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
                                                    <li style="margin-bottom: 10px;">Go to Service tab of your dashboard & add domain with mentoring type.</li>
                                                    <li style="margin-bottom: 10px;">Setup weekly availability and add Google Calendar under Calendar Tab.</li>
                                                    <li style="margin-bottom: 10px;">Update your Profile details with Photo, bio and social accounts.</li>
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
                                        <span style="color: #ddd; margin: 0;">|</span>
                                        <a href="https://www.instagram.com/mentg.in" style="color: #4CAF50; text-decoration: none; margin: 0 10px;">Instagram</a>
                                        <span style="color: #ddd; margin: 0;">|</span>
                                        <a href="https://www.youtube.com/@MentG_in" style="color: #4CAF50; text-decoration: none; margin: 0 10px;">Youtube</a>
                                        <span style="color: #ddd; margin: 0;">|</span>
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
  fullName: string
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
                                  <p style="margin: 0 0 15px 0; font-family: Arial, sans-serif;">Thank you for joining <strong style="font-weight: bold;">MentG</strong>!<br/><br/>We’re excited to welcome you to our mentee community, where you’ll have the opportunity to connect with top industry experts and gain personalized guidance to advance your professional career.</p>
                                  <p style="margin: 0 0 15px 0; font-family: Arial, sans-serif;">What’s next?<br/>You’re all set to explore and find the mentor best suited to your needs. Once you’ve chosen, book a 1:1 virtual session to kickstart your journey.</p>
                                  <p style="margin: 0 0 15px 0; font-family: Arial, sans-serif;">Let’s get started!</p>
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
                                        <span style="color: #ddd; margin: 0;">|</span>
                                        <a href="https://www.instagram.com/mentg.in" style="color: #4CAF50; text-decoration: none; margin: 0 10px;">Instagram</a>
                                        <span style="color: #ddd; margin: 0;">|</span>
                                        <a href="https://www.youtube.com/@MentG_in" style="color: #4CAF50; text-decoration: none; margin: 0 10px;">Youtube</a>
                                        <span style="color: #ddd; margin: 0;">|</span>
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
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Password Reset Request - MentG</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; line-height: 1.6; color: #777; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f4f4;">
            <tr>
                <td align="center" style="padding: 20px 0;">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                        <tr>
                            <td align="center" style="padding: 20px;">
                                <h2 style="color: #4CAF50; margin: 0 0 20px 0; font-size: 24px; font-family: Arial, sans-serif;">Password Reset Request</h2>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 0 20px;">
                                <p style="margin: 0 0 15px 0; font-family: Arial, sans-serif;">You have requested to reset your password for your MentG account.</p>
                                
                                <div style="background-color: #f0f7ff; padding: 15px; border-radius: 5px; margin-bottom: 15px; text-align: center;">
                                    <p style="margin: 0 0 15px 0;">Click the button below to reset your password:</p>
                                    <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
                                </div>
                                
                                <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
                                    <p style="margin: 0; color: #666;">
                                        <strong>Important:</strong><br/>
                                        • This link will expire in 1 hour<br/>
                                        • If you didn't request this password reset, please contact us immediately at support@mentg.in
                                    </p>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td style="border-top: 1px solid #ddd; padding: 20px;" align="center">
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td align="center" style="font-size: 0.9em; color: #777; font-family: Arial, sans-serif;">
                                            If you have any questions, feel free to contact us at:<br style="margin: 0;">
                                            <a href="mailto:support@mentg.in" style="color: #4CAF50; text-decoration: none; margin: 0 10px;">support@mentg.in</a>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style="padding: 20px; font-size: 0.9em; color: #777; font-family: Arial, sans-serif;">
                                <p style="margin: 0 0 10px 0;">&copy; ${new Date().getFullYear()} Mentg. All rights reserved.</p>
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

  await transporter.sendMail(mailOptions);
};

export const sendBookingDetails = async (
  mentorEmail: string,
  menteeEmail: string,
  serviceName: string,
  sessionDescription: string,
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
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Booking Confirmation - MentG</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; line-height: 1.6; color: #777; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f4f4;">
            <tr>
                <td align="center" style="padding: 40px 0;">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <tr>
                            <td align="center" style="padding: 30px 20px;">
                                <h2 style="color: #4CAF50; margin: 0; font-size: 28px; font-family: Arial, sans-serif; letter-spacing: 0.5px;">Booking Confirmation</h2>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 0 30px;">
                                <p style="margin: 0 0 20px 0; font-family: Arial, sans-serif; font-size: 16px;">Your ${serviceName} has been scheduled successfully!</p>
                                
                                <div style="background-color: #f9f9f9; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
                                    <h3 style="margin: 0 0 15px 0; color: #333; font-size: 20px;">Session Details:</h3>
                                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 0;">
                                        <tr>
                                            <td style="padding: 8px 0;"><strong>Service:</strong> ${serviceName}</td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 8px 0;"><strong>Mentor:</strong> ${mentorName}</td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 8px 0;"><strong>Mentee:</strong> ${menteeName}</td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 8px 0;"><strong>Date:</strong> ${new Date(
                                              dateTime
                                            ).toLocaleDateString("en-IN")}</td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 8px 0;"><strong>Time:</strong> ${new Date(
                                              dateTime
                                            ).toLocaleTimeString("en-IN")}</td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 8px 0;"><strong>Duration:</strong> 60 minutes</td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 8px 0;">
                                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                                    <tr>
                                                        <td style="padding: 8px 0; vertical-align: top; white-space: nowrap;"><strong>Session Description:</strong></td>
                                                        <td style="padding: 8px 0;">
                                                            <p style="padding-left: 15px; white-space: pre-wrap; font-family: Arial, sans-serif; margin: 0;">dhoievoieoermgciuermbi uiv bu bruv briuv br vuirbvy rbi vurbvui uvgiv rbvbr r8t</p>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                
                                <div style="background-color: #f0f7ff; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
                                    <h3 style="margin: 0 0 15px 0; color: #333; font-size: 20px;">Meeting Link:</h3>
                                    <p style="margin: 0;">
                                        <a href="${meetLink}" style="color: #4CAF50; text-decoration: none; font-weight: bold;">Join Google Meet</a>
                                    </p>
                                </div>
                                
                                <p style="margin: 0 0 25px 0; font-family: Arial, sans-serif; font-size: 16px;">Click the Google Meet link above to join the session at the scheduled time.</p>
                            </td>
                        </tr>
                        <tr>
                            <td style="border-top: 1px solid #eee; padding: 25px;" align="center">
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td align="center" style="font-size: 14px; color: #777; font-family: Arial, sans-serif; line-height: 1.8;">
                                            If you have any questions, feel free to contact us at:<br>
                                            <a href="mailto:support@mentg.in" style="color: #4CAF50; text-decoration: none; font-weight: bold;">support@mentg.in</a>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style="padding: 20px; font-size: 14px; color: #999; font-family: Arial, sans-serif;">
                                <p style="margin: 0;">&copy; ${new Date().getFullYear()} Mentg. All rights reserved.</p>
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

  await transporter.sendMail(mailOptions);
};

export const sendNote = async (
  mentorEmail: string,
  menteeEmail: string,
  mentorName: string,
  menteeName: string,
  message: string
) => {
  const mailOptions = {
    from: "MentG - Mentoring Simplified <info@mentg.in>",
    to: mentorEmail,
    subject: `${menteeName} wants to connect with you!`,
    html: `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Mentee Note</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; line-height: 1.6; color: #777;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f4f4;">
                <tr>
                    <td align="center" style="padding: 20px 0;">
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                            <tr>
                                <td align="center" style="padding: 20px;">
                                    <h2 style="color: #4CAF50; margin: 0 0 20px 0; font-size: 24px;">Mentee Wants to Connect</h2>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 0 20px;">
                                    <p style="margin: 0 0 15px 0;">Dear ${mentorName},</p>
                                    
                                    <p style="margin: 0 0 15px 0;">A mentee named <strong>${menteeName}</strong> would like to connect with you.</p>
                                    
                                    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
                                        <h3 style="margin: 0 0 10px 0; color: #333;">Mentee's Message:</h3>
                                        <p style="margin: 0; font-style: italic;">"${message}"</p>
                                    </div>
                                    
                                    <div style="background-color: #f0f7ff; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
                                        <h3 style="margin: 0 0 10px 0; color: #333;">Contact Information:</h3>
                                        <p style="margin: 0;">
                                            You can reply directly to the mentee at: 
                                            <a href="mailto:${menteeEmail}" style="color: #4CAF50; text-decoration: none;">
                                                ${menteeEmail}
                                            </a>
                                        </p>
                                    </div>
                                    
                                    <p style="margin: 0 0 15px 0;">You can respond to this mentee by replying directly to their email address.</p>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 20px;">
                                    <p style="margin: 0 0 15px 0;">Best Regards,<br/>MentG Team</p>
                                </td>
                            </tr>
                            <tr>
                                <td style="border-top: 1px solid #ddd; padding: 20px;" align="center">
                                    <p style="font-size: 0.9em; color: #777; margin: 0;">
                                        © ${new Date().getFullYear()} MentG. All rights reserved.
                                    </p>
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

  await transporter.sendMail(mailOptions);
};

export const sendContactFormMail = async (
  name: string,
  email: string,
  message: string
) => {
  const mailOptions = {
    from: "MentG - Contact Form <info@mentg.in>",
    to: "support@mentg.in",
    subject: "Contact/Feedback Submission",
    html: `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Contact Form Submission</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; line-height: 1.6; color: #777;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f4f4;">
                <tr>
                    <td align="center" style="padding: 20px 0;">
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                            <tr>
                                <td align="center" style="padding: 20px;">
                                    <h2 style="color: #4CAF50; margin: 0 0 20px 0; font-size: 24px;">New Contact/Feedback Message</h2>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 0 20px;">
                                    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
                                        <h3 style="margin: 0 0 10px 0; color: #333;">Contact Details:</h3>
                                        <p style="margin: 0 0 5px 0;"><strong>Name:</strong> ${name}</p>
                                        <p style="margin: 0 0 5px 0;"><strong>Email:</strong> ${email}</p>
                                    </div>
                                    
                                    <div style="background-color: #f0f7ff; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
                                        <h3 style="margin: 0 0 10px 0; color: #333;">Message:</h3>
                                        <p style="margin: 0; white-space: pre-wrap;">${message}</p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style="border-top: 1px solid #ddd; padding: 20px;" align="center">
                                    <p style="font-size: 0.9em; color: #777; margin: 0;">
                                        © ${new Date().getFullYear()} MentG. All rights reserved.
                                    </p>
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

  await transporter.sendMail(mailOptions);
};
