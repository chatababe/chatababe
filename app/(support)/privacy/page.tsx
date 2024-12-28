import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function PrivacyPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="prose max-w-none">
          <section className="mb-4">
            <h2 className="text-xl font-semibold mb-4">
              Information We Collect
            </h2>
            <p className="mb-4">
              We collect various types of information to provide and improve our
              services, including:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>
                <strong>Information You Provide:</strong> This includes your
                name, email address, profile details, payment information, and
                any other data you voluntarily share with us.
              </li>
              <li>
                <strong>Usage Data:</strong> We automatically collect
                information about how you interact with our platform, such as
                your IP address, browser type, device information, and pages
                visited.
              </li>
              <li>
                <strong>Cookies and Tracking Technologies:</strong> We use
                cookies, web beacons, and similar technologies to enhance your
                experience and gather analytical data.
              </li>
            </ul>
          </section>

          <section className="mb-4">
            <h2 className="text-xl font-semibold mb-4">
              How We Use Your Information
            </h2>
            <p className="mb-4">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>To provide, operate, and improve our services.</li>
              <li>
                To communicate with you about updates, promotions, or support
                inquiries.
              </li>
              <li>To process transactions and ensure secure payments.</li>
              <li>
                To monitor and analyze usage trends to enhance user experience.
              </li>
              <li>
                To detect, prevent, and address fraudulent or unauthorized
                activities.
              </li>
              <li>
                To comply with legal obligations and enforce our terms of
                service.
              </li>
            </ul>
          </section>

          <section className="mb-4">
            <h2 className="text-xl font-semibold mb-4">Data Security</h2>
            <p className="mb-4">
              We take the security of your personal information seriously and
              implement industry-standard measures to protect it. These measures
              include encryption, secure data storage, and regular security
              assessments. However, no method of transmission over the Internet
              or electronic storage is 100% secure, and we cannot guarantee
              absolute security.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="text-xl font-semibold mb-4">
              Cookies and Tracking Technologies
            </h2>
            <p className="mb-4">
              We use cookies and similar technologies to personalize your
              experience, analyze site usage, and deliver targeted
              advertisements. You can manage your cookie preferences through
              your browser settings. Please note that disabling cookies may
              affect the functionality of our platform.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="text-xl font-semibold mb-4">Your Privacy Choices</h2>
            <p className="mb-4">
              You have the right to access, update, or delete your personal
              information at any time. You may also opt out of receiving
              promotional communications or request restrictions on how your
              data is used. To exercise these rights, please contact us at
              [support email].
            </p>
          </section>

          <section className="mb-4">
            <h2 className="text-xl font-semibold mb-4">Third-Party Services</h2>
            <p className="mb-4">
              We may share your information with trusted third-party providers
              for purposes such as payment processing, analytics, or customer
              support. These providers are obligated to protect your data and
              use it only for the services they provide to us.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="text-xl font-semibold mb-4">
              Changes to This Privacy Policy
            </h2>
            <p className="mb-4">
              We may update this Privacy Policy from time to time to reflect
              changes in our practices or legal requirements. We encourage you
              to review this policy periodically for any updates. Continued use
              of our platform constitutes acceptance of the revised policy.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
