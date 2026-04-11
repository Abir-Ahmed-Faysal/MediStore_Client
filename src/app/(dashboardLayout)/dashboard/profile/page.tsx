'use client';

import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Edit2, Save, X } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  profileImage?: string;
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Ahmed Faysal',
    email: 'ahmed.faysal@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipcode: '10001',
  });

  const [formData, setFormData] = useState(profile);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setProfile(formData);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  return (
    <DashboardLayout role="user" userName={profile.name}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-600 mt-2">Manage your personal information</p>
      </div>

      <div className="max-w-4xl">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <User size={48} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
                <p className="text-gray-600">{profile.email}</p>
                <p className="text-sm text-gray-500 mt-1">Member since January 2024</p>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {isEditing ? (
                <>
                  <X size={20} />
                  Cancel
                </>
              ) : (
                <>
                  <Edit2 size={20} />
                  Edit Profile
                </>
              )}
            </button>
          </div>
        </div>

        {/* Profile Information */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-600"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-600"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-600"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Street Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-600"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-600"
              />
            </div>

            {/* State */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-600"
              />
            </div>

            {/* Zipcode */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ZIP Code
              </label>
              <input
                type="text"
                name="zipcode"
                value={formData.zipcode}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-600"
              />
            </div>
          </div>

          {/* Save/Cancel Buttons */}
          {isEditing && (
            <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                <Save size={20} />
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {/* Account Status */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Account Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                  Active
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Member Since</span>
                <span className="text-gray-900 font-medium">Jan 2024</span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-cent gap-3">
                <Mail size={16} className="text-gray-400" />
                <span className="text-sm text-gray-600">{profile.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-gray-400" />
                <span className="text-sm text-gray-600">{profile.phone}</span>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Security</h3>
            <button className="w-full px-4 py-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition text-sm font-medium">
              Change Password
            </button>
            <button className="w-full px-4 py-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition text-sm font-medium mt-2">
              Two-Factor Auth
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
