import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function GuidelinesPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Community Guidelines</CardTitle>
        </CardHeader>
        <CardContent className="prose max-w-none">
          <h2 className="text-xl font-semibold mb-4">Welcome to Our Community</h2>
          <p className="mb-4">
            Our community is built on mutual respect, inclusivity, and safety. By participating, you agree to follow these guidelines to ensure a positive experience for everyone.
          </p>

          <h2 className="text-xl font-semibold mb-4">1. Be Respectful</h2>
          <p className="mb-4">
            Respect others, their opinions, and their boundaries. Harassment, hate speech, and discriminatory behavior are strictly prohibited. Remember that everyone deserves to feel safe and valued.
          </p>

          <h2 className="text-xl font-semibold mb-4">2. Promote Safety</h2>
          <p className="mb-4">
            Protect your privacy and the privacy of others. Avoid sharing personal information like addresses, phone numbers, or financial details. If you encounter harmful or suspicious behavior, report it immediately.
          </p>

          <h2 className="text-xl font-semibold mb-4">3. Follow Content Standards</h2>
          <p className="mb-4">
            All content shared within our community must align with these standards:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>No explicit, violent, or adult content that violates our policies.</li>
            <li>No hate speech, extremist content, or content inciting violence.</li>
            <li>No spam, phishing attempts, or fraudulent schemes.</li>
            <li>No harassment, threats, or targeted bullying of any kind.</li>
          </ul>

          <h2 className="text-xl font-semibold mb-4">4. Respect Intellectual Property</h2>
          <p className="mb-4">
            Share only content you own or have permission to use. Unauthorized sharing of copyrighted material or intellectual property is not allowed.
          </p>

          <h2 className="text-xl font-semibold mb-4">5. Zero Tolerance for Illegal Activities</h2>
          <p className="mb-4">
            Engaging in or promoting illegal activities, including but not limited to drug use, human trafficking, or fraud, is strictly prohibited and will be reported to the appropriate authorities.
          </p>

          <h2 className="text-xl font-semibold mb-4">6. Enforcement</h2>
          <p className="mb-4">
            We take violations of these guidelines seriously. Depending on the severity of the violation, consequences may include:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Warnings or temporary restrictions on your account.</li>
            <li>Content removal or account suspension.</li>
            <li>Permanent bans for repeated or severe violations.</li>
          </ul>
          <p className="mb-4">
            Our moderation team reserves the right to enforce these guidelines at their discretion.
          </p>

          <h2 className="text-xl font-semibold mb-4">7. Reporting Violations</h2>
          <p className="mb-4">
            If you witness or experience behavior that violates these guidelines, please report it using our in-app reporting tools or contact our support team at <a href="mailto:app.chatubabe@gmail.com" className="text-primary-3 underline">app.chatubabe@gmail.com</a>. Your safety and well-being are our top priorities.
          </p>

          <h2 className="text-xl font-semibold mb-4">8. Updates to Guidelines</h2>
          <p className="mb-4">
            These guidelines may be updated periodically to reflect changes in our community standards or policies. Continued use of our platform constitutes acceptance of the latest version of these guidelines.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
