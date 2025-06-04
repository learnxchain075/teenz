'use client';

import { useState, FormEvent, ChangeEvent, useEffect, useRef } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Image as ImageIcon } from 'lucide-react';
import Button from '@/components/ui/Button';
import AdminTable from '@/components/admin/Table';
import Image from 'next/image';
import Modal from '@/components/ui/Modal';
import { toast } from 'react-hot-toast';

// Define Collection interface for type safety
interface Collection {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface CollectionData {
  name: string;
  description: string;
  image: File | null;
  status: 'ACTIVE' | 'INACTIVE';
}

interface FormErrors {
  name?: string;
  description?: string;
}

export default function CollectionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [collectionData, setCollectionData] = useState<CollectionData>({
    name: '',
    description: '',
    image: null,
    status: 'ACTIVE'
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch collections from API
  useEffect(() => {
    fetchCollections();
  }, []);

    const fetchCollections = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/collections');
        if (!response.ok) throw new Error('Failed to fetch collections');
        const data = await response.json();
          setCollections(Array.isArray(data) ? data : []);
      } catch (error) {
          console.error('Error fetching collections:', error);
      toast.error('Failed to fetch collections');
    }
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    if (!collectionData.name.trim()) {
      errors.name = 'Collection name is required';
    }
    if (!collectionData.description.trim()) {
      errors.description = 'Description is required';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Create a new collection
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', collectionData.name.trim());
      formData.append('description', collectionData.description.trim());
      formData.append('status', collectionData.status || 'ACTIVE');
      if (collectionData.image) {
        formData.append('imageUrl', collectionData.image);
      }

      const response = await fetch('http://localhost:5000/api/v1/collections', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create collection');
      }

      const data = await response.json();
      setCollections((prev) => [...prev, data]);
      setCollectionData({ name: '', description: '', image: null, status: 'ACTIVE' });
      setIsAddModalOpen(false);
      toast.success('Collection created successfully');
    } catch (error) {
      console.error('Error creating collection:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create collection');
    } finally {
      setIsLoading(false);
    }
  };

  // Edit a collection
  const handleEdit = (collectionToEdit: Collection) => {
    setSelectedCollection(collectionToEdit);
    setCollectionData({
      name: collectionToEdit.name || '',
      description: collectionToEdit.description || '',
      image: null,
      status: (collectionToEdit.status as 'ACTIVE' | 'INACTIVE') || 'ACTIVE'
    });
    setIsAddModalOpen(true);
  };

  // Update the collection
  const handleUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedCollection || !validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    const loadingToast = toast.loading('Updating collection...');

    try {
      const formData = new FormData();
      formData.append('name', collectionData.name.trim());
      formData.append('description', collectionData.description.trim());
      formData.append('status', collectionData.status || 'ACTIVE');
      if (collectionData.image) {
        formData.append('imageUrl', collectionData.image);
      }

      const response = await fetch(
        `http://localhost:5000/api/v1/collections/${selectedCollection.id}`,
        {
          method: 'PUT',
          body: formData
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update collection');
      }

      const updatedCollection = await response.json();
      
      // Update the collections list with the new data
      setCollections(collections.map(col => 
        col.id === selectedCollection.id 
          ? { 
              ...col, 
              ...updatedCollection,
              // Preserve the image URL if no new image was uploaded
              imageUrl: collectionData.image ? updatedCollection.imageUrl : col.imageUrl
            } 
          : col
      ));

      // Reset form and close modal
      setCollectionData({ name: '', description: '', image: null, status: 'ACTIVE' });
      setSelectedCollection(null);
      setIsAddModalOpen(false);
      setFormErrors({});
      
      // Show success message
      toast.dismiss(loadingToast);
      toast.success('Collection updated successfully');
    } catch (error) {
      console.error('Error updating collection:', error);
      toast.dismiss(loadingToast);
      toast.error(error instanceof Error ? error.message : 'Failed to update collection');
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a collection
  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this collection?')) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/v1/collections/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete collection');
      }

