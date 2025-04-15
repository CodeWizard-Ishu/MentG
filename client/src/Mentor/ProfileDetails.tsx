import { useEffect, useRef, useState } from "react";
import { Mail, PhoneCall, User } from "lucide-react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import BACKEND_URL from "../endpoint";
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Spinner from "../components/ui/Spinner";
import { toast } from "react-toastify";
import LinkedinImage from "../assets/linkedin.png";
import InstagramImage from "../assets/instagram.png";
import TwitterImage from "../assets/twitter.png";
import { ProfileDetailsSkeleton } from "../components/ui/Skeletons/MentorDashboardSkeletons";
import { Modal } from "../components/ui/modal";
import { useMentorDashboardContext } from "./MentorDashboardContext";

interface FormValues {
  profilePicture: string | null;
  mentgLink: string | null;
  firstName: string;
  lastName: string | null;
  bio: string | null;
  linkedin: string | null;
  instagram: string | null;
  twitter: string | null;
  phoneNumber: string | null;
  email: string;
}

interface User {
  id: number;
  userId: number;
  bio: string | null;
  profilePicture: string | null;
  experience: string | null;
  rating: number;
  totalEarnings: number;
  totalBookings: number;
  uniqueMentees: number;
  phoneNumber: string | null;
  user: {
    firstName: string;
    lastName: string | null;
    email: string;
  };
  linkedin: string | null;
  instagram: string | null;
  twitter: string | null;
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .matches(
      /^[a-zA-Z\s]*$/,
      "First name should only contain letters and spaces"
    )
    .trim(),

  lastName: Yup.string()
    .nullable()
    .matches(
      /^[a-zA-Z\s]*$/,
      "Last name should only contain letters and spaces"
    )
    .trim(),

  bio: Yup.string()
    .required("Bio is required")
    .nullable()
    .test("no-urls", "Bio should not contain URLs", (value) => {
      if (!value) return true;
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      return !urlRegex.test(value);
    }),

  linkedin: Yup.string()
    .required("LinkedIn URL is required")
    .nullable()
    .test("linkedin-url", "Please enter a valid LinkedIn URL", (value) => {
      if (!value) return true;
      try {
        const url = new URL(
          value.startsWith("http") ? value : `https://${value}`
        );
        return url.hostname.includes("linkedin.com");
      } catch {
        return false;
      }
    })
    .test("url-length", "LinkedIn URL is too long", (value) => {
      if (!value) return true;
      return value.length <= 100;
    }),

  instagram: Yup.string()
    .nullable()
    .test("instagram-url", "Please enter a valid Instagram URL", (value) => {
      if (!value) return true;
      try {
        const url = new URL(
          value.startsWith("http") ? value : `https://${value}`
        );
        return url.hostname.includes("instagram.com");
      } catch {
        return false;
      }
    })
    .test("url-length", "Instagram URL is too long", (value) => {
      if (!value) return true;
      return value.length <= 100;
    }),

  twitter: Yup.string()
    .nullable()
    .test("twitter-url", "Please enter a valid Twitter URL", (value) => {
      if (!value) return true;
      try {
        const url = new URL(
          value.startsWith("http") ? value : `https://${value}`
        );
        return (
          url.hostname.includes("twitter.com") || url.hostname.includes("x.com")
        );
      } catch {
        return false;
      }
    })
    .test("url-length", "Twitter URL is too long", (value) => {
      if (!value) return true;
      return value.length <= 100;
    }),

  phoneNumber: Yup.string()
    .nullable()
    .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, "Please enter a valid phone number")
    .test("phone-format", "Invalid phone number format", (value) => {
      if (!value) return true;
      // Remove all non-digit characters
      const digitsOnly = value.replace(/\D/g, "");
      return digitsOnly.length >= 10 && digitsOnly.length <= 15;
    }),

  email: Yup.string()
    .required("Email is required")
    .email("Please enter a valid email address")
    .max(254, "Email cannot exceed 254 characters")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address"
    ),

  profilePicture: Yup.string()
    .required("Profile picture is required")
    .nullable()
    .test("file-size", "Profile picture is too large", (value) => {
      if (!value) return true;
      // Check if base64 string size is less than 5MB
      const sizeInBytes = (value.length * 3) / 4;
      const sizeInMB = sizeInBytes / (1024 * 1024);
      return sizeInMB <= 5;
    })
    .test("file-type", "Invalid image format", (value) => {
      if (!value) return true;
      // Check if the base64 string starts with image data
      return value.startsWith("data:image/");
    }),

  mentgLink: Yup.string()
    .nullable()
    .matches(
      /^[a-zA-Z0-9-_]+$/,
      "MentG link can only contain letters, numbers, hyphens, and underscores"
    )
    .max(50, "MentG link cannot exceed 50 characters"),
});

const ProfileDetails: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState<User>();
  const { onProfileUpdate } = useMentorDashboardContext();
  const [showCropModal, setShowCropModal] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>({ unit: '%', width: 100, height: 100, x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [currentSetFieldValue, setCurrentSetFieldValue] = useState<((field: string, value: any) => void) | null>(null);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("userToken") ?? "";

  const getMentorDetails = async () => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/mentorDetails/${userId}`,
        {
          method: "GET",
          headers: {
            "Authorization": token,
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`${errorData.message}`, {
          pauseOnHover: false,
          draggable: true,
        });
        return;
      }

      const data = await response.json();
      setUser(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      toast.error(`Error, Check your Connection: ${error.message}`, {
        pauseOnHover: false,
        draggable: true,
      });
    }
  };

  useEffect(() => {
    getMentorDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, userId]);

  if (!user) {
    return <ProfileDetailsSkeleton/>;
  }

  const initialValues: FormValues = {
    profilePicture: user.profilePicture,
    mentgLink: userId,
    firstName: user.user.firstName,
    lastName: user.user.lastName,
    bio: user.bio || "",
    linkedin: user.linkedin || "",
    instagram: user.instagram || "",
    twitter: user.twitter || "",
    phoneNumber: user.phoneNumber || "",
    email: user.user.email,
  };

  const getCroppedImg = (image: HTMLImageElement, crop: Crop): Promise<string> => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    
    // Calculate dimensions ensuring we stay within bounds
    const cropWidth = crop.width * scaleX;
    const cropHeight = crop.height * scaleY;
    const cropX = crop.x * scaleX;
    const cropY = crop.y * scaleY;
    
    // Set canvas dimensions
    canvas.width = 300;
    canvas.height = 300;
    
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      return Promise.reject(new Error('Could not get canvas context'));
    }
    
    // Draw the cropped image on the canvas (with resizing)
    ctx.drawImage(
      image,
      cropX,
      cropY,
      cropWidth,
      cropHeight,
      0,
      0,
      canvas.width,
      canvas.height
    );
    
    // Return as Promise resolving to base64 string
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          resolve('');
          return;
        }
        
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.readAsDataURL(blob);
      }, 'image/webp', 0.9);
    });
  };

  //Image - Upload Function
  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFieldValue: (field: string, value: any) => void
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (5MB = 5 * 1024 * 1024 bytes)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should not exceed 5MB", {
          pauseOnHover: false,
          draggable: true,
        });
        // Reset the file input
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        return;
      }

      // Store setFieldValue for later use in crop completion
      setCurrentSetFieldValue(() => setFieldValue);
      
      // Read the file and set it for cropping
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
        setShowCropModal(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = async () => {
    if (imageRef.current && imageSrc && currentSetFieldValue) {
      try {
        const croppedImageUrl = await getCroppedImg(imageRef.current, crop);
        currentSetFieldValue('profilePicture', croppedImageUrl);
        setShowCropModal(false);
        setImageSrc(null);
        
        // Reset the file input
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } catch (error) {
        toast.error(`Error to process the image: ${error}`, {
          pauseOnHover: false,
          draggable: true,
        });
      }
    }
  };

  //Profile-Details Submit Function
  const handleSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/updateMentorDetails/${userId}`,
        {
          method: "PUT",
          headers: {
            "Authorization": token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`${errorData.message}`, {
          pauseOnHover: false,
          draggable: true,
        });
        return;
      }

      await getMentorDetails();

      const newFullName = `${values.firstName} ${values.lastName || ""}`.trim();
      localStorage.setItem("fullName", newFullName);
      await onProfileUpdate();

      toast.success("Profile details updated successfully", {
        pauseOnHover: false,
          draggable: true,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      toast.error(`Error, Check your Connection: ${error.message}`, {
        pauseOnHover: false,
        draggable: true,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="min-h-screen p-4">
        <div>
          <div className="w-full md:w-2/4">
            <h2 className="text-2xl font-bold mb-4">Profile Details</h2>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
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
                    {errors.profilePicture && touched.profilePicture && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.profilePicture}
                      </div>
                    )}
                  </div>

                  {/* 
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
                            disabled
                          />
                          <Link to={`/profile/${userId}`}>
                            <button
                              type="button"
                              className="bg-green-500 text-white rounded-md px-4 py-2 ml-2"
                            >
                              Go
                            </button>
                          </Link>
                        </div>
                  </div> 
                  */}

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
                      as="textarea"
                      name="bio"
                      rows={6}
                      className="block w-full border rounded p-2"
                      placeholder="Tell us about yourself"
                    />
                    {errors.bio && touched.bio && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.bio}
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block font-medium mb-2">
                      Social Accounts
                    </label>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <img
                          src={LinkedinImage}
                          alt="Linkedin"
                          className="w-8 h-8 m-1"
                        />
                        <Field
                          name="linkedin"
                          type="text"
                          className="block w-full border rounded p-2"
                          placeholder="LinkedIn URL"
                        />
                      </div>
                      {errors.linkedin && touched.linkedin && (
                        <div className="text-red-500 text-sm mt-1 ml-14">
                          {errors.linkedin}
                        </div>
                      )}
                      <div className="flex gap-2">
                        <img
                          src={InstagramImage}
                          alt="Instagram"
                          className="w-8 h-8 m-1"
                        />
                        <Field
                          name="instagram"
                          type="text"
                          className="block w-full border rounded p-2"
                          placeholder="Instagram URL"
                        />
                      </div>
                      {errors.instagram && touched.instagram && (
                        <div className="text-red-500 text-sm mt-1 ml-14">
                          {errors.instagram}
                        </div>
                      )}
                      <div className="flex gap-2">
                        <img
                          src={TwitterImage}
                          alt="Twitter/X"
                          className="w-8 h-8 m-1"
                        />
                        <Field
                          name="twitter"
                          type="text"
                          className="block w-full border rounded p-2"
                          placeholder="Twitter URL"
                        />
                      </div>
                      {errors.twitter && touched.twitter && (
                        <div className="text-red-500 text-sm mt-1 ml-14">
                          {errors.twitter}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="phoneNumber"
                      className="block font-medium mb-2"
                    >
                      Phone Number
                    </label>
                    <div className="flex gap-3">
                      <PhoneCall className="w-8 h-8 m-1" />
                      <Field
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        className="block w-full border rounded p-2"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    {errors.phoneNumber && touched.phoneNumber && (
                      <div className="text-red-500 text-sm mt-1 ml-14">
                        {errors.phoneNumber}
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block font-medium mb-2">Email</label>
                    <div className="flex gap-3">
                      <Mail className="w-8 h-8 m-1" />
                      <Field
                        name="email"
                        type="email"
                        className="block w-full border rounded p-2"
                        placeholder="Enter your email"
                        disabled
                      />
                    </div>
                  </div>

                  <div className="flex justify-start mt-14">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-black text-white px-4 py-2 w-40 rounded-md hover:bg-gray-700 transition-colors disabled:opacity-50 font-semibold text-md shadow-md"
                    >
                      {isSubmitting ? <Spinner /> : "Save Changes"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>

      {/* Image Crop Modal using the shared Modal component */}
      <Modal 
        isOpen={showCropModal && !!imageSrc} 
        onClose={() => {
          setShowCropModal(false);
          setImageSrc(null);
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        }}
        title="Crop Profile Picture"
      >
        <div className="mb-4 flex justify-center">
          <ReactCrop
            crop={crop}
            onChange={c => setCrop(c)}
            aspect={1}
            circularCrop
          >
            <img 
              src={imageSrc || ''} 
              alt="Crop" 
              ref={imageRef}
              style={{ maxHeight: '60vh' }}
              className="max-w-full"
            />
          </ReactCrop>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => {
              setShowCropModal(false);
              setImageSrc(null);
              if (fileInputRef.current) {
                fileInputRef.current.value = "";
              }
            }}
            className="px-4 py-2 border border-gray-300 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleCropComplete}
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700"
          >
            Apply
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ProfileDetails;
