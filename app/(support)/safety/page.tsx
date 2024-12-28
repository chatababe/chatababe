import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Shield, Lock, AlertTriangle } from 'lucide-react';

export default function SafetyPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6" />
              <CardTitle>Account Security</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li>
                <strong>Use a strong, unique password:</strong> Create a password with at least 12 characters, including a mix of letters, numbers, and symbols.
              </li>
              <li>
                <strong>Enable two-factor authentication (2FA):</strong> Add an extra layer of security by using an authentication app or SMS for login verification.
              </li>
              <li>
                <strong>Never share your login credentials:</strong> Keep your username and password private, even with trusted individuals.
              </li>
              <li>
                <strong>Log out from shared devices:</strong> Always log out after using public or shared devices to prevent unauthorized access.
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Lock className="h-6 w-6" />
              <CardTitle>Privacy Protection</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li>
                <strong>Review your privacy settings regularly:</strong> Ensure your account settings align with your preferences for visibility and data sharing.
              </li>
              <li>
                <strong>Be cautious about sharing personal information:</strong> Avoid posting sensitive details like your address, phone number, or financial information.
              </li>
              <li>
                <strong>Understand who can see your content:</strong> Use privacy controls to restrict content visibility to trusted individuals or groups.
              </li>
              <li>
                <strong>Manage connected apps and services:</strong> Regularly review and revoke access to third-party apps you no longer use or trust.
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-6 w-6" />
              <CardTitle>Report Concerns</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              If you encounter suspicious activity, harassment, or content that violates our guidelines, take the following steps:
            </p>
            <ul className="space-y-4">
              <li>
                <strong>Use the report button:</strong> Report inappropriate content or users directly through our platform’s reporting tools.
              </li>
              <li>
                <strong>Contact our support team:</strong> Reach out to us at <a href="mailto:app.chatubate@gmail.com" className="text-primary-2 underline">app.chatubate@gmail.com</a> for assistance.
              </li>
              <li>
                <strong>Block users:</strong> Use the block feature to prevent further interaction with individuals who are harassing or threatening you.
              </li>
              <li>
                <strong>Save evidence:</strong> Take screenshots or save messages as evidence to provide to our support team or authorities if necessary.
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
