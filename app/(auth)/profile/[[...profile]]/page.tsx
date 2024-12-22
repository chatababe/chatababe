"use client";

import { toast } from "sonner";
import { useState, useTransition } from "react";
import Select from 'react-select';

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import {updateUserProfile } from "@/actions/user";
import { Button } from "@/components/ui/button";


type LocationOption = {
  value: string;
  label: string;
};

const LOCATIONS = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'in', label: 'India' },
  { value: 'br', label: 'Brazil' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'kr', label: 'South Korea' },
].sort((a, b) => a.label.localeCompare(b.label));

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

const Page = () => {
  const [isPending, startTransition] = useTransition();
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const router = useRouter();

  const [data, setData] = useState({
    age: 18,
    gender: Gender.UNKNOWN,
    bio: "",
    location: "",
    preference: Preference.UNKNOWN,
  });

  const validateForm = () => {
    const errors: {[key: string]: string} = {};

    // Age validation
    if (data.age < 18) {
      errors.age = "You must be at least 18 years old";
    }

    // Bio length validation
    if (data.bio.length > 200) {
      errors.bio = "Bio must be 200 characters or less";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the form errors");
      return;
    }

    startTransition(() => {
      updateUserProfile({
        age: data.age,
        gender: data.gender,
        bio: data.bio,
        location: data.location,
        preference: data.preference,
      })
        .then(() => {
          toast.success("User profile created successfully");
          router.push('/');
        })
        .catch((error) => {
          console.error(error);
          toast.error("Error creating profile, please try again");
        });
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    const processedValue = name === 'age' 
      ? Math.max(18, Number(value)) 
      : value;

    setData((prevData) => ({
      ...prevData,
      [name]: processedValue,
    }));
    console.log(data);
    
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const onLocationChange = (selectedOption: LocationOption | null) => {
    setData(prev => ({
      ...prev,
      location: selectedOption ? selectedOption.value : '',
    }));
  };

  return (
    <div className="bg-n-5 flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="mb-6 text-2xl font-bold">Create Profile</h1>
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md space-y-6 border p-6 rounded-xl border-n-4 bg-white shadow-md"
      >
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
              ${formErrors.age ? 'border-red-500' : ''}
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
            options={LOCATIONS}
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
              ${formErrors.bio ? 'border-red-500' : ''}
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
              <div key={preferenceOption} className="flex items-center space-x-2">
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
          <Button 
            disabled={isPending} 
            variant="default" 
            type="submit"
          >
            {isPending ? 'Saving...' : 'Save Profile'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Page;