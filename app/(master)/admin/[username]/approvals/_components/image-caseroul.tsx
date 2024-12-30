"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ApproveButton from "./approve-button";
import RejectButton from "./reject-button";

interface ImageCaeroulProps {
  id: string;
  title: string;
  idImageUrl: string;
  faceImageUrl: string;
}

const ImageCaseroul = ({
  id,
  title,
  idImageUrl,
  faceImageUrl,
}: ImageCaeroulProps) => {
  const [currentImage, setCurrentImage] = useState(0);
  const imageList = [idImageUrl, faceImageUrl];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % imageList.length);
  };

  const previousImage = () => {
    setCurrentImage((prev) => (prev - 1 + imageList.length) % imageList.length);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="cursor-pointer">{title}</span>
      </DialogTrigger>
      <DialogContent className="my-2 max-h-[80vh] overflow-y-scroll hidden-scrollbar">
        <DialogHeader>
          <DialogTitle>Images</DialogTitle>
        </DialogHeader>

        <div className="relative w-full h-64 mt-2">
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src={imageList[currentImage]}
              alt={`Image ${currentImage + 1}`}
              fill
              className="object-contain"
            />
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 transform -translate-y-1/2"
            onClick={previousImage}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            onClick={nextImage}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
            {imageList.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full transition-colors ${
                  currentImage === index ? "bg-n-4/40" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-6">
          <ApproveButton userId={id} />
          <RejectButton userId={id} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageCaseroul;
