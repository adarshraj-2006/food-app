import React from 'react';
import { Utensils, Award, Users, Clock, ArrowRight } from 'lucide-react';
import Navbar from '../../components/layout/Navbar/Navbar';
import Footer from '../../components/layout/Footer/Footer';

const About = () => {
    const stats = [
        { icon: Utensils, label: 'Restaurants', value: '5000+' },
        { icon: Users, label: 'Happy Users', value: '1M+' },
        { icon: Clock, label: 'Average Time', value: '25 min' },
        { icon: Award, label: 'Awards Won', value: '15+' },
    ];

    const team = [
        { name: 'Adarsh Raj', role: 'Founder & CEO', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop' },
        { name: 'Sarah Smith', role: 'Head of Operations', image: 'https://images.unsplash.com/photo-1573496359-0cf84ec07484?w=400&h=400&fit=crop' },
        { name: 'Mike Johnson', role: 'Head Chef', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop' },
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-neutral-900">
            <Navbar />

            {/* Hero Section */}
            <div className="relative pt-32 pb-20 px-8 text-center overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-tr from-orange-100 to-red-50 dark:from-neutral-800 dark:to-neutral-900 rounded-full blur-3xl -z-10 opacity-60"></div>
                <h1 className="text-5xl md:text-7xl font-black text-neutral-900 dark:text-white mb-6 tracking-tight">
                    We deliver <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">happiness</span>,<br />
                    not just food.
                </h1>
                <p className="text-xl text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                    Tomato is on a mission to transform the way you experience food. From local favorites to gourmet dining, we bring the best of the culinary world to your doorstep.
                </p>
            </div>

            {/* Stats Section */}
            <div className="py-16 px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-800 text-center hover:scale-105 transition-transform">
                            <div className="w-14 h-14 mx-auto bg-orange-100 dark:bg-neutral-700 rounded-2xl flex items-center justify-center text-orange-600 dark:text-orange-400 mb-4">
                                <stat.icon size={28} />
                            </div>
                            <h3 className="text-3xl font-black text-neutral-900 dark:text-white mb-1">{stat.value}</h3>
                            <p className="text-sm font-bold text-neutral-500 uppercase tracking-widest">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mission Section - Simplified */}
            <div className="py-20 px-8 max-w-7xl mx-auto">
                <div className="text-center space-y-8 max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-black text-neutral-900 dark:text-white">Taste the difference with Tomato.</h2>
                    <p className="text-xl text-neutral-500 dark:text-neutral-400 leading-relaxed">
                        We believe that food is an emotion. That's why we partner with only the best restaurants that share our passion for quality. Our dedicated delivery partners ensure your food reaches you hot and fresh, every single time.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6">
                        {['Curated Restaurants', 'Lightning Fast Delivery', '24/7 Support', 'Best Prices'].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 font-bold text-neutral-700 dark:text-neutral-300 bg-neutral-50 dark:bg-neutral-800 px-6 py-3 rounded-2xl">
                                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white">
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                </div>
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Our Vision Section - Simplified */}
            <div className="py-20 px-8 max-w-7xl mx-auto">
                <div className="bg-neutral-900 rounded-[48px] p-12 md:p-24 overflow-hidden relative border border-white/5 shadow-2xl">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-[100px] -z-0"></div>
                    <div className="relative z-10 text-center max-w-3xl mx-auto">
                        <span className="text-red-500 font-black tracking-widest uppercase text-sm mb-4 block">Our Vision</span>
                        <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-8">Redefining the culinary map.</h2>
                        <p className="text-neutral-400 text-lg leading-relaxed mb-12">
                            We're not just building a delivery app; we're building a community where food lovers and creators meet. Our vision is to empower local kitchens and provide global-standard dining experiences at the tap of a button.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { label: 'Sustainability', icon: '🌱' },
                                { label: 'Innovation', icon: '⚡' },
                                { label: 'Community', icon: '🤝' },
                                { label: 'Quality', icon: '✨' }
                            ].map((v, i) => (
                                <div key={i} className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                                    <span className="text-3xl mb-4 block">{v.icon}</span>
                                    <h4 className="text-white font-bold text-sm tracking-tight">{v.label}</h4>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Video Showcase Section */}
            <div className="py-24 px-8 bg-neutral-900 text-center relative overflow-hidden">
                <div className="max-w-4xl mx-auto">
                    <span className="text-red-500 font-black tracking-widest uppercase text-sm mb-4 block">Video Spotlight</span>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-16">The Tomato Experience</h2>

                    <div className="relative group cursor-pointer aspect-video rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/10">
                        <img
                            src="https://images.unsplash.com/photo-1547573854-74d2a71d0827?w=1200&h=800&fit=crop"
                            alt="Tomato Experience"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-red-500 shadow-xl group-hover:scale-125 transition-all duration-300">
                                <svg className="w-10 h-10 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                            </div>
                        </div>
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-md px-6 py-2 rounded-full text-white text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                            Watch: Behind the scenes with our chefs
                        </div>
                    </div>
                </div>
            </div>

            {/* Testimonials Section */}
            <div className="py-24 px-8 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-neutral-900 dark:text-white mb-4">Loved by Millions</h2>
                    <p className="text-neutral-500 dark:text-neutral-400 font-medium">Here's what our community has to say about their journey with us.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            quote: "Tomato has completely changed how I think about Friday nights. Fresh, fast, and always delicious!",
                            author: "Jessica Weaver",
                            role: "Gourmet Enthusiast",
                            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
                        },
                        {
                            quote: "The interface is so clean, and the curated sections make it so easy to discover new gems.",
                            author: "David Chen",
                            role: "Tech Influencer",
                            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
                        },
                        {
                            quote: "Lightning fast delivery every single time. Their customer support is actually helpful too!",
                            author: "Sarah Miller",
                            role: "Busy Professional",
                            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100"
                        }
                    ].map((t, i) => (
                        <div key={i} className="p-10 rounded-[40px] bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 shadow-sm hover:shadow-xl transition-all h-full flex flex-col">
                            <div className="flex gap-1 text-orange-500 mb-6 font-serif text-4xl">“</div>
                            <p className="text-neutral-700 dark:text-neutral-300 text-lg font-medium leading-relaxed mb-8 flex-1">
                                {t.quote}
                            </p>
                            <div className="flex items-center gap-4">
                                <img src={t.avatar} className="w-12 h-12 rounded-full object-cover ring-4 ring-orange-100 dark:ring-orange-900/30" alt={t.author} />
                                <div>
                                    <h4 className="font-bold text-neutral-900 dark:text-white">{t.author}</h4>
                                    <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Team Section */}
            <div className="py-20 px-8 bg-neutral-50 dark:bg-neutral-800/50">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-4xl font-black text-neutral-900 dark:text-white mb-16">Meet the Minds</h2>
                    <div className="grid md:grid-cols-3 gap-10">
                        {team.map((member, idx) => (
                            <a
                                key={idx}
                                href={member.name === 'Adarsh Raj' ? "https://www.linkedin.com/in/adarsh-raj123" : "#"}
                                target={member.name === 'Adarsh Raj' ? "_blank" : "_self"}
                                rel="noopener noreferrer"
                                className="group cursor-pointer block"
                            >
                                <div className="aspect-[3/4] rounded-3xl overflow-hidden mb-6 relative">
                                    <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6 text-white text-left">
                                        <p className="font-bold text-lg">{member.role}</p>
                                        <p className="text-xs opacity-80">Passionate about food & tech</p>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-neutral-900 dark:text-white group-hover:text-red-500 transition-colors">{member.name}</h3>
                                <p className="text-red-500 font-medium">{member.role}</p>
                            </a>
                        ))}

                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default About;
