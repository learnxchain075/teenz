'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Camera, Mail, Phone, MapPin, Building, Globe, Save } from 'lucide-react';
import Button from '@/components/ui/Button';
import AccountLayout from '@/components/account/Layout';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: string;
  profilePicture: string | null;
  phone: string;
  address: string;
  company: string;
  website: string;
  bio: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/auth/login');
        return;
      }

      try {
        const res = await fetch('http://localhost:5000/api/v1/user/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          if (res.status === 401 || res.status === 403) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            router.push('/auth/login');
            return;
          }
          throw new Error('Failed to fetch profile');
        }

        const data = await res.json();
        // Transform API data to match our interface
        const profileData: UserProfile = {
          id: data.id,
          name: data.name || 'N/A',
          email: data.email || 'N/A',
          role: data.role || 'N/A',
          profilePicture: data.profilePicture,
          phone: 'N/A',
          address: data.Address?.[0] ? `${data.Address[0].street}, ${data.Address[0].city}, ${data.Address[0].state}, ${data.Address[0].zipCode}, ${data.Address[0].country}` : 'N/A',
          company: 'N/A',
          website: 'N/A',
          bio: 'N/A'
        };
        setProfile(profileData);
        setEditedProfile(profileData);
      } catch (err) {
        console.error('Failed to load profile:', err);
        toast.error('Failed to load profile data');
      }
    };

    fetchProfile();
  }, [router]);

  const handleSave = async () => {
    if (!editedProfile) return;

    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/v1/user/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editedProfile.name,
          email: editedProfile.email
        }),
      });

      if (!res.ok) throw new Error('Failed to update profile');

      const data = await res.json();
      setProfile(prev => prev ? { ...prev, ...data } : null);
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (err) {
      console.error('Failed to update profile:', err);
      toast.error('Failed to update profile');
    }
  };

  if (!profile) {
    return (
      <AccountLayout>
        <div className="text-center py-10 text-gray-500">
          Loading...
        </div>
      </AccountLayout>
    );
  }

  return (
    <AccountLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-card rounded-xl shadow-lg overflow-hidden"
      >
        {/* Profile Header */}
        <div className="relative h-48 bg-gradient-to-r from-primary-600 to-primary-400">
          <div className="absolute -bottom-12 left-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-gray-800">
                <Image
                  src={profile.profilePicture || '/avatar-placeholder.png'}
                  alt={profile.name}
                  fill
                  className="object-cover"
                />
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg">
                  <Camera className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="pt-16 px-8 pb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              {isEditing ? (
                <input
                  type="text"
                  value={editedProfile?.name || ''}
                  onChange={(e) => setEditedProfile(prev => prev ? { ...prev, name: e.target.value } : null)}
                  className="text-2xl font-bold bg-transparent border-b border-gray-300 dark:border-gray-700 focus:outline-none focus:border-primary-500"
                />
              ) : (
                <h1 className="text-2xl font-bold">{profile.name}</h1>
              )}
              <p className="text-gray-600 dark:text-gray-400">{profile.role}</p>
            </div>
            <Button
              variant={isEditing ? 'primary' : 'outline'}
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
            >
              {isEditing ? (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              ) : (
                'Edit Profile'
              )}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-gray-400 mr-3" />
                  {isEditing ? (
                    <input
                      type="email"
                      value={editedProfile?.email || ''}
                      onChange={(e) => setEditedProfile(prev => prev ? { ...prev, email: e.target.value } : null)}
                      className="flex-1 bg-transparent border-b border-gray-300 dark:border-gray-700 focus:outline-none focus:border-primary-500"
                    />
                  ) : (
                    <span>{profile.email}</span>
                  )}
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-gray-400 mr-3" />
                  <span>{profile.phone}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                  <span>{profile.address}</span>
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Additional Information</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Building className="w-5 h-5 text-gray-400 mr-3" />
                  <span>{profile.company}</span>
                </div>
                <div className="flex items-center">
                  <Globe className="w-5 h-5 text-gray-400 mr-3" />
                  <span>{profile.website}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Bio</h2>
            <p className="text-gray-600 dark:text-gray-400">{profile.bio}</p>
          </div>
        </div>
      </motion.div>
    </AccountLayout>
  );
}