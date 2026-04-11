'use client';

import React, { useState } from 'react';
import { ChevronDown, Clock, Pill, AlertCircle, Info } from 'lucide-react';

interface Specification {
  label: string;
  value: string;
}

interface ProductSpecificationsProps {
  manufacturer: string;
  price: number;
  stock: number;
  specifications?: Specification[];
}

export const ProductSpecifications: React.FC<ProductSpecificationsProps> = ({
  manufacturer,
  price,
  stock,
  specifications,
}) => {
  const [expandedSection, setExpandedSection] = useState<string | null>('general');

  const defaultSpecifications: Specification[] = [
    { label: 'Type', value: 'Tablet' },
    { label: 'Strength', value: '500mg' },
    { label: 'Form', value: 'Solid' },
    { label: 'Packing', value: '10 tablets per strip' },
  ];

  const specs = specifications || defaultSpecifications;

  const sections = [
    {
      id: 'general',
      title: 'General Information',
      icon: Info,
      content: [
        { label: 'Manufacturer', value: manufacturer },
        { label: 'Price', value: `৳ ${price}` },
        { label: 'Availability', value: `${stock} units in stock` },
      ],
    },
    {
      id: 'specifications',
      title: 'Specifications',
      icon: Pill,
      content: specs,
    },
    {
      id: 'usage',
      title: 'Usage & Dosage',
      icon: Clock,
      content: [
        { label: 'Dosage', value: '1-2 tablets every 6-8 hours as needed' },
        { label: 'Max Daily Dose', value: '4000mg (8 tablets)' },
        { label: 'Storage', value: 'Room temperature, away from moisture' },
      ],
    },
    {
      id: 'warnings',
      title: 'Important Warnings',
      icon: AlertCircle,
      content: [
        { label: 'Warning 1', value: 'Do not exceed recommended dose' },
        { label: 'Warning 2', value: 'Consult doctor if pregnant' },
        { label: 'Warning 3', value: 'Not suitable for children under 6' },
      ],
    },
  ];

  return (
    <div className="space-y-3">
      {sections.map((section) => {
        const Icon = section.icon;
        const isExpanded = expandedSection === section.id;

        return (
          <div
            key={section.id}
            className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
          >
            {/* Header */}
            <button
              onClick={() => setExpandedSection(isExpanded ? null : section.id)}
              className="w-full px-4 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white text-left">{section.title}</h3>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-slate-600 dark:text-slate-400 transition-transform flex-shrink-0 ${
                  isExpanded ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Content */}
            {isExpanded && (
              <div className="border-t border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30 px-4 py-4 space-y-3">
                {section.content.map((item, index) => (
                  <div key={index} className="flex justify-between items-start gap-4">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400 min-w-fit">
                      {item.label}:
                    </span>
                    <span className="text-sm text-slate-900 dark:text-slate-100 text-right flex-1">{item.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

interface TabsProps {
  tabs: Array<{
    id: string;
    label: string;
    content: React.ReactNode;
  }>;
}

export const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || '');

  return (
    <div className="space-y-4">
      {/* Tab List */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-700 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="animate-in fade-in-50 duration-200">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};
