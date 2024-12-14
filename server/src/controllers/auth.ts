import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getPrismaClient } from '../prisma';

const prisma = getPrismaClient();

export const signupMentor = async (req : any, res : any) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser && existingUser.isActive==true) {
            return res.status(400).json({ msg: "Email already in use" });
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const response = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: passwordHash,
                isMentor: true,
                isActive: true,
            },
        });

        res.status(201).json({ msg: "Signup Success", response : response });
        console.log(`User signed up: ${email}`);
    } catch (e) {
        console.error(e);
        res.status(500).json({ msg: "Signup Failed" });
    }
};

export const signupMentee = async (req : any, res : any) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser && existingUser.isActive==true) {
            return res.status(400).json({ msg: "Email already in use" });
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const response = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: passwordHash,
                isMentor: false,
                isActive: true,
            },
        });

        res.status(201).json({ msg: "Signup Success", response : response});
        console.log(`User signed up: ${email}`);
    } catch (e) {
        console.error(e);
        res.status(500).json({ msg: "Signup Failed" });
    }
};

export const login = async (req : any, res : any) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user || user.isActive==false) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }

        // const isMatch = await bcrypt.compare(password, user.password);
        // if (!isMatch) {
        //     return res.status(401).json({ msg: "Invalid credentials" });
        // }

        // const secret : any = process.env.JWT_SECRET;
        // const token = jwt.sign({ id: user.id }, secret, {
        //     expiresIn: '1h', // Token expiration time
        // });

        // res.status(200).json({ msg: "Login Success", token, user });
        res.status(200).json({user});
    } catch (e) {
        console.error(e);
        res.status(500).json({ msg: "Login Failed" });
    }
};