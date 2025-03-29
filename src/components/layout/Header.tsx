
import React from 'react';
import { Link } from 'react-router-dom';
import { useSectionTransition } from '../../utils/animations';

const Header = () => {
  const { sectionTransitionClass } = useSectionTransition(100);
  
  return (
    <header className={`w-full py-6 px-4 sm:px-6 ${sectionTransitionClass}`}>
      <div className="container max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <Link to="/" className="text-xl font-display font-medium text-blue-dark">
            <span className="text-blue-primary">Toddler</span>Guardian
          </Link>
          <div className="chip bg-blue-light text-blue-dark text-xs">Beta</div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/team" className="text-neutral-800 hover:text-blue-primary button-transition text-sm">
            Team
          </Link>
          <Link to="/about" className="text-neutral-800 hover:text-blue-primary button-transition text-sm">
            About
          </Link>
          <Link to="/?section=treatment" className="text-neutral-800 hover:text-blue-primary button-transition text-sm">
            Treatments
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
