import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

interface User {
  id: string;
  name: string;
  role: 'USER' | 'SELLER' | 'ADMIN';
  email: string;
}

export function Footer({ data }: { data: User }) {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { label: 'All Medicines', href: '/explore' },
      { label: 'Categories', href: '#categories' },
      { label: 'Special Offers', href: '#offers' },
      { label: 'Bestsellers', href: '#bestsellers' },
    ],
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
    ],
    support: [
      { label: 'Help Center', href: '/help' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Track Order', href: '/orders' },
      { label: 'Returns', href: '/returns' },
    ],
    legal: [
      { label: 'Terms & Conditions', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Accessibility', href: '/accessibility' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/medistore', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com/medistore', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com/company/medistore', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://instagram.com/medistore', label: 'Instagram' },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Main Footer */}
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Image src="/images/MediStore.png" alt="MediStore" width={32} height={32} className="invert-0 dark:invert" />
                <span className="font-bold text-lg text-white">MediStore</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Your trusted online pharmacy delivering quality medicines right to your doorstep. Fast, secure, and reliable.
              </p>
              <div className="flex items-center gap-3 pt-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      title={social.label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white transition-all flex items-center justify-center"
                    >
                      <Icon className="w-4 h-4" />
                      <span className="sr-only">{social.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">Shop</h3>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-slate-400">Email</p>
                  <a href="mailto:support@medistore.com" className="text-sm text-slate-300 hover:text-emerald-400 transition-colors">
                    support@medistore.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-slate-400">Phone</p>
                  <a href="tel:+8801234567890" className="text-sm text-slate-300 hover:text-emerald-400 transition-colors">
                    +880 1234-567890
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-slate-400">Location</p>
                  <p className="text-sm text-slate-300">Bangladesh</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Links */}
        <div className="pt-8 border-t border-slate-700">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {footerLinks.legal.map((link) => (
              <Link key={link.href} href={link.href} className="text-xs text-slate-400 hover:text-emerald-400 transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 bg-slate-950/50">
        <div className="container mx-auto px-4 md:px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-400 text-center md:text-left">
              © {currentYear} MediStore. All rights reserved. Your trusted online medicine shop.
            </p>

            {/* Payment Methods */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400">Secure Payments:</span>
              <div className="flex items-center gap-2">
                <div className="w-8 h-5 bg-slate-700 rounded text-xs flex items-center justify-center text-slate-400">💳</div>
                <div className="w-8 h-5 bg-slate-700 rounded text-xs flex items-center justify-center text-slate-400">🏦</div>
                <div className="w-8 h-5 bg-slate-700 rounded text-xs flex items-center justify-center text-slate-400">📱</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
