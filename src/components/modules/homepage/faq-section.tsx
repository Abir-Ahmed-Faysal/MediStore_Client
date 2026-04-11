'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How do I place an order?',
      answer:
        'Browse our medicine catalog, select the medicines you need, add them to your cart, and proceed to checkout. You can track your order in real-time once placed.',
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept credit cards, debit cards, digital wallets, and bank transfers. All transactions are secure and encrypted.',
    },
    {
      question: 'How long does delivery take?',
      answer:
        'Standard delivery typically takes 24-48 hours within the metro area, and 2-5 business days for other regions. Express delivery is also available.',
    },
    {
      question: 'Do I need a prescription for all medicines?',
      answer:
        'Some medicines require a valid prescription from a licensed healthcare professional. Our platform clearly indicates which medicines require prescriptions.',
    },
    {
      question: 'What is your return/refund policy?',
      answer:
        'We offer full refunds for unopened medicines within 7 days of purchase. Some medicines may have restrictions due to healthcare regulations.',
    },
    {
      question: 'Is my personal information safe?',
      answer:
        'Yes, we use industry-standard encryption and comply with data protection regulations. Your data is never shared without your consent.',
    },
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Find answers to common questions about our service, ordering process, and policies.
          </p>
        </div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 text-slate-600 dark:text-slate-400 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Answer */}
              {openIndex === index && (
                <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                  <p className="text-slate-700 dark:text-slate-300">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Didn't find what you're looking for?
          </p>
          <a
            href="/contact"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
