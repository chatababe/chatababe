"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";
import { Label } from "@/components/ui/label";

export default function ReportContentPage() {
  const [formData, setFormData] = useState({
    reportType: "Harassment or Bullying",
    contentUrl: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirm) {
      toast.error("You must confirm the statement before submitting.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/send-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Report submitted successfully.");
        setFormData({
          reportType: "Harassment or Bullying",
          contentUrl: "",
          description: "",
        });
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to submit the report.");
      }
    } catch (error) {
      console.error("Error submitting report:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Report Content</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2">Type of Report</label>
              <select
                name="reportType"
                value={formData.reportType}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              >
                <option>Harassment or Bullying</option>
                <option>Hate Speech</option>
                <option>Inappropriate Content</option>
                <option>Spam</option>
                <option>Violence</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block mb-2">Content URL or ID</label>
              <input
                name="contentUrl"
                type="text"
                value={formData.contentUrl}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Paste the URL or ID of the content"
              />
            </div>

            <div>
              <label className="block mb-2">Description of Issue</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border rounded-md h-32"
                placeholder="Please provide details about why you're reporting this content..."
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox.Root
                id="terms"
                className="w-5 h-5 rounded border border-n-4 bg-n-5 flex items-center justify-center"
                onCheckedChange={(checked) => setConfirm(checked === true)}
              >
                <Checkbox.Indicator>
                  <CheckIcon className="w-4 h-4 text-green-600" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <Label htmlFor="terms" className="text-sm">
                I agree to the Terms and Conditions
              </Label>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Submitting..." : "Submit Report"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
