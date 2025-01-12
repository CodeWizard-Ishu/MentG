import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getPrismaClient } from "../prisma";
import { sendSignupMail } from "./mailer";

const prisma = getPrismaClient();

const capitalize = (string: string) => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

// Validation function
const validateSignupData = (firstName: string, email: string, password: string) => {
  if (!firstName || !email || !password) {
    return "First name, email, and password are required.";
  }
  if (password.length < 6) {
    return "Password must be at least 6 characters long.";
  }
  if (!email.includes("@")) {
    return "Invalid email format.";
  }
  return null;
};

export const signupMentor = async (req: any, res: any) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Validate input data
    const validationError = validateSignupData(firstName, email, password);
    if (validationError) {
      return res.status(400).json({ msg: validationError });
    }

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser && existingUser.isActive) {
      return res.status(400).json({ msg: "Email already in use" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // Create the user
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

    // Create the MentorProfile with default values
    const mentorProfile = await prisma.mentorProfile.create({
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

    const formattedName = `${capitalize(firstName)} ${capitalize(lastName)}`;
    sendSignupMail(email, formattedName);
    
    res.status(201).json({ msg: "Signup Success", user, mentorProfile });
    console.log(`User signed up as mentor: ${email}`);
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "Signup Failed" });
  }
};

export const signupMentee = async (req: any, res: any) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Validate input data
    const validationError = validateSignupData(firstName, email, password);
    if (validationError) {
      return res.status(400).json({ msg: validationError });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser && existingUser.isActive == true) {
      return res.status(400).json({ msg: "Email already in use" });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

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

    const menteeProfile = await prisma.menteeProfile.create({
      data: {
        userId: user.id,
        profilePicture: null,
        goals: null,
        bookings: { create: [] },
        ratings: { create: [] },
      },
    });

    const formattedName = `${capitalize(firstName)} ${capitalize(lastName)}`;
    sendSignupMail(email, formattedName);
    
    res.status(201).json({ msg: "Signup Success", user, menteeProfile });
    console.log(`User signed up as mentee: ${email}`);
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "Signup Failed" });
  }
};

export const login = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;

    // Validate input data
    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password are required." });
    }
    
    if (!email.includes("@")) {
      return res.status(400).json({ msg: "Invalid email format." });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || user.isActive == false) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const secret:any = process.env.JWT_SECRET;
    
    const token = jwt.sign({ id: user.id }, secret, {
      expiresIn: "3h",
    });

   res.status(200).json({ msg: "Login Success", token, user });
  } catch (e) {
   console.error(e);
   res.status(500).json({ msg: "Login Failed" });
  }
};