      setCollections((prev) => prev.filter((col) => col.id !== id));
      toast.success('Collection deleted successfully');
    } catch (error) {
      console.error('Error deleting collection:', error);
      toast.error('Failed to delete collection');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCollectionData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCollectionData(prev => ({ ...prev, image: file }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Collections</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your product collections
          </p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="w-5 h-5 mr-2" />
          Add Collection
        </Button>
      </div>

      {/* Modal */}
      {isAddModalOpen && (
        <Modal
          onClose={() => {
            setIsAddModalOpen(false);
            setCollectionData({ name: '', description: '', image: null, status: 'ACTIVE' });
            setSelectedCollection(null);
            setFormErrors({});
          }}
          isOpen={isAddModalOpen}
          title={selectedCollection ? 'Edit Collection' : 'Add New Collection'}
        >
          <form
            onSubmit={(event: FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              if (selectedCollection) {
                handleUpdate(event);
              } else {
                handleSubmit(event);
              }
            }}
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Collection Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={collectionData.name}
                  onChange={handleInputChange}
                  className={`w-full p-3 border ${
                    formErrors.name ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300`}
                  placeholder="Enter collection name"
                  disabled={isLoading}
                />
                {formErrors.name && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={collectionData.description}
                  onChange={handleInputChange}
                  className={`w-full p-3 border ${
                    formErrors.description ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300`}
                  placeholder="Enter collection description"
                  rows={4}
                  disabled={isLoading}
                />
                {formErrors.description && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.description}</p>
                )}
              </div>

              <div className="mb-6">
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                  Collection Image
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <div 
                  onClick={handleImageClick}
                  className="cursor-pointer"
                >
                  {collectionData.image ? (
                    <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50">
                      <div className="flex-1 truncate text-gray-600">
                        {collectionData.image.name}
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCollectionData(prev => ({ ...prev, image: null }));
                        }}
                        className="text-gray-400 hover:text-red-500"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center p-3 border border-dashed border-gray-300 rounded-lg hover:border-gray-400">
                      <span className="text-gray-600">Click to choose an image</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsAddModalOpen(false);
                  setCollectionData({ name: '', description: '', image: null, status: 'ACTIVE' });
                  setSelectedCollection(null);
                  setFormErrors({});
                }}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading
                  ? selectedCollection
                    ? 'Updating...'
                    : 'Creating...'
                  : selectedCollection
                  ? 'Update Collection'
                  : 'Create Collection'}
              </Button>
            </div>
          </form>
        </Modal>
      )}

      <div className="bg-white dark:bg-card rounded-xl shadow-sm">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search collections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="flex items-center gap-4">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Status</option>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
              <Button variant="outline">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </Button>
            </div>
          </div>

            <AdminTable
            data={collections}
              columns={[
                {
                  header: 'Collection',
                  accessor: 'name',
                  cell: (value, row) => (
                    <div className="flex items-center">
                    {row?.imageUrl ? (
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden mr-3">
                          <Image
                          src={row.imageUrl}
                            alt={row.name || 'Collection image'}
                          width={48}
                          height={48}
                            className="object-cover"
                            onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/placeholder-image.jpg';
                            }}
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mr-3">
                          <ImageIcon className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                      <div>
                      <div className="font-medium text-gray-900">{row?.name || 'Unnamed Collection'}</div>
                      <div className="text-sm text-gray-500">
                        {row?.description || 'No description available'}
                      </div>
                      </div>
                    </div>
                  ),
                },
                {
                  header: 'Status',
                  accessor: 'status',
                  cell: (value) => (
                    <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      value === 'ACTIVE'
                          ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                        }`}
                    >
                    {value || 'INACTIVE'}
                    </span>
                  ),
                },
                {
                  header: 'Actions',
                accessor: 'id',
                cell: (id) => (
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                      onClick={() => {
                        const collection = collections.find(c => c.id === id);
                        if (collection) {
                          handleEdit(collection);
                        }
                      }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                      onClick={() => handleDelete(id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </div>
    </div>
  );
}

