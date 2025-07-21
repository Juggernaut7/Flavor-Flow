import React from 'react';
import { APP_NAME } from '../../utils/constants';

const Footer = () => {
  return (
    <footer className="bg-text-dark text-white p-4 sm:p-6 mt-8 sm:mt-12 rounded-t-xl">
      <div className="container mx-auto text-center text-gray-400 text-sm sm:text-base">
        <p>© {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
        <p className="mt-2 text-xs sm:text-sm">Crafted with passion for the contest.</p>
      </div>
    </footer>
  );
};

export default Footer;