import express from "express";
import { checkAuth, login, logout, signupMentee, signupMentor } from "../controllers/auth";
import { forgotPassword, resetPassword } from '../controllers/auth.controller';
import cron from 'node-cron';
import { cleanupExpiredTokens } from '../controllers/auth.controller'
import { topMentorOfDomain } from "../controllers/mentors/topMentors";
import { getMentorData } from "../controllers/mentors/mentorDashboardData";
import { getAllMeetings } from "../controllers/mentors/meetingsData";
import {
  getServices,
  updateService,
} from "../controllers/mentors/mentorService";
import { 
  initiateGoogleConnection, 
  handleGoogleCallback, 
  getCalendarConnections,
  disconnectCalendar 
} from '../controllers/mentors/connectCalendar';
import {
  getAvailability,
  updateAvailability,
} from "../controllers/mentors/mentorAvailablity";
import { getMentors } from "../controllers/mentee/menteeDashboard";
import { getAllMenteeMeetings } from "../controllers/mentee/meetingsData";
import { getProfileData } from "../controllers/mentors/mentorProfile";
import {
  getMentorDetails,
  updateMentorDetails,
} from "../controllers/mentors/mentorDetails";
import {
  getMenteeDetails,
  updateMenteeDetails,
} from "../controllers/mentee/menteeDetails";
import verifyToken from "../middleware/auth";
import { getBookingAvailablity, sendMentorNote } from "../controllers/bookings/Availablity";
import { getMentorEmail } from "../controllers/bookings/mentorEmail";
import { getBookingFormData } from "../controllers/bookings/BookingForm";
import { getServiceDetail } from "../controllers/bookings/payment";
import { updateBooking } from "../controllers/bookings/booking";
import { createCalendarEvent } from "../controllers/bookings/CreateEvent";
import {
  getRatingsForMentor,
  submitRating,
} from "../controllers/bookings/rating";
import { getAllMentors } from "../controllers/mentors/allMentors";
import { ContactSubmission } from "../controllers/contactSubmission";
import { sendReminderEmails } from "../controllers/reminderMail";

const router = express.Router();

router.get("/auth/verify/:id", checkAuth);
router.post("/auth/signup/mentor", signupMentor);
router.post("/auth/signup/mentee", signupMentee);
router.post("/auth/login", login);
router.post('/auth/forgot-password', forgotPassword);
router.post('/auth/reset-password', resetPassword);
router.post('/auth/logout', logout)
cron.schedule('0 0 * * *', cleanupExpiredTokens);
cron.schedule('15 20 * * 5', sendReminderEmails);

router.post("/api/contact", ContactSubmission);

router.get("/api/mentor/topMentors", topMentorOfDomain);

router.get("/api/mentor/:id", verifyToken, getMentorData);
router.get("/api/mentor/:id/meetings", verifyToken, getAllMeetings);

router.put("/api/mentor/update/:id", verifyToken, updateService);
router.get("/api/mentor/services/:id", verifyToken, getServices);

router.get('/api/auth/google/connect', initiateGoogleConnection);
router.get('/api/auth/google/callback', handleGoogleCallback);
router.get('/api/calendar/connections/:id', verifyToken, getCalendarConnections);
router.post('/api/calendar/disconnect/:id', verifyToken, disconnectCalendar);
router.post("/api/mentor/updateAvailability/:id", verifyToken, updateAvailability);
router.get("/api/mentor/getAvailability/:id", verifyToken, getAvailability);

router.get("/api/mentee/getMentors/:id", verifyToken, getMentors);
router.get("/api/allMentors", getAllMentors);
router.get("/api/getMentors", getMentors);
router.get("/api/mentee/:id/meetings", verifyToken, getAllMenteeMeetings);

router.get("/api/data/mentor/:id", getProfileData);

router.get("/api/mentorDetails/:id", verifyToken, getMentorDetails);
router.put("/api/updateMentorDetails/:id", verifyToken, updateMentorDetails);

router.get("/api/menteeDetails/:id", verifyToken, getMenteeDetails);
router.put("/api/updateMenteeDetails/:id", verifyToken,updateMenteeDetails);

router.get("/api/availability/:id/:mentorId", verifyToken, getBookingAvailablity);
router.post("/api/:id/send-note", verifyToken, sendMentorNote)
router.get("/api/mentorEmail/:id/:mentorId", verifyToken, getMentorEmail);
router.get("/api/bookingform/:id", verifyToken, getBookingFormData);

router.get("/api/service/:id/:mentorId/:name", verifyToken, getServiceDetail);
router.post("/api/calendar/create-event/:id", verifyToken, createCalendarEvent);
router.post("/api/booking/:id", verifyToken, updateBooking);

router.post("/api/rating/:id", verifyToken, submitRating);
router.get("/api/getRating/:id", verifyToken, getRatingsForMentor);
export default router;
