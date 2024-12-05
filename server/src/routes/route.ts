import express from 'express';
import { login, signupMentee, signupMentor } from '../controllers/auth';

const router = express.Router();

router.post('/auth/signup/mentor',signupMentor);
router.post('/auth/signup/mentee',signupMentee);
router.post('/auth/login',login);

export default router;