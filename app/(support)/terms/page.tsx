import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Terms of Service</CardTitle>
        </CardHeader>
        <CardContent className="prose max-w-none">
          <section className="mb-4">
            <h2 className="text-xl font-semibold mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="mb-4">
              By accessing and using this platform, you confirm that you are at
              least 18 years old (or the legal age of majority in your
              jurisdiction) and agree to comply with these Terms and Conditions,
              as well as all applicable laws and regulations. If you do not
              agree, you must not use this platform.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="text-xl font-semibold mb-4">2. Eligibility</h2>
            <p className="mb-4">
              This platform is intended for adults only. You must provide
              accurate and truthful information during registration and maintain
              the confidentiality of your account credentials. Sharing your
              account or allowing minors to access the platform is strictly
              prohibited.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="text-xl font-semibold mb-4">3. User Conduct</h2>
            <p className="mb-4">
              Users are expected to behave respectfully toward others. The
              following actions are prohibited:
            </p>
            <ul className="list-disc ml-6 mt-2 text-sm text-n-2 space-y-1">
              <li>
                Broadcasting or uploading illegal, obscene, or harmful content.
              </li>
              <li>
                Engaging in harassment, hate speech, or discriminatory behavior.
              </li>
              <li>
                Soliciting or promoting unlawful activities, including
                prostitution or trafficking.
              </li>
              <li>Sharing personal information of others without consent.</li>
              <li>
                Attempting to hack, disrupt, or misuse the platform&apos;s
                services.
              </li>
            </ul>
          </section>

          <section className="mb-4">
            <h2 className="text-xl font-semibold mb-4">
              4. Content Guidelines
            </h2>
            <p className="mb-4">
              All content shared on this platform must comply with applicable
              laws and our community standards. Explicit content is allowed
              within the scope of the platform but must not:
            </p>
            <ul className="list-disc ml-6 mt-2 text-sm text-n-2 space-y-1">
              <li>Depict minors or involve individuals under the age of 18.</li>
              <li>Promote violence, non-consensual acts, or exploitation.</li>
              <li>
                Contain copyrighted material without proper authorization.
              </li>
            </ul>
          </section>

          <section className="mb-4">
            <h2 className="text-xl font-semibold mb-4">
              5. Payment and Transactions
            </h2>
            <p className="mb-4">
              Users must comply with the platform&apos;s payment policies.
              Broadcasters and viewers are responsible for adhering to tax
              regulations in their jurisdiction. Fraudulent transactions or
              chargebacks may result in account suspension.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="text-xl font-semibold mb-4">
              6. Privacy and Security
            </h2>
            <p className="mb-4">
              We are committed to protecting your privacy. Please review our
              Privacy Policy to understand how your data is collected, used, and
              shared. Users are responsible for securing their accounts and
              reporting any unauthorized access immediately.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="text-xl font-semibold mb-4">
              7. Service Modifications
            </h2>
            <p className="mb-4">
              We reserve the right to modify, suspend, or discontinue the
              service at any time, with or without notice. We are not liable for
              any inconvenience or loss caused by such changes.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="text-xl font-semibold mb-4">8. Termination</h2>
            <p className="mb-4">
              We reserve the right to terminate or suspend access to the
              platform for violations of these Terms or any illegal activity.
              Terminated users forfeit any outstanding earnings or balances.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="text-xl font-semibold mb-4">
              9. Disclaimer of Liability
            </h2>
            <p className="mb-4">
              This platform is provided &quot;as is&quot; without warranties of
              any kind. We are not responsible for user-generated content or
              interactions and disclaim liability for any damages arising from
              the use of this platform.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="text-xl font-semibold mb-4">10. Governing Law</h2>
            <p className="mb-4">
              These Terms are governed by the laws of [Your Jurisdiction]. Any
              disputes must be resolved in the courts of [Your Jurisdiction].
            </p>
          </section>
          
          <section className="mb-4">
            <h2 className="text-xl font-semibold mb-4">11. Updates to Terms</h2>
            <p className="mb-4">
              We may update these Terms periodically. Continued use of the
              platform after changes are made constitutes acceptance of the
              updated Terms.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
