"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
          <DialogTitle className="text-2xl font-bold">
            Age Verification & Terms
          </DialogTitle>
          <DialogDescription className="text-base">
            Please review our terms and confirm your age before entering
          </DialogDescription>
        </DialogHeader>
        <section className="h-[300px] rounded-md border p-4 overflow-hidden overflow-y-scroll">
          <div className="space-y-4">
            <section>
              <h3 className="font-semibold mb-2">Age Verification</h3>
              <p className="text-sm text-n-2">
                By entering this site, you confirm that:
              </p>
              <ul className="list-disc ml-6 mt-2 text-sm text-n-2 space-y-1">
                <li>You are 18 years of age or older</li>
                <li>It is legal to view mature content in your jurisdiction</li>
                <li>
                  You accept full responsibility for your actions on this site
                </li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold mb-2">Terms of Use</h3>
              <div className="text-sm text-n-2 space-y-2">
                <p>
                  By accessing and using this website, you agree to be bound by
                  the following terms and conditions:
                </p>
                <ul className="list-disc ml-6 space-y-1">
                  <li>You will not share your account or access credentials</li>
                  <li>
                    You will not attempt to circumvent any security measures
                  </li>
                  <li>
                    You acknowledge that all content is protected by copyright
                  </li>
                  <li>
                    You will not redistribute or reproduce any content from this
                    site
                  </li>
                  <li>
                    You accept our privacy policy and data collection practices
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="font-semibold mb-2">Content Advisory</h3>
              <p className="text-sm text-n-2">
                This site may contain mature themes, strong language, and
                content that some viewers might find objectionable. Please
                exercise discretion and ensure you are comfortable with such
                content before proceeding.
              </p>
            </section>
          </div>
        </section>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center mt-4">
          <Button
            variant="default"
            onClick={handleConsent}
            size="lg"
            className="bg-green-500 text-n-5  hover:bg-green-600 "
          >
            I am 18+ and Accept Terms
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

        <p className="text-xs text-center text-gray-500 mt-2">
          {
            'By clicking "I am 18+ and Accept Terms", you confirm that you have read and agree to our terms of use and meet the minimum age requirements.'
          }
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default AgeConsentDialog;
