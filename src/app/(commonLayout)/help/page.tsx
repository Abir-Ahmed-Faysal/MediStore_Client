'use client';

import React, { useState } from 'react';
import { ChevronDown, Mail, Phone, MapPin, MessageSquare, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    id: '1',
    question: 'How do I place an order?',
    answer:
      'You can browse our catalog, add medicines to your cart, and proceed to checkout. Make sure you are logged in with your account to complete the purchase.',
  },
  {
    id: '2',
    question: 'What is your return policy?',
    answer:
      'We accept returns for unopened medicines within 30 days of purchase. Please contact our support team with your order number to initiate a return.',
  },
  {
    id: '3',
    question: 'How long does delivery take?',
    answer:
      'Standard delivery takes 3-5 business days. Express delivery is available for an additional fee and delivers within 24 hours in selected areas.',
  },
  {
    id: '4',
    question: 'Do you require a prescription?',
    answer:
      'Some prescription-only medicines require a valid prescription. During checkout, you can upload your prescription if needed.',
  },
  {
    id: '5',
    question: 'Is my personal data secure?',
    answer:
      'Yes, we use advanced encryption and security measures to protect your personal and payment information. Your data is never shared with third parties.',
  },
  {
    id: '6',
    question: 'Can I track my order?',
    answer:
      'After placing an order, you will receive a tracking number via email. You can use this to track your shipment in real-time.',
  },
  {
    id: '7',
    question: 'What payment methods do you accept?',
    answer:
      'We accept credit cards, debit cards, digital wallets, and bank transfers. All payments are processed securely.',
  },
  {
    id: '8',
    question: 'How do I contact customer support?',
    answer:
      'You can reach our support team via email, phone, or live chat. Our team is available 24/7 to assist you.',
  },
];

export default function HelpSupportPage() {
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFAQToggle = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-800 dark:to-blue-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Help & Support</h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Find answers to common questions and get in touch with our support team
          </p>
        </div>
      </div>

      {/* Contact Information */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Email */}
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 text-center hover:shadow-lg transition-shadow">
            <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-slate-100">
              Email
            </h3>
            <a
              href="mailto:support@medistore.com"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              support@medistore.com
            </a>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              Response time: 24-48 hours
            </p>
          </div>

          {/* Phone */}
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 text-center hover:shadow-lg transition-shadow">
            <div className="bg-green-100 dark:bg-green-900/30 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-slate-100">
              Phone
            </h3>
            <a href="tel:+1234567890" className="text-green-600 dark:text-green-400 hover:underline">
              +1 (234) 567-890
            </a>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              Available 24/7
            </p>
          </div>

          {/* Location */}
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 text-center hover:shadow-lg transition-shadow">
            <div className="bg-purple-100 dark:bg-purple-900/30 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-slate-100">
              Location
            </h3>
            <p className="text-slate-600 dark:text-slate-400">123 Medical Plaza, Healthcare City</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">City, State 12345</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-8">
              <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-slate-100">
                Send us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a subject</option>
                    <option value="order">Order Issue</option>
                    <option value="delivery">Delivery Problem</option>
                    <option value="product">Product Question</option>
                    <option value="account">Account Issue</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tell us how we can help..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-8 h-fit">
            <h3 className="text-xl font-semibold mb-6 text-slate-900 dark:text-slate-100">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/blog"
                  className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2"
                >
                  <span>Blog & Articles</span>
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2"
                >
                  <span>Privacy Policy</span>
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2"
                >
                  <span>Terms & Conditions</span>
                </a>
              </li>
              <li>
                <a
                  href="/returns"
                  className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2"
                >
                  <span>Return Policy</span>
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2"
                >
                  <span>Frequently Asked Questions</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-slate-100">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {FAQS.map((faq) => (
              <div
                key={faq.id}
                className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden"
              >
                <button
                  onClick={() => handleFAQToggle(faq.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-left"
                >
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-600 dark:text-slate-400 transition-transform ${
                      expandedFAQ === faq.id ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedFAQ === faq.id && (
                  <div className="px-6 py-4 bg-slate-50 dark:bg-slate-700 border-t border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
