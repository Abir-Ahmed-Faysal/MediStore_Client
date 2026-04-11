'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone',
      details: '+880 1700-000000',
      subtext: '24/7 Customer Support',
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      details: 'support@medistore.com',
      subtext: 'We reply within 2 hours',
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Address',
      details: 'Dhaka, Bangladesh',
      subtext: 'Multiple locations nationwide',
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Hours',
      details: '24/7 Available',
      subtext: 'All days of the week',
    },
  ];

  const faqs = [
    {
      question: 'How quickly can I get an answer?',
      answer: 'Our support team responds to all inquiries within 2 hours during business hours, and within 8 hours for overnight inquiries.',
    },
    {
      question: 'What if I have urgent issues?',
      answer: 'For urgent matters, call our hotline at +880 1700-000000 or chat with us on WhatsApp. We offer 24/7 emergency support.',
    },
    {
      question: 'Can I schedule a callback?',
      answer: 'Yes! In the form below, you can request a callback time, and our team will contact you at your preferred time.',
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Form submitted:', formData);
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <span className="text-slate-600 dark:text-slate-400">Contact Us</span>
          </div>
        </div>
      </div>

      <main className="container mx-auto max-w-7xl px-4 py-16">
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </section>

        {/* Contact Info Cards */}
        <section className="mb-16">
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {contactInfo.map((info, index) => (
              <div key={index} className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-6 text-center hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-slate-900/50 transition-all">
                <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg w-fit text-emerald-600 dark:text-emerald-400 mx-auto mb-4">
                  {info.icon}
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{info.title}</h3>
                <p className="text-slate-900 dark:text-white font-medium text-sm">{info.details}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{info.subtext}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form and Map */}
        <section className="mb-16 grid md:grid-cols-2 gap-12">
          {/* Form */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Send us a Message</h2>
            
            {isSubmitted && (
              <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/50 rounded-lg flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-green-800 dark:text-green-300">Message sent successfully!</p>
                  <p className="text-sm text-green-700 dark:text-green-400">Thank you for contacting us. We'll be in touch soon.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+880 1700-000000"
                    className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="order">Order Related</option>
                    <option value="product">Product Information</option>
                    <option value="complaint">Complaint</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us how we can help..."
                  rows={5}
                  className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Info Section */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <details key={index} className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-4 hover:shadow-md dark:hover:shadow-md dark:hover:shadow-slate-900/50 transition-all cursor-pointer group">
                    <summary className="font-semibold text-slate-900 dark:text-white flex items-center justify-between">
                      {faq.question}
                      <span className="text-emerald-600 dark:text-emerald-400 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="mt-3 text-slot-600 dark:text-slate-400 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>

            <div className="rounded-lg bg-linear-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 border border-emerald-200 dark:border-emerald-900/50 p-6">
              <h3 className="font-bold text-slate-900 dark:text-white mb-3">Need Urgent Help?</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                For urgent matters, call our hotline or use WhatsApp. Our team is available 24/7 to assist you.
              </p>
              <div className="flex gap-2">
                <a href="tel:+8801700000000" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition">
                  Call Now
                </a>
                <a href="https://wa.me/8801700000000" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-emerald-600 dark:border-emerald-400 text-emerald-600 dark:text-emerald-400 rounded-lg text-sm font-medium hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition">
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
