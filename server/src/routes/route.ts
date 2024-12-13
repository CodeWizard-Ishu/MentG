import express from 'express';
import { login, signupMentee, signupMentor } from '../controllers/auth';
import { topMentorOfDomain } from '../controllers/mentor';

const router = express.Router();

router.post('/auth/signup/mentor',signupMentor);
router.post('/auth/signup/mentee',signupMentee);
router.post('/auth/login',login);

router.get('/api/mentor/topMentors',topMentorOfDomain);

export default router;