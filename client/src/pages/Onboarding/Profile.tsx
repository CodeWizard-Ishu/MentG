import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import BACKEND_URL from "../../endpoint";
import { toast } from "react-toastify";
import Spinner from "../../components/ui/Spinner";
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { User, Mail, PhoneCall, CheckCircle, ArrowLeft } from "lucide-react";
import { Progress } from "../../components/ui/progress";
import Header from "../../components/Header";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Modal } from "../../components/ui/modal";

const OnboardingProfile: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Image cropping states
  const [showCropModal, setShowCropModal] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>({ unit: '%', width: 100, height: 100, x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement | null>(null);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("userToken") ?? "";

  // Validation schemas
  const profileValidationSchema = Yup.object({
    firstName: Yup.string()
      .required("First name is required")
      .matches(/^[a-zA-Z\s]*$/, "First name should only contain letters and spaces"),
    lastName: Yup.string()
      .required("Last name is required")
      .matches(/^[a-zA-Z\s]*$/, "Last name should only contain letters and spaces"),
    bio: Yup.string()
      .required("About yourself is required")
      .test("no-urls", "Bio should not contain URLs", (value) => !/(https?:\/\/[^\s]+)/g.test(value || "")),
    linkedin: Yup.string()
      .required("LinkedIn URL is required")
      .test("is-linkedin", "Please enter a valid LinkedIn URL", (value) => {
        if (!value) return false;
        try {
          const url = new URL(value.startsWith("http") ? value : `https://${value}`);
          return url.hostname.includes("linkedin.com") && value.length <= 100;
        } catch {
          return false;
        }
      }),
    instagram: Yup.string().test("is-instagram", "Please enter a valid Instagram URL", (value) => {
      if (!value) return true;
      try {
        const url = new URL(value.startsWith("http") ? value : `https://${value}`);
        return url.hostname.includes("instagram.com") && value.length <= 100;
      } catch {
        return false;
      }
    }),
    twitter: Yup.string().test("is-twitter", "Please enter a valid Twitter URL", (value) => {
      if (!value) return true;
      try {
        const url = new URL(value.startsWith("http") ? value : `https://${value}`);
        return (url.hostname.includes("twitter.com") || url.hostname.includes("x.com")) && value.length <= 100;
      } catch {
        return false;
      }
    }),
    phoneNumber: Yup.string()
      .required("Phone number is required")
      .test("is-valid-phone", "Please enter a valid phone number", (value) => {
        if (!value) return false;
        const digitsOnly = value.replace(/\D/g, "");
        return /^(\+\d{1,3}[- ]?)?\d{10}$/.test(value) && digitsOnly.length >= 10 && digitsOnly.length <= 15;
      }),
    email: Yup.string().email("Invalid email address"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      bio: "",
      linkedin: "",
      instagram: "",
      twitter: "",
      phoneNumber: "",
      email: "",
    },
    validationSchema: profileValidationSchema,
    
    onSubmit: async (values) => {
      if (!profilePicture) {
        setErrors({ profilePicture: "Profile picture is required" });
        return;
      }

      setLoading(true);
      try {
        const profileData = {
          profilePicture,
          ...values,
        };

        const response = await fetch(`${BACKEND_URL}/api/updateMentorDetails/${userId}`, {
          method: "PUT",
          headers: {
            "Authorization": token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profileData),
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to save profile details");
        }

        const newFullName = `${values.firstName} ${values.lastName || ""}`.trim();
        localStorage.setItem("fullName", newFullName);

        toast.success("Signup Successfull !", {
          pauseOnHover: false,
          draggable: true,
        });

        navigate("/dashboard/");
      } catch (error) {
        toast.error(`Error: ${error instanceof Error ? error.message : String(error)}`, {
          pauseOnHover: false,
          draggable: true,
        });
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/mentorDetails/${userId}`, {
          method: "GET",
          headers: {
            "Authorization": token,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user info");
        }
        const data = await response.json();
        formik.setValues({
          ...formik.values,
          firstName: data.user.firstName || "",
          lastName: data.user.lastName || "",
          email: data.user.email || "",
        });
      } catch (error) {
        toast.error(`Error: ${error instanceof Error ? error.message : String(error)}`, {
          pauseOnHover: false,
          draggable: true,
        });
      } finally {
        setFetchLoading(false);
      }
    };

    fetchUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, token]);

  // Function to get the cropped image
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

  // Handle initial file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
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

      setErrors((prev) => ({ ...prev, profilePicture: "" }));

      // Read the file and set it for cropping
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
        setShowCropModal(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle crop completion
  const handleCropComplete = async () => {
    if (imageRef.current && imageSrc) {
      try {
        const croppedImageUrl = await getCroppedImg(imageRef.current, crop);
        setProfilePicture(croppedImageUrl);
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

  // Step titles
  const stepTitles = ["Choose Your Expertise", "Complete Your Profile"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-sky-200">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white/95 shadow-xl rounded-2xl p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gray-800">
            Complete Your Profile
          </h1>

          {/* Enhanced Stepper with shadcn Progress */}
          <div className="mb-8 sm:mb-10">
            <div className="relative">
              {/* shadcn Progress bar */}
              <Progress
                value={100}
                className="h-1 mx-auto w-52 sm:w-72 md:w-96 mb-6 absolute top-3 sm:top-5 left-1/2 transform -translate-x-1/2"
              />

              {/* Step circles with icons/labels */}
              <div className="flex justify-center gap-32 sm:gap-48 md:gap-72 relative z-10 -mt-3">
                {stepTitles.map((title, index) => {
                  const stepNum = index + 1;
                  const isActive = 2 >= stepNum; // Step 2 is current
                  const isComplete = 2 > stepNum;

                  return (
                    <div key={index} className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 
                          ${isActive ? "bg-blue-600 text-white" : "bg-white text-gray-400 border-2 border-gray-200"}
                          ${isComplete ? "bg-green-600 border-green-500" : ""}`}
                      >
                        {isComplete ? (
                          <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                        ) : (
                          <span className="text-sm font-medium">{stepNum}</span>
                        )}
                      </div>
                      <span
                        className={`mt-2 text-xs sm:text-sm font-medium text-center max-w-[100px] sm:max-w-[120px] 
                        ${isActive ? "text-blue-600" : "text-gray-500"}
                        ${isComplete ? "text-blue-600" : ""}`}
                      >
                        {title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {fetchLoading ? <Spinner/> : (
            <div className="animate-fadeIn">
              <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-center md:space-x-8 mb-4">
                  <div className="text-center mb-4 md:mb-0">
                    <div className="w-32 h-32 mx-auto rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-4 border-white shadow-md">
                      {profilePicture ? (
                        <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-16 h-16 text-gray-400" />
                      )}
                    </div>
                    <p className="mt-3 font-medium text-gray-700">Profile Picture</p>
                  </div>
                  <div className="flex-1 max-w-max">
                    <label className="block text-sm font-medium mb-2 text-gray-700">Upload a photo</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      ref={fileInputRef}
                      className={`block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-100 file:text-blue-700
                        hover:file:bg-blue-200 transition-all
                        ${errors.profilePicture ? "border border-red-500 rounded" : ""}`}
                    />
                    {errors.profilePicture && (
                      <div className="text-red-500 text-sm mt-1 animate-fadeIn">{errors.profilePicture}</div>
                    )}
                    <p className="text-xs text-gray-500 mt-2">Max file size: 5MB. Recommended size: 300x300 pixels</p>
                  </div>
                </div>
              </div>

              <form onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="firstName" className="block font-medium mb-2 text-gray-700">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      required
                      {...formik.getFieldProps("firstName")}
                      className={`block w-full border rounded-lg p-3 ${
                        formik.touched.firstName && formik.errors.firstName
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all"
                      }`}
                      placeholder="Enter your first name"
                    />
                    {formik.touched.firstName && formik.errors.firstName && (
                      <div className="text-red-500 text-sm mt-1 animate-fadeIn">{formik.errors.firstName}</div>
                    )}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block font-medium mb-2 text-gray-700">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      {...formik.getFieldProps("lastName")}
                      className={`block w-full border rounded-lg p-3 ${
                        formik.touched.lastName && formik.errors.lastName
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all"
                      }`}
                      placeholder="Enter your last name"
                    />
                    {formik.touched.lastName && formik.errors.lastName && (
                      <div className="text-red-500 text-sm mt-1 animate-fadeIn">{formik.errors.lastName}</div>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="bio" className="block font-medium mb-2 text-gray-700">
                    About Yourself
                  </label>
                  <textarea
                    rows={4}
                    id="bio"
                    required
                    {...formik.getFieldProps("bio")}
                    className={`block w-full border rounded-lg p-3 ${
                      formik.touched.bio && formik.errors.bio
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all"
                    }`}
                    placeholder="Tell us about yourself, your expertise, and what you can offer as a mentor"
                  />
                  {formik.touched.bio && formik.errors.bio && (
                    <div className="text-red-500 text-sm mt-1 animate-fadeIn">{formik.errors.bio}</div>
                  )}
                </div>

                <div className="mb-8">
                  <label className="block font-medium mb-4 text-gray-700">Social Accounts</label>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="linkedin" className="block text-sm text-gray-600 mb-1">
                        LinkedIn URL
                      </label>
                      <input
                        type="text"
                        id="linkedin"
                        required
                        {...formik.getFieldProps("linkedin")}
                        className={`block w-full border rounded-lg p-3 ${
                          formik.touched.linkedin && formik.errors.linkedin
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all"
                        }`}
                        placeholder="https://linkedin.com/in/yourprofile"
                      />
                      {formik.touched.linkedin && formik.errors.linkedin && (
                        <div className="text-red-500 text-sm mt-1 animate-fadeIn">{formik.errors.linkedin}</div>
                      )}
                    </div>

                    <div>
                      <label htmlFor="instagram" className="block text-sm text-gray-600 mb-1">
                        Instagram URL
                      </label>
                      <input
                        type="text"
                        id="instagram"
                        {...formik.getFieldProps("instagram")}
                        className={`block w-full border rounded-lg p-3 ${
                          formik.touched.instagram && formik.errors.instagram
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all"
                        }`}
                        placeholder="https://instagram.com/yourusername"
                      />
                      {formik.touched.instagram && formik.errors.instagram && (
                        <div className="text-red-500 text-sm mt-1 animate-fadeIn">{formik.errors.instagram}</div>
                      )}
                    </div>

                    <div>
                      <label htmlFor="twitter" className="block text-sm text-gray-600 mb-1">
                        Twitter URL
                      </label>
                      <input
                        type="text"
                        id="twitter"
                        {...formik.getFieldProps("twitter")}
                        className={`block w-full border rounded-lg p-3 ${
                          formik.touched.twitter && formik.errors.twitter
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all"
                        }`}
                        placeholder="https://twitter.com/yourusername"
                      />
                      {formik.touched.twitter && formik.errors.twitter && (
                        <div className="text-red-500 text-sm mt-1 animate-fadeIn">{formik.errors.twitter}</div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="phoneNumber" className="block font-medium mb-2 text-gray-700">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <PhoneCall className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        id="phoneNumber"
                        required
                        {...formik.getFieldProps("phoneNumber")}
                        className={`block w-full border rounded-lg p-3 pl-10 ${
                          formik.touched.phoneNumber && formik.errors.phoneNumber
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all"
                        }`}
                        placeholder="Enter your phone number"
                      />
                    </div>
                    {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                      <div className="text-red-500 text-sm mt-1 animate-fadeIn">{formik.errors.phoneNumber}</div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block font-medium mb-2 text-gray-700">
                      Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Mail className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        {...formik.getFieldProps("email")}
                        className="block w-full border rounded-lg p-3 pl-10 bg-gray-100 text-gray-700 cursor-not-allowed"
                        placeholder="Your email"
                        disabled
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                  </div>
                </div>
                <div className="flex justify-between mt-6 sm:mt-10">
                  <button
                    onClick={() => navigate("/onboarding/services")}
                    className="flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-black text-sm sm:text-base font-medium hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200 border border-gray-200"
                  >
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    Back
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-black min-w-48 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:hover:bg-gray-600 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                  >
                    {loading ? <Spinner /> : "Complete Profile"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Image Crop Modal */}
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
    </div>
  );
};

export default OnboardingProfile;