import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';

const imageMap = {
  pizza: '/img/thumbnail/mpizza.png',
  burgers: '/img/thumbnail/bc-burger.png',
  sushi: '/img/thumbnail/c-roll.png',
  pasta: '/img/thumbnail/pasta.png'
};

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await fetch(`/api/products/${slug}/restaurants`);
        if (!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();
        setRestaurants(data.offeredBy);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [slug]);

  return (
    <div className="min-h-screen bg-[#F7F7F2] px-4 py-10 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl w-full bg-white p-6 rounded-2xl shadow-md"
      >
        <h1 className="text-3xl font-bold text-center text-[#FF6B35] capitalize mb-4">
          {slug}
        </h1>

        {imageMap[slug] && (
          <img
            src={imageMap[slug]}
            alt={slug}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
        )}

        <p className="text-gray-700 text-lg text-center mb-6">
          Explore who offers delicious <span className="capitalize font-semibold">{slug}</span> near you.
        </p>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : restaurants.length === 0 ? (
          <p className="text-center text-gray-500">No restaurants currently offer this item.</p>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-2">Offered by:</h2>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              {restaurants.map((name, idx) => (
                <li key={idx}>{name}</li>
              ))}
            </ul>
          </>
        )}

        <div className="text-center mt-6">
          <motion.button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm text-gray-600 underline hover:text-[#FF6B35]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowLeft /> Go Back
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductDetail;
