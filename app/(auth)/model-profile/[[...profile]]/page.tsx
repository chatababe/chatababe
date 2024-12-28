"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as Checkbox from "@radix-ui/react-checkbox";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChevronRight,
  ChevronLeft,
  MapPin,
  Trash,
  HeartHandshake,
  ImageIcon,
  CheckIcon,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import Hint from "@/components/hint";
import Image from "next/image";
import { UploadDropzone } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import Logo from "@/components/logo";
import { updateUserProfile } from "@/actions/user";
import { updateStream } from "@/actions/stream";
import Link from "next/link";

interface modelData {
  approvalImage: string | null;
  location: string;
  interests: string[];
  socials: {
    twitter?: string;
    instagram?: string;
    facebook?: string;
  };
}

const ModelProfileSetup = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, startTransition] = useTransition();
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [modelData, setModelData] = useState<modelData>({
    approvalImage: null,
    location: "",
    interests: [],
    socials: {
      twitter: "",
      instagram: "",
      facebook: "",
    },
  });

  const totalSteps = 3;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setModelData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onRemove = () => {
    setModelData((prev) => ({
      ...prev,
      ["approvalImage"]: null,
    }));
  };
  const handleSocialLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setModelData((prev) => ({
      ...prev,
      socials: {
        ...prev.socials,
        [name]: value,
      },
    }));
  };

  const handleInterestInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const interests = e.target.value.split(",").map((item) => item.trim());
    setModelData((prev) => ({
      ...prev,
      interests,
    }));
  };

  const handleSubmit = async () => {
    if (!agreedToTerms) {
      toast.error("Please check the terms and conditions");
      return;
    }
    startTransition(() => {
      Promise.all([
        updateStream({
          approvalImage: modelData.approvalImage,
        }),
        updateUserProfile({
          location: modelData.location,
          intrests: modelData.interests,
          socials: JSON.stringify(modelData.socials),
        }),
      ])
        .then(() => {
          toast.success(
            "Wait for admin approval so as to start streaming.The process takes at most 3 days."
          );
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
              <Label className="text-sm font-medium">Approval Image</Label>
              {modelData.approvalImage ? (
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
                    src={modelData.approvalImage}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="rounded-xl border outline-dashed outline-n-4">
                  <UploadDropzone
                    endpoint="approvalImageUploader"
                    appearance={{
                      label: {
                        color: "black",
                        cursor: "pointer",
                      },
                      button: {
                        color: "black",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                        fontWeight: 500,
                      },
                      allowedContent: {
                        color: "black",
                        cursor: "pointer",
                      },
                    }}
                    onClientUploadComplete={(res) => {
                      setModelData((prev) => ({
                        ...prev,
                        ["approvalImage"]: res?.[0]?.url,
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
              <h3 className="font-semibold mb-2">
                The image above is to verify that you are of legal age and thus
                legibale to become a model
              </h3>
              <p className="text-sm text-n-2">
                The uploaded image must meet the following conditions:
              </p>
              <ul className="list-disc ml-6 mt-2 text-sm text-n-2 space-y-1">
                <li>
                  The image must be clear and unobstructed, showing your face
                  and a valid form of identification (e.g., ID, passport, or
                  driver&apos;s license).
                </li>
                <li>
                  The identification document should display your name and date
                  of birth but may obscure sensitive information like ID
                  numbers.
                </li>
                <li>The image must not be edited or manipulated in any way.</li>
                <li>The document should be valid and not expired.</li>
                <li>
                  Ensure the image is well-lit and not blurry to allow for
                  proper verification.
                </li>
                <li>
                  The image must comply with local laws and regulations
                  regarding age verification and content access.
                </li>
              </ul>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Location</Label>
              <Input
                name="location"
                value={modelData.location}
                onChange={handleInputChange}
                placeholder="City, Country"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Interests (comma-separated)
              </Label>
              <Input
                value={modelData.interests.join(", ")}
                onChange={handleInterestInput}
                placeholder="Technology, Reading, Travel"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">X Profile</label>
              <Input
                name="twitter"
                value={modelData.socials.twitter}
                onChange={handleSocialLinkChange}
                placeholder="X username (twitter)"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Instagram Profile</label>
              <Input
                name="instagram"
                value={modelData.socials.instagram}
                onChange={handleSocialLinkChange}
                placeholder="instagram username"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">facebook Profile</label>
              <Input
                name="facebook"
                value={modelData.socials.facebook}
                onChange={handleSocialLinkChange}
                placeholder="facebook username"
              />
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
        return <ImageIcon className="w-6 h-6" />;
      case 2:
        return <MapPin className="w-6 h-6" />;
      case 3:
        return <HeartHandshake className="w-6 h-6" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex gap-x-44 max-md:flex-col-reverse max-md:items-center max-md:justify-center max-md:gap-x-0 max-md:gap-4">
      <div className="lg:flex-1">
        <Card className="w-full max-w-xl">
          <CardHeader>
            <div className="flex items-center space-x-2 mb-4">
              <StepIcon />
              <CardTitle>Create your model profile</CardTitle>
            </div>
            <div className="flex gap-8 items-center mt-2 mx-auto">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "h-11 w-11  mx-1 rounded-full flex items-center justify-center",
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

export default ModelProfileSetup;
