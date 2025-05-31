'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Plus, Search, Filter, Edit, Trash2, Copy } from 'lucide-react';
import Button from '@/components/ui/Button';
import AdminTable from '@/components/admin/Table';
import Image from 'next/image';
import axios from 'axios';  // Import axios for making API requests

const ProductsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    stock: 0,
    status: 'In Stock',
    categoryId: 'face-care',  // default category
    images: []
  });

  useEffect(() => {
    // Fetch all products from the API
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/api/products');
        setProducts(response.data as any[]);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleCreateProduct = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/v1/api/products', newProduct);
      setProducts([...products, response.data]);
      setShowCreateForm(false);
      setNewProduct({
        name: '',
        price: 0,
        stock: 0,
        status: 'In Stock',
        categoryId: 'face-care',
        images: []
      });
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/api/products/${id}`);
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleUpdateProduct = async (id, updatedProduct) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/v1/api/products/${id}`, updatedProduct);
      setProducts(products.map(product => (product.id === id ? response.data : product)));
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Products</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your product inventory
          </p>
        </div>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="w-5 h-5 mr-2" />
          Add Product
        </Button>
      </div>

      {showCreateForm && (
        <div className="bg-white dark:bg-card rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Create New Product</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
              className="w-full p-2 border rounded-lg"
            />
            <input
              type="number"
              placeholder="Stock"
              value={newProduct.stock}
              onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })}
              className="w-full p-2 border rounded-lg"
            />
            <select
              value={newProduct.status}
              onChange={(e) => setNewProduct({ ...newProduct, status: e.target.value })}
              className="w-full p-2 border rounded-lg"
            >
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
            <input
              type="text"
              placeholder="Category (e.g., face-care)"
              value={newProduct.categoryId}
              onChange={(e) => setNewProduct({ ...newProduct, categoryId: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={newProduct.images[0] || ''}
              onChange={(e) => setNewProduct({ ...newProduct, images: [e.target.value] })}
              className="w-full p-2 border rounded-lg"
            />
            <Button onClick={handleCreateProduct}>Create Product</Button>
          </div>
        </div>
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
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="flex items-center gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Categories</option>
                <option value="face-care">Face Care</option>
                <option value="body-care">Body Care</option>
                <option value="hair-care">Hair Care</option>
              </select>
              <Button variant="outline">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          <AdminTable
            data={products.filter(product => 
              product.name.toLowerCase().includes(searchQuery.toLowerCase())
              && (selectedCategory === 'all' || product.categoryId === selectedCategory)
            )}
            columns={[
              {
                header: 'Product',
                accessor: 'name',
                cell: (value) => {
                  const product = products.find((p) => p.name === value);
                  return (
                    <div className="flex items-center">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden mr-3">
                        <Image
                          src={product?.images[0]?.url || ''}
                          alt={value}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{value}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {product?.categoryId}
                        </div>
                      </div>
                    </div>
                  );
                },
              },
              {
                header: 'Price',
                accessor: 'price',
                cell: (value) => `$${value.toFixed(2)}`,
              },
              { header: 'Stock', accessor: 'stock' },
              {
                header: 'Status',
                accessor: 'status',
                cell: (value) => (
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    value === 'In Stock'
                      ? 'bg-green-100 text-green-800'
                      : value === 'Low Stock'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {value}
                  </span>
                ),
              },
              {
                header: 'Actions',
                accessor: 'id',
                cell: (id) => (
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => alert('Edit functionality')}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteProduct(id)}>
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
};

export default ProductsPage;



































// 'use client';

// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Package, Plus, Search, Filter, Edit, Trash2, Copy } from 'lucide-react';
// import Button from '@/components/ui/Button';
// import AdminTable from '@/components/admin/Table';
// import Image from 'next/image';

// const products = [
//   {
//     id: 1,
//     name: 'Natural Face Serum',
//     image: 'https://images.pexels.com/photos/3762875/pexels-photo-3762875.jpeg',
//     category: 'Face Care',
//     price: 29.99,
//     stock: 45,
//     status: 'In Stock',
//   },
//   {
//     id: 2,
//     name: 'Hydrating Cream',
//     image: 'https://images.pexels.com/photos/3997373/pexels-photo-3997373.jpeg',
//     category: 'Face Care',
//     price: 24.99,
//     stock: 12,
//     status: 'Low Stock',
//   },
//   {
//     id: 3,
//     name: 'Vitamin C Toner',
//     image: 'https://images.pexels.com/photos/6621462/pexels-photo-6621462.jpeg',
//     category: 'Face Care',
//     price: 19.99,
//     stock: 0,
//     status: 'Out of Stock',
//   },
// ];

// export default function ProductsPage() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-semibold">Products</h1>
//           <p className="text-gray-600 dark:text-gray-400">
//             Manage your product inventory
//           </p>
//         </div>
//         <Button>
//           <Plus className="w-5 h-5 mr-2" />
//           Add Product
//         </Button>
//       </div>

//       <div className="bg-white dark:bg-card rounded-xl shadow-sm">
//         <div className="p-6">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
//               />
//             </div>
//             <div className="flex items-center gap-4">
//               <select
//                 value={selectedCategory}
//                 onChange={(e) => setSelectedCategory(e.target.value)}
//                 className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
//               >
//                 <option value="all">All Categories</option>
//                 <option value="face-care">Face Care</option>
//                 <option value="body-care">Body Care</option>
//                 <option value="hair-care">Hair Care</option>
//               </select>
//               <Button variant="outline">
//                 <Filter className="w-5 h-5 mr-2" />
//                 Filters
//               </Button>
//             </div>
//           </div>

//           <AdminTable
//             data={products}
//             columns={[
//               {
//                 header: 'Product',
//                 accessor: 'name',
//                 cell: (value) => {
//                   const product = products.find((p) => p.name === value);
//                   return (
//                     <div className="flex items-center">
//                       <div className="relative w-12 h-12 rounded-lg overflow-hidden mr-3">
//                         <Image
//                           src={product?.image || ''}
//                           alt={value}
//                           fill
//                           className="object-cover"
//                         />
//                       </div>
//                       <div>
//                         <div className="font-medium">{value}</div>
//                         <div className="text-sm text-gray-500 dark:text-gray-400">
//                           {product?.category}
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 },
//               },
//               {
//                 header: 'Price',
//                 accessor: 'price',
//                 cell: (value) => `$${value.toFixed(2)}`,
//               },
//               { header: 'Stock', accessor: 'stock' },
//               {
//                 header: 'Status',
//                 accessor: 'status',
//                 cell: (value) => (
//                   <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                     value === 'In Stock'
//                       ? 'bg-green-100 text-green-800'
//                       : value === 'Low Stock'
//                       ? 'bg-yellow-100 text-yellow-800'
//                       : 'bg-red-100 text-red-800'
//                   }`}>
//                     {value}
//                   </span>
//                 ),
//               },
//               {
//                 header: 'Actions',
//                 accessor: 'id',
//                 cell: () => (
//                   <div className="flex items-center gap-2">
//                     <Button variant="ghost" size="sm">
//                       <Edit className="w-4 h-4" />
//                     </Button>
//                     <Button variant="ghost" size="sm">
//                       <Copy className="w-4 h-4" />
//                     </Button>
//                     <Button variant="ghost" size="sm">
//                       <Trash2 className="w-4 h-4 text-error-600" />
//                     </Button>
//                   </div>
//                 ),
//               },
//             ]}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }