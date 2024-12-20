import React, { useRef } from "react";
import { User } from "lucide-react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";

interface FormValues {
  profileImage: string | null;
  mentgLink: string;
  firstName: string;
  lastName: string;
  about: string;
  socialLinks: {
    linkedin: string;
    instagram: string;
    twitter: string;
  };
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  mentgLink: Yup.string().required("MentG link is required"),
  about: Yup.string(),
  socialLinks: Yup.object().shape({
    linkedin: Yup.string().url("Invalid LinkedIn URL"),
    instagram: Yup.string().url("Invalid Instagram URL"),
    twitter: Yup.string().url("Invalid Twitter URL"),
  }),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
  .min(8, "Password must be at least 8 characters")
  .matches(/[0-9]/, "Password must contain at least one number")
  .matches(/[a-z]/, "Password must contain at least one lowercase letter")
  .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  .matches(/[^\w]/, "Password must contain at least one symbol"),
    // .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], "Passwords must match")
    // .required("Confirm password is required"),
});

const ProfileDetails: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const initialValues: FormValues = {
    profileImage: null,
    mentgLink: "{{firstName+lastName}}",
    firstName: "",
    lastName: "",
    about: "",
    socialLinks: {
      linkedin: "",
      instagram: "",
      twitter: "",
    },
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    console.log(values);
    alert("Changes saved successfully!");
    setSubmitting(false);
  };

  const onCheck = () => {
    alert("Feature to be implemented");
  };

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFieldValue("profileImage", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, setFieldValue, isSubmitting }) => (
        <Form className="min-h-screen p-4">
          <div>
            <div className="w-full md:w-2/4">
              <h2 className="text-2xl font-bold mb-4">Profile Details</h2>

              <div className="flex items-center justify-between space-x-6 mb-6">
                <div className="relative font-medium">
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {values.profileImage ? (
                      <img
                        src={values.profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-12 h-12 text-gray-400" />
                    )}
                  </div>
                  Profile Picture
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="underline font-medium"
                  >
                    Upload a photo
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => handleImageUpload(e, setFieldValue)}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="mentgLink" className="block font-medium mb-2">
                  Your MentG page link
                </label>
                <div className="flex">
                  <span className="px-4 inline-flex items-center min-w-fit rounded-s-md border bg-gray-50 text-sm text-gray-500">
                    mentg.in/
                  </span>
                  <Field
                    type="text"
                    id="mentgLink"
                    name="mentgLink"
                    className="border border-gray-300 rounded-e-md p-2 flex-1"
                    placeholder="mentg.in/"
                  />
                  <button
                    type="button"
                    onClick={onCheck}
                    className="bg-green-500 text-white rounded-md px-4 py-2 ml-2"
                  >
                    Check Availability
                  </button>
                </div>
                {errors.mentgLink && touched.mentgLink && (
                  <div className="text-red-500 text-sm mt-1">{errors.mentgLink}</div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="firstName" className="block font-medium mb-2">
                    First Name
                  </label>
                  <Field
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="block w-full border rounded p-2"
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && touched.firstName && (
                    <div className="text-red-500 text-sm mt-1">{errors.firstName}</div>
                  )}
                </div>
                <div>
                  <label htmlFor="lastName" className="block font-medium mb-2">
                    Last Name
                  </label>
                  <Field
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="block w-full border rounded p-2"
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && touched.lastName && (
                    <div className="text-red-500 text-sm mt-1">{errors.lastName}</div>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="about" className="block font-medium mb-2">
                  About Yourself
                </label>
                <Field
                  as="textarea"
                  id="about"
                  name="about"
                  className="block w-full border rounded p-2"
                  placeholder="Tell us about yourself"
                />
                {errors.about && touched.about && (
                  <div className="text-red-500 text-sm mt-1">{errors.about}</div>
                )}
              </div>

              <div className="mb-4">
                <label className="block font-medium mb-2">Social Accounts</label>
                <div className="space-y-2">
                  <Field
                    type="text"
                    name="socialLinks.linkedin"
                    className="block w-full border rounded p-2"
                    placeholder="LinkedIn URL"
                  />
                  {errors.socialLinks?.linkedin && touched.socialLinks?.linkedin && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.socialLinks.linkedin}
                    </div>
                  )}
                  <Field
                    type="text"
                    name="socialLinks.instagram"
                    className="block w-full border rounded p-2"
                    placeholder="Instagram URL"
                  />
                  {errors.socialLinks?.instagram && touched.socialLinks?.instagram && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.socialLinks.instagram}
                    </div>
                  )}
                  <Field
                    type="text"
                    name="socialLinks.twitter"
                    className="block w-full border rounded p-2"
                    placeholder="Twitter URL"
                  />
                  {errors.socialLinks?.twitter && touched.socialLinks?.twitter && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.socialLinks.twitter}
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="phoneNumber" className="block font-medium mb-2">
                  Phone Number
                </label>
                <Field
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  className="block w-full border rounded p-2"
                  placeholder="Enter your phone number"
                />
                {errors.phoneNumber && touched.phoneNumber && (
                  <div className="text-red-500 text-sm mt-1">{errors.phoneNumber}</div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block font-medium mb-2">
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="block w-full border rounded p-2"
                  placeholder="Enter your email"
                />
                {errors.email && touched.email && (
                  <div className="text-red-500 text-sm mt-1">{errors.email}</div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="password" className="block font-medium mb-2">
                    Password
                  </label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className="block w-full border rounded p-2"
                    placeholder="Enter a new password"
                  />
                  {errors.password && touched.password && (
                    <div className="text-red-500 text-sm mt-1">{errors.password}</div>
                  )}
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block font-medium mb-2">
                    Confirm Password
                  </label>
                  <Field
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="block w-full border rounded p-2"
                    placeholder="Confirm your password"
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-start mt-14">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-black text-white px-4 py-2 w-40 rounded-md hover:bg-gray-700 transition-colors disabled:opacity-50 font-semibold text-md shadow-md"
            >
              Save Changes
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ProfileDetails;