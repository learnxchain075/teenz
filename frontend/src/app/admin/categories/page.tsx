'use client';

import { useState, FormEvent, ChangeEvent, useEffect } from 'react';

import { Plus, Search, Filter, Edit, Trash2, Image as ImageIcon } from 'lucide-react';
import Button from '@/components/ui/Button';
import AdminTable from '@/components/admin/Table';
import Image from 'next/image';
import Modal from '@/components/ui/Modal';




export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState({
    name: '',
    description: '',
    imageUrl: '',
  });
  const [selectedCategory, setSelectedCategory] = useState<any | null>(null);

  // Fetch categories from API
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('http://localhost:5000/api/v1/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
    fetchCategories();
  }, []);

  // Create a new category
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/v1/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
      });
      const data = await response.json();
      setCategories((prev) => [...prev, data]);
      setCategoryData({ name: '', description: '', imageUrl: '' });
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  // Edit a category
  const handleEditCategory = async (id: number) => {
    try {
      const categoryToEdit = categories.find((category) => category.id === id);
      setSelectedCategory(categoryToEdit);

      setCategoryData({
        name: categoryToEdit?.name || '',
        description: categoryToEdit?.description || '',
        imageUrl: categoryToEdit?.image || '',
      });
      setIsAddModalOpen(true);
    } catch (error) {
      console.error('Error editing category:', error);
    }
  };

  // Update the category
  const handleUpdateCategory = async () => {
    if (!selectedCategory) return;
    
    try {
      const response = await fetch(`http://localhost:5000/api/v1/categories/${selectedCategory.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
      });
      const data = await response.json();
      setCategories((prev) => 
        prev.map((category) => 
          category.id === selectedCategory.id ? { ...category, ...data } : category
        )
      );
      setCategoryData({ name: '', description: '', imageUrl: '' });
      setSelectedCategory(null);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  // Delete a category
  const handleDeleteCategory = async (id: number) => {
    try {
      await fetch(`http://localhost:5000/api/v1/categories/${id}`, {
        method: 'DELETE',
      });
      setCategories((prev) => prev.filter((category) => category.id !== id));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setCategoryData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
    onClose={() => setIsAddModalOpen(false)} 
    isOpen={isAddModalOpen} 
    title={selectedCategory ? 'Edit Category' : 'Add New Category'}
  >
    {/* <div className="p-8 max-w-lg mx-auto bg-white rounded-lg shadow-xl"> */}
      {/* <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        {selectedCategory ? 'Edit Category' : 'Add New Category'}
      </h2> */}
      <form onSubmit={selectedCategory ? handleUpdateCategory : handleSubmit}>
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Category Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={categoryData.name}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300"
            placeholder="Enter category name"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={categoryData.description}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300"
            placeholder="Enter description"
            rows={4}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-2">
            Image URL
          </label>
          <input
            id="imageUrl"
            name="imageUrl"
            type="text"
            value={categoryData.imageUrl}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300"
            placeholder="Enter image URL"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            onClick={() => setIsAddModalOpen(false)}
            className="px-6 py-2 text-sm font-semibold bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="px-6 py-2 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            {selectedCategory ? 'Update Category' : 'Save Category'}
          </Button>
        </div>
      </form>
    {/* </div> */}
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
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
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
                    {row?.image ? (
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden mr-3">
                        <Image
                          src={row.image}
                          alt={row.name || ''}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mr-3">
                        <ImageIcon className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                    <div>
                      <div className="font-medium">{row?.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {row?.description}
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                header: 'Products',
                accessor: 'products',
                cell: (value) => value,
              },
              {
                header: 'Status',
                accessor: 'status',
                cell: (value) => (
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      value === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {value}
                  </span>
                ),
              },
              {
                header: 'Actions',
                accessor: 'id',
                cell: (id) => (
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEditCategory(id)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteCategory(id)}>
                      <Trash2 className="w-4 h-4 text-error-600" />
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
