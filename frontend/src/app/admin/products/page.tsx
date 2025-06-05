'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Plus, Search, Filter, Edit, Trash2, Copy } from 'lucide-react';
import Button from '@/components/ui/Button';
import AdminTable from '@/components/admin/Table';
import Image from 'next/image';
import axios from 'axios';
import Modal from '@/components/ui/Modal';
import toast, { Toaster } from 'react-hot-toast';
import TagInput from '@/components/admin/TagInput';

interface Tag {
  id: string;
  name: string;
  products?: any[];
}

interface TagResponse {
  tags: Tag[];
}

interface ProductTag {
  id: string;
  name: string;
}

interface UploadResponse {
  url: string;
  message?: string;
}

// Add ProductStatus enum to match Prisma schema
enum ProductStatus {
  IN_STOCK = 'IN_STOCK',
  LOW_STOCK = 'LOW_STOCK',
  OUT_OF_STOCK = 'OUT_OF_STOCK'
}

interface ProductInput {
  name: string;
  price: number;
  stock: number;
  status: ProductStatus;
  categoryId: string;
  images: any[];
  tags: any[];
}

const ProductsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newProduct, setNewProduct] = useState<ProductInput>({
    name: '',
    price: 0,
    stock: 0,
    status: ProductStatus.IN_STOCK,
    categoryId: '',
    images: [],
    tags: []
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [createErrors, setCreateErrors] = useState<ProductErrors>({});
  const [editErrors, setEditErrors] = useState<ProductErrors>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        let productsData;
        try {
          const productsResponse = await axios.get('https://api.teenzskin.com/api/v1/products', {
            params: { include: 'images,category,collections,tags' }
          });
          productsData = productsResponse.data;
        } catch (error: any) {
          throw new Error(`Failed to fetch products: ${error.response?.data?.error || error.message}`);
        }

        let categoriesData;
        try {
          const categoriesResponse = await axios.get('https://api.teenzskin.com/api/v1/categories');
          categoriesData = categoriesResponse.data;
        } catch (error: any) {
          throw new Error(`Failed to fetch categories: ${error.response?.data?.error || error.message}`);
        }

        let tagsData;
        try {
          const tagsResponse = await axios.get<TagResponse>('https://api.teenzskin.com/api/v1/product-tag');
          tagsData = tagsResponse.data.tags;
        } catch (error: any) {
          throw new Error(`Failed to fetch tags: ${error.response?.data?.error || error.message}`);
        }

        setProducts(productsData || []);
        setCategories(categoriesData || []);
        setTags(tagsData || []);
        setLoading(false);
      } catch (error: any) {
        setError(error.message || 'Failed to load data');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  type ProductErrors = {
    name?: string;
    price?: string;
    stock?: string;
    categoryId?: string;
    general?: string;
    images?: string;
    [key: string]: string | undefined;
  };

  const validateProduct = (product: ProductInput): ProductErrors => {
    const errors: ProductErrors = {};
    if (!product.name.trim()) errors.name = 'Name is required';
    if (isNaN(product.price) || product.price <= 0) errors.price = 'Price must be a positive number';
    if (isNaN(product.stock) || product.stock < 0) errors.stock = 'Stock must be a non-negative integer';
    if (!product.categoryId) errors.categoryId = 'Category is required';
    if (!product.images || product.images.length === 0) errors.images = 'At least one image is required';
    return errors;
  };

  // Create a new tag
  const createTag = async (tagName: string): Promise<Tag | null> => {
    try {
      const response = await axios.post<{ message: string; tag: Tag }>('https://api.teenzskin.com/api/v1/product-tag', {
        name: tagName
      });
      setTags([...tags, response.data.tag]);
      return response.data.tag;
    } catch (error) {
      return null;
    }
  };

  // Handle tag input
  const handleTagInput = async (input: string) => {
    const tagName = input.trim();
    if (!tagName) return;

    let tag = tags.find(t => t.name.toLowerCase() === tagName.toLowerCase());

    if (!tag) {
      tag = await createTag(tagName);
      if (!tag) return;
    }

    if (!newProduct.tags.some(t => t.id === tag.id)) {
      setNewProduct(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
  };

  const handleCreateProduct = async () => {
    const errors = validateProduct(newProduct);

    if (!newProduct.images || newProduct.images.length === 0) {
      setCreateErrors({ ...errors, images: 'At least one image is required' });
      toast.error('Please add at least one image');
      return;
    }

    if (Object.keys(errors).length > 0) {
      setCreateErrors(errors);
      Object.values(errors).forEach(error => {
        toast.error(error);
      });
      return;
    }

    const loadingToast = toast.loading('Creating product...');

    try {
      const formData = new FormData();

      formData.append('name', newProduct.name.trim());
      formData.append('price', newProduct.price.toString());
      formData.append('stock', newProduct.stock.toString());
      formData.append('status', newProduct.status);
      formData.append('categoryId', newProduct.categoryId);

      if (newProduct.tags && newProduct.tags.length > 0) {
        const tagIds = newProduct.tags.map(tag => tag.id);
        formData.append('tags', JSON.stringify(tagIds));
      }

      if (newProduct.images && newProduct.images.length > 0) {
        for (let i = 0; i < newProduct.images.length; i++) {
          formData.append('images', newProduct.images[i]);
        }
      }

      const response = await axios.post('https://api.teenzskin.com/api/v1/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.dismiss(loadingToast);
      toast.success('Product created successfully!');

      setProducts([...products, response.data]);
      setShowCreateModal(false);
      setNewProduct({
        name: '',
        price: 0,
        stock: 0,
        status: ProductStatus.IN_STOCK,
        categoryId: '',
        images: [],
        tags: []
      });
      setCreateErrors({});
    } catch (error: any) {
      toast.dismiss(loadingToast);

      let errorMessage = 'Failed to create product';
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.request) {
        errorMessage = 'Network error. Please check your connection.';
      }

      toast.error(errorMessage);
      setCreateErrors({
        general: errorMessage
      });
    }
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct) return;
    const errors = validateProduct(editingProduct);
    if (Object.keys(errors).length > 0) {
      setEditErrors(errors);
      return;
    }
    try {
      const productData = {
        name: editingProduct.name,
        price: editingProduct.price,
        stock: editingProduct.stock,
        status: editingProduct.status,
        categoryId: editingProduct.categoryId,
        images: { create: editingProduct.images.map(url => ({ url })) }
      };
      const response = await axios.put(`https://api.teenzskin.com/api/v1/products/${editingProduct.id}`, productData);
      setProducts(products.map(p => (p.id === editingProduct.id ? response.data : p)));
      setShowEditModal(false);
      setEditingProduct(null);
      setEditErrors({});
    } catch (error) {
      setEditErrors({ general: 'Failed to update product' });
    }
  };

  const handleDeleteProduct = async () => {
    if (!productToDelete) return;

    const loadingToast = toast.loading('Deleting product...');

    try {
      const productToDeleteName = products.find(p => p.id === productToDelete)?.name;
      await axios.delete(`https://api.teenzskin.com/api/v1/products/${productToDelete}`);
      setProducts(products.filter(p => p.id !== productToDelete));
      setShowDeleteModal(false);
      setProductToDelete(null);
      toast.success(`${productToDeleteName} has been deleted`);
    } catch (error: any) {
      if (error.response?.status === 404) {
        toast.error('Product not found');
      } else if (error.response?.status === 500) {
        toast.error('Server error. Please try again later.');
      } else {
        toast.error('Failed to delete product');
      }
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading products...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center p-6 max-w-lg mx-auto">
        <div className="text-red-600 text-xl mb-4">⚠️ Error</div>
        <p className="text-gray-800 mb-4">{error}</p>
        <Button
          onClick={() => window.location.reload()}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          Try Again
        </Button>
      </div>
    </div>
  );

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedCategory === 'all' || product.categoryId === selectedCategory)
  );

  return (
    <div className="space-y-6">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
          },
          success: {
            style: {
              background: '#22c55e',
            },
          },
          error: {
            style: {
              background: '#ef4444',
            },
            duration: 5000,
          },
        }}
      />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Products</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your product inventory</p>
        </div>
        <Button onClick={() => {
          setNewProduct({ name: '', price: 0, stock: 0, status: ProductStatus.IN_STOCK, categoryId: '', images: [], tags: [] });
          setCreateErrors({});
          setShowCreateModal(true);
        }}>
          <Plus className="w-5 h-5 mr-2" />
          Add Product
        </Button>
      </div>

      {showCreateModal && (
        <Modal
          onClose={() => setShowCreateModal(false)}
          isOpen={showCreateModal}
          title={"Create New Product"}
        >
          <div className="p-6">
            {/* <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create New Product</h2> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="col-span-1 sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input
                  type="text"
                  placeholder="Enter product name"
                  value={newProduct.name}
                  onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
                />
                {createErrors.name && <p className="text-red-600 text-sm mt-1">{createErrors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <input
                  type="number"
                  placeholder="Enter price"
                  value={newProduct.price}
                  onChange={e => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || 0 })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
                />
                {createErrors.price && <p className="text-red-600 text-sm mt-1">{createErrors.price}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                <input
                  type="number"
                  step="1"
                  placeholder="Enter stock quantity"
                  value={newProduct.stock}
                  onChange={e => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) || 0 })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
                />
                {createErrors.stock && <p className="text-red-600 text-sm mt-1">{createErrors.stock}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Category</label>
                <select
                  value={newProduct.categoryId}
                  onChange={(e) => setNewProduct({ ...newProduct, categoryId: e.target.value })}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-primary-500 dark:bg-gray-800"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {createErrors.categoryId && (
                  <p className="text-red-500 text-sm mt-1">{createErrors.categoryId}</p>
                )}
              </div>

              <div className="col-span-1 sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Images <span className="text-red-500">*</span>
                </label>
                <div className="space-y-4">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      if (files.length > 0) {
                        const validFiles = files.filter(file =>
                          file.type.startsWith('image/')
                        );

                        if (validFiles.length !== files.length) {
                          toast.error('Please select only image files');
                          return;
                        }

                        const maxSize = 5 * 1024 * 1024;
                        const validSizedFiles = validFiles.filter(file =>
                          file.size <= maxSize
                        );

                        if (validSizedFiles.length !== validFiles.length) {
                          toast.error('Some files are too large. Maximum size is 5MB per image');
                          return;
                        }

                        setNewProduct({ ...newProduct, images: [...newProduct.images, ...validSizedFiles] });

                        if (createErrors.images) {
                          setCreateErrors(prev => {
                            const { images, ...rest } = prev;
                            return rest;
                          });
                        }
                      }
                    }}
                    className={`w-full p-3 border ${createErrors.images ? 'border-red-500' : 'border-gray-300'
                      } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition`}
                  />
                  {createErrors.images && (
                    <p className="text-red-600 text-sm mt-1">{createErrors.images}</p>
                  )}
                  {newProduct.images.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {newProduct.images.map((file: File, index) => (
                        <div
                          key={index}
                          className="relative group"
                        >
                          <div className="w-20 h-20 rounded-lg overflow-hidden">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-full object-cover"
                              onLoad={() => URL.revokeObjectURL(URL.createObjectURL(file))}
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const newImages = [...newProduct.images];
                              newImages.splice(index, 1);
                              setNewProduct({ ...newProduct, images: newImages });
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <p className="text-sm text-gray-500">
                    Upload up to 5 images (max 5MB each). Supported formats: JPG, PNG, GIF
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={newProduct.status}
                  onChange={e => setNewProduct({ ...newProduct, status: e.target.value as ProductStatus })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
                >
                  <option value={ProductStatus.IN_STOCK}>In Stock</option>
                  <option value={ProductStatus.LOW_STOCK}>Low Stock</option>
                  <option value={ProductStatus.OUT_OF_STOCK}>Out of Stock</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Tags</label>
                <TagInput
                  existingTags={tags}
                  selectedTags={newProduct.tags}
                  onTagsChange={(newTags) => setNewProduct({ ...newProduct, tags: newTags })}
                  onCreateTag={createTag}
                />
              </div>
            </div>

            {createErrors.general && <p className="text-red-600 text-sm mt-4 text-center">{createErrors.general}</p>}

            <div className="mt-6 flex justify-end">
              <Button
                onClick={handleCreateProduct}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition duration-300 w-full sm:w-auto"
              >
                Create Product
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {showEditModal && editingProduct && (
        <Modal onClose={() => setShowEditModal(false)} isOpen={showEditModal} title={"Edit Product"}>
          <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
          <div className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Product Name"
                value={editingProduct.name}
                onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
              {editErrors.name && <p className="text-red-600 text-sm mt-1">{editErrors.name}</p>}
            </div>
            <div>
              <input
                type="number"
                placeholder="Price"
                value={editingProduct.price}
                onChange={e => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) || 0 })}
                className="w-full p-2 border rounded-lg"
              />
              {editErrors.price && <p className="text-red-600 text-sm mt-1">{editErrors.price}</p>}
            </div>
            <div>
              <input
                type="number"
                step="1"
                placeholder="Stock"
                value={editingProduct.stock}
                onChange={e => setEditingProduct({ ...editingProduct, stock: parseInt(e.target.value) || 0 })}
                className="w-full p-2 border rounded-lg"
              />
              {editErrors.stock && <p className="text-red-600 text-sm mt-1">{editErrors.stock}</p>}
            </div>
            <div>
              <select
                value={editingProduct.status}
                onChange={e => setEditingProduct({ ...editingProduct, status: e.target.value as ProductStatus })}
                className="w-full p-2 border rounded-lg"
              >
                <option value={ProductStatus.IN_STOCK}>In Stock</option>
                <option value={ProductStatus.LOW_STOCK}>Low Stock</option>
                <option value={ProductStatus.OUT_OF_STOCK}>Out of Stock</option>
              </select>
            </div>
            <div>
              <select
                value={editingProduct.categoryId}
                onChange={e => setEditingProduct({ ...editingProduct, categoryId: e.target.value })}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
              {editErrors.categoryId && <p className="text-red-600 text-sm mt-1">{editErrors.categoryId}</p>}
            </div>
            <div>
              <input
                type="text"
                placeholder="Image URL"
                value={editingProduct.images[0]?.url || ''}
                onChange={e => setEditingProduct({ ...editingProduct, images: [{ url: e.target.value }] })}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            {editErrors.general && <p className="text-red-600 text-sm mt-1">{editErrors.general}</p>}
            <Button onClick={handleUpdateProduct}>Update Product</Button>
          </div>
        </Modal>
      )}

      {showDeleteModal && (
        <Modal onClose={() => setShowDeleteModal(false)} isOpen={showDeleteModal} title={"Delete Product"}>
          <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
          <p>Are you sure you want to delete {products.find(p => p.id === productToDelete)?.name}?</p>
          <div className="flex justify-end gap-4 mt-4">
            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
            <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50" onClick={handleDeleteProduct}>Delete</Button>
          </div>
        </Modal>
      )}

      <div className="bg-white dark:bg-card rounded-xl shadow-sm">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="flex items-center gap-4">
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
              <Button variant="outline">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-8">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <AdminTable
              data={filteredProducts}
              columns={[
                {
                  header: 'Product',
                  accessor: 'id',
                  cell: id => {
                    const product = products.find(p => p.id === id);
                    return (
                      <div className="flex items-center">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden mr-3">
                          <Image
                            src={product?.images[0]?.url || ''}
                            alt={product?.name || 'Product'}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium">{product?.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {product?.category?.name || product?.categoryId}
                          </div>
                        </div>
                      </div>
                    );
                  }
                },
                {
                  header: 'Price',
                  accessor: 'price',
                  cell: value => `$${value.toFixed(2)}`
                },
                { header: 'Stock', accessor: 'stock' },
                {
                  header: 'Status',
                  accessor: 'status',
                  cell: value => (
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${value === ProductStatus.IN_STOCK
                        ? 'bg-green-100 text-green-800'
                        : value === ProductStatus.LOW_STOCK
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                        }`}
                    >
                      {value}
                    </span>
                  )
                },
                {
                  header: 'Actions',
                  accessor: 'id',
                  cell: id => (
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingProduct(products.find(p => p.id === id));
                          setEditErrors({});
                          setShowEditModal(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setProductToDelete(id);
                          setShowDeleteModal(true);
                        }}
                      >
                        <Trash2 className="w-4 h-4 text-error-600" />
                      </Button>
                    </div>
                  )
                }
              ]}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;