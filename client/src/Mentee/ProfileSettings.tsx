import React, { useRef } from "react";
import { User } from "lucide-react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

// Define validation schema using Yup
const ProfileValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: Yup.string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  about: Yup.string()
    .max(500, "About section cannot exceed 500 characters"),
  socialLinks: Yup.object().shape({
    linkedin: Yup.string()
      .url("Please enter a valid LinkedIn URL")
      .nullable(),
    instagram: Yup.string()
      .url("Please enter a valid Instagram URL")
      .nullable(),
    twitter: Yup.string()
      .url("Please enter a valid Twitter URL")
      .nullable(),
  }),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[^\w]/, "Password must contain at least one symbol"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], "Passwords must match")
    // .required("Please confirm your password"),
});

const ProfileDetails: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const initialValues = {
    profileImage: null as string | null,
    firstName: "",
    lastName: "",
    about: "",
    socialLinks: {
      linkedin: "",
      instagram: "",
      twitter: "",
    },
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFieldValue("profileImage", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div>
        <div className="w-full md:w-2/4">
          <h2 className="text-2xl font-bold mb-4">Profile Details</h2>

          <Formik
            initialValues={initialValues}
            validationSchema={ProfileValidationSchema}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values);
              alert("Changes saved successfully!");
              setSubmitting(false);
            }}
          >
            {({ values, errors, touched, setFieldValue, isSubmitting }) => (
              <Form>
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block font-medium mb-2">First Name</label>
                    <Field
                      name="firstName"
                      type="text"
                      className="block w-full border rounded p-2"
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && touched.firstName && (
                      <div className="text-red-500 text-sm mt-1">{errors.firstName}</div>
                    )}
                  </div>
                  <div>
                    <label className="block font-medium mb-2">Last Name</label>
                    <Field
                      name="lastName"
                      type="text"
                      className="block w-full border rounded p-2"
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && touched.lastName && (
                      <div className="text-red-500 text-sm mt-1">{errors.lastName}</div>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block font-medium mb-2">About Yourself</label>
                  <Field
                    name="about"
                    as="textarea"
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
                      name="socialLinks.linkedin"
                      type="text"
                      className="block w-full border rounded p-2"
                      placeholder="LinkedIn URL"
                    />
                    {errors.socialLinks?.linkedin && touched.socialLinks?.linkedin && (
                      <div className="text-red-500 text-sm mt-1">{errors.socialLinks.linkedin}</div>
                    )}
                    <Field
                      name="socialLinks.instagram"
                      type="text"
                      className="block w-full border rounded p-2"
                      placeholder="Instagram URL"
                    />
                    {errors.socialLinks?.instagram && touched.socialLinks?.instagram && (
                      <div className="text-red-500 text-sm mt-1">{errors.socialLinks.instagram}</div>
                    )}
                    <Field
                      name="socialLinks.twitter"
                      type="text"
                      className="block w-full border rounded p-2"
                      placeholder="Twitter URL"
                    />
                    {errors.socialLinks?.twitter && touched.socialLinks?.twitter && (
                      <div className="text-red-500 text-sm mt-1">{errors.socialLinks.twitter}</div>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block font-medium mb-2">Email</label>
                  <Field
                    name="email"
                    type="email"
                    className="block w-full border rounded p-2"
                    placeholder="Enter your email"
                  />
                  {errors.email && touched.email && (
                    <div className="text-red-500 text-sm mt-1">{errors.email}</div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block font-medium mb-2">Password</label>
                    <Field
                      name="password"
                      type="password"
                      className="block w-full border rounded p-2"
                      placeholder="Enter a new password"
                    />
                    {errors.password && touched.password && (
                      <div className="text-red-500 text-sm mt-1">{errors.password}</div>
                    )}
                  </div>
                  <div>
                    <label className="block font-medium mb-2">Confirm Password</label>
                    <Field
                      name="confirmPassword"
                      type="password"
                      className="block w-full border rounded p-2"
                      placeholder="Confirm your password"
                    />
                    {errors.confirmPassword && touched.confirmPassword && (
                      <div className="text-red-500 text-sm mt-1">{errors.confirmPassword}</div>
                    )}
                  </div>
                </div>

                <div className="flex justify-start mt-14">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-black text-white px-4 py-2 w-40 rounded-md hover:bg-gray-700 transition-colors disabled:opacity-50 font-semibold text-md shadow-md"
                  >
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;