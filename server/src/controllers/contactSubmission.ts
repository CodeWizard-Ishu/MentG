import { sendContactFormMail } from "./mailer";

const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

export const ContactSubmission = async (req: any, res: any) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false,message: "Please provide all required fields" });
    }
    if (!emailRegex.test(email)){
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }

    sendContactFormMail(name, email, message);

    res.status(200).json({ success: true,message: "Message sent successfully" });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({ success: false,message: "Internal server error" });
  }
};
