import React from 'react';
import { FileText, AlertCircle, CreditCard, Truck, RotateCcw, Scale, Mail } from 'lucide-react';
import Navbar from '../../components/layout/Navbar/Navbar';
import Footer from '../../components/layout/Footer/Footer';

const Terms = () => {
    const lastUpdated = 'April 1, 2026';

    const sections = [
        {
            icon: FileText,
            title: '1. Acceptance of Terms',
            content: [
                'By accessing or using the Tomato platform (website or mobile application), you agree to be bound by these Terms and Conditions.',
                'If you do not agree to these terms, please do not use our services.',
                'We reserve the right to modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the updated terms.',
                'You must be at least 18 years old to use our services. By using Tomato, you confirm that you meet this age requirement.',
            ]
        },
        {
            icon: CreditCard,
            title: '2. Orders & Payments',
            content: [
                'All prices displayed on the platform are in Indian Rupees (INR) and include applicable taxes unless stated otherwise.',
                'Payment must be completed at the time of placing an order. We accept credit/debit cards, UPI, net banking, and digital wallets.',
                'Once an order is confirmed, it cannot be modified. You may cancel the order within 60 seconds of placing it for a full refund.',
                'We reserve the right to cancel any order due to unavailability of items, incorrect pricing, or suspected fraudulent activity.',
                'Promotional codes and discounts are subject to specific terms and may have expiry dates, minimum order values, or usage limits.',
                'Tips for delivery partners are voluntary and non-refundable once the order has been delivered.',
            ]
        },
        {
            icon: Truck,
            title: '3. Delivery',
            content: [
                'Estimated delivery times are approximate and may vary due to traffic, weather, restaurant preparation time, or other factors beyond our control.',
                'You must provide an accurate and complete delivery address. We are not responsible for failed deliveries due to incorrect address information.',
                'A delivery fee may apply based on distance and order value. This fee is displayed before you confirm your order.',
                'If you are unavailable to receive the delivery, the delivery partner will attempt to contact you. After reasonable attempts, the order may be marked as undeliverable.',
                'For contactless delivery, the order will be left at your doorstep or the location you specify.',
            ]
        },
        {
            icon: RotateCcw,
            title: '4. Refunds & Cancellations',
            content: [
                'Refunds for cancelled orders will be processed within 5-7 business days to the original payment method.',
                'If you receive incorrect, damaged, or missing items, please report the issue through the app within 24 hours of delivery.',
                'Refund eligibility is determined on a case-by-case basis. We may offer a full refund, partial refund, or credit to your Tomato wallet.',
                'Repeated misuse of the refund system may result in account restrictions or suspension.',
                'Refunds for promotional or discounted orders will be calculated based on the actual amount paid.',
            ]
        },
        {
            icon: Scale,
            title: '5. User Responsibilities',
            content: [
                'You agree to provide accurate and current information when creating an account and placing orders.',
                'You are responsible for maintaining the confidentiality of your account credentials.',
                'You must not use our platform for any unlawful purpose or in any way that could damage, disable, or impair the service.',
                'Reviews and ratings must be genuine and based on actual experiences. We reserve the right to remove reviews that violate our content guidelines.',
                'You agree not to engage in any activity that interferes with or disrupts the platform, including attempting to access other users\' accounts.',
            ]
        },
        {
            icon: AlertCircle,
            title: '6. Limitation of Liability',
            content: [
                'Tomato acts as an intermediary platform connecting users with restaurant partners and is not responsible for the quality of food prepared by restaurants.',
                'We are not liable for any allergic reactions or health issues resulting from food consumed. Please check allergen information with the restaurant directly.',
                'Our total liability for any claim arising from the use of our services shall not exceed the amount paid by you for the specific order in question.',
                'We make no warranties about the accuracy of restaurant information including operating hours, menu availability, or nutritional information.',
                'We are not liable for any indirect, incidental, consequential, or punitive damages arising from the use of our platform.',
            ]
        },
        {
            icon: FileText,
            title: '7. Intellectual Property',
            content: [
                'All content on the Tomato platform, including logos, text, graphics, and software, is the property of Tomato or its licensors.',
                'You may not reproduce, distribute, or create derivative works from any content on our platform without written permission.',
                'User-generated content (reviews, photos) remains your property, but you grant Tomato a non-exclusive license to use, display, and distribute this content on our platform.',
            ]
        },
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-neutral-900">
            <Navbar />

            {/* Hero */}
            <div className="relative pt-32 pb-16 px-8 text-center overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-tr from-amber-100 to-orange-50 dark:from-neutral-800 dark:to-neutral-900 rounded-full blur-3xl -z-10 opacity-60"></div>
                <div className="inline-flex items-center gap-2 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 px-4 py-2 rounded-full text-sm font-bold mb-6">
                    <FileText size={16} /> Legal
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-neutral-900 dark:text-white mb-6 tracking-tight">
                    Terms & <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Conditions</span>
                </h1>
                <p className="text-xl text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                    Please read these terms carefully before using the Tomato platform. These terms govern your use of our services.
                </p>
                <p className="text-sm text-neutral-400 dark:text-neutral-500 mt-4">Last updated: {lastUpdated}</p>
            </div>

            {/* Content */}
            <div className="py-16 px-8 max-w-4xl mx-auto">
                <div className="space-y-12">
                    {sections.map((section, i) => (
                        <div key={i} className="p-8 md:p-10 rounded-3xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/20 rounded-2xl flex items-center justify-center text-amber-600 dark:text-amber-400">
                                    <section.icon size={24} />
                                </div>
                                <h2 className="text-2xl font-black text-neutral-900 dark:text-white">{section.title}</h2>
                            </div>
                            <ul className="space-y-4">
                                {section.content.map((item, j) => (
                                    <li key={j} className="flex items-start gap-3 text-neutral-600 dark:text-neutral-300 leading-relaxed">
                                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2.5 flex-shrink-0"></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Contact */}
                <div className="mt-16 p-10 rounded-3xl bg-neutral-900 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/20 rounded-full blur-[80px]"></div>
                    <div className="relative z-10">
                        <Mail className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                        <h3 className="text-2xl font-black text-white mb-3">Have questions about our terms?</h3>
                        <p className="text-neutral-400 mb-6">Reach out to our legal team</p>
                        <a href="mailto:legal@tomato.com" className="text-orange-400 font-bold text-lg hover:text-orange-300 transition-colors">legal@tomato.com</a>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Terms;
