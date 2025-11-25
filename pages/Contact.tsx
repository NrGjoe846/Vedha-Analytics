import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => setSubmitted(true), 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <div className="pt-24 pb-20 min-h-screen relative overflow-hidden bg-[#030712]">
        {/* Decorative BG */}
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-vedha-blue/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-vedha-purple/10 rounded-full blur-[100px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Info Side */}
          <div className="space-y-10">
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Start Your <span className="neon-gradient-text">Transformation</span></h1>
              <p className="text-gray-400 text-lg font-light">
                Ready to elevate your digital infrastructure? Reach out to our expert team for a consultation.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start space-x-6">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-vedha-blue">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-white font-bold font-display text-lg">Headquarters</h3>
                  <p className="text-gray-400 mt-1">Cyber City, Gurugram, India</p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-vedha-purple">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-white font-bold font-display text-lg">Email Us</h3>
                  <p className="text-gray-400 mt-1">projects@vedhaanalytics.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-pink-500">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-white font-bold font-display text-lg">Call Us</h3>
                  <p className="text-gray-400 mt-1">+91 11 2345 6789</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="glass-panel p-8 md:p-10 rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.3)]">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={formState.name}
                            onChange={handleChange}
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-vedha-blue transition-colors"
                            placeholder="John Doe"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={formState.email}
                            onChange={handleChange}
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-vedha-blue transition-colors"
                            placeholder="john@company.com"
                        />
                    </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Interested Service</label>
                  <div className="relative">
                    <select
                        name="service"
                        value={formState.service}
                        onChange={handleChange}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-vedha-blue transition-colors appearance-none"
                    >
                        <option value="" className="bg-gray-900">Select a service...</option>
                        <option value="government" className="bg-gray-900">Government Solutions</option>
                        <option value="ai" className="bg-gray-900">AI & Analytics</option>
                        <option value="web" className="bg-gray-900">Web Development</option>
                        <option value="consulting" className="bg-gray-900">Consulting</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Project Details</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formState.message}
                    onChange={handleChange}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-vedha-blue transition-colors"
                    placeholder="Tell us about your project goals..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-vedha-blue to-vedha-purple text-white font-bold py-4 rounded-lg transition-all transform hover:translate-y-[-2px] shadow-[0_0_20px_rgba(217,70,239,0.3)] flex justify-center items-center gap-2"
                >
                  <Send size={18} /> Send Inquiry
                </button>
              </form>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/30">
                  <div className="w-10 h-10 bg-green-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.5)]"></div>
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Inquiry Received</h3>
                    <p className="text-gray-400">Thank you. Our team will analyze your request and get back to you within 24 hours.</p>
                </div>
                <button onClick={() => setSubmitted(false)} className="text-vedha-blue hover:text-white text-sm mt-4 font-semibold">Send another message</button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;