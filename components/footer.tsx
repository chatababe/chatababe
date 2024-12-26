import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";

const Footer: React.FC = () => {
  const categories = [
    {
      title: "Free cams by Age",
      links: [
        "Teen Cams (18+)",
        "18 to 21 cams",
        "20 to 30 cams",
        "30 to 50 cams",
        "Mature cams"
      ]
    },
    {
      title: "Free Cams by Region",
      links: [
        "North American Cams",
        "South American Cams",
        "Euro Russian Cams",
        "Asian Cams",
        "Other Regions"
      ]
    },
    {
      title: "Available Private Shows",
      links: [
        "6 Tokens per Minute",
        "12-18 Tokens per Minute",
        "30-42 Tokens per Minute",
        "60-72 Tokens per Minute",
        "90+ Tokens per Minute"
      ]
    },
    {
      title: "Free Cams by Status",
      links: [
        "Private Shows",
        "New Cams",
      ]
    },
    {
      title: "Free Cams",
      links: [
        "Featured Cams",
        "Female Cams",
        "Male Cams",
        "Couple Cams",
        "Trans Cams"
      ]
    }
  ];

  const footerLinks = [
    "Terms",
    "Privacy",
    "Support",
    "Content Guidelines",
    "Feedback",
    "Safety Center",
    "Report Content",
    "Contact"
  ];

  const languages = [
    "English",
    "Español",
    "Français",
    "Deutsch",
    "Italiano",
    "日本語",
    "한국어",
    "中文"
  ];

  return (
    <footer className="bg-gradient-to-b from-primary-3/20 via-white to-white  py-8 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8 mx-auto w-fit">
          {categories.map((category, index) => (
            <div key={index}>
              <h3 className="text-gray-700 font-semibold mb-3 text-sm">{category.title}</h3>
              <ul className="space-y-1">
                {category.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href="#" className="text-blue-900/90 hover:text-blue-900 text-xs font-medium">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 justify-center mb-4">
          {footerLinks.map((link, index) => (
            <Link
              key={index}
              href="#"
              className="text-s-2 font-semibold text-xs"
            >
              {link}
            </Link>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-6">
          {languages.map((language, index) => (
            <button
              key={index}
              className="text-gray-600 hover:text-gray-900 text-xs"
            >
              {language}
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center border-t pt-6">
          <p className="text-sm text-gray-600 mb-4 md:mb-0">
            © {new Date().getFullYear()} chatababe.com. All rights reserved.
          </p>
          <div className="flex gap-2">
            {['facebook', 'twitter', 'instagram'].map((social) => (
              <Button
                key={social}
                size="sm"
                variant="ghost"
                className="hover:text-gray-900"
                asChild
              >
                <Link href="/">
                  <Image
                    src={`/assets/icons/${social}.svg`}
                    alt={social}
                    width={20}
                    height={20}
                  />
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;