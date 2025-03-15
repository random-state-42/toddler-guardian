
import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full py-6 px-4 sm:px-6 bg-neutral-50 border-t border-neutral-200">
      <div className="container max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-neutral-800">
              <span className="font-medium">ToddlerGuardian</span> — Early autism screening tool
            </p>
            <p className="text-xs text-neutral-600 mt-1">
              This tool is for screening purposes only and is not a diagnostic instrument.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-6 mb-2">
              <a href="#" className="text-neutral-600 hover:text-blue-primary transition-colors">
                <span className="sr-only">Privacy Policy</span>
                Privacy
              </a>
              <a href="#" className="text-neutral-600 hover:text-blue-primary transition-colors">
                <span className="sr-only">Terms of Service</span>
                Terms
              </a>
              <a href="#" className="text-neutral-600 hover:text-blue-primary transition-colors">
                <span className="sr-only">Contact Us</span>
                Contact
              </a>
            </div>
            <p className="text-xs text-neutral-600">
              © {new Date().getFullYear()} ToddlerGuardian. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
