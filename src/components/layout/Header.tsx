import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-primary py-4 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <h1 className="text-white text-xl font-bold">ToddlerGuardian</h1>
        </Link>
        
        <nav className="hidden md:flex gap-6">
          <Link to="/" className="text-white hover:text-primary-foreground transition">Home</Link>
          <Link to="/about" className="text-white hover:text-primary-foreground transition">About</Link>
          <Link to="/team" className="text-white hover:text-primary-foreground transition">Team</Link>
          <Link to="/srs" className="text-white hover:text-primary-foreground transition">SRS Document</Link>
        </nav>
        
        {/* Mobile menu button */}
        <button onClick={toggleMobileMenu} className="md:hidden text-white">
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Mobile menu */}
        <div className={`md:hidden absolute top-full left-0 w-full bg-primary ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          <nav className="flex flex-col items-center py-4 gap-4">
            <Link to="/" className="text-white hover:text-primary-foreground transition">Home</Link>
            <Link to="/about" className="text-white hover:text-primary-foreground transition">About</Link>
            <Link to="/team" className="text-white hover:text-primary-foreground transition">Team</Link>
            <Link to="/srs" className="text-white hover:text-primary-foreground transition">SRS Document</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
