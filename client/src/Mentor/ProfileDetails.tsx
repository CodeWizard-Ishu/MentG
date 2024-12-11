import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";

// Define the schema using Zod
const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  displayName: z.string().min(1, "Display name is required"),
  topmatePage: z.string().url("Invalid Topmate page URL"),
  aboutYourself: z
    .string()
    .max(500, "About yourself must be 500 characters or less"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const ProfileDetails: React.FC = () => {
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState<string | null>(
    null
  );

  const handleProfilePhotoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfilePhoto(file);
      setProfilePhotoPreview(URL.createObjectURL(file));
    } else {
      setProfilePhoto(null);
      setProfilePhotoPreview(null);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  const onSubmit = (data: ProfileFormData) => {
    // Handle form submission, e.g., save data to the server
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-white mr-96">
      <div className="mx-auto">
        <h1 className="text-3xl font-bold mb-8">Profile</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Profile photo */}
          <div>
            <label htmlFor="profilePhoto" className="block font-medium mb-2">
              Profile photo
            </label>
            <input
              type="file"
              id="profilePhoto"
              className="block w-full text-sm text-slate-500"
              onChange={handleProfilePhotoChange}
            />
            {profilePhotoPreview && (
              <img
                src={profilePhotoPreview}
                alt="Profile photo preview"
                className="mt-4 h-12 w-12 rounded-full"
              />
            )}
          </div>

          {/* Personal information */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block font-medium mb-2">
                First Name
              </label>
              <Input
                id="firstName"
                {...register("firstName")}
                onError={errors.firstName?.message}
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block font-medium mb-2">
                Last Name
              </label>
              <Input
                id="lastName"
                {...register("lastName")}
                onError={errors.lastName?.message}
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="displayName" className="block font-medium mb-2">
                Display Name
              </label>
              <Input
                id="displayName"
                {...register("displayName")}
                onError={errors.displayName?.message}
              />
            </div>
          </div>

          {/* Topmate page link */}
          <div>
            <label htmlFor="topmatePage" className="block font-medium mb-2">
              Your MentG page link
            </label>
            <Input
              id="mentgPage"
              {...register("topmatePage")}
              onError={errors.topmatePage?.message}
            />
          </div>

          {/* About yourself */}
          <div>
            <label htmlFor="aboutYourself" className="block font-medium mb-2">
              About yourself
            </label>
            <Textarea
              id="aboutYourself"
              {...register("aboutYourself")}
              onError={errors.aboutYourself?.message}
            />
          </div>

          {/* Form actions */}
          <div className="flex justify-end">
            <Button type="submit">Save changes</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileDetails;
