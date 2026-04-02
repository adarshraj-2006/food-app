import React from 'react';
import { Shield, Eye, Database, Lock, UserCheck, Globe, Mail } from 'lucide-react';
import Navbar from '../../components/layout/Navbar/Navbar';
import Footer from '../../components/layout/Footer/Footer';

const Privacy = () => {
    const lastUpdated = 'April 1, 2026';

    const sections = [
        {
            icon: Database,
            title: '1. Information We Collect',
            content: [
                'Personal Information: When you create an account, we collect your name, email address, phone number, and delivery addresses.',
                'Order Information: We collect details about the orders you place, including items ordered, payment method, delivery address, and order history.',
                'Device Information: We automatically collect information about the device you use to access our services, including device type, operating system, browser type, and IP address.',
                'Location Data: With your permission, we collect your precise location to provide delivery services and show nearby restaurants.',
                'Usage Data: We collect information about how you interact with our app, including pages visited, features used, and time spent on the platform.',
            ]
        },
        {
            icon: Eye,
            title: '2. How We Use Your Information',
            content: [
                'To process and deliver your food orders accurately and on time.',
                'To communicate with you about your orders, account, and promotional offers.',
                'To personalize your experience by recommending restaurants and dishes based on your preferences.',
                'To improve our services, develop new features, and conduct analytics.',
                'To prevent fraud, ensure security, and comply with legal obligations.',
                'To process payments and manage refunds or credits.',
            ]
        },
        {
            icon: UserCheck,
            title: '3. Information Sharing',
            content: [
                'Restaurant Partners: We share your order details and delivery address with restaurants to fulfill your orders.',
                'Delivery Partners: We share your name, delivery address, and phone number with delivery personnel for order delivery.',
                'Payment Processors: We share necessary payment information with our payment partners to process transactions securely.',
                'Service Providers: We may share data with third-party service providers who help us operate our platform (analytics, cloud hosting, customer support).',
                'We never sell your personal information to third parties for marketing purposes.',
            ]
        },
        {
            icon: Lock,
            title: '4. Data Security',
            content: [
                'We use industry-standard encryption (SSL/TLS) to protect data in transit.',
                'All payment data is processed through PCI-DSS compliant payment processors.',
                'We implement access controls, firewalls, and regular security audits to protect your data.',
                'We store passwords using one-way hashing algorithms — we never store plain-text passwords.',
                'In the event of a data breach, we will notify affected users within 72 hours as required by law.',
            ]
        },
        {
            icon: Globe,
            title: '5. Cookies & Tracking',
            content: [
                'We use essential cookies to keep you logged in and remember your preferences.',
                'Analytics cookies help us understand how users interact with our platform.',
                'You can manage cookie preferences through your browser settings at any time.',
                'We may use third-party analytics services like Google Analytics for platform improvement.',
            ]
        },
        {
            icon: UserCheck,
            title: '6. Your Rights',
            content: [
                'Access: You can request a copy of all personal data we hold about you.',
                'Correction: You can update or correct your personal information at any time through your account settings.',
                'Deletion: You can request deletion of your account and personal data. We will process this within 30 days.',
                'Opt-out: You can opt out of marketing communications at any time by updating your notification preferences.',
                'Data Portability: You can request your data in a commonly used, machine-readable format.',
            ]
        },
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-neutral-900">
            <Navbar />

            {/* Hero */}
            <div className="relative pt-32 pb-16 px-8 text-center overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-tr from-blue-100 to-indigo-50 dark:from-neutral-800 dark:to-neutral-900 rounded-full blur-3xl -z-10 opacity-60"></div>
                <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-bold mb-6">
                    <Shield size={16} /> Your Privacy Matters
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-neutral-900 dark:text-white mb-6 tracking-tight">
                    Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">Policy</span>
                </h1>
                <p className="text-xl text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                    We are committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information.
                </p>
                <p className="text-sm text-neutral-400 dark:text-neutral-500 mt-4">Last updated: {lastUpdated}</p>
            </div>

            {/* Content */}
            <div className="py-16 px-8 max-w-4xl mx-auto">
                <div className="space-y-12">
                    {sections.map((section, i) => (
                        <div key={i} className="p-8 md:p-10 rounded-3xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                                    <section.icon size={24} />
                                </div>
                                <h2 className="text-2xl font-black text-neutral-900 dark:text-white">{section.title}</h2>
                            </div>
                            <ul className="space-y-4">
                                {section.content.map((item, j) => (
                                    <li key={j} className="flex items-start gap-3 text-neutral-600 dark:text-neutral-300 leading-relaxed">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 flex-shrink-0"></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Contact */}
                <div className="mt-16 p-10 rounded-3xl bg-neutral-900 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/20 rounded-full blur-[80px]"></div>
                    <div className="relative z-10">
                        <Mail className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                        <h3 className="text-2xl font-black text-white mb-3">Questions about your privacy?</h3>
                        <p className="text-neutral-400 mb-6">Contact our Data Protection Officer at</p>
                        <a href="mailto:privacy@tomato.com" className="text-blue-400 font-bold text-lg hover:text-blue-300 transition-colors">privacy@tomato.com</a>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Privacy;
