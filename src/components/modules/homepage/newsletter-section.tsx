'use client';

import { useState } from 'react';
import { Mail, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitted(true);
      setEmail('');

      // Reset after 3 seconds
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error('Newsletter subscription failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-linear-to-r from-indigo-600 to-blue-600 dark:from-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Stay Updated with Healthcare Tips
            </h2>
            <p className="text-lg text-indigo-100 dark:text-slate-300">
              Subscribe to our newsletter for medicine updates, health tips, and exclusive offers.
            </p>
          </div>

          {/* Newsletter Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="pl-10 py-3 text-base bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600"
              />
            </div>
            <Button
              type="submit"
              className="px-6 py-3 text-base bg-white text-blue-600 hover:bg-slate-100 font-semibold transition-all"
              disabled={loading}
            >
              {loading ? 'Subscribing...' : submitted ? 'Subscribed!' : 'Subscribe'}
            </Button>
          </form>

          {/* Success Message */}
          {submitted && (
            <div className="mt-4 p-4 bg-green-100 dark:bg-green-900 rounded-lg flex items-center gap-2 text-green-800 dark:text-green-200">
              <Check className="w-5 h-5" />
              <span>Thank you! Check your email for confirmation.</span>
            </div>
          )}

          {/* Benefits */}
          <div className="mt-12 grid gap-4 md:grid-cols-3 text-white text-center">
            <div>
              <div className="text-2xl font-bold mb-1">✉️</div>
              <p className="text-sm">Weekly Health Tips</p>
            </div>
            <div>
              <div className="text-2xl font-bold mb-1">🎁</div>
              <p className="text-sm">Exclusive Discounts</p>
            </div>
            <div>
              <div className="text-2xl font-bold mb-1">📰</div>
              <p className="text-sm">Latest Medicine Updates</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
