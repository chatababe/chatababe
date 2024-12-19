import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "livestream",
  description: "livestream is a live streaming platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
    signUpForceRedirectUrl={"/profile"}
    >
      <html lang="en">
        <body className={inter.className}>
          <Toaster
            invert
            richColors
            closeButton
            containerAriaLabel="Toaster"
            position="bottom-center"
          />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
