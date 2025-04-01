import Logo from "../assets/logo.png";
import { Instagram, Linkedin, MapPin, Twitter, Youtube } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useCallback, useState } from 'react';
import BACKEND_URL from "../endpoint";
import Spinner from "../components/ui/Spinner";
import { Modal } from "./ui/modal";

interface FeedbackFromValues {
  name: string;
  email: string;
  message: string;
}

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const validationSchema = Yup.object().shape({
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
      .required("Message is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validationSchema,
    onSubmit: async (values: FeedbackFromValues, { setSubmitting, resetForm }) => {
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
          toast.success("Thank you for your feedback!", {
            pauseOnHover: false,
            draggable: true
          });
          resetForm();
          setIsModalOpen(false);
        } else {
          toast.error(data.message || "Failed to send feedback");
        }
      } catch (error) {
        toast.error(`Failed to send feedback: ${error}`, {
          pauseOnHover: false,
          draggable: true
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleClose = useCallback(() => {
    formik.resetForm();
    setIsModalOpen(false);
  }, [formik]);

  return (
    <div>
      <footer className="bg-[#08286b] text-white">
        <div className="mx-auto max-w-screen-3xl p-4 py-4 md:py-6 lg:py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <a href="/">
                  <img
                    src={Logo}
                    className="h-8 md:h-10 lg:h-12"
                    alt="MentG Logo"
                  />
                </a>
              </div>
              <address className="flex text-white not-italic mt-4 md:mt-6 lg:mt-9">
                <MapPin size={20} className="mr-2 text-white" /> Mumbai, India
              </address>
            </div>
            <div className="grid grid-cols-2 gap-4 md:gap-8 lg:gap-20 sm:grid-cols-2">
              <div>
                <h2 className="mb-4 md:mb-6 text-sm font-semibold uppercase">
                  Company
                </h2>
                <ul className="text-gray-400 text-sm md:text-base font-medium">
                  <li className="mb-1 hover:text-white">
                    <a href="/about" className="hover:underline">
                      About Us
                    </a>
                  </li>
                  <li className="mb-1 hover:text-white">
                    <a href="/contact" className="hover:underline">
                      Contact
                    </a>
                  </li>
                  <li className="mb-1 hover:text-white">
                    <a href="/privacy" className="hover:underline">
                      Terms & Privacy
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-4 md:mb-6 text-sm font-semibold uppercase">
                  Platform
                </h2>
                <ul className="text-gray-400 text-sm md:text-base font-medium">
                  <li className="mb-1 hover:text-white">
                    <a href="/pricing" className="hover:underline">
                      Pricing
                    </a>
                  </li>
                  <li className="mb-1 hover:text-white">
                    <a href="#" className="hover:underline">
                      Blog
                    </a>
                  </li>
                  <li className="mb-1 hover:text-white">
                    <a href="#" className="hover:underline">
                      Community
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-2 md:my-4 lg:my-8 border-gray-500 sm:mx-auto" />
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0">
            <span className="text-xs md:text-sm text-gray-300 text-left">
              © 2025 MentG™, Vashistha 360 Consulting Private Limited. <br />
              All Rights Reserved. | CIN: U62020UP2025PTC219721
            </span>
            <div className="flex justify-between md:justify-end items-center">
              <div className="flex space-x-4 md:space-x-6 md:order-2">
                <a
                  href="https://www.linkedin.com/company/mentg/"
                  className="text-white hover:text-blue-500 transition-colors"
                  target="_blank"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="https://www.instagram.com/mentg.in/"
                  className="text-white hover:text-blue-500 transition-colors"
                  target="_blank"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://x.com/mentg_in"
                  className="text-white hover:text-blue-500 transition-colors"
                >
                  <Twitter size={20} />
                </a>
                <a
                  href="https://www.youtube.com/..MentG_in"
                  className="text-white hover:text-blue-500 transition-colors"
                >
                  <Youtube size={20} />
                </a>
              </div>
              <Button 
                variant="outline"
                size="sm"
                className="bg-white text-black text-sm hover:bg-gray-100 hover:text-black font-medium rounded-md md:mr-6 md:order-1"
                onClick={() => setIsModalOpen(true)}
              >
                Feedback
              </Button>
              <Modal 
                isOpen={isModalOpen} 
                onClose={handleClose}
                title="Send Feedback"
              >
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      id="name"
                      placeholder="Your Name"
                      {...formik.getFieldProps('name')}
                      className={`${
                        formik.touched.name && formik.errors.name
                          ? "border-2 border-red-500"
                          : ""
                      }`}
                    />
                    {formik.touched.name && formik.errors.name && (
                      <p className="text-sm text-red-500 mt-1">{formik.errors.name}</p>
                    )}
                  </div>
                  <div>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Your Email"
                      {...formik.getFieldProps('email')}
                      className={`${
                        formik.touched.email && formik.errors.email
                          ? "border-2 border-red-500"
                          : ""
                      }`}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <p className="text-sm text-red-500 mt-1">{formik.errors.email}</p>
                    )}
                  </div>
                  <div>
                    <Textarea
                      id="message"
                      rows={5}
                      placeholder="Your Message"
                      {...formik.getFieldProps('message')}
                      className={`${
                        formik.touched.message && formik.errors.message
                          ? "border-2 border-red-500"
                          : ""
                      }`}
                    />
                    {formik.touched.message && formik.errors.message && (
                      <p className="text-sm text-red-500 mt-1">{formik.errors.message}</p>
                    )}
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={formik.isSubmitting}
                  >
                    {formik.isSubmitting ? (
                      <Spinner />
                    ) : (
                      "Submit Feedback"
                    )}
                  </Button>
                </form>
              </Modal>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;