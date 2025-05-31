'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Plus, Search, Filter, Edit, Trash2, Copy } from 'lucide-react';
import Button from '@/components/ui/Button';
import AdminTable from '@/components/admin/Table';
import Image from 'next/image';
import axios from 'axios';
import Modal from '@/components/ui/Modal';

const ProductsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    stock: 0,
    status: 'In Stock',
    categoryId: '',
    images: []
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
        const [productsResponse, categoriesResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/v1/products', {
            params: { include: 'images,category,collections' }
          }),
          axios.get('http://localhost:5000/api/v1/categories')
        ]);
        setProducts(productsResponse.data as any[]);
        setCategories(categoriesResponse.data as any[]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load products and categories');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  type ProductInput = {
    name: string;
    price: number;
    stock: number;
    status: string;
    categoryId: string;
    images: any[];
    [key: string]: any;
  };

  type ProductErrors = {
    name?: string;
    price?: string;
    stock?: string;
    categoryId?: string;
    general?: string;
    [key: string]: string | undefined;
  };

  const validateProduct = (product: ProductInput): ProductErrors => {
    const errors: ProductErrors = {};
    if (!product.name.trim()) errors.name = 'Name is required';
    if (isNaN(product.price) || product.price <= 0) errors.price = 'Price must be a positive number';
    if (isNaN(product.stock) || product.stock < 0) errors.stock = 'Stock must be a non-negative integer';
    if (!product.categoryId) errors.categoryId = 'Category is required';
    return errors;
  };

  const handleCreateProduct = async () => {
    const errors = validateProduct(newProduct);
    if (Object.keys(errors).length > 0) {
      setCreateErrors(errors);
      return;
    }
    try {
      const productData = {
        name: newProduct.name,
        price: newProduct.price,
        stock: newProduct.stock,
        status: newProduct.status,
        categoryId: newProduct.categoryId,
        images: newProduct.images,
      };
      const response = await axios.post('http://localhost:5000/api/v1/products', productData);
      setProducts([...products, response.data]);
      setShowCreateModal(false);
      setNewProduct({ name: '', price: 0, stock: 0, status: 'In Stock', categoryId: '', images: [] });
      setCreateErrors({});
    } catch (error) {
      console.error('Error creating product:', error);
      setCreateErrors({ general: 'Failed to create product' });
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
      const response = await axios.put(`http://localhost:5000/api/v1/products/${editingProduct.id}`, productData);
      setProducts(products.map(p => (p.id === editingProduct.id ? response.data : p)));
      setShowEditModal(false);
      setEditingProduct(null);
      setEditErrors({});
    } catch (error) {
      console.error('Error updating product:', error);
      setEditErrors({ general: 'Failed to update product' });
    }
  };

  const handleDeleteProduct = async () => {
    if (!productToDelete) return;
    try {
      await axios.delete(`http://localhost:5000/api/v1/products/${productToDelete}`);
      setProducts(products.filter(p => p.id !== productToDelete));
      setShowDeleteModal(false);
      setProductToDelete(null);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  if (loading) return <div className="text-center py-8">Loading products...</div>;
  if (error) return <div className="text-red-600 text-center py-8">{error}</div>;

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedCategory === 'all' || product.categoryId === selectedCategory)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Products</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your product inventory</p>
        </div>
        <Button onClick={() => {
          setNewProduct({ name: '', price: 0, stock: 0, status: 'In Stock', categoryId: '', images: [] });
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
          <div className="p-4 sm:p-6 md:p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create New Product</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Product Name */}
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

              {/* Price */}
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

              {/* Stock */}
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

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={newProduct.status}
                  onChange={e => setNewProduct({ ...newProduct, status: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
                >
                  <option value="In Stock">In Stock</option>
                  <option value="LOW_STOCK">LOW_STOCK</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={newProduct.categoryId}
                  onChange={e => setNewProduct({ ...newProduct, categoryId: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
                {createErrors.categoryId && <p className="text-red-600 text-sm mt-1">{createErrors.categoryId}</p>}
              </div>

              {/* Image URL */}
              <div className="col-span-1 sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="text"
                  placeholder="Enter image URL"
                  value={newProduct.images[0] || ''}
                  onChange={e => setNewProduct({ ...newProduct, images: [e.target.value] })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
                />
              </div>
            </div>

            {/* General Error */}
            {createErrors.general && <p className="text-red-600 text-sm mt-4 text-center">{createErrors.general}</p>}

            {/* Submit Button */}
            <div className="mt-6 text-center">
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
                onChange={e => setEditingProduct({ ...editingProduct, status: e.target.value })}
                className="w-full p-2 border rounded-lg"
              >
                <option value="In Stock">In Stock</option>
                <option value="LOW_STOCK">LOW_STOCK</option>
                <option value="Out of Stock">Out of Stock</option>
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
                      className={`px-2 py-1 rounded-full text-xs font-medium ${value === 'In Stock'
                          ? 'bg-green-100 text-green-800'
                          : value === 'LOW_STOCK'
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