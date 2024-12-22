/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from "next/link";
import React from "react";
import Logo from "./logo";
import { Button } from "./ui/button";
import Image from "next/image";

const footerSections = {
  platform: {
    title: "Platform",
    links: [
      { label: "Help Center", href: "#" },
      { label: "Use Cases", href: "#" },
      { label: "Security", href: "#" },
    ],
  },
  customers: {
    title: "Customers",
    links: [
      { label: "Use Cases", href: "#" },
      { label: "Customer Services", href: "#" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
    ],
  },
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-1 text-n-3 py-6 border-t border-n-4/60 mt-12">
      <div className="container mx-auto px-8">
        {/*  
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 ">
          <div>
            <Logo />
          </div>

          {Object.entries(footerSections).map(([key, section]) => (
            <div key={key}>
              <h3 className="text-n-1 font-semibold text-sm mb-2">
                {section.title}
              </h3>
              <ul className="space-y-1">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-xs text-n-2 hover:text-n-1 transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        */}

        <div className="mt-2  mr-8 flex flex-col md:flex-row justify-between items-center text-sm text-n-3">
          <div>
            © {new Date().getFullYear()} Chatababe. All rights reserved.
          </div>
          <div className="mt-4 md:mt-0">
            <Button
              size="sm"
              variant="link"
              className="text-n-5/90 hover:text-n-5"
              asChild
            >
              <Link href="/">
                <Image
                  src="/assets/icons/email.svg"
                  alt="email"
                  width={22}
                  height={22}
                />
              </Link>
            </Button>
            <Button
              size="sm"
              variant="link"
              className="text-n-5/90 hover:text-n-5"
              asChild
            >
              <Link href="/">
                <Image
                  src="/assets/icons/facebook.svg"
                  alt="facebook"
                  width={22}
                  height={22}
                />
              </Link>
            </Button>
            <Button
              size="sm"
              variant="link"
              className="text-n-5/90 hover:text-n-5"
              asChild
            >
              <Link href="/">
                <Image
                  src="/assets/icons/twitter.svg"
                  alt="twitter"
                  width={22}
                  height={22}
                />
              </Link>
            </Button>
            <Button
              size="sm"
              variant="link"
              className="text-n-5/90 hover:text-n-5"
              asChild
            >
              <Link href="/">
                <Image
                  src="/assets/icons/instagram.svg"
                  alt="instagram"
                  width={22}
                  height={22}
                />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
