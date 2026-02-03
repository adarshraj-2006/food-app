import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Navbar from '../../components/layout/Navbar/Navbar';
import Footer from '../../components/layout/Footer/Footer';

const Contact = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <Navbar />

      <div className="pt-32 pb-20 px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Info Section */}
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl font-black text-neutral-900 dark:text-white mb-6">Get in touch</h1>
              <p className="text-xl text-neutral-500 dark:text-neutral-400">
                Have a question or feedback? We'd love to hear from you. Our team is always here to help.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { icon: Phone, title: 'Call Us', desc: '+91 80000 90000', sub: 'Mon-Fri from 8am to 5pm' },
                { icon: Mail, title: 'Email Us', desc: 'support@tomato.com', sub: 'We will respond within 24 hours' },
                { icon: MapPin, title: 'Visit Us', desc: '123 Foodie Street, Koramangala', sub: 'Bangalore, India 560034' },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6 p-6 rounded-3xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 hover:border-orange-200 dark:hover:border-orange-900/50 transition-colors group">
                  <div className="w-14 h-14 bg-white dark:bg-neutral-700 rounded-2xl flex items-center justify-center text-orange-500 shadow-sm shrink-0 group-hover:scale-110 transition-transform">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-neutral-900 dark:text-white">{item.title}</h3>
                    <p className="text-neutral-900 dark:text-white font-medium mt-1">{item.desc}</p>
                    <p className="text-sm text-neutral-400 mt-1">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Section */}
          <div className="bg-neutral-50 dark:bg-neutral-800 p-8 md:p-12 rounded-[40px]">
            <h2 className="text-3xl font-black text-neutral-900 dark:text-white mb-8">Send us a message</h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">First Name</label>
                  <input type="text" className="w-full px-4 py-4 rounded-xl bg-white dark:bg-neutral-900 border-none focus:ring-2 focus:ring-orange-500 outline-none transition-all placeholder:text-neutral-400 font-medium" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">Last Name</label>
                  <input type="text" className="w-full px-4 py-4 rounded-xl bg-white dark:bg-neutral-900 border-none focus:ring-2 focus:ring-orange-500 outline-none transition-all placeholder:text-neutral-400 font-medium" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">Email Address</label>
                <input type="email" className="w-full px-4 py-4 rounded-xl bg-white dark:bg-neutral-900 border-none focus:ring-2 focus:ring-orange-500 outline-none transition-all placeholder:text-neutral-400 font-medium" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">Message</label>
                <textarea rows={5} className="w-full px-4 py-4 rounded-xl bg-white dark:bg-neutral-900 border-none focus:ring-2 focus:ring-orange-500 outline-none transition-all placeholder:text-neutral-400 font-medium resize-none" placeholder="How can we help you?"></textarea>
              </div>

              <button type="submit" className="w-full py-4 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-lg hover:shadow-lg hover:shadow-orange-500/30 transition-all active:scale-95 flex items-center justify-center gap-2">
                Send Message <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
