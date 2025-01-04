"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Button } from "./ui/button";

const AgeConsentDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const hasConsented = sessionStorage.getItem("ageConsent");
    if (!hasConsented) {
      setIsDialogOpen(true); // Open dialog on the client after hydration
    } else {
      setIsDialogOpen(false);
    }
  }, []);

  const handleConsent = () => {
    sessionStorage.setItem("ageConsent", "true");
    setIsDialogOpen(false);
  };

  const handleReject = () => {
    toast.error("You must be of legal age to enter this site.");
    window.location.href = "/";
  };

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      handleReject();
    }
  };

  if (!isDialogOpen) return null;

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
      <DialogContent className="my-2 max-h-[80vh] overflow-y-scroll hidden-scrollbar">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center">Are You 18 or Older?</DialogTitle>
          <DialogDescription className="text-lg font-medium pt-4">
            This is an adult site. By entering, you confirm that you are of legal age to view adult content in your jurisdiction.
          </DialogDescription>
        </DialogHeader>
        <section className="h-[100px] rounded-md border p-4">
          <p className="text-sm text-n-1/80">
            This site contains adult content intended for viewers 18 years and older. Please confirm that you meet the minimum age requirement to proceed.
          </p>
        </section>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center mt-4">
          <Button
            variant="default"
            onClick={handleConsent}
            size="lg"
            className="bg-green-500 text-n-5 hover:bg-green-600"
          >
            I am 18+ and Accept
          </Button>
          <Button
            variant="destructive"
            size="lg"
            onClick={handleReject}
            className="px-6 py-3 bg-s-1/60 text-n-5 rounded-lg hover:bg-s-1 transition-colors font-medium"
          >
            I Do Not Accept
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AgeConsentDialog;
