import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import NodeCache from "node-cache";
import { randomInt } from "crypto";
import { getPrismaClient } from "../prisma";
import { sendMentorSignupMail, sendMenteeSignupMail, sendOTPMail } from "./mailer";

const prisma = getPrismaClient();

const otpCache = new NodeCache({ 
  stdTTL: 600,
  checkperiod: 120
});

const capitalize = (string : string) => {
  return string.toLowerCase().split(' ').map(function(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
}

const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

export const sendOTP = async (req: any, res: any) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required" });
  }
  if (!emailRegex.test(email)){
    return res.status(400).json({ success: false, message: "Invalid email format" });
  }

  const otp = randomInt(100000, 999999).toString();

  try {
    await sendOTPMail(email, otp);

    otpCache.set(email, otp);

    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
};

export const verifyOTP = async (req: any, res: any) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ success: false, message: "Email and OTP are required" });
  }
  if (!emailRegex.test(email)){
    return res.status(400).json({ success: false, message: "Invalid email format" });
  }

  const storedOTP = otpCache.get<string>(email);

  if (!storedOTP) {
    return res.status(400).json({ success: false, message: "OTP has expired" });
  }

  if (storedOTP === otp) {
    otpCache.del(email);

    const secret: any = process.env.JWT_SECRET;
    const tempToken = jwt.sign({ emailId: email }, secret, { expiresIn: "10m" });

    res.status(200).json({ success: true, message: "OTP verified successfully", tempToken: tempToken });
  } else {
    res.status(400).json({ success: false, message: "Invalid OTP" });
  }
};

export const signupMentor = async (req: any, res: any) => {
  const { firstName, lastName, email, password, tempToken } = req.body;

  try {
    // Verify temporary token
    const secret: any = process.env.JWT_SECRET;
    const decoded: any = jwt.verify(tempToken, secret);
    if (decoded.emailId !== email) {
      throw new Error("Invalid or expired verification token");
    }

    if (!firstName || !email || !password) {
      throw new Error("First name, email, and password are required");
    }
    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters long");
    }
    if (!emailRegex.test(email)){
      throw new Error("Invalid email format");
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser && existingUser.isActive) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const formattedFirstName = capitalize(firstName);
    const formattedLastName = capitalize(lastName);

    const user = await prisma.user.create({
      data: {
        firstName: formattedFirstName,
        lastName: formattedLastName,
        email,
        password: passwordHash,
        isMentor: true,
        isActive: true,
      },
    });
    await prisma.mentorProfile.create({
      data: {
        userId: user.id,
        bio: null,
        profilePicture: null,
        services: { create: [] },
        experience: null,
        rating: 0,
        totalEarnings: 0,
        totalBookings: 0,
        uniqueMentees: 0,
        domains: { create: [] },
        availability: { create: [] },
      },
    });

    const token = jwt.sign({ id: user.id }, secret, { expiresIn: "7d" });
    const formattedName = `${capitalize(firstName)} ${capitalize(lastName)}`;
    sendMentorSignupMail(email, formattedName);

    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      user: { ...user, password: undefined },
      token,
    });
    console.log(`User signed up as mentor: ${email}`);
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const signupMentee = async (req: any, res: any) => {
  const { firstName, lastName, email, password, tempToken } = req.body;

  try {
    // Verify temporary token
    const secret: any = process.env.JWT_SECRET;
    const decoded: any = jwt.verify(tempToken, secret);
    if (decoded.emailId !== email) {
      throw new Error("Invalid or expired verification token");
    }

    if (!firstName || !email || !password) {
      throw new Error("First name, email, and password are required");
    }
    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters long");
    }
    if (!emailRegex.test(email)){
      throw new Error("Invalid email format");
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser && existingUser.isActive) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const formattedFirstName = capitalize(firstName);
    const formattedLastName = capitalize(lastName);

    const user = await prisma.user.create({
      data: {
        firstName: formattedFirstName,
        lastName: formattedLastName,
        email,
        password: passwordHash,
        isMentor: false,
        isActive: true,
      },
    });
    await prisma.menteeProfile.create({
      data: {
        userId: user.id,
        profilePicture: null,
        goals: null,
        bookings: { create: [] },
        ratings: { create: [] },
      },
    });

    const token = jwt.sign({ id: user.id }, secret, { expiresIn: "7d" });
    const formattedName = `${capitalize(firstName)} ${capitalize(lastName)}`;
    sendMenteeSignupMail(email, formattedName);

    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      user: { ...user, password: undefined },
      token,
    });
    console.log(`User signed up as mentee: ${email}`);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req: any, res: any) => {
  const { email, password } = req.body;

  try {
    // Validate input data
    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    if (!emailRegex.test(email)){
      throw new Error("Invalid email format");
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user || user.isActive == false) {
      return res.status(400).json({ success: false, message: "User does not exist" });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Email/Password not matched!" });
    }

    //jwt
    const secret: any = process.env.JWT_SECRET;
    const token = jwt.sign({ id: user.id }, secret, { expiresIn: "7d" });

    // res.cookie("token", token, setCookieOptions);

    res.status(200).json({
      success: true,
      message: "Logged in Successfully",
      user: {
        ...user,
        password: undefined,
      },
      token,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ success: true, message: error.message });
  }
};

export const checkAuth = async (req: any, res: any) => {
  try {
    // const token = req.cookies.token;
    let token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized - No token found" });
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    try {
      const secret: any = process.env.JWT_SECRET;
      const verified: any = jwt.verify(token, secret);

      const { id } = req.params;
      const requestedId = parseInt(id, 10);
      const tokenUserId = parseInt(verified.id, 10);
      if (requestedId && requestedId !== tokenUserId) {
        return res.status(403).json({ message: "Unauthorized" });
      }
      res.status(200).json({ success: true, message: "Authorized" });
    } catch (error) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
  } catch (error: any) {
    res.status(401).json({ success: false, message: "Authentication expired" });
  }
};

export const logout = async (req: any, res: any) => {
  // res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};
