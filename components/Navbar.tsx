import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Triangle } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Political Services', path: '/projects' },
    { name: 'Tech Services', path: '/services' },
  ];

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <nav className="fixed w-full z-50 top-0 left-0 border-b border-white/5 bg-[#030712]/80 backdrop-blur-xl" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link
            to="/"
            className="flex items-center space-x-3 group focus:outline-none focus:ring-2 focus:ring-vedha-blue rounded-lg"
            aria-label="Vedha Analytics Home"
          >
            <div className="relative p-2" aria-hidden="true">
                <div className="absolute inset-0 bg-gradient-to-tr from-vedha-blue to-vedha-red opacity-20 group-hover:opacity-40 blur-lg rounded-full transition-opacity"></div>
                <Triangle className="h-6 w-6 text-vedha-silver fill-vedha-red stroke-vedha-blue group-hover:rotate-180 transition-transform duration-700" />
            </div>
            <span className="font-display font-bold text-xl tracking-wider text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-vedha-blue group-hover:to-vedha-red transition-all duration-300">
              VEDHA<span className="text-vedha-blue">ANALYTICS</span>
            </span>
          </Link>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-1 py-2 text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-vedha-blue rounded ${
                    isActive(link.path)
                      ? 'text-white'
                      : 'text-gray-300 hover:text-white'
                  }`}
                  aria-current={isActive(link.path) ? 'page' : undefined}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-vedha-blue to-vedha-red shadow-[0_0_10px_rgba(239,68,68,0.5)]" aria-hidden="true"></span>
                  )}
                </Link>
              ))}
              <Link
                to="/contact"
                className="ml-4 bg-gradient-to-r from-vedha-blue/80 to-vedha-red/80 hover:from-vedha-blue hover:to-vedha-red text-white px-6 py-2 rounded-full text-sm font-medium transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(239,68,68,0.5)] transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-vedha-blue focus:ring-offset-2 focus:ring-offset-[#030712]"
              >
                Get Proposal
              </Link>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-vedha-blue transition-colors"
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          id="mobile-menu"
          ref={mobileMenuRef}
          className="md:hidden glass-panel border-t border-white/10 animate-fade-in"
          role="menu"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#030712]">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-vedha-blue ${
                    isActive(link.path) ? 'text-vedha-red bg-white/5' : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
                role="menuitem"
                aria-current={isActive(link.path) ? 'page' : undefined}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
