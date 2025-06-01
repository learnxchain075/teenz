'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, User, CalendarDays, Loader, Search, X } from 'lucide-react';

export default function AdminContactMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedMessage, setSelectedMessage] = useState<any | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/v1/contact/message');
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error('Error fetching messages:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredMessages = useMemo(() => {
    return messages.filter((msg: any) =>
      [msg.name, msg.email, msg.subject]
        .join(' ')
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search, messages]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-[#0c0c0c] dark:to-[#161616] pt-24 px-4 sm:px-6 lg:px-12">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Contact Messages
          </h1>
          <div className="relative w-full sm:w-96">
            <Search className="absolute top-3 left-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email or subject"
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader className="animate-spin h-10 w-10 text-primary-600" />
          </div>
        ) : filteredMessages.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 text-lg">
            No messages found.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMessages.slice(0, visibleCount).map((msg: any) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedMessage(msg)}
                className="cursor-pointer backdrop-blur-xl bg-white/60 dark:bg-white/5 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-primary-700 dark:text-primary-400">
                    {msg.subject}
                  </h3>
                  <span className="text-xs bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-400 px-2 py-1 rounded-full">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-line mb-4 line-clamp-4">
                  {msg.message}
                </p>
                <div className="space-y-1 text-sm text-gray-700 dark:text-gray-200">
                  <p className="flex items-center gap-2">
                    <User className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                    {msg.name}
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                    {msg.email}
                  </p>
                  <p className="flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                    {new Date(msg.createdAt).toLocaleTimeString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {filteredMessages.length > visibleCount && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={handleLoadMore}
              className="px-6 py-2 rounded-xl bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 transition font-semibold shadow-sm"
            >
              Load More
            </button>
          </div>
        )}

        {/* MODAL */}
        <AnimatePresence>
          {selectedMessage && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="relative bg-white dark:bg-gray-900 p-6 rounded-xl w-full max-w-lg shadow-2xl"
              >
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
                >
                  <X className="w-5 h-5" />
                </button>
                <h2 className="text-2xl font-semibold text-primary-700 dark:text-primary-400 mb-2">
                  {selectedMessage.subject}
                </h2>
                <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line mb-4">
                  {selectedMessage.message}
                </p>
                <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <p className="flex items-center gap-2">
                    <User className="w-4 h-4" /> {selectedMessage.name}
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4" /> {selectedMessage.email}
                  </p>
                  <p className="flex items-center gap-2">
                    <CalendarDays className="w-4 h-4" />{' '}
                    {new Date(selectedMessage.createdAt).toLocaleString()}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
