import React from 'react';
import Link from 'next/link';
import { FileText, AlertCircle, CheckCircle, Scale } from 'lucide-react';

export const metadata = {
  title: 'Terms & Conditions - MediStore',
  description: 'Read our terms and conditions to understand the rules and regulations for using MediStore services.',
};

export default function TermsPage() {
  const sections = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: '1. Agreement to Terms',
      content:
        'By accessing and using MediStore ("the Platform"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.',
    },
    {
      icon: <AlertCircle className="w-6 h-6" />,
      title: '2. Use License',
      content:
        'Permission is granted to temporarily download one copy of the materials (information or software) on MediStore for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:',
      items: [
        'Modifying or copying the materials',
        'Using the materials for any commercial purpose or for any public display',
        'Attempting to decompile or reverse engineer any software contained on the Platform',
        'Removing any copyright or other proprietary notations from the materials',
        'Transferring the materials to another person or "mirroring" the materials on any other server',
      ],
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: '3. Ordering and Purchasing',
      content:
        'When you place an order through MediStore, you are making an offer to purchase the products or services listed. MediStore reserves the right to:',
      items: [
        'Accept or reject your order at our sole discretion',
        'Cancel orders for products that are out of stock or unavailable',
        'Refuse service to anyone for any reason at any time',
        'Modify product prices without notice (changes will only apply to future orders)',
        'Limit order quantities to prevent fraud or abuse',
      ],
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: '4. Product Information and Pricing',
      content:
        'MediStore strives to provide accurate product descriptions and pricing information. However:',
      items: [
        'We do not warrant that product descriptions, pricing, or other content is accurate, complete, or error-free',
        'In the event of a pricing error, we may cancel your order at our discretion',
        'All prices are subject to change without notice',
        'Availability of products is subject to change at any time',
      ],
    },
  ];

  const additionalSections = [
    {
      title: '5. Delivery and Shipping',
      content: [
        'MediStore aims for timely delivery but does not guarantee delivery dates or times',
        'Risk of loss for all products passes to you upon delivery to the carrier specified',
        'For non-delivery claims, contact us within 48 hours of the expected delivery date',
        'Additional charges may apply for delivery to remote areas',
      ],
    },
    {
      title: '6. Returns and Refunds',
      content: [
        'Medicines can be returned within 7 days of delivery if unused and in original packaging',
        'Opened or partially used medicines cannot be returned',
        'Expired or damaged medicines will be replaced free of charge',
        'Refunds will be processed within 5-7 business days after inspection',
      ],
    },
    {
      title: '7. User Accounts',
      content: [
        'You are responsible for maintaining confidentiality of your account credentials',
        'You agree to accept responsibility for all activities under your account',
        'You agree not to sell, transfer, or assign your account',
        'MediStore reserves the right to suspend or terminate accounts that violate these terms',
      ],
    },
    {
      title: '8. Prohibited Activities',
      content: [
        'Harassing or causing distress or inconvenience to any person',
        'Obscene or abusive comments or hate speech',
        'Disrupting the normal flow of dialogue within the Platform',
        'Commercial solicitation without express written permission',
        'Attempting to gain unauthorized access to systems or networks',
        'Reselling or redistributing products purchased from MediStore',
      ],
    },
    {
      title: '9. Limitation of Liability',
      content: [
        'In no event shall MediStore or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit) arising out of the use or inability to use the materials on the Platform',
        'The maximum liability of MediStore shall not exceed the amount you paid for the products or services in question',
        'Some jurisdictions do not allow limitations on liability, so some of the above limitations may not apply to you',
      ],
    },
    {
      title: '10. Disclaimer',
      content: [
        'The materials on the Platform are provided on an "as is" basis',
        'MediStore makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights',
        'Further, MediStore does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its Platform or otherwise relating to such materials or on any sites linked to this Platform',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Breadcrumb */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto max-w-4xl px-4 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-emerald-600 dark:text-emerald-400 hover:underline">
              Home
            </Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-600 dark:text-slate-400">Terms & Conditions</span>
          </div>
        </div>
      </div>

      <main className="container mx-auto max-w-4xl px-4 py-16">
        {/* Header */}
        <section className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Terms & Conditions
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Last updated: April 11, 2026<br />
            Effective date: April 11, 2026
          </p>
        </section>

        {/* Introduction */}
        <section className="mb-12 p-6 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/50 rounded-lg">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Welcome to MediStore. These terms and conditions ("Terms") govern your use of our website and services. By accessing and using MediStore, you agree to be bound by these Terms. If you do not agree to these Terms, you may not use our Platform. Please read these Terms carefully.
          </p>
        </section>

        {/* Main Sections with Icons */}
        <div className="space-y-10 mb-12">
          {sections.map((section, index) => (
            <section key={index} className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                  {section.icon}
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {section.title}
                </h2>
              </div>
              <p className="text-slate-700 dark:text-slate-300 mb-4">{section.content}</p>
              {section.items && (
                <ul className="space-y-2 ml-4">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex gap-3 text-slate-700 dark:text-slate-300">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold flex-shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* Additional Sections */}
        <div className="space-y-6 mb-12">
          {additionalSections.map((section, index) => (
            <section key={index} className="p-6 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                {section.title}
              </h2>
              <ul className="space-y-3">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex gap-3 text-slate-700 dark:text-slate-300">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold flex-shrink-0 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* Final Section */}
        <section className="p-6 bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/10 dark:to-blue-900/10 border border-emerald-200 dark:border-emerald-900/50 rounded-lg">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
            11. Governing Law and Jurisdiction
          </h2>
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            These Terms and Conditions are governed by and construed in accordance with the laws of Bangladesh, and you irrevocably submit to the exclusive jurisdiction of the courts in Bangladesh.
          </p>
          <p className="text-slate-700 dark:text-slate-300">
            By using MediStore, you consent to our Terms and Conditions. If you have any questions about these terms, 
            please <Link href="/contact" className="text-emerald-600 dark:text-emerald-400 hover:underline">contact us</Link>.
          </p>
        </section>

        {/* Contact Section */}
        <section className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
            Questions About These Terms?
          </h3>
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            If you have any questions or concerns regarding these Terms and Conditions, please contact us at:
          </p>
          <div className="space-y-2">
            <p className="text-slate-700 dark:text-slate-300">
              <strong>Email:</strong>{' '}
              <a href="mailto:legal@medistore.com" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                legal@medistore.com
              </a>
            </p>
            <p className="text-slate-700 dark:text-slate-300">
              <strong>Phone:</strong>{' '}
              <a href="tel:+8801700000000" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                +880 1700-000000
              </a>
            </p>
            <p className="text-slate-700 dark:text-slate-300">
              <strong>Address:</strong> Dhaka, Bangladesh
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
