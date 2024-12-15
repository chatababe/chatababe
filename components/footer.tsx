import React from 'react';
import { footerLinks, footerInfo } from '@/constants/index';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-1 border-t border-n-4/40 shadow-lg text-white py- mt-8">
      <div className="container mx-auto p-12">
        <div className="flex flex-col justify-between items-center">
          <div className="flex space-x-4 mb-4">
            {footerLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-s-2 hover:text-s-3 font-medium transition-colors duration-300 text-[11px]"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="mt-4 text-center md:mt-0">
            <p className="text-[8px] text-gray-400">
              {footerInfo.recordKeepingRequirements}
            </p>
            <p className="text-[8px] text-gray-400">
              {footerInfo.mainOffice}
            </p>
            <p className="text-[8px] text-gray-400">
              {footerInfo.copyright}
            </p>
            <p className="text-[8px] text-gray-400">
              {footerInfo.websiteUrl}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;