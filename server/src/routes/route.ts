import express from "express";
import { login, signupMentee, signupMentor } from "../controllers/auth";
import { topMentorOfDomain } from "../controllers/mentors/topMentors";
import { getMentorData } from "../controllers/mentors/mentorDashboardData";
import { getAllMeetings } from "../controllers/mentors/meetingsData";
import {
  getServices,
  updateService,
} from "../controllers/mentors/mentorService";
import {
  getAvailability,
  updateAvailability,
} from "../controllers/mentors/mentorAvailablity";
import { getMentors } from "../controllers/mentee/menteeDashboard";
import { getAllMenteeMeetings } from "../controllers/mentee/meetingsData";
import { getPrismaClient } from "../prisma";
import { getProfileData } from "../controllers/mentors/mentorProfile";
import { getMentorDetails } from "../controllers/mentors/mentorDetails";
import { getMenteeDetails } from "../controllers/mentee/menteeDetails";

const prisma = getPrismaClient();
const router = express.Router();

router.post("/auth/signup/mentor", signupMentor);
router.post("/auth/signup/mentee", signupMentee);
router.post("/auth/login", login);

router.get("/api/mentor/topMentors", topMentorOfDomain);
router.get("/api/mentor/:id", getMentorData);
router.get("/api/mentor/:id/meetings", getAllMeetings);

router.put("/api/mentor/update/:mentorId", updateService);
router.get("/api/mentor/services/:mentorId", getServices);

router.post("/api/mentor/updateAvailability", updateAvailability);
router.get("/api/mentor/getAvailability/:mentorId", getAvailability);

router.get("/api/mentee/getMentors", getMentors);
router.get("/api/mentee/:id/meetings", getAllMenteeMeetings);

router.get("/api/data/mentor/:id", getProfileData);

router.get("/api/mentorDetails/:mentorId", getMentorDetails);
router.get("/api/menteeDetails/:menteeId", getMenteeDetails);

export default router;
