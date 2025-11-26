import React from 'react';
import { Triangle, Linkedin, Twitter, Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#02050c] border-t border-white/5 pt-16 pb-8 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-vedha-blue/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-vedha-red/5 rounded-full blur-[100px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Triangle className="h-5 w-5 text-vedha-red fill-vedha-blue" />
              <span className="font-display font-bold text-xl text-white">
                VEDHA ANALYTICS
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering India's digital future through advanced AI, scalable software, and secure government solutions.
            </p>
          </div>

          <div>
            <h3 className="font-display font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-vedha-red transition-colors duration-300">GovTech Solutions</a></li>
              <li><a href="#" className="hover:text-vedha-red transition-colors duration-300">AI & Machine Learning</a></li>
              <li><a href="#" className="hover:text-vedha-red transition-colors duration-300">Big Data Analytics</a></li>
              <li><a href="#" className="hover:text-vedha-red transition-colors duration-300">Cloud Infrastructure</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#/about" className="hover:text-vedha-red transition-colors duration-300">About Us</a></li>
              <li><a href="#" className="hover:text-vedha-red transition-colors duration-300">Careers</a></li>
              <li><a href="#/projects" className="hover:text-vedha-red transition-colors duration-300">Case Studies</a></li>
              <li><a href="#/contact" className="hover:text-vedha-red transition-colors duration-300">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-white mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-vedha-blue/20 hover:text-vedha-blue transition-all duration-300"><Linkedin size={18} /></a>
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-vedha-blue/20 hover:text-vedha-blue transition-all duration-300"><Twitter size={18} /></a>
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-vedha-red/20 hover:text-vedha-red transition-all duration-300"><Mail size={18} /></a>
            </div>
            <div className="mt-6 space-y-2">
              <p className="text-xs text-gray-500 flex items-center gap-2"><MapPin size={12}/> Cyber City, Gurugram</p>
              <p className="text-xs text-gray-500">ISO 27001 Certified</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 text-center text-xs text-gray-600 flex justify-between items-center">
          <span>&copy; {new Date().getFullYear()} Vedha Analytics.</span>
          <span className="text-gray-700">Innovating India</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;