import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Separator } from "../components/ui/separator";
import Header from "../components/Header";
import BACKEND_URL from "../endpoint";
import useBookingStore from "../Hooks/useBookingStore";
import { useNavigate, useParams } from "react-router-dom";

interface PaymentInfo {
  sessionFees: number;
  platformFees: number;
  discount: number;
  total: number;
}

interface FormValues {
  name: string;
  phone: string | "";
  email: string;
  sessionDetails: string;
}

interface Mentee {
  phoneNumber: string | null;
  user: {
    email: string;
    firstName: string;
    lastName: string | null;
  };
}

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  sessionDetails: Yup.string()
    .min(10, "Please provide more details (minimum 10 characters)")
    .required("Session details are required"),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetchPaymentInfo = async (mentorId: any, name: any, token: any) => {
  const response = await fetch(
    `${BACKEND_URL}/api/service/${mentorId}/${name.name}`,
    {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return {
    sessionFees: data.data.price,
    platformFees: 0,
    discount: -data.data.price,
    total: 0,
  };
};

const BookingPage: React.FC = () => {
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mentee, setMentee] = useState<Mentee | null>();
  const token = sessionStorage.getItem("userToken") ?? "";
  const menteeId = sessionStorage.getItem("userId");
  const { mentorId } = useParams();
  const {
    selectedService,
    selectedSlot,
    mentorDetails,
    setBookingDetails,
    clearBooking,
  } = useBookingStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedService || !selectedSlot || !mentorDetails) {
      navigate("/");
    }
  }, [selectedService, selectedSlot, mentorDetails, navigate]);

  useEffect(() => {
    const getFormData = async () => {
      const response = await fetch(
        `${BACKEND_URL}/api/bookingform/${menteeId}`,
        {
          method: "GET",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setMentee(data);
    };
    const getPaymentInfo = async () => {
      try {
        const info = await fetchPaymentInfo(mentorId, selectedService, token);
        setPaymentInfo(info);
      } catch (error) {
        console.error("Error fetching payment information:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getFormData();
    getPaymentInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialValues: FormValues = {
    name: sessionStorage.getItem("fullName") || "",
    phone: mentee?.phoneNumber || "",
    email: mentee?.user.email || "",
    sessionDetails: "",
  };

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    try {
      setBookingDetails({
        name: values.name,
        email: values.email,
        phone: values.phone,
        sessionDetails: values.sessionDetails,
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const calculateDuration = (start: any, end: any): number => {
        const startDate = new Date(`2025-01-07T${start}:00Z`); // Combine with a date
        const endDate = new Date(`2025-01-07T${end}:00Z`); // Combine with a date
        const durationInMinutes: number =
          (endDate.getTime() - startDate.getTime()) / (1000 * 60); // Convert milliseconds to minutes
        return durationInMinutes;
      };

      const bookingData = {
        mentorId: mentorId, // Replace with actual mentor ID
        menteeId: menteeId, // Replace with actual mentee ID
        dateTime: new Date(
          `${selectedSlot?.date.split("T")[0]}T${selectedSlot?.startTime}:00Z`
        ).toLocaleString(),
        duration: calculateDuration(
          selectedSlot?.startTime,
          selectedSlot?.endTime
        ),
        payment: paymentInfo?.total, // Payment amount (can be adjusted based on your logic)
        serviceName: selectedService?.name,
        serviceDescription: values.sessionDetails,
        servicePrice: selectedService?.price,
      };

      const response = await fetch(`${BACKEND_URL}/api/booking`, {
        method: "POST",
        headers: {
          Authorization : token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });
      if (!response.ok) {
        throw new Error("Booking failed");
      }
      alert("Form submitted successfully!");
      clearBooking();
      navigate(`/profile/${mentorId}`);
    } catch (error) {
      console.error("error creating booking:", error);
      alert("failed to create booking!");
    } finally {
      setSubmitting(false);
      resetForm();
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const BookingSummary = () => {
    const formatDate = (dateString: string | undefined) => {
      if (!dateString) return "";
      return new Date(dateString).toLocaleDateString();
    };

    return (
      <div className="space-y-4 bg-gray-200 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-lg">Booking Summary</h3>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="font-medium">Mentor</p>
            <p>{mentorDetails?.name}</p>
          </div>

          <div>
            <p className="font-medium">Service</p>
            <p>{selectedService?.name}</p>
          </div>

          <div>
            <p className="font-medium">Date</p>
            <p>{formatDate(selectedSlot?.date)}</p>
          </div>

          <div>
            <p className="font-medium">Time</p>
            <p>{`${selectedSlot?.startTime} - ${selectedSlot?.endTime}`}</p>
          </div>

          <div>
            <p className="font-medium">Price</p>
            <p>{formatCurrency(selectedService?.price || 0)}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-sky-200">
      <Header />

      <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <Card className="w-full max-w-md mx-auto shadow-lg">
          <CardHeader className="space-y-2 p-4 sm:p-6">
            <CardTitle className="text-2xl sm:text-3xl font-bold text-center">
              Complete your Booking
            </CardTitle>
          </CardHeader>

          <CardContent className="p-4 sm:p-6">
            {mentee && selectedService && selectedSlot && (
              <>
                {" "}
                <BookingSummary />{" "}
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched, isSubmitting }) => (
                    <Form className="space-y-4 sm:space-y-6">
                      <div className="space-y-1 sm:space-y-2">
                        <Label htmlFor="name" className="text-sm sm:text-base">
                          Name
                        </Label>
                        <Field
                          as={Input}
                          id="name"
                          name="name"
                          type="text"
                          disabled
                          className={`text-sm sm:text-base ${
                            touched.name && errors.name ? "border-red-500" : ""
                          }`}
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-red-500 text-xs sm:text-sm"
                        />
                      </div>

                      <div className="space-y-1 sm:space-y-2">
                        <Label htmlFor="phone" className="text-sm sm:text-base">
                          Phone
                        </Label>
                        <Field
                          as={Input}
                          id="phone"
                          name="phone"
                          type="tel"
                          className={`text-sm sm:text-base ${
                            touched.phone && errors.phone
                              ? "border-red-500"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          name="phone"
                          component="div"
                          className="text-red-500 text-xs sm:text-sm"
                        />
                      </div>

                      <div className="space-y-1 sm:space-y-2">
                        <Label htmlFor="email" className="text-sm sm:text-base">
                          Email
                        </Label>
                        <Field
                          as={Input}
                          id="email"
                          name="email"
                          type="email"
                          disabled
                          className={`text-sm sm:text-base ${
                            touched.email && errors.email
                              ? "border-red-500"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-red-500 text-xs sm:text-sm"
                        />
                      </div>

                      <div className="space-y-1 sm:space-y-2">
                        <Label
                          htmlFor="sessionDetails"
                          className="text-sm sm:text-base"
                        >
                          What is the session about?
                        </Label>
                        <Field
                          as={Textarea}
                          id="sessionDetails"
                          name="sessionDetails"
                          rows={4}
                          className={`text-sm sm:text-base ${
                            touched.sessionDetails && errors.sessionDetails
                              ? "border-red-500"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          name="sessionDetails"
                          component="div"
                          className="text-red-500 text-xs sm:text-sm"
                        />
                      </div>

                      <CardFooter className="flex flex-col px-0 pt-4">
                        <Separator className="my-4" />
                        <div className="w-full space-y-3">
                          <h3 className="font-semibold text-base sm:text-lg">
                            Payment Details
                          </h3>
                          {isLoading ? (
                            <div className="text-center py-4 text-sm sm:text-base">
                              Loading payment information...
                            </div>
                          ) : paymentInfo ? (
                            <>
                              <div className="flex justify-between items-center text-sm sm:text-base">
                                <span className="text-gray-600">
                                  Session Fees
                                </span>
                                <span className="font-medium">
                                  {formatCurrency(paymentInfo.sessionFees)}
                                </span>
                              </div>
                              <div className="flex justify-between items-center text-sm sm:text-base">
                                <span className="text-gray-600">
                                  Platform Fees
                                </span>
                                <span className="font-medium">
                                  {formatCurrency(paymentInfo.platformFees)}
                                </span>
                              </div>
                              <div className="flex justify-between items-center text-sm text-red-500 sm:text-base">
                                <span className="text-gray-600">Discount</span>
                                <span className="font-medium">
                                  {formatCurrency(paymentInfo.discount)}
                                </span>
                              </div>
                              <Separator className="my-2" />
                              <div className="flex justify-between items-center font-semibold text-sm sm:text-base">
                                <span>Total Payment</span>
                                <span className="text-base sm:text-lg">
                                  {formatCurrency(paymentInfo.total)}
                                </span>
                              </div>
                            </>
                          ) : (
                            <div className="text-center py-4 text-red-500 text-sm sm:text-base">
                              Error loading payment information
                            </div>
                          )}
                        </div>
                        <div className="w-full flex justify-end mt-6">
                          <Button
                            type="submit"
                            className="bg-[#08286b] hover:bg-[#08276bcc] text-sm sm:text-base w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3"
                            disabled={isSubmitting || isLoading}
                          >
                            {isSubmitting ? "Submitting..." : `Pay and Book`}
                          </Button>
                        </div>
                      </CardFooter>
                    </Form>
                  )}
                </Formik>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingPage;
