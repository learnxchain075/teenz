'use client';

import { useState, FormEvent, ChangeEvent, useEffect, useRef } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Image as ImageIcon } from 'lucide-react';
import Button from '@/components/ui/Button';
import AdminTable from '@/components/admin/Table';
import Image from 'next/image';
import Modal from '@/components/ui/Modal';
import { toast } from 'react-hot-toast';

// Define Category interface for type safety
interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  productCount: number;
  status: string;
}

interface CategoryData {
  name: string;
  description: string;
  image: File | null;
  status: 'ACTIVE' | 'INACTIVE';
}

interface FormErrors {
  name?: string;
  description?: string;
}

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryData>({
    name: '',
    description: '',
    image: null,
    status: 'ACTIVE'
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch categories from API
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/categories');
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error('Failed to fetch categories');
    }
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    if (!categoryData.name.trim()) {
      errors.name = 'Category name is required';
    }
    if (!categoryData.description.trim()) {
      errors.description = 'Description is required';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Create a new category
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', categoryData.name.trim());
      formData.append('description', categoryData.description.trim());
      formData.append('status', categoryData.status || 'ACTIVE');
      if (categoryData.image) {
        formData.append('imageUrl', categoryData.image);
      }

      const response = await fetch('http://localhost:5000/api/v1/categories', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create category');
      }

      const data = await response.json();
      setCategories((prev) => [...prev, data]);
      setCategoryData({ name: '', description: '', image: null, status: 'ACTIVE' });
      setIsAddModalOpen(false);
      toast.success('Category created successfully');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create category');
    } finally {
      setIsLoading(false);
    }
  };

  // Edit a category
  const handleEdit = (categoryToEdit: Category) => {
    setSelectedCategory(categoryToEdit);
    setCategoryData({
      name: categoryToEdit.name || '',
      description: categoryToEdit.description || '',
      image: null, // Reset image when editing
      status: 'ACTIVE'
    });
    setIsAddModalOpen(true);
  };

  // Update the category
  const handleUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedCategory || !validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', categoryData.name.trim());
      formData.append('description', categoryData.description.trim());
      formData.append('status', categoryData.status || 'ACTIVE');
      if (categoryData.image) {
        formData.append('imageUrl', categoryData.image);
      }

      const response = await fetch(
        `http://localhost:5000/api/v1/categories/${selectedCategory.id}`,
        {
          method: 'PUT',
          body: formData
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update category');
      }

      const updatedCategory = await response.json();
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === selectedCategory.id ? updatedCategory : cat
        )
      );
      setCategoryData({ name: '', description: '', image: null, status: 'ACTIVE' });
      setSelectedCategory(null);
      setIsAddModalOpen(false);
      toast.success('Category updated successfully');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update category');
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a category
  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this category?')) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/v1/categories/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete category');
      }

      setCategories((prev) => prev.filter((cat) => cat.id !== id));
      toast.success('Category deleted successfully');
    } catch (error) {
      toast.error('Failed to delete category');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCategoryData((prev) => ({
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
      setCategoryData(prev => ({ ...prev, image: file }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Categories</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your product categories
          </p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="w-5 h-5 mr-2" />
          Add Category
        </Button>
      </div>

      {/* Modal */}
      {isAddModalOpen && (
        <Modal
          onClose={() => {
            setIsAddModalOpen(false);
            setCategoryData({ name: '', description: '', image: null, status: 'ACTIVE' });
            setSelectedCategory(null);
            setFormErrors({});
          }}
          isOpen={isAddModalOpen}
          title={selectedCategory ? 'Edit Category' : 'Add New Category'}
        >
          <form
            onSubmit={(event: FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              if (selectedCategory) {
                handleUpdate(event);
              } else {
                handleSubmit(event);
              }
            }}
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={categoryData.name}
                  onChange={handleInputChange}
                  className={`w-full p-3 border ${
                    formErrors.name ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300`}
                  placeholder="Enter category name"
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
                  value={categoryData.description}
                  onChange={handleInputChange}
                  className={`w-full p-3 border ${
                    formErrors.description ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300`}
                  placeholder="Enter category description"
                  rows={4}
                  disabled={isLoading}
                />
                {formErrors.description && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.description}</p>
                )}
              </div>

              <div className="mb-6">
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                  Category Image
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
                  {categoryData.image ? (
                    <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50">
                      <div className="flex-1 truncate text-gray-600">
                        {categoryData.image.name}
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCategoryData(prev => ({ ...prev, image: null }));
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
                  setCategoryData({ name: '', description: '', image: null, status: 'ACTIVE' });
                  setSelectedCategory(null);
                  setFormErrors({});
                }}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading
                  ? selectedCategory
                    ? 'Updating...'
                    : 'Creating...'
                  : selectedCategory
                  ? 'Update Category'
                  : 'Create Category'}
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
                placeholder="Search categories..."
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
  data={categories}
  columns={[
    {
      header: 'Category',
      accessor: 'name',
      cell: (value, row) => (
        <div className="flex items-center">
          {row?.imageUrl ? (
            <div className="relative w-12 h-12 rounded-lg overflow-hidden mr-3">
              <Image
                src={row.imageUrl}
                alt={row.name || 'Category image'}
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
            <div className="font-medium text-gray-900">{row?.name || 'Unnamed Category'}</div>
            <div className="text-sm text-gray-500">
              {row?.description || 'No description available'}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: 'Products',
      accessor: 'productCount',
      cell: (value) => (
        <span className="text-gray-900">
          {value || '0'}
        </span>
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
              const category = categories.find(c => c.id === id);
              if (category) {
                handleEdit(category);
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