"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getIngressInput } from "./ingressInput"; // Adjust path
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface OptionsProps {
  isPending: boolean;
  ingressType: string;
  setIngressType: Dispatch<SetStateAction<string>>;
}

const Options = ({ isPending, ingressType, setIngressType }: OptionsProps) => {
  const [ingressTypes, setIngressTypes] = useState<{
    rtmp: string;
    whip: string;
  } | null>(null);

  useEffect(() => {
    const loadIngressTypes = async () => {
      try {
        const types = await getIngressInput();
        setIngressTypes(types);
      } catch (error) {
        console.error("Failed to load ingress types:", error);
      }
    };

    loadIngressTypes();
  }, []);

  if (!ingressTypes) {
    return (
      <Select disabled>
        <SelectTrigger>
          <SelectValue placeholder="Loading..." />
        </SelectTrigger>
      </Select>
    );
  }

  return (
    <Select
      disabled={isPending}
      value={ingressType}
      onValueChange={setIngressType}
    >
      <SelectTrigger
        className="w-full px-3 py-2 text-sm focus:outline-none focus:ring-0 focus:ring-none 
focus:ring-offset-0"
      >
        <SelectValue placeholder="Ingress Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={ingressTypes.rtmp}>RTMP</SelectItem>
        <SelectItem value={ingressTypes.whip}>WHIP</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default Options;
