import React from 'react';
import Link from 'next/link';
import { Shield, Lock, Eye, Database } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy - MediStore',
  description: 'Read our privacy policy to understand how MediStore protects your personal information and data.',
};

export default function PrivacyPolicyPage() {
  const sections = [
    {
      icon: <Eye className="w-6 h-6" />,
      title: 'Information We Collect',
      content: [
        'Personal identification information (name, email address, phone number)',
        'Delivery information (address, location data)',
        'Payment information (processed securely through third-party providers)',
        'Medical history and prescription information (optional)',
        'Device information (IP address, browser type, operating system)',
        'Usage data (pages visited, time spent, links clicked)',
      ],
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: 'How We Use Your Information',
      content: [
        'To process and fulfill your medicine orders',
        'To provide customer support and respond to your inquiries',
        'To send order confirmations and delivery updates',
        'To improve our services and user experience',
        'To send promotional content and newsletters (only with your consent)',
        'To comply with legal and regulatory requirements',
        'To prevent fraud and unauthorized transactions',
      ],
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: 'Data Security',
      content: [
        'We use industry-standard SSL (Secure Socket Layer) encryption for all transactions',
        'Your payment information is processed through certified payment gateways',
        'Personal data is stored in secure, encrypted databases',
        'We regularly update our security protocols and conduct security audits',
        'Access to sensitive information is restricted to authorized personnel only',
        'We comply with international data protection standards (GDPR, CCPA)',
      ],
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Your Rights',
      content: [
        'Right to access: You can request a copy of your personal data',
        'Right to correction: You can request to update or correct your information',
        'Right to deletion: You can request deletion of your data',
        'Right to withdraw consent: You can opt-out of promotional communications',
        'Right to data portability: You can request your data in a portable format',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Breadcrumb */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-emerald-600 dark:text-emerald-400 hover:underline">
              Home
            </Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-600 dark:text-slate-400">Privacy Policy</span>
          </div>
        </div>
      </div>

      <main className="container mx-auto max-w-4xl px-4 py-16">
        {/* Header */}
        <section className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Last updated: April 11, 2026<br />
            Effective date: April 11, 2026
          </p>
        </section>

        {/* Introduction */}
        <section className="mb-12 p-6 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/50 rounded-lg">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            At MediStore, we are committed to protecting your privacy and ensuring you have a positive experience on our platform. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit, access, and use our website and services.
          </p>
        </section>

        {/* Main Sections */}
        <div className="space-y-12">
          {sections.map((section, index) => (
            <section key={index}>
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {section.title}
                </h2>
              </div>
              <ul className="space-y-3 ml-4">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex gap-3 text-slate-700 dark:text-slate-300">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold flex-shrink-0 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          {/* Third-Party Services */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Third-Party Services
            </h2>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              We may use third-party service providers to assist us in operating our website and conducting our business. These may include:
            </p>
            <ul className="space-y-3 ml-4">
              <li className="flex gap-3 text-slate-700 dark:text-slate-300">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex-shrink-0 mt-1">•</span>
                <span><strong>Payment Processors:</strong> Your payment information is handled securely by certified payment gateways</span>
              </li>
              <li className="flex gap-3 text-slate-700 dark:text-slate-300">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex-shrink-0 mt-1">•</span>
                <span><strong>Delivery Partners:</strong> Your delivery address is shared only with our logistics partners</span>
              </li>
              <li className="flex gap-3 text-slate-700 dark:text-slate-300">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex-shrink-0 mt-1">•</span>
                <span><strong>Analytics Providers:</strong> We use analytics tools to understand user behavior and improve services</span>
              </li>
            </ul>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Cookies and Similar Technologies
            </h2>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              We use cookies and similar tracking technologies to enhance your experience on MediStore. This includes:
            </p>
            <ul className="space-y-3 ml-4">
              <li className="flex gap-3 text-slate-700 dark:text-slate-300">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex-shrink-0 mt-1">•</span>
                <span><strong>Session Cookies:</strong> To maintain your login status and shopping cart</span>
              </li>
              <li className="flex gap-3 text-slate-700 dark:text-slate-300">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex-shrink-0 mt-1">•</span>
                <span><strong>Persistent Cookies:</strong> To remember your preferences and settings</span>
              </li>
              <li className="flex gap-3 text-slate-700 dark:text-slate-300">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex-shrink-0 mt-1">•</span>
                <span><strong>Analytics Cookies:</strong> To understand how users interact with our platform</span>
              </li>
            </ul>
            <p className="text-slate-700 dark:text-slate-300 mt-4">
              You can control cookie settings in your browser. However, disabling cookies may affect your browsing experience.
            </p>
          </section>

          {/* Retention */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Data Retention
            </h2>
            <p className="text-slate-700 dark:text-slate-300">
              We retain your personal information for as long as necessary to provide our services, comply with legal obligations, and resolve disputes. Common retention periods include:
            </p>
            <ul className="space-y-3 ml-4 mt-4">
              <li className="flex gap-3 text-slate-700 dark:text-slate-300">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex-shrink-0 mt-1">•</span>
                <span><strong>Account Data:</strong> Retained as long as your account is active, plus legal hold periods</span>
              </li>
              <li className="flex gap-3 text-slate-700 dark:text-slate-300">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex-shrink-0 mt-1">•</span>
                <span><strong>Transaction Data:</strong> Retained for 7+ years for legal and tax compliance</span>
              </li>
              <li className="flex gap-3 text-slate-700 dark:text-slate-300">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex-shrink-0 mt-1">•</span>
                <span><strong>Marketing Data:</strong> Retained unless you opt-out of communications</span>
              </li>
            </ul>
          </section>

          {/* Contact */}
          <section className="p-6 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-900/50 rounded-lg">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Contact Us About Privacy
            </h2>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              If you have questions about this Privacy Policy or how we handle your data, please contact us:
            </p>
            <div className="space-y-2">
              <p className="text-slate-700 dark:text-slate-300">
                <strong>Email:</strong>{' '}
                <a href="mailto:privacy@medistore.com" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  privacy@medistore.com
                </a>
              </p>
              <p className="text-slate-700 dark:text-slate-300">
                <strong>Address:</strong> Dhaka, Bangladesh
              </p>
              <p className="text-slate-700 dark:text-slate-300">
                <strong>Phone:</strong>{' '}
                <a href="tel:+8801700000000" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  +880 1700-000000
                </a>
              </p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <section className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. 
            We will notify you of any significant changes via email or by posting the updated policy on our website.
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-4">
            By using MediStore, you consent to our Privacy Policy. If you do not agree with any part of this policy, 
            please discontinue use of our services.
          </p>
        </section>
      </main>
    </div>
  );
}
