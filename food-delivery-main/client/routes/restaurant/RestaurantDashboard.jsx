import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const RestaurantDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    image: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/restaurant/products');
      // Ensure we're setting an array, even if empty
      setProducts(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
      setProducts([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  async function checkLoginStatus() {
    try {
        const response = await fetch('/api/auth');
        if (!response.ok) {
            navigate('/login');
        }
    } catch (error) {
        console.error('Error checking login status:', error);
    }
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`/api/restaurant/products/${editingId}`, formData);
        toast.success('Product updated successfully');
      } else {
        await axios.post('/api/restaurant/products', formData);
        toast.success('Product added successfully');
      }
      setFormData({
        name: '',
        price: '',
        description: '',
        category: '',
        image: ''
      });
      setIsEditing(false);
      setEditingId(null);
      fetchProducts();
    } catch (error) {
      console.error('Error submitting product:', error);
      toast.error(isEditing ? 'Failed to update product' : 'Failed to add product');
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout');
      toast.success('Logged out successfully');
      navigate('/restaurant/login');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Failed to logout');
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image
    });
    setIsEditing(true);
    setEditingId(product._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`/api/restaurant/products/${id}`);
        toast.success('Product deleted successfully');
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
        toast.error('Failed to delete product');
      }
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Restaurant Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </div>
      
      {/* Product Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? 'Edit Product' : 'Add New Product'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Product Name"
              className="border rounded-md p-2"
              required
            />
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Price"
              className="border rounded-md p-2"
              required
            />
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              placeholder="Category"
              className="border rounded-md p-2"
              required
            />
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              placeholder="Image URL"
              className="border rounded-md p-2"
            />
          </div>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="border rounded-md p-2 w-full"
            rows="3"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            {isEditing ? 'Update Product' : 'Add Product'}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={() => {
                setFormData({
                  name: '',
                  price: '',
                  description: '',
                  category: '',
                  image: ''
                });
                setIsEditing(false);
                setEditingId(null);
              }}
              className="ml-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* Products List */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Products</h2>
        {loading ? (
          <div className="text-center py-4">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-4 text-gray-500">No products found. Add your first product above!</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
              >
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                )}
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{product.category}</p>
                <p className="text-gray-800 mb-2">${product.price}</p>
                <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantDashboard;
