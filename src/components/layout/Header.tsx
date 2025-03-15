
import React from 'react';
import { useSectionTransition } from '../../utils/animations';

const Header = () => {
  const { sectionTransitionClass } = useSectionTransition(100);
  
  return (
    <header className={`w-full py-6 px-4 sm:px-6 ${sectionTransitionClass}`}>
      <div className="container max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <h1 className="text-xl font-display font-medium text-blue-dark">
            <span className="text-blue-primary">Toddler</span>Guardian
          </h1>
          <div className="chip bg-blue-light text-blue-dark text-xs">Beta</div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#about" className="text-neutral-800 hover:text-blue-primary button-transition text-sm">
            About
          </a>
          <a href="#resources" className="text-neutral-800 hover:text-blue-primary button-transition text-sm">
            Resources
          </a>
          <a href="#contact" className="text-neutral-800 hover:text-blue-primary button-transition text-sm">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
