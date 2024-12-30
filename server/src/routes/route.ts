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
import { getProfileData } from "../controllers/mentors/mentorProfile";
import { getMentorDetails, updateMentorDetails } from "../controllers/mentors/mentorDetails";
import { getMenteeDetails } from "../controllers/mentee/menteeDetails";
import verifyToken from "../middleware/auth";

const router = express.Router();

router.post("/auth/signup/mentor", signupMentor);
router.post("/auth/signup/mentee", signupMentee);
router.post("/auth/login", login);

router.get("/api/mentor/topMentors", topMentorOfDomain);

router.get("/api/mentor/:id",verifyToken, getMentorData);
router.get("/api/mentor/:id/meetings",verifyToken, getAllMeetings);

router.put("/api/mentor/update/:mentorId",verifyToken, updateService);
router.get("/api/mentor/services/:mentorId",verifyToken, getServices);

router.post("/api/mentor/updateAvailability",verifyToken, updateAvailability);
router.get("/api/mentor/getAvailability/:mentorId",verifyToken, getAvailability);

router.get("/api/mentee/getMentors",verifyToken, getMentors);
router.get("/api/getMentors",getMentors);
router.get("/api/mentee/:id/meetings",verifyToken, getAllMenteeMeetings);

router.get("/api/data/mentor/:id", getProfileData);

router.get("/api/mentorDetails/:mentorId",verifyToken, getMentorDetails);
router.put("/api/updateMentorDetails/:mentorId",verifyToken, updateMentorDetails);
router.get("/api/menteeDetails/:menteeId", getMenteeDetails);

export default router;
