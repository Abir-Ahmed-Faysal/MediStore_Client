'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'tel' | 'url';
  placeholder?: string;
  required?: boolean;
  validation?: (value: string) => string | null;
}

interface AuthFormProps {
  fields: FormField[];
  onSubmit: (data: Record<string, string>) => Promise<void>;
  submitLabel: string;
  isLoading?: boolean;
  error?: string | null;
}

export const AuthForm: React.FC<AuthFormProps> = ({
  fields,
  onSubmit,
  submitLabel,
  isLoading = false,
  error,
}) => {
  const [formData, setFormData] = useState<Record<string, string>>(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    fields.forEach(field => {
      const value = formData[field.name];

      // Check required
      if (field.required && !value.trim()) {
        newErrors[field.name] = `${field.label} is required`;
        return;
      }

      // Check email format
      if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          newErrors[field.name] = 'Please enter a valid email address';
          return;
        }
      }

      // Check password length
      if (field.type === 'password' && value) {
        if (value.length < 8) {
          newErrors[field.name] = 'Password must be at least 8 characters';
          return;
        }
      }

      // Custom validation
      if (field.validation) {
        const validationError = field.validation(value);
        if (validationError) {
          newErrors[field.name] = validationError;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit(formData);
    } catch (err) {
      // Error handling in parent component
    }
  };

  const togglePasswordVisibility = (fieldName: string) => {
    setShowPassword(prev => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Error Alert */}
      {error && (
        <div className="flex gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Form Fields */}
      {fields.map(field => (
        <div key={field.name}>
          <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-2">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>

          <div className="relative">
            <input
              type={
                field.type === 'password' && showPassword[field.name]
                  ? 'text'
                  : field.type
              }
              id={field.name}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={handleChange}
              disabled={isLoading}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:bg-gray-100 disabled:cursor-not-allowed ${
                errors[field.name]
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            />

            {/* Password Toggle Button */}
            {field.type === 'password' && formData[field.name] && (
              <button
                type="button"
                onClick={() => togglePasswordVisibility(field.name)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
                disabled={isLoading}
              >
                {showPassword[field.name] ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            )}
          </div>

          {/* Field Error */}
          {errors[field.name] && (
            <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
              <AlertCircle size={14} />
              {errors[field.name]}
            </p>
          )}
        </div>
      ))}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Loading...
          </span>
        ) : (
          submitLabel
        )}
      </button>
    </form>
  );
};
