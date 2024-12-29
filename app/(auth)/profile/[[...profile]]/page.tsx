"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as RadioGroup from "@radix-ui/react-radio-group";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ChevronRight,
  ChevronLeft,
  User,
  Briefcase,
  Trash,
  CheckIcon,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import Hint from "@/components/hint";
import Image from "next/image";
import { UploadDropzone } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import Logo from "@/components/logo";
import { createUserProfile, updateUser } from "@/actions/user";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

interface ProfileData {
  fullName: string;
  age: number;
  bio: string;
  profileImage: string | null;
  gender: string;
  preference: string;
}
enum Preference {
  MEN = "Men",
  WOMEN = "women",
  OTHERS = "others",
  UNKNOWN = "Prefer not to say",
}

enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHERS = "others",
  UNKNOWN = "Prefer not to say",
}

const ProfileSetup = () => {
  const router = useRouter();
  const { user } = useUser();
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, startTransition] = useTransition();
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: "",
    age: 18,
    bio: "",
    profileImage: null,
    gender: Gender.UNKNOWN,
    preference: Preference.UNKNOWN,
  });

  const totalSteps = 2;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleRadioChange = (field: keyof ProfileData, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const onRemove = () => {
    setProfileData((prev) => ({
      ...prev,
      ["profileImage"]: null,
    }));
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (profileData.age < 18) {
      errors.age = "You must be at least 18 years old";
    }
    if (profileData.bio.length > 200) {
      errors.bio = "Bio must be 200 characters or less";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("Please fix the form errors");
      return;
    }
    if (!agreedToTerms) {
      toast.error("Ensure you have accepted the terms and conditions");
      return;
    }
    startTransition(() => {
      Promise.all([
        updateUser({
          imageUrl: profileData.profileImage || user?.imageUrl,
        }),
        createUserProfile({
          fullName: profileData.fullName,
          age: parseInt(`${profileData.age}`),
          gender: profileData.gender,
          bio: profileData.bio,
          preference: profileData.preference,
        }),
      ])
        .then(() => {
          toast.success("User profile created successfully");
          router.push("/");
        })
        .catch((error) => {
          console.error(error);
          toast.error("Error creating profile, please try again");
        });
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Full Name</Label>
              <Input
                name="fullName"
                value={profileData.fullName}
                onChange={handleInputChange}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Age</Label>
              <Input
                name="age"
                value={profileData.age}
                onChange={handleInputChange}
                placeholder="You must be at least 18 years"
              />
              {errors.age && (
                <p className="text-s-1 text-xs font-medium">{errors.age}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Bio</Label>
              <Textarea
                name="bio"
                value={profileData.bio}
                onChange={handleInputChange}
                placeholder="Tell us about yourself..."
                className="h-32"
              />
              {errors.bio && (
                <p className="text-s-1 text-xs font-medium">{errors.bio}</p>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Profile Image</Label>
              {profileData.profileImage ? (
                <div className="relative aspect-square rounded-xl overflow-hidden border">
                  <div className="absolute top-2 right-2 z-[10]">
                    <Hint label="Remove Profile iamge" asChild side="left">
                      <Button
                        variant="default"
                        type="button"
                        disabled={loading}
                        onClick={onRemove}
                        className="h-auto w-auto p-1.5"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </Hint>
                  </div>
                  <Image
                    alt="profile image"
                    src={profileData.profileImage}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="rounded-xl border outline-dashed outline-n-4">
                  <UploadDropzone
                    endpoint="profileImageUploader"
                    appearance={{
                      label: {
                        color: "black",
                      },
                      button: {
                        color: "black",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                        fontWeight: 500,
                      },
                      allowedContent: {
                        color: "black",
                      },
                    }}
                    onClientUploadComplete={(res) => {
                      setProfileData((prev) => ({
                        ...prev,
                        ["profileImage"]: res?.[0]?.url,
                      }));
                    }}
                    onUploadError={() => {
                      toast.error("User not authenticated, Please Sign In");
                    }}
                  />
                </div>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Gender</label>
              <RadioGroup.Root
                defaultValue="Prefer not to say"
                aria-label="gender"
                onValueChange={(value) => handleRadioChange("gender", value)}
              >
                <div className="flex items-center gap-4 flex-wrap">
                  {Object.values(Gender).map((genderOption) => (
                    <div
                      key={genderOption}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroup.Item
                        aria-label="gender"
                        className="radioGroup-item peer"
                        value={genderOption}
                        id={genderOption}
                      >
                        <RadioGroup.Indicator className="radioGroup-indicator" />
                      </RadioGroup.Item>
                      <label
                        className="text-xs font-medium text-n-3 peer-checked:text-n-1"
                        htmlFor={genderOption}
                      >
                        {genderOption}
                      </label>
                    </div>
                  ))}
                </div>
              </RadioGroup.Root>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Preference (I like...)
              </label>
              <RadioGroup.Root
                defaultValue="Prefer not to say"
                aria-label="preference"
                onValueChange={(value) =>
                  handleRadioChange("preference", value)
                }
              >
                <div className="flex items-center gap-4 flex-wrap">
                  {Object.values(Preference).map((preferenceOption) => (
                    <div
                      key={preferenceOption}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroup.Item
                        aria-label="gender"
                        className="radioGroup-item peer"
                        value={preferenceOption}
                        id={preferenceOption}
                      >
                        <RadioGroup.Indicator className="radioGroup-indicator" />
                      </RadioGroup.Item>
                      <label
                        className="text-xs font-medium text-n-3 peer-checked:text-n-1"
                        htmlFor={preferenceOption}
                      >
                        {preferenceOption}
                      </label>
                    </div>
                  ))}
                </div>
              </RadioGroup.Root>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-n-3">
                By uploading your image, you confirm that the information
                provided is accurate and agree to our{" "}
                <Link href="/terms" className="text-s-3 underline">
                  Terms and Conditions
                </Link>
                .
              </p>
              <div className="flex items-center space-x-2">
                <Checkbox.Root
                  id="terms"
                  className="w-5 h-5 rounded border border-n-4 bg-n-5 flex items-center justify-center"
                  onCheckedChange={(checked) =>
                    setAgreedToTerms(checked === true)
                  }
                >
                  <Checkbox.Indicator>
                    <CheckIcon className="w-4 h-4 text-green-600" />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                <Label htmlFor="terms" className="text-sm">
                  I agree to the Terms and Conditions
                </Label>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const StepIcon = () => {
    switch (currentStep) {
      case 1:
        return <User className="w-6 h-6" />;
      case 2:
        return <Briefcase className="w-6 h-6" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex gap-x-44 max-md:flex-col-reverse max-md:items-center max-md:justify-center max-md:gap-x-0 max-md:gap-4">
      <div className="flex-1 ">
        <Card className="w-full max-w-xl">
          <CardHeader>
            <div className="flex items-center space-x-2 mb-4">
              <StepIcon />
              <CardTitle>Tell us about yourself</CardTitle>
            </div>
            <div className="flex items-center gap-8 mt-2 mx-auto">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "h-12 w-12  mx-1 rounded-full flex items-center justify-center",
                    index + 1 <= currentStep ? "bg-blue-600" : "bg-n-4"
                  )}
                >
                  <span
                    className={cn(
                      "text-xl font-bold",
                      index + 1 <= currentStep ? "text-n-5" : "text-n-3/60"
                    )}
                  >
                    {index + 1}
                  </span>
                </div>
              ))}
            </div>
          </CardHeader>
          <CardContent>{renderStep()}</CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentStep((prev) => prev - 1)}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              onClick={() => {
                if (currentStep === totalSteps) {
                  handleSubmit();
                } else {
                  setCurrentStep((prev) => prev + 1);
                }
              }}
              disabled={loading}
            >
              {currentStep === totalSteps ? (
                loading ? (
                  "Saving..."
                ) : (
                  "Complete"
                )
              ) : (
                <>
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div className="flex items-center">
        <Logo />
      </div>
    </div>
  );
};

export default ProfileSetup;
