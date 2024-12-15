import express from 'express';
import { login, signupMentee, signupMentor } from '../controllers/auth';
import { topMentorOfDomain } from '../controllers/mentors/topMentors';
import { getMentorData } from '../controllers/mentors/mentorDashboardData';
import { getAllMeetings } from '../controllers/mentors/meetingsData';

const router = express.Router();

router.post('/auth/signup/mentor',signupMentor);
router.post('/auth/signup/mentee',signupMentee);
router.post('/auth/login',login);

router.get('/api/mentor/topMentors',topMentorOfDomain);
router.get('/api/mentor/:id',getMentorData);
router.get('/api/mentor/:id/meetings', getAllMeetings);

export default router;