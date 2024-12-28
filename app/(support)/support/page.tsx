import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function SupportContentPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search help articles..."
              className="w-full p-4 pl-12 rounded-lg border border-gray-300"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="create-account">
                  <AccordionTrigger>
                    How do I create an account?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>Follow these steps to create your account:</p>
                    <ol className="list-decimal ml-4 mt-2 space-y-2">
                      <li>
                        Click the <strong>&quot;Sign Up&quot;</strong> button at
                        the top right of the page.
                      </li>
                      <li>
                        Enter your email address and choose a secure password.
                      </li>
                      <li>
                        Check your email inbox for a verification link and click
                        it.
                      </li>
                      <li>Complete your profile by filling in your details.</li>
                    </ol>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="setup-profile">
                  <AccordionTrigger>
                    How do I set up my profile?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>Here&apos;s how to personalize your profile:</p>
                    <ul className="list-disc ml-4 mt-2 space-y-2">
                      <li>Navigate to your profile settings.</li>
                      <li>Upload a profile picture.</li>
                      <li>Write a short bio about yourself.</li>
                      <li>
                        Add your gender and preferences to connect with your
                        models.
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="navigation">
                  <AccordionTrigger>
                    How do I navigate the platform?
                  </AccordionTrigger>
                  <AccordionContent>
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
                        <strong>Discover:</strong> Discover new content, users,
                        and trending topics.
                      </li>
                      <li>
                        <strong>Streams:</strong> Connect and communicate with
                        models directly.
                      </li>
                      <li>
                        <strong>Dashboard:</strong> Manage your personal
                        information and settings.
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Becoming a Model</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="broadcast-yourself">
                  <AccordionTrigger>
                    How do I start broadcasting?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>To start broadcasting, follow these steps:</p>
                    <ol className="list-decimal ml-4 mt-2 space-y-2">
                      <li>
                        Click the{" "}
                        <strong>&quot;Broadcast Yourself&quot;</strong> button
                        on the platform.
                      </li>
                      <li>
                        If you’re not approved yet, you’ll be redirected to the{" "}
                        <strong>Become a Model</strong> page.
                      </li>
                      <li>
                        Complete the steps on the page to get approved for
                        broadcasting.
                      </li>
                    </ol>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="approval-process">
                  <AccordionTrigger>
                    What is the approval process?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>
                      To get approved as a model, you need to complete the
                      following steps:
                    </p>
                    <ol className="list-decimal ml-4 mt-2 space-y-2">
                      <li>
                        <strong>Upload an image for age verification:</strong>{" "}
                        Provide a clear photo of a valid ID showing your name
                        and date of birth. Ensure sensitive details like ID
                        numbers are obscured.
                      </li>
                      <li>
                        <strong>Add your location:</strong> Specify your city
                        and country to ensure compliance with regional
                        regulations.
                      </li>
                      <li>
                        <strong>Specify your interests:</strong> Add a few
                        topics or activities you’re passionate about to help
                        users connect with you.
                      </li>
                      <li>
                        <strong>Link your social media:</strong> Optionally,
                        connect your Twitter, Instagram, or other social
                        accounts to enhance your profile visibility.
                      </li>
                    </ol>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="tips-for-approval">
                  <AccordionTrigger>
                    Tips for a successful approval
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>
                      Here are some tips to ensure your application gets
                      approved quickly:
                    </p>
                    <ul className="list-disc ml-4 mt-2 space-y-2">
                      <li>
                        Make sure the image you upload is clear and well-lit.
                      </li>
                      <li>
                        Double-check that your ID is valid and not expired.
                      </li>
                      <li>Fill in all the required fields accurately.</li>
                      <li>
                        Ensure your social media profiles, if added, are public
                        and professional.
                      </li>
                      <li>
                        Review your application before submitting it to avoid
                        missing details.
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Common Issues</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="reset-password">
                  <AccordionTrigger>
                    How do I reset my password?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>
                      If you&apos;ve forgotten your password, follow these
                      steps:
                    </p>
                    <ol className="list-decimal ml-4 mt-2 space-y-2">
                      <li>
                        Go to the login page and click{" "}
                        <strong>&quot;Forgot Password&quot;</strong>.
                      </li>
                      <li>
                        Enter the email address associated with your account.
                      </li>
                      <li>
                        Check your email for a password reset link and click it.
                      </li>
                      <li>Set a new password and confirm it.</li>
                      <li>Log in with your new password.</li>
                    </ol>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="account-recovery">
                  <AccordionTrigger>
                    How do I recover my account?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>If you&apos;re locked out of your account:</p>
                    <ul className="list-disc ml-4 mt-2 space-y-2">
                      <li>
                        First, try resetting your password using the steps
                        above.
                      </li>
                      <li>
                        If unsuccessful, contact our support team at{" "}
                        <strong>app.chatubabe@gmail.com</strong>.
                      </li>
                      <li>
                        Provide verification details, such as your registered
                        email or account information.
                      </li>
                      <li>
                        Follow the instructions provided by our support team to
                        recover your account.
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="troubleshooting">
                  <AccordionTrigger>
                    Common troubleshooting steps
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>
                      If you&apos;re experiencing technical issues, try the
                      following:
                    </p>
                    <ul className="list-disc ml-4 mt-2 space-y-2">
                      <li>Clear your browser&apos;s cache and cookies.</li>
                      <li>
                        Switch to a different browser or update your current
                        one.
                      </li>
                      <li>Ensure you have a stable internet connection.</li>
                      <li>
                        Check for updates to the platform or app and install
                        them.
                      </li>
                      <li>Log out of your account and log back in.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
