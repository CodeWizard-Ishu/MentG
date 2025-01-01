import React, { useEffect, useRef, useState } from "react";
import { User } from "lucide-react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import BACKEND_URL from "../endpoint";
import Pica from "pica";
import Spinner from "../components/ui/Spinner";
import { Bounce, toast } from "react-toastify";

interface FormValues {
  profilePicture: string | null;
  firstName: string;
  lastName: string | null;
  goals: string | null;
  linkedin: string | null;
  instagram: string | null;
  twitter: string | null;
  phoneNumber: string | null;
  email: string;
}

interface User {
  id: number;
  userId: number;
  goals: string | null;
  profilePicture: string | null;
  linkedin: string | null;
  instagram: string | null;
  twitter: string | null;
  phoneNumber: string | null;
  user: {
    firstName: string;
    lastName: string | null;
    email: string;
  };
}

interface ProfileDetailsProps {
  onProfileUpdate?: () => Promise<void>;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ onProfileUpdate }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState<User>();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("userToken") ?? "";

  const getMenteeDetails = async () => {
    const response = await fetch(`${BACKEND_URL}/api/menteeDetails/${userId}`, {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getMenteeDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) return <Spinner/>;

  const initialValues: FormValues = {
    profilePicture: user.profilePicture,
    firstName: user.user.firstName,
    lastName: user.user.lastName,
    goals: user.goals,
    phoneNumber: user.phoneNumber,
    linkedin: user.linkedin,
    instagram: user.instagram,
    twitter: user.twitter,
    email: user.user.email,
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFieldValue: (field: string, value: any) => void
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create an image element
      const img = new Image();
      const reader = new FileReader();

      reader.onloadend = () => {
        img.src = reader.result as string; // Set image source to FileReader result
      };

      img.onload = async () => {
        // Create a canvas element for resizing
        const canvas = document.createElement("canvas");
        const pica = new Pica(); // Initialize Pica

        // Set desired dimensions for the resized image
        const MAX_WIDTH = 300;
        const MAX_HEIGHT = 300;

        let width = img.width;
        let height = img.height;

        // Calculate new dimensions while maintaining aspect ratio
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width; // Set canvas width
        canvas.height = height; // Set canvas height

        try {
          // Use Pica to resize the image
          await pica.resize(img, canvas);
          // Convert the resized canvas to a Base64 image
          const resizedImageDataUrl = canvas.toDataURL("image/webp", 0.9);
          // Get compressed file size in KB
          setFieldValue("profilePicture", resizedImageDataUrl); // Set the resized image as Base64
        } catch (error) {
          console.error("Error resizing image with Pica:", error);
        }
      };

      reader.readAsDataURL(file); // Read the file as Data URL
    }
  };

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/updateMenteeDetails/${userId}`,
        {
          method: "PUT",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        toast.error("Something went wrong!", {
          position: "bottom-right",
          pauseOnHover: false,
          transition: Bounce,
        })
      }

      toast.success("Changes saved successfully!", {
        position: "bottom-right",
        pauseOnHover: false,
        transition: Bounce,
      })
      await getMenteeDetails();
      if (onProfileUpdate) {
        await onProfileUpdate();
      }
      setSubmitting(false);
    } catch (error) {
      toast.error(`An error occurred while saving changes, ${error}`, {
        position: "bottom-right",
        pauseOnHover: false,
        transition: Bounce,
      })
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div>
        <div className="w-full md:w-2/4">
          <h2 className="text-2xl font-bold mb-4">Profile Details</h2>

          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ values, errors, touched, setFieldValue, isSubmitting }) => (
              <Form>
                <div className="flex items-center justify-between space-x-6 mb-6">
                  <div className="relative font-medium">
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      {values.profilePicture ? (
                        <img
                          src={values.profilePicture}
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
                      <div className="text-red-500 text-sm mt-1">
                        {errors.firstName}
                      </div>
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
                      <div className="text-red-500 text-sm mt-1">
                        {errors.lastName}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block font-medium mb-2">
                    About Yourself
                  </label>
                  <Field
                    name="goals"
                    as="textarea"
                    className="block w-full border rounded p-2"
                    placeholder="Tell us about yourself"
                  />
                  {errors.goals && touched.goals && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.goals}
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block font-medium mb-2">
                    Social Accounts
                  </label>
                  <div className="space-y-2">
                    <Field
                      name="linkedin"
                      type="text"
                      className="block w-full border rounded p-2"
                      placeholder="LinkedIn URL"
                    />
                    {errors.linkedin && touched.linkedin && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.linkedin}
                      </div>
                    )}
                    <Field
                      name="instagram"
                      type="text"
                      className="block w-full border rounded p-2"
                      placeholder="Instagram URL"
                    />
                    {errors.instagram && touched.instagram && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.instagram}
                      </div>
                    )}
                    <Field
                      name="twitter"
                      type="text"
                      className="block w-full border rounded p-2"
                      placeholder="Twitter URL"
                    />
                    {errors.twitter && touched.twitter && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.twitter}
                      </div>
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
                    disabled
                  />
                </div>

                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block font-medium mb-2">Password</label>
                    <Field
                      name="password"
                      type="password"
                      className="block w-full border rounded p-2"
                      placeholder="Enter a new password"
                    />
                    {errors.password && touched.password && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.password}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block font-medium mb-2">
                      Confirm Password
                    </label>
                    <Field
                      name="confirmPassword"
                      type="password"
                      className="block w-full border rounded p-2"
                      placeholder="Confirm your password"
                    />
                    {errors.confirmPassword && touched.confirmPassword && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.confirmPassword}
                      </div>
                    )}
                  </div>
                </div> */}

                <div className="flex justify-start mt-14">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-black text-white px-4 py-2 w-40 rounded-md hover:bg-gray-700 transition-colors disabled:opacity-50 font-semibold text-md shadow-md"
                  >
                    {isSubmitting ? <Spinner/> : "Save Changes"}
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
