'use client';

import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

export default function HeaderAnnouncementPage() {
  const [currentHeader, setCurrentHeader] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchHeader = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://api.teenzskin.com/api/v1/announcment');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      const latest = data?.[0]?.name || '';
      setCurrentHeader(latest);
      setInputValue(latest);
    } catch (err) {
      toast.error('Failed to fetch header');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!inputValue.trim()) {
      toast.error('Header cannot be empty');
      return;
    }
    if (inputValue.trim().length < 5) {
      toast.error('Header must be at least 5 characters');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('https://api.teenzskin.com/api/v1/announcment/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: inputValue.trim() }),
      });

      if (!res.ok) throw new Error('Submission failed');

      const data = await res.json();
      setCurrentHeader(data.name);
      toast.success('Header updated successfully');
    } catch (err) {
      toast.error('Failed to update header');
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    fetchHeader();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black px-6 py-12">
      <Toaster position="top-right" />
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">📢 Header Announcement</h1>

        {loading ? (
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <Loader2 className="animate-spin h-5 w-5" />
            <span>Loading current header...</span>
          </div>
        ) : (
          <>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Current Header:
            </label>
            <div className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              {currentHeader || 'No announcement available.'}
            </div>
          </>
        )}

        <label htmlFor="header" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          New Header
        </label>
        <input
          type="text"
          id="header"
          placeholder="Enter new header announcement"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
        />

        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition disabled:opacity-50"
        >
          {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {submitting ? 'Saving...' : 'Update Header'}
        </button>
      </div>
    </div>
  );
}
