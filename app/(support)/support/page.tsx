"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const helpArticles = [
  {
    title: "Getting Started",
    items: [
      {
        id: "create-account",
        question: "How do I create an account?",
        answer: (
          <>
            <p>Follow these steps to create your account:</p>
            <ol className="list-decimal ml-4 mt-2 space-y-2">
              <li>
                Click the <strong>&quot;Sign Up&quot;</strong> button at the top
                right of the page.
              </li>
              <li>Enter your email address and choose a secure password.</li>
              <li>
                Check your email inbox for a verification link and click it.
              </li>
              <li>Complete your profile by filling in your details.</li>
            </ol>
          </>
        ),
      },
      {
        id: "setup-profile",
        question: "How do I set up my profile?",
        answer: (
          <>
            <p>Here’s how to personalize your profile:</p>
            <ul className="list-disc ml-4 mt-2 space-y-2">
              <li>Navigate to your profile settings.</li>
              <li>Upload a profile picture.</li>
              <li>Write a short bio about yourself.</li>
              <li>Add your gender and preferences to connect with others.</li>
            </ul>
          </>
        ),
      },
      {
        id: "navigation",
        question: "How do I navigate the platform?",
        answer: (
          <>
            <p>
              Our platform is designed to be intuitive. Here are the key
              sections:
            </p>
            <ul className="list-disc ml-4 mt-2 space-y-2">
              <li>
                <strong>Home:</strong> Your personalized feed with
                recommendations and updates.
              </li>
              <li>
                <strong>Discover:</strong> Explore new content, users, and
                trending topics.
              </li>
              <li>
                <strong>Streams:</strong> Connect and communicate with others
                directly.
              </li>
              <li>
                <strong>Dashboard:</strong> Manage your personal information and
                settings.
              </li>
            </ul>
          </>
        ),
      },
    ],
  },
  {
    title: "Becoming a Model",
    items: [
      {
        id: "broadcast-yourself",
        question: "How do I start broadcasting?",
        answer: (
          <>
            <p>To start broadcasting, follow these steps:</p>
            <ol className="list-decimal ml-4 mt-2 space-y-2">
              <li>
                Click the <strong>&quot;Broadcast Yourself&quot;</strong> button
                on the platform.
              </li>
              <li>
                If you&apos;re not approved yet, you&apos;ll be redirected to
                the <strong>Become a Model</strong> page.
              </li>
              <li>
                Complete the steps on the page to get approved for broadcasting.
              </li>
            </ol>
          </>
        ),
      },
      {
        id: "approval-process",
        question: "What is the approval process?",
        answer: (
          <>
            <p>
              To get approved as a model, you need to complete the following
              steps:
            </p>
            <ol className="list-decimal ml-4 mt-2 space-y-2">
              <li>
                <strong>Upload an image for age verification:</strong> Provide a
                clear photo of a valid ID showing your name and date of birth.
                Ensure sensitive details like ID numbers are obscured.
              </li>
              <li>
                <strong>Add your location:</strong> Specify your city and
                country to ensure compliance with regional regulations.
              </li>
              <li>
                <strong>Specify your interests:</strong> Add a few topics or
                activities you&apos;re passionate about to help users connect
                with you.
              </li>
              <li>
                <strong>Link your social media:</strong> Optionally, connect
                your Twitter, Instagram, or other social accounts to enhance
                your profile visibility.
              </li>
            </ol>
          </>
        ),
      },
    ],
  },
  {
    title: "Common Issues",
    items: [
      {
        id: "reset-password",
        question: "How do I reset my password?",
        answer: (
          <>
            <p>If you’ve forgotten your password, follow these steps:</p>
            <ol className="list-decimal ml-4 mt-2 space-y-2">
              <li>
                Go to the login page and click{" "}
                <strong>&quot;Forgot Password&quot;</strong>.
              </li>
              <li>Enter the email address associated with your account.</li>
              <li>Check your email for a password reset link and click it.</li>
              <li>Set a new password and confirm it.</li>
              <li>Log in with your new password.</li>
            </ol>
          </>
        ),
      },
      {
        id: "account-recovery",
        question: "How do I recover my account?",
        answer: (
          <>
            <p>If you&apos;re locked out of your account:</p>
            <ul className="list-disc ml-4 mt-2 space-y-2">
              <li>First, try resetting your password using the steps above.</li>
              <li>
                If unsuccessful, contact our support team at{" "}
                <strong>app.chatubabe@gmail.com</strong>.
              </li>
              <li>
                Provide verification details, such as your registered email or
                account information.
              </li>
              <li>
                Follow the instructions provided by our support team to recover
                your account.
              </li>
            </ul>
          </>
        ),
      },
    ],
  },
];

export default function SupportContentPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredArticles = helpArticles.map((section) => ({
    ...section,
    items: section.items.filter((item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  }));

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-4 pl-12 rounded-lg border border-gray-300"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="grid gap-6">
          {filteredArticles.map(
            (section) =>
              section.items.length > 0 && (
                <Card key={section.title}>
                  <CardHeader>
                    <CardTitle>{section.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {section.items.map((item) => (
                        <AccordionItem key={item.id} value={item.id}>
                          <AccordionTrigger>{item.question}</AccordionTrigger>
                          <AccordionContent>{item.answer}</AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              )
          )}
          {filteredArticles.every((section) => section.items.length === 0) && (
            <p className="text-center text-gray-500">
              No articles found for &quot;{searchQuery}&quot;.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
