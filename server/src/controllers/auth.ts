import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getPrismaClient } from "../prisma";
import { sendSignupMail } from "./mailer";

const prisma = getPrismaClient();

const capitalize = (string: string) => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const signupMentor = async (req: any, res: any) => {
  try {
    const { firstName, lastName, email, password } = req.body;

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
        userId: user.id, // Link to the newly created user
        bio: null, // Default value for bio
        profilePicture: null, // Default value for profile picture
        services: { create: [] }, // Initialize with an empty array
        experience: null, // Default value for experience
        rating: 0, // Default rating
        totalEarnings: 0, // Default total earnings
        totalBookings: 0, // Default total bookings
        uniqueMentees: 0, // Default unique mentees count
        domains: { create: [] }, // Initialize with an empty array for domains
        availability: { create: [] }, // Initialize with an empty array for availability
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
        userId: user.id, // Link to the newly created user
        profilePicture: null, // Default value for profile picture
        goals: null, // Goals of the mentee
        bookings: { create: [] }, // Relationship to bookings
        ratings: { create: [] }, // Relationship to ratings
      },
    });
    const formattedName = `${capitalize(firstName)} ${capitalize(lastName)}`;
    sendSignupMail(email, formattedName);
    res.status(201).json({ msg: "Signup Success", user, menteeProfile });
    console.log(`User signed up: ${email}`);
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "Signup Failed" });
  }
};

export const login = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;

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

    const secret: any = process.env.JWT_SECRET;
    const token = jwt.sign({ id: user.id }, secret, {
      expiresIn: "3h", // Token expiration time
    });

    res.status(200).json({ msg: "Login Success", token, user });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "Login Failed" });
  }
};
