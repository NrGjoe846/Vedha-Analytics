import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ChatBot from './ChatBot';
import ErrorBoundary from './ErrorBoundary';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return (
    <div className="bg-[#020617] min-h-screen flex flex-col font-sans text-white">
      <Navbar />
      <main className="flex-grow" role="main">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </main>
      <ChatBot />
      <Footer />
    </div>
  );
};

export default Layout;
