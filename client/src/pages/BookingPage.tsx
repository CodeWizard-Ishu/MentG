import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";

const BookingPage: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      sessionDetails: "",
    },
    validationSchema: Yup.object({
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
    }),
    onSubmit: (values) => {
      console.log(values);
      // Handle form submission here
      alert("Form submitted successfully!");
    },
  });

  return (
    <div className="min-h-screen bg-sky-100">
      <header className="top-0 z-50 bg-sky-100 backdrop-blur-md flex justify-between items-center p-6 shadow-md">
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
          <CardTitle className="text-2xl font-bold text-center">
            Book your Session
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className={
                  formik.touched.name && formik.errors.name
                    ? "border-red-500"
                    : ""
                }
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-500 text-sm">{formik.errors.name}</div>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                className={
                  formik.touched.phone && formik.errors.phone
                    ? "border-red-500"
                    : ""
                }
              />
              {formik.touched.phone && formik.errors.phone ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.phone}
                </div>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className={
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : ""
                }
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="sessionDetails">What is the session about?</Label>
              <Textarea
                id="sessionDetails"
                name="sessionDetails"
                rows={4}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.sessionDetails}
                className={
                  formik.touched.sessionDetails && formik.errors.sessionDetails
                    ? "border-red-500"
                    : ""
                }
              />
              {formik.touched.sessionDetails && formik.errors.sessionDetails ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.sessionDetails}
                </div>
              ) : null}
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="bg-black hover:bg-gray-700">
                Book Session
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingPage;
