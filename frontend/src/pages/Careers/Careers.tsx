import React from 'react';
import { Briefcase, MapPin, Clock, ArrowRight, Heart, Zap, Users, Star } from 'lucide-react';
import Navbar from '../../components/layout/Navbar/Navbar';
import Footer from '../../components/layout/Footer/Footer';

const Careers = () => {
    const openings = [
        { title: 'Senior Frontend Engineer', team: 'Engineering', location: 'Bangalore', type: 'Full-time', level: 'Senior' },
        { title: 'Product Designer', team: 'Design', location: 'Bangalore', type: 'Full-time', level: 'Mid' },
        { title: 'Data Analyst', team: 'Analytics', location: 'Remote', type: 'Full-time', level: 'Mid' },
        { title: 'Operations Manager', team: 'Operations', location: 'Mumbai', type: 'Full-time', level: 'Senior' },
        { title: 'Customer Success Lead', team: 'Support', location: 'Delhi', type: 'Full-time', level: 'Lead' },
        { title: 'Marketing Intern', team: 'Marketing', location: 'Remote', type: 'Internship', level: 'Intern' },
    ];

    const perks = [
        { icon: '🏠', title: 'Flexible Work', desc: 'Work from home or office — you choose.' },
        { icon: '🍕', title: 'Free Meals', desc: 'Daily meal credits on the Tomato app.' },
        { icon: '📚', title: 'Learning Budget', desc: '₹1L annual budget for courses & conferences.' },
        { icon: '🏥', title: 'Health Coverage', desc: 'Comprehensive health insurance for you & family.' },
        { icon: '🏖️', title: 'Unlimited PTO', desc: 'Take time off when you need it.' },
        { icon: '💰', title: 'ESOPs', desc: 'Own a piece of the company you build.' },
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-neutral-900">
            <Navbar />

            {/* Hero */}
            <div className="relative pt-32 pb-20 px-8 text-center overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-tr from-blue-100 to-purple-50 dark:from-neutral-800 dark:to-neutral-900 rounded-full blur-3xl -z-10 opacity-60"></div>
                <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-bold mb-6">
                    <Briefcase size={16} /> We're Hiring!
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-neutral-900 dark:text-white mb-6 tracking-tight">
                    Build the future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">food delivery</span>
                </h1>
                <p className="text-xl text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                    Join a passionate team that's transforming how millions experience food. We're looking for dreamers, doers, and food lovers.
                </p>
            </div>

            {/* Stats */}
            <div className="py-12 px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { value: '500+', label: 'Team Members' },
                        { value: '15+', label: 'Countries' },
                        { value: '4.8', label: 'Glassdoor Rating' },
                        { value: '85%', label: 'Retention Rate' },
                    ].map((s, i) => (
                        <div key={i} className="p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-800 text-center">
                            <h3 className="text-3xl font-black text-neutral-900 dark:text-white mb-1">{s.value}</h3>
                            <p className="text-sm font-bold text-neutral-500 uppercase tracking-widest">{s.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Perks */}
            <div className="py-20 px-8 max-w-7xl mx-auto">
                <h2 className="text-4xl font-black text-neutral-900 dark:text-white text-center mb-4">Why work at Tomato?</h2>
                <p className="text-neutral-500 dark:text-neutral-400 text-center mb-12 text-lg">We take care of our people so they can take care of our users.</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {perks.map((perk, i) => (
                        <div key={i} className="p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 hover:shadow-xl hover:border-orange-200 dark:hover:border-orange-800 transition-all">
                            <span className="text-4xl block mb-4">{perk.icon}</span>
                            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">{perk.title}</h3>
                            <p className="text-neutral-500 dark:text-neutral-400">{perk.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Open Positions */}
            <div className="py-20 px-8 bg-neutral-50 dark:bg-neutral-800/50">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-4xl font-black text-neutral-900 dark:text-white text-center mb-4">Open Positions</h2>
                    <p className="text-neutral-500 dark:text-neutral-400 text-center mb-12 text-lg">{openings.length} open roles across the company</p>
                    <div className="space-y-4">
                        {openings.map((job, i) => (
                            <div key={i} className="bg-white dark:bg-neutral-800 rounded-2xl p-6 border border-neutral-100 dark:border-neutral-700 hover:shadow-lg transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group cursor-pointer">
                                <div>
                                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white group-hover:text-orange-600 transition-colors">{job.title}</h3>
                                    <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                                        <span className="flex items-center gap-1"><Users size={14} /> {job.team}</span>
                                        <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                                        <span className="flex items-center gap-1"><Clock size={14} /> {job.type}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-4 py-1 rounded-full text-sm font-bold">{job.level}</span>
                                    <span className="text-orange-600 group-hover:translate-x-1 transition-transform"><ArrowRight size={20} /></span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="py-20 px-8">
                <div className="max-w-4xl mx-auto bg-neutral-900 rounded-[48px] p-12 md:p-20 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500/20 rounded-full blur-[100px]"></div>
                    <Heart className="w-16 h-16 text-red-500 mx-auto mb-6" />
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Don't see your role?</h2>
                    <p className="text-neutral-400 text-lg mb-8 max-w-lg mx-auto">We're always looking for talented people. Send us your resume and we'll reach out when the right opportunity comes along.</p>
                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-colors shadow-lg shadow-orange-500/30">
                        Send Your Resume
                    </button>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Careers;
