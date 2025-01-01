"use client";

import { toast } from "sonner";
import { useState, useTransition, useRef, ComponentRef } from "react";
import { Trash } from "lucide-react";
import Image from "next/image";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Hint from "@/components/hint";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateStream } from "@/actions/stream";
import { UploadDropzone } from "@/lib/uploadthing";
import { updateUser, updateUserProfile } from "@/actions/user";
import { Gender, locations, Preference } from "@/constants";
import Select from "react-select";

type ProfileModalProps = {
  imageUrl: string;
  username: string;
  profile: {
    bio: string | null;
    age: number;
    location: string;
    preference: string | null;
    gender: string;
  };
};

const ProfileModal = ({ user }: { user: ProfileModalProps }) => {
  const closeRef = useRef<ComponentRef<"button">>(null);
  const [isPending, startTransition] = useTransition();
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const { age, gender, location, preference, bio } = user.profile;

  const [data, setData] = useState({
    username: user.username,
    age,
    gender,
    bio: bio || "",
    location,
    preference,
  });
  const [profileImage, setProfileImage] = useState(user.imageUrl);
  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (data.age < 18) {
      errors.age = "You must be at least 18 years old";
    }

    if (data.bio.length > 200) {
      errors.bio = "Bio must be 200 characters or less";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the form errors");
      return;
    }

    try {
      await Promise.all([
        updateUser({
          username: data.username,
          imageUrl: profileImage,
        }),
        updateUserProfile({
          age: data.age,
          gender: data.gender,
          bio: data.bio,
          location: data.location,
          preference: data.preference,
        }),
      ]);

      toast.success("User profile created successfully");
    } catch (error) {
      console.error("Error updating user profile:", error);
      toast.error("Error creating profile, please try again");
    } finally{
      closeRef.current?.click();
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const processedValue = name === "age" ? Math.max(18, Number(value)) : value;
    setData((prevData) => ({
      ...prevData,
      [name]: processedValue,
    }));

    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  const onLocationChange = (selectedOption: LocationOption | null) => {
    setData((prev) => ({
      ...prev,
      location: selectedOption ? selectedOption.value : "",
    }));
  };

  const onRemove = () => {
    startTransition(() => {
      updateStream({ thumbnailUrl: null })
        .then(() => {
          toast.success("Thumbnail removed");
          setProfileImage("");
        })
        .catch(() => toast.error("Something went wrong"));
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" size="sm">
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="my-2 max-h-[80vh] overflow-y-scroll hidden-scrollbar">
        <DialogHeader>
          <DialogTitle>Edit your profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-10">
          <div className="space-y-2">
            <Label>Username</Label>
            <Input
              name="username"
              disabled={isPending}
              placeholder="username"
              onChange={onChange}
              value={data.username}
              className="ring-offset-n-5 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-n-4/30 font-medium"
            />
          </div>
          <div className="space-y-2">
            <Label>Thumbnail</Label>
            {profileImage ? (
              <div className="relative aspect-video rounded-xl overflow-hidden border">
                <div className="absolute top-2 right-2 z-[10]">
                  <Hint label="Remove thumbnail" asChild side="left">
                    <Button
                      variant="default"
                      type="button"
                      disabled={isPending}
                      onClick={onRemove}
                      className="h-auto w-auto p-1.5"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </Hint>
                </div>
                <Image
                  alt="Thumbnail"
                  src={profileImage}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="rounded-xl border outline-dashed outline-muted">
                <UploadDropzone
                  endpoint="thumbnailUploader"
                  appearance={{
                    label: {
                      color: "black",
                    },
                    button: {
                      color: "black",
                      fontWeight: 500,
                    },
                    allowedContent: {
                      color: "black",
                    },
                  }}
                  onClientUploadComplete={(res) => {
                    setProfileImage(res?.[0]?.url);
                  }}
                  onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`);
                  }}
                />
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label>Age</Label>
            <Input
              name="age"
              type="number"
              min={18}
              disabled={isPending}
              placeholder="Your age (minimum 18)"
              onChange={onChange}
              value={data.age}
              className={`
      ring-offset-n-5 focus-visible:outline-none 
      focus-visible:ring-0 focus-visible:ring-offset-0 border rounded-md border-n-4 bg-n-5 font-medium
      ${formErrors.age ? "border-red-500" : ""}
    `}
            />
            {formErrors.age && (
              <p className="text-red-500 text-sm">{formErrors.age}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Location</Label>
            <Select
              name="location"
              options={locations}
              onChange={onLocationChange}
              isDisabled={isPending}
              placeholder="Select your location"
              className="basic-single"
              classNamePrefix="select"
              instanceId="location-select"
            />
          </div>
          <div className="space-y-2">
            <Label>Bio</Label>
            <Input
              name="bio"
              disabled={isPending}
              placeholder="Tell us about yourself (max 200 chars)"
              onChange={onChange}
              value={data.bio}
              maxLength={200}
              className={`
      ring-offset-n-5 focus-visible:outline-none 
      focus-visible:ring-0 focus-visible:ring-offset-0 border rounded-md border-n-4 bg-n-5 font-medium
      ${formErrors.bio ? "border-red-500" : ""}
    `}
            />
            {formErrors.bio && (
              <p className="text-red-500 text-sm">{formErrors.bio}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Gender</Label>
            <div className="flex items-center gap-4 flex-wrap">
              {Object.values(Gender).map((genderOption) => (
                <div key={genderOption} className="flex items-center space-x-2">
                  <Input
                    name="gender"
                    type="radio"
                    disabled={isPending}
                    onChange={onChange}
                    value={genderOption}
                    checked={data.gender === genderOption}
                    className="w-4 h-4 checked:bg-primary-3"
                  />
                  <Label>{genderOption}</Label>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label>Preference</Label>
            <div className="flex items-center gap-4 flex-wrap">
              {Object.values(Preference).map((preferenceOption) => (
                <div
                  key={preferenceOption}
                  className="flex items-center space-x-2"
                >
                  <Input
                    name="preference"
                    type="radio"
                    disabled={isPending}
                    onChange={onChange}
                    value={preferenceOption}
                    checked={data.preference === preferenceOption}
                    className="w-4 h-4 checked:bg-primary-3"
                  />
                  <Label>{preferenceOption}</Label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between">
            <DialogClose ref={closeRef} asChild>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </DialogClose>
            <Button
              disabled={isPending}
              variant="default"
              type="submit"
            >
              {`${isPending ? "Saving" : "Save"}`}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
