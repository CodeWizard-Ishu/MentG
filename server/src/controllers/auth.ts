import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getPrismaClient } from "../prisma";
import { sendMentorSignupMail, sendMenteeSignupMail } from "./mailer";

const prisma = getPrismaClient();

const capitalize = (string: string) => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const setCookieOptions = {
  httpOnly: true,
  secure: true,       // must: make this true when using for production
  sameSite: 'none',
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/",
  domain: 'mentg.onrender.com',
}

export const signupMentor = async (req: any, res: any) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Validate input data
    if (!firstName || !email || !password) {
      throw new Error("First name, email, and password are required");
    }
    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters long");
    }
    if (!email.includes("@")) {
      throw new Error("Invalid email format");
    }

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser && existingUser.isActive) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // Create the user and MentorProfile
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
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

    //jwt
    const secret: any = process.env.JWT_SECRET;
    const token = jwt.sign({ id: user.id }, secret, { expiresIn: "7d" });
    res.cookie("token", token, setCookieOptions);

    const formattedName = `${capitalize(firstName)} ${capitalize(lastName)}`;
    sendMentorSignupMail(email, formattedName);

    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      user: {
        ...user,
        password: undefined,
      },
    });
    console.log(`User signed up as mentor: ${email}`);
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const signupMentee = async (req: any, res: any) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Validate input data
    if (!firstName || !email || !password) {
      throw new Error("First name, email, and password are required");
    }
    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters long");
    }
    if (!email.includes("@")) {
      throw new Error("Invalid email format");
    }

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser && existingUser.isActive == true) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // Create the user and mentee profile
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
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

    //jwt
    const secret: any = process.env.JWT_SECRET;
    const token = jwt.sign({ id: user.id }, secret, { expiresIn: "7d" });
    res.cookie("token", token, setCookieOptions);

    const formattedName = `${capitalize(firstName)} ${capitalize(lastName)}`;
    sendMenteeSignupMail(email, formattedName);

    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      user: {
        ...user,
        password: undefined,
      },
    });
    console.log(`User signed up as mentee: ${email}`);
  } catch (error:any) {
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
    if (!email.includes("@")) {
      throw new Error("Invalid email format");
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user || user.isActive == false) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({success: false, message: "Email/Password not matched!" });
    }

    //jwt
    const secret: any = process.env.JWT_SECRET;
	  const token = jwt.sign({id: user.id }, secret, {
		  expiresIn: "7d",
	  });

    res.cookie("token", token, setCookieOptions);

    res.status(200).json({
      success: true,
      message: "Logged in Successfully",
      user: {
        ...user,
        password: undefined,
      },
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ success: true, message: error.message });
  }
};

export const checkAuth = async (req: any, res: any) => {
  try {
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized - No token found" });
    }

    const secret: any = process.env.JWT_SECRET;
    jwt.verify(token, secret);

    res.status(200).json({ success: true, message: "Authorized" });
  } catch (error:any) {
    res.status(401).json({ success: false, message: "Authentication expired" });
  }
};

export const logout = async (req: any, res: any) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};