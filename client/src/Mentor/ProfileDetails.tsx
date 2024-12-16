import React, { useState, useRef } from "react";
import { User } from "lucide-react";

const ProfileDetails: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [mentgLink, setMentgLink] = useState("{{firstName+lastName}}");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [about, setAbout] = useState("");
  const [socialLinks, setSocialLinks] = useState({
    linkedin: "",
    instagram: "",
    twitter: "",
  });
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCheck = () => {
    alert("Feature to be implemented");
  };

  const handleSaveChanges = () => {
    // Validation
    if (!firstName || !lastName) {
      alert("First name and last name are required.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      alert("Invalid email format.");
      return;
    }

    if (!/^[0-9]{10}$/.test(phoneNumber)) {
      alert("Phone number must be 10 digits.");
      return;
    }

    // Submit form data (mocked)
    console.log({
      profileImage,
      firstName,
      lastName,
      about,
      socialLinks,
      phoneNumber,
      email,
      password,
    });
    alert("Changes saved successfully!");
  };

  return (
    <div className="min-h-screen p-4">
      <div>
        <div className="w-full md:w-2/4">
          <h2 className="text-2xl font-bold mb-4">Profile Details</h2>

          <div className="flex items-center justify-between space-x-6 mb-6">
            <div className="relative font-medium">
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {profileImage ? (
                  <img
                    src={profileImage}
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
                onClick={() => fileInputRef.current?.click()} className="underline font-medium">
                Upload a photo
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>

          <div className="mb-6">
              <label
                htmlFor="mentg-page"
                className="block font-medium mb-2"
              >
                Your MentG page link
              </label>
              <div className="flex">
                <span className="px-4 inline-flex items-center min-w-fit rounded-s-md border bg-gray-50 text-sm text-gray-500">
                  mentg.in/
                </span>
                <input
                  type="text"
                  id="mentg-page"
                  className="border border-gray-300 rounded-e-md p-2 flex-1"
                  value={mentgLink}
                  placeholder="mentg.in/"
                  onChange={(e) => setMentgLink(e.target.value)}
                />
                <button
                  onClick={onCheck}
                  className="bg-green-500 text-white rounded-md px-4 py-2 ml-2"
                >
                  Check Availability
                </button>
              </div>
            </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block font-medium mb-2">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="block w-full border rounded p-2"
                placeholder="Enter your first name"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="block w-full border rounded p-2"
                placeholder="Enter your last name"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">About Yourself</label>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="block w-full border rounded p-2"
              placeholder="Tell us about yourself"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Social Accounts</label>
            <div className="space-y-2">
              <input
                type="text"
                value={socialLinks.linkedin}
                onChange={(e) =>
                  setSocialLinks({ ...socialLinks, linkedin: e.target.value })
                }
                className="block w-full border rounded p-2"
                placeholder="LinkedIn URL"
              />
              <input
                type="text"
                value={socialLinks.instagram}
                onChange={(e) =>
                  setSocialLinks({ ...socialLinks, instagram: e.target.value })
                }
                className="block w-full border rounded p-2"
                placeholder="Instagram URL"
              />
              <input
                type="text"
                value={socialLinks.twitter}
                onChange={(e) =>
                  setSocialLinks({ ...socialLinks, twitter: e.target.value })
                }
                className="block w-full border rounded p-2"
                placeholder="Twitter URL"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Phone Number</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="block w-full border rounded p-2"
              placeholder="Enter your phone number"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full border rounded p-2"
              placeholder="Enter your email"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full border rounded p-2"
                placeholder="Enter a new password"
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full border rounded p-2"
                placeholder="Confirm your password"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-start mt-14">
        <button
          onClick={handleSaveChanges}
          className="bg-black text-white px-4 py-2 w-40 rounded-md hover:bg-gray-700 transition-colors disabled:opacity-50 font-semibold text-md shadow-md"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProfileDetails;
