import React, { useEffect, useState } from 'react';
import { fetchTestimonials } from '../api';
import { FaQuoteLeft } from 'react-icons/fa';

const defaultAvatar = 'https://ui-avatars.com/api/?name=User&background=random';

const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTestimonials = async () => {
      setLoading(true);
      try {
        const res = await fetchTestimonials();
        setTestimonials(res.data || []);
      } catch (err) {
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };
    getTestimonials();
  }, []);

  return (
    <div className="relative w-full min-h-screen py-16 px-4 bg-gradient-to-br from-orange-100 via-yellow-50 to-pink-100">
      <h2 className="text-4xl font-bold text-center mb-12 text-primary drop-shadow-lg font-mono">
        User Testimonials
      </h2>
      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-primary mt-2">Loading testimonials...</p>
        </div>
      ) : testimonials.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-primary/80 text-lg">No testimonials yet. Be the first to share your experience!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((t, index) => (
            <div key={t._id || index} className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 flex flex-col justify-between items-center h-80 border border-orange-200 hover:scale-105 transition-transform duration-300">
              <div className="relative mb-4">
                <img
                  src={t.avatar || defaultAvatar}
                  alt={t.name || 'User'}
                  className="w-20 h-20 rounded-full object-cover border-4 border-orange-300 shadow-md"
                  onError={e => { e.target.src = defaultAvatar; }}
                />
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full p-2 shadow">
                  <FaQuoteLeft className="text-white text-sm" />
                </div>
              </div>
              <div className="text-lg font-bold text-primary mb-2 text-center font-mono">
                {t.name || 'Anonymous User'}
              </div>
              <div className="text-gray-700 text-center mb-3 italic flex-1 overflow-hidden">
                "{t.message || 'No message available'}"
              </div>
              <div className="text-gray-400 text-xs mt-auto">
                {t.date ? new Date(t.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : 'Recent'}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestimonialsPage; 