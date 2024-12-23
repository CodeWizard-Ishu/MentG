import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
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

interface PaymentInfo {
  sessionFees: number;
  platformFees: number;
  total: number;
}

interface FormValues {
  name: string;
  phone: string;
  email: string;
  sessionDetails: string;
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

// Mock API call with Indian Rupee amounts
const fetchPaymentInfo = async (): Promise<PaymentInfo> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    sessionFees: 0, // ₹1,500
    platformFees: 0, // ₹150
    total: 0, // ₹1,650
  };
};

const BookingPage: React.FC = () => {
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const initialValues: FormValues = {
    name: "",
    phone: "",
    email: "",
    sessionDetails: "",
  };

  useEffect(() => {
    const getPaymentInfo = async () => {
      try {
        const info = await fetchPaymentInfo();
        setPaymentInfo(info);
      } catch (error) {
        console.error("Error fetching payment information:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getPaymentInfo();
  }, []);

  const handleSubmit = (
    values: FormValues,
    { setSubmitting, resetForm }: any
  ) => {
    console.log("Form values:", values);
    console.log("Payment details:", paymentInfo);
    alert("Form submitted successfully!");
    setSubmitting(false);
    resetForm();
  };

  // currency formatter for Indian Rupees
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0, // Remove decimal points
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-sky-100">
      <header className="sticky top-0 z-50  backdrop-blur-md flex justify-between items-center p-6 shadow-md">
        <div>
          <a href="/" className="flex items-center">
            <img
              src="https://i.ibb.co/tPzj54M/logo.png"
              alt="Logo"
              className="h-10 w-10"
            />
            <span className="font-bold text-2xl">MentG</span>
          </a>
        </div>
      </header>
      <Card className="mt-16 w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Book your Session
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Field
                    as={Input}
                    id="name"
                    name="name"
                    type="text"
                    className={`${
                      touched.name && errors.name ? "border-red-500" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Field
                    as={Input}
                    id="phone"
                    name="phone"
                    type="tel"
                    className={`${
                      touched.phone && errors.phone ? "border-red-500" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                    type="email"
                    className={`${
                      touched.email && errors.email ? "border-red-500" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sessionDetails">
                    What is the session about?
                  </Label>
                  <Field
                    as={Textarea}
                    id="sessionDetails"
                    name="sessionDetails"
                    rows={4}
                    className={`${
                      touched.sessionDetails && errors.sessionDetails
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="sessionDetails"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <CardFooter className="flex flex-col px-0">
                  <Separator className="my-4" />
                  <div className="w-full space-y-3">
                    <h3 className="font-semibold text-lg">Payment Details</h3>
                    {isLoading ? (
                      <div className="text-center py-4">
                        Loading payment information...
                      </div>
                    ) : paymentInfo ? (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Session Fees</span>
                          <span className="font-medium">
                            {formatCurrency(paymentInfo.sessionFees)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Platform Fees</span>
                          <span className="font-medium">
                            {formatCurrency(paymentInfo.platformFees)}
                          </span>
                        </div>
                        <Separator className="my-2" />
                        <div className="flex justify-between items-center font-semibold">
                          <span>Total Payment</span>
                          <span className="text-lg">
                            {formatCurrency(paymentInfo.total)}
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-4 text-red-500">
                        Error loading payment information
                      </div>
                    )}
                  </div>
                  <div className="w-full flex justify-end mt-6">
                    <Button
                      type="submit"
                      className="bg-black hover:bg-gray-700"
                      disabled={isSubmitting || isLoading}
                    >
                      {isSubmitting ? "Submitting..." : `Pay and Book`}
                    </Button>
                  </div>
                </CardFooter>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingPage;
