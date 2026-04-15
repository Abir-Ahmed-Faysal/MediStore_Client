'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, User, BookOpen, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  image?: string;
  slug: string;
}

const SAMPLE_BLOGS: BlogPost[] = [
  {
    id: '1',
    title: 'Understanding Common Medicines and Their Uses',
    excerpt: 'Learn about the most commonly used medicines, their benefits, and how to use them safely for various health conditions.',
    author: 'Dr. Sarah Johnson',
    date: '2024-04-10',
    category: 'Health Tips',
    slug: 'understanding-common-medicines',
  },
  {
    id: '2',
    title: 'Medication Safety: What You Should Know',
    excerpt: 'Important guidelines for safe medication storage, interactions, and avoiding common mistakes when taking medicines.',
    author: 'Dr. Michael Chen',
    date: '2024-04-08',
    category: 'Safety',
    slug: 'medication-safety-guide',
  },
  {
    id: '3',
    title: 'Natural Remedies vs Prescription Medicines',
    excerpt: 'Explore the differences between natural remedies and prescription medications, and when each might be appropriate.',
    author: 'Dr. Emily Wilson',
    date: '2024-04-05',
    category: 'Education',
    slug: 'natural-vs-prescription',
  },
  {
    id: '4',
    title: 'Managing Side Effects: A Patient Guide',
    excerpt: 'Comprehensive guide on managing common side effects of medications and when to contact your healthcare provider.',
    author: 'Dr. James Anderson',
    date: '2024-04-01',
    category: 'Health Tips',
    slug: 'managing-side-effects',
  },
  {
    id: '5',
    title: 'The Importance of Proper Dosage',
    excerpt: 'Understanding dosage guidelines and why following them exactly as prescribed is crucial for your health.',
    author: 'Dr. Lisa Thompson',
    date: '2024-03-28',
    category: 'Education',
    slug: 'proper-dosage-importance',
  },
  {
    id: '6',
    title: 'Seasonal Health and Wellness Tips',
    excerpt: 'Prepare your medicine cabinet for seasonal health challenges and learn preventive care strategies.',
    author: 'Dr. Robert Price',
    date: '2024-03-25',
    category: 'Wellness',
    slug: 'seasonal-wellness-tips',
  },
];

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [...new Set(SAMPLE_BLOGS.map((blog) => blog.category))];

  const filteredBlogs = SAMPLE_BLOGS.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-800 dark:to-blue-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-8 h-8" />
            <h1 className="text-4xl md:text-5xl font-bold">MediStore Blog</h1>
          </div>
          <p className="text-blue-100 text-lg max-w-2xl">
            Stay informed about health, medicines, and wellness with our expert articles and guides
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="md:col-span-2">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <select
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <article
                key={blog.id}
                className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full"
              >
                {/* Image Placeholder */}
                <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white">
                  <BookOpen className="w-16 h-16 opacity-50" />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  {/* Category Badge */}
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                      {blog.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100 line-clamp-2">
                    {blog.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-3 flex-1">
                    {blog.excerpt}
                  </p>

                  {/* Meta Information */}
                  <div className="space-y-2 text-xs text-slate-500 dark:text-slate-400 mb-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{blog.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(blog.date)}</span>
                    </div>
                  </div>

                  {/* Read More Button */}
                  <Link href={`/blog/${blog.slug}`}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-between">
                      Read Article
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
              No articles found
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>

      {/* Newsletter Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h2>
          <p className="mb-6 text-blue-100">
            Get the latest health and wellness articles delivered to your inbox
          </p>
          <form className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg text-slate-900 focus:outline-none"
            />
            <Button className="bg-white text-blue-600 hover:bg-blue-50">Subscribe</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
