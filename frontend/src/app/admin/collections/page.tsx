'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, Edit, Trash2, Image as ImageIcon } from 'lucide-react';
import Button from '@/components/ui/Button';
import AdminTable from '@/components/admin/Table';
import Image from 'next/image';
import Modal from '@/components/ui/Modal';
import PropTypes from 'prop-types';

export default function CollectionsPage() {
  const [collections, setCollections] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentCollection, setCurrentCollection] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageUrl: '',
    status: 'ACTIVE',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState<{ name?: string; description?: string; imageUrl?: string }>({});

  // Validate form inputs
  const validateForm = useCallback(() => {
    const errors: { name?: string; description?: string; image?: string } = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.description.trim()) errors.description = 'Description is required';
    if (formData.imageUrl && !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(formData.imageUrl)) {
      errors.image = 'Invalid URL format';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData]);

  // Fetch collections with cleanup
  useEffect(() => {
    let mounted = true;

    const fetchCollections = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:5000/api/v1/collections');
        if (!response.ok) throw new Error('Failed to fetch collections');
        const data = await response.json();
        if (mounted) {
          setCollections(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        if (mounted) {
          setError(error.message);
          console.error('Error fetching collections:', error);
        }
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    fetchCollections();
    return () => {
      mounted = false;
    };
  }, []);

  // Handle form input changes with sanitization
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'image' ? value.trim() : value,
    }));
    // Clear error for this field when user starts typing
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  // Create a new collection
  const handleCreateCollection = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/v1/collections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to create collection');
      setIsAddModalOpen(false);
      setFormData({ name: '', description: '', imageUrl: '', status: 'ACTIVE' });
      // Refetch collections after creation
      const refreshed = await fetch('http://localhost:5000/api/v1/collections');
      if (refreshed.ok) {
        const data = await refreshed.json();
        setCollections(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      setError(error.message);
      console.error('Error creating collection:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Update a collection
  const handleUpdateCollection = async () => {
    if (!validateForm() || !currentCollection) return;

    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:5000/api/v1/collections/${currentCollection._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to update collection');
      setIsEditModalOpen(false);
      setFormData({ name: '', description: '', imageUrl: '', status: 'ACTIVE' });
      setCurrentCollection(null);
      // Refetch collections after update
      const refreshed = await fetch('/api/collections');
      if (refreshed.ok) {
        const data = await refreshed.json();
        setCollections(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      setError(error.message);
      console.error('Error updating collection:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a collection
  const handleDeleteCollection = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:5000/api/v1/collections/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete collection');
      // Refetch collections after deletion
      const refreshed = await fetch('http://localhost:5000/api/v1/collections');
      if (refreshed.ok) {
        const data = await refreshed.json();
        setCollections(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      setError(error.message);
      console.error('Error deleting collection:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Open edit modal with collection data
  const openEditModal = useCallback((collection) => {
    setCurrentCollection(collection);
    setFormData({
      name: collection.name || '',
      description: collection.description || '',
      imageUrl: collection.image || '',
      status: collection.status || 'ACTIVE',
    });
    setFormErrors({});
    setIsEditModalOpen(true);
  }, []);

  // Filter collections based on search and status
  const filteredCollections = collections.filter((collection) => {
    const matchesSearch = collection.name
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedStatus === 'all' || collection.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 p-6">
      {error && (
        <div className="bg-red-100 text-red-800 p-4 rounded-lg">
          {error}
        </div>
      )}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Collections</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your product collections
          </p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} disabled={isLoading}>
          <Plus className="w-5 h-5 mr-2" />
          Add Collection
        </Button>
      </div>

      <motion.div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search collections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value.trim())}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
            </div>
            <div className="flex items-center gap-4">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              >
                <option value="all">All Status</option>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
              <Button variant="outline" disabled={isLoading}>
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <AdminTable
              data={filteredCollections}
              columns={[
                {
                  header: 'Collection',
                  accessor: 'name',
                  cell: (value, row) => (
                    <div className="flex items-center">
                      {row?.image ? (
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden mr-3">
                          <Image
                            src={row.image}
                            alt={row.name || 'Collection image'}
                            fill
                            className="object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
                            }}
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mr-3">
                          <ImageIcon className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                      <div>
                        <div className="font-medium">{row?.name || 'Unnamed'}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {row?.description || 'No description'}
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  header: 'Products',
                  accessor: 'products',
                  cell: (value) => value || 0,
                },
                {
                  header: 'Status',
                  accessor: 'status',
                  cell: (value) => (
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${value === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                        }`}
                    >
                      {value || 'Unknown'}
                    </span>
                  ),
                },
                {
                  header: 'Actions',
                  accessor: '_id',
                  cell: (value) => (
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditModal(collections.find((c) => c._id === value))}
                        disabled={isLoading}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteCollection(value)}
                        disabled={isLoading}
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  ),
                },
              ]}
            />
          )}
        </div>
      </motion.div>

      {/* Add Collection Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setFormErrors({});
        }}
        title="Add New Collection"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg ${formErrors.name ? 'border-red-500' : ''
                }`}
              placeholder="Collection name"
              disabled={isLoading}
            />
            {formErrors.name && (
              <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg ${formErrors.description ? 'border-red-500' : ''
                }`}
              placeholder="Collection description"
              disabled={isLoading}
            />
            {formErrors.description && (
              <p className="text-red-500 text-xs mt-1">{formErrors.description}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Image URL</label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg ${formErrors.imageUrl ? 'border-red-500' : ''
                }`}
              placeholder="https://example.com/image.jpg"
              disabled={isLoading}
            />
            {formErrors.imageUrl && (
              <p className="text-red-500 text-xs mt-1">{formErrors.imageUrl}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg"
              disabled={isLoading}
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsAddModalOpen(false);
                setFormErrors({});
              }}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateCollection} disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit Collection Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setFormErrors({});
        }}
        title="Edit Collection"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg ${formErrors.name ? 'border-red-500' : ''
                }`}
              placeholder="Collection name"
              disabled={isLoading}
            />
            {formErrors.name && (
              <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg ${formErrors.description ? 'border-red-500' : ''
                }`}
              placeholder="Collection description"
              disabled={isLoading}
            />
            {formErrors.description && (
              <p className="text-red-500 text-xs mt-1">{formErrors.description}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Image URL</label>
            <input
              type="url"
              name="image"
              value={formData.imageUrl}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg ${formErrors.imageUrl ? 'border-red-500' : ''
                }`}
              placeholder="https://example.com/image.jpg"
              disabled={isLoading}
            />
            {formErrors.imageUrl && (
              <p className="text-red-500 text-xs mt-1">{formErrors.imageUrl}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg"
              disabled={isLoading}
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsEditModalOpen(false);
                setFormErrors({});
              }}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdateCollection} disabled={isLoading}>
              {isLoading ? 'Updating...' : 'Update'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

