import React, { useEffect, useState, useRef } from 'react';
import { fetchTestimonials } from '../api';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const defaultAvatar = 'https://ui-avatars.com/api/?name=User&background=random';

const TestimonialSlider = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef(null);

  useEffect(() => {
    const getTestimonials = async () => {
      setLoading(true);
      try {
        const res = await fetchTestimonials();
        console.log('API Response:', res);
        setTestimonials(res.data || []);
      } catch (err) {
        console.error('Error fetching testimonials:', err);
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };
    getTestimonials();
  }, []);
  
  console.log('Testimonials state:', testimonials);
  
  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        <p className="text-white mt-2">Loading testimonials...</p>
      </div>
    );
  }

  if (!testimonials || testimonials.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-white/80 text-lg">No testimonials yet. Be the first to share your experience!</p>
      </div>
    );
  }

  return (
    <div className="relative w-full py-16 px-0">
      {/* Full-width, subtle overlay for seamless background */}
      <div className="absolute inset-0 w-full h-full bg-orange-300 backdrop-blur-sm pointer-events-none z-0"></div>
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-white drop-shadow-lg font-mono">
          What Our Users Say
        </h2>
        <div className="relative">
          <Swiper
            ref={swiperRef}
            modules={[Pagination, Autoplay, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ 
              clickable: true,
              el: '.swiper-pagination',
              bulletClass: 'swiper-pagination-bullet',
              bulletActiveClass: 'swiper-pagination-bullet-active'
            }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="testimonial-swiper"
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
          >
            {testimonials.map((t, index) => (
              <SwiperSlide key={t._id || index}>
                <div className="bg-gray-900 backdrop-blur-md rounded-2xl shadow-2xl p-8 flex flex-col justify-between items-center h-[25rem] transition-all duration-500 hover:scale-105 hover:bg-white/20 border border-white/20">
                  <div className="relative mb-6">
                    <img
                      src={t.avatar || defaultAvatar}
                      alt={t.name || 'User'}
                      className="w-24 h-24 rounded-full object-cover border-4 border-white/30 shadow-lg"
                      onError={(e) => { 
                        console.log('Image error, using default');
                        e.target.src = defaultAvatar; 
                      }}
                    />
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full p-2 shadow-lg">
                      <FaQuoteLeft className="text-white text-sm" />
                    </div>
                  </div>
                  <div className="text-xl font-bold text-white mb-3 text-center drop-shadow-sm">
                    {t.name || 'Anonymous User'}
                  </div>
                  <div className="text-white/95 text-center mb-4 italic leading-relaxed text-lg flex-1 drop-shadow-sm overflow-hidden">
                    "{t.message || 'No message available'}"
                  </div>
                  <div className="text-white/70 text-sm mt-auto drop-shadow-sm">
                    {t.date ? new Date(t.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) : 'Recent'}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Pagination */}
          <div className="swiper-pagination mt-8"></div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider; 