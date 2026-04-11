import React from 'react';
import { Heart, Users, Award, Zap, Leaf, Shield } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'About MediStore - Your Trusted Online Pharmacy',
  description: 'Learn about MediStore, your trusted online medicine shop. We provide genuine medicines with fast delivery and expert support.',
};

export default function AboutPage() {
  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Quality Healthcare',
      description: 'We are committed to providing 100% genuine, verified medicines to ensure your health and safety.',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Customer First',
      description: 'Your satisfaction is our priority. Our 24/7 support team is always ready to assist you.',
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Verified Pharmacy',
      description: 'Licensed and certified by regulatory bodies with years of experience in pharmaceutical retail.',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Fast Delivery',
      description: 'Next-day delivery available in most areas. Quick and reliable shipping across the country.',
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: 'Sustainable Practices',
      description: 'We are committed to eco-friendly packaging and sustainable business practices.',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Data Security',
      description: 'Your personal and health information is protected with advanced encryption technology.',
    },
  ];

  const timeline = [
    {
      year: '2020',
      title: 'Founded',
      description: 'MediStore launched as a vision to revolutionize online medicine retail in South Asia.',
    },
    {
      year: '2021',
      title: 'First Milestone',
      description: 'Reached 50,000+ happy customers and established partnerships with 200+ pharmacies.',
    },
    {
      year: '2022',
      title: 'Expansion',
      description: 'Expanded operations to 5 major cities with a dedicated logistics network.',
    },
    {
      year: '2023',
      title: 'Innovation',
      description: 'Launched AI-powered symptom analyzer and expert consultation services.',
    },
    {
      year: '2024',
      title: 'Market Leader',
      description: '500,000+ customers trust MediStore for their healthcare needs.',
    },
  ];

  const stats = [
    { number: '500K+', label: 'Happy Customers' },
    { number: '10K+', label: 'Medicines' },
    { number: '24/7', label: 'Support' },
    { number: '99.9%', label: 'On-Time Delivery' },
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
            <span className="text-slate-600 dark:text-slate-400">About Us</span>
          </div>
        </div>
      </div>

      <main className="container mx-auto max-w-7xl px-4 py-16">
        {/* Hero Section */}
        <section className="mb-20">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
              About MediStore
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
              Your trusted online pharmacy delivering quality healthcare to millions of customers across South Asia.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="mb-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Our Mission
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
              To make quality healthcare accessible to everyone by providing genuine medicines with expert guidance, fast delivery, and exceptional customer service.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              We believe that healthcare should be convenient, affordable, and reliable. That's why we're committed to revolutionizing how people access medicines online.
            </p>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-lg p-8">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                  <Heart className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Patient-Centric</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Your health is our priority</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Quality Assured</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">100% genuine medicines only</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-6 text-center">
                <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{stat.number}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-8 hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-slate-900/50 transition-all">
                <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg w-fit text-emerald-600 dark:text-emerald-400 mb-4">
                  {value.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12">Our Journey</h2>
          <div className="space-y-8">
            {timeline.map((event, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center font-bold text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                    {event.year.slice(2)}
                  </div>
                  {index !== timeline.length - 1 && (
                    <div className="w-1 h-16 bg-slate-200 dark:bg-slate-700 mt-2"></div>
                  )}
                </div>
                <div className="pb-8">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{event.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 mt-2">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-700 dark:from-emerald-700 dark:to-emerald-800 p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Join Our Community</h2>
          <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">
            Millions of customers trust MediStore for their healthcare needs. Start your journey to better health today.
          </p>
          <Link
            href="/explore"
            className="inline-block px-8 py-3 bg-white text-emerald-600 dark:text-emerald-700 font-semibold rounded-lg hover:bg-emerald-50 dark:hover:bg-slate-100 transition"
          >
            Explore Medicines
          </Link>
        </section>
      </main>
    </div>
  );
}
