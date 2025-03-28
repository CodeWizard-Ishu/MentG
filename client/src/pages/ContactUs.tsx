import { MapPin, Mail, PhoneCall, Send } from "lucide-react";
import Footer from "../components/Footer";
import Spinner from "../components/ui/Spinner";
import { toast } from "react-toastify";
import contactImage from "../assets/contact-bg-image.png";
import Header from "../components/Header";
import { Label } from "../components/ui/label";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import BACKEND_URL from "../endpoint";

const ContactSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address"
    )
    .required("Email is required")
    .trim(),
  message: Yup.string()
    .min(10, "Message is too short")
    .max(1000, "Message is too long")
    .required("Message is required"),
});

interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

const ContactUs = () => {
  const initialValues: ContactFormValues = {
    name: "",
    email: "",
    message: "",
  };

  const handleSubmit = async (
    values: ContactFormValues,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { setSubmitting, resetForm }: any
  ) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Your message has been sent successfully!", {
          pauseOnHover: false,
          draggable: true,
        });
        resetForm();
      } else {
        toast.error(data.message || "Failed to send message");
      }
    } catch (error) {
      toast.error(`Failed to send message: ${error}`, {
        pauseOnHover: false,
        draggable: true,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-sky-200">
      {/* Sticky Header */}
      <Header />

      <div className="flex-grow px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12">
        <div className="max-w-7xl mx-auto relative bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 p-4 sm:p-6 md:p-8">
            <div className="text-center flex flex-col items-center justify-center">
              <img src={contactImage} />
            </div>

            <div>
              <Formik
                initialValues={initialValues}
                validationSchema={ContactSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, errors, touched }) => (
                  <Form className="mx-auto">
                    <div className="mb-6">
                      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black capitalize mb-4">
                        Contact us
                      </h1>

                      <div className="space-y-3 md:space-y-4">
                        <p className="flex items-start mx-2">
                          <MapPin className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                          <span className="mx-2 text-sm sm:text-base text-gray-700 truncate w-72">
                            Mumbai, India
                          </span>
                        </p>

                        <p className="flex items-start mx-2">
                          <PhoneCall className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                          <span className="ml-2 text-sm sm:text-base text-gray-700 truncate">
                            +91-2231514516
                          </span>
                        </p>

                        <p className="flex items-start mx-2">
                          <Mail className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                          <span className="mx-2 text-sm sm:text-base text-gray-700 truncate w-72">
                            <a href="mailto:info@mentg.in">info@mentg.in</a>{" "}
                            <br />
                            <a href="mailto:support@mentg.in">
                              support@mentg.in
                            </a>
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label
                          htmlFor="email"
                          className="flex justify-start mb-2"
                        >
                          Your Name
                        </Label>
                        <Field
                          type="text"
                          name="name"
                          placeholder="Enter your Name"
                          className={`w-full bg-gray-100 rounded-md py-2.5 sm:py-3 px-3 sm:px-4 text-sm sm:text-base outline-black focus-within:bg-transparent transition-colors ${
                            errors.name && touched.name
                              ? "border-2 border-red-500"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>

                      <div>
                        <Label
                          htmlFor="email"
                          className="flex justify-start mb-2"
                        >
                          Your Email Address
                        </Label>
                        <Field
                          type="email"
                          name="email"
                          placeholder="Enter your Email Address"
                          className={`w-full bg-gray-100 rounded-md py-2.5 sm:py-3 px-3 sm:px-4 text-sm sm:text-base outline-black focus-within:bg-transparent transition-colors ${
                            errors.email && touched.email
                              ? "border-2 border-red-500"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>

                      <div>
                        <Label
                          htmlFor="email"
                          className="flex justify-start mb-2"
                        >
                          Your Message
                        </Label>
                        <Field
                          as="textarea"
                          name="message"
                          placeholder="Write your message here..."
                          rows={6}
                          className={`w-full bg-gray-100 rounded-md px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base outline-black focus-within:bg-transparent transition-colors ${
                            errors.message && touched.message
                              ? "border-2 border-red-500"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          name="message"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="text-white w-full bg-[#08286b] hover:bg-gray-700 rounded-md text-sm sm:text-base px-4 sm:px-6 py-2.5 sm:py-3 transition-colors flex items-center justify-center"
                      >
                        {isSubmitting ? (
                          <Spinner />
                        ) : (
                          <div className="flex gap-2 items-center">
                            <Send />
                            Send Message
                          </div>
                        )}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactUs;
