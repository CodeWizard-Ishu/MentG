import express from "express";
import { sendOTP, verifyOTP, signupMentor, signupMentee, login, checkAuth, logout } from "../controllers/auth";
import { forgotPassword, resetPassword } from '../controllers/resetPassword';
import cron from 'node-cron';
import { cleanupExpiredTokens } from '../controllers/resetPassword'
import { topMentorOfDomain } from "../controllers/mentors/topMentors";
import { getMentorData } from "../controllers/mentors/mentorDashboardData";
import { getAllMeetings } from "../controllers/mentors/meetingsData";
import { getServices, updateService } from "../controllers/mentors/mentorService";
import { initiateGoogleConnection, handleGoogleCallback, getCalendarConnections, disconnectCalendar } from '../controllers/mentors/connectCalendar';
import { getAvailability, updateAvailability } from "../controllers/mentors/mentorAvailablity";
import { getMentors } from "../controllers/mentee/menteeDashboard";
import { getAllMenteeMeetings } from "../controllers/mentee/meetingsData";
import { getProfileData } from "../controllers/mentors/mentorProfile";
import { getMentorDetails, updateMentorDetails } from "../controllers/mentors/mentorDetails";
import { getMenteeDetails, updateMenteeDetails } from "../controllers/mentee/menteeDetails";
import verifyToken from "../middleware/auth";
import { getBookingAvailablity, sendMentorNote } from "../controllers/bookings/Availablity";
import { getBookingFormData } from "../controllers/bookings/bookingFormData";
import { updateBooking } from "../controllers/bookings/booking";
import { createCalendarEvent } from "../controllers/bookings/CreateEvent";
import { getRatingsForMentor, submitRating } from "../controllers/mentors/rating";
import { getAllMentors } from "../controllers/mentors/allMentors";
import { ContactSubmission } from "../controllers/contactSubmission";
import { sendReminderEmails } from "../controllers/reminderMail";
import { reportBooking } from "../controllers/bookings/reportBooking";
import { searchMentors } from "../controllers/searchBox";

const router = express.Router();

// <---------CRON JOBS--------->
cron.schedule('0 0 * * *', cleanupExpiredTokens);
// cron.schedule('15 20 * * 5', sendReminderEmails);

// <---------AUTHENTICATION / AUTHORIZATION--------->
router.get("/auth/verify/:id", checkAuth);
router.post("/auth/send-otp", sendOTP);
router.post("/auth/verify-otp", verifyOTP);
router.post("/auth/signup/mentor", signupMentor);
router.post("/auth/signup/mentee", signupMentee);
router.post("/auth/login", login);
router.post('/auth/forgot-password', forgotPassword);
router.post('/auth/reset-password', resetPassword);
router.post('/auth/logout', logout)

// <---------CONTACT PAGE--------->
router.post("/api/contact", ContactSubmission);

// <---------LANDING PAGE--------->
router.post("/api/search", searchMentors)
router.get("/api/mentor/topMentors", topMentorOfDomain);
router.get("/api/allMentors", getAllMentors);
router.get("/api/getMentors", getMentors);

// <---------PROFILE PAGE--------->
router.get("/api/data/mentor/:username", getProfileData);

// <---------MENTOR DASHOBARD--------->
router.get("/api/mentor/:id", verifyToken, getMentorData);
router.get("/api/mentor/:id/meetings", verifyToken, getAllMeetings);
router.post("/api/reportMeeting/:id", verifyToken, reportBooking);

router.get("/api/mentor/services/:id", verifyToken, getServices);
router.put("/api/mentor/update/:id", verifyToken, updateService);

router.get('/api/auth/google/connect', initiateGoogleConnection);
router.get('/api/auth/google/callback', handleGoogleCallback);
router.get('/api/calendar/connections/:id', verifyToken, getCalendarConnections);
router.post('/api/calendar/disconnect/:id', verifyToken, disconnectCalendar);

router.get("/api/mentor/getAvailability/:id", verifyToken, getAvailability);
router.post("/api/mentor/updateAvailability/:id", verifyToken, updateAvailability);

router.get("/api/getRating/:username", getRatingsForMentor);
router.post("/api/rating/:id", verifyToken, submitRating);

router.get("/api/mentorDetails/:id", verifyToken, getMentorDetails);
router.put("/api/updateMentorDetails/:id", verifyToken, updateMentorDetails);

// <---------MENTEE DASHBOARD--------->
router.get("/api/mentee/getMentors/:id", verifyToken, getMentors);
router.get("/api/mentee/:id/meetings", verifyToken, getAllMenteeMeetings);
router.get("/api/menteeDetails/:id", verifyToken, getMenteeDetails);
router.put("/api/updateMenteeDetails/:id", verifyToken, updateMenteeDetails);

// <---------AVAILABILITY PAGE--------->
router.get("/api/availability/:id/:username", verifyToken, getBookingAvailablity);
router.post("/api/:id/send-note", verifyToken, sendMentorNote);

// <---------BOOKING PAGE--------->
router.get("/api/bookingData/:id/:username/:name", verifyToken, getBookingFormData);
router.post("/api/calendar/create-event/:id", verifyToken, createCalendarEvent);
router.post("/api/booking/:id", verifyToken, updateBooking);

export default router;
