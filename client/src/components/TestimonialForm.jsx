import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitTestimonial } from '../api';
import { FaUserCircle, FaSmile, FaPaperPlane } from 'react-icons/fa';

const TestimonialForm = ({ onSuccess }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [avatar, setAvatar] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      if (!name.trim() || !message.trim()) {
        setError('Name and message are required.');
        setLoading(false);
        return;
      }
      await submitTestimonial({ name, message, avatar });
      setSuccess(true);
      setName('');
      setMessage('');
      setAvatar('');
      if (onSuccess) onSuccess();
      // Navigate to home page after successful submission
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      setError('Failed to submit testimonial.');
    } finally {
      setLoading(false);
    }
  };

  const avatarPreview = avatar
    ? avatar
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'User')}&background=random`;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-orange-100 via-yellow-50 to-pink-100 py-10">
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-xl bg-white/90 rounded-3xl shadow-2xl px-8 pt-16 pb-10 flex flex-col items-center animate-fade-in"
        style={{ boxShadow: '0 8px 32px 0 rgba(255,140,0,0.15)' }}
      >
        {/* Floating Avatar */}
        <div className="absolute -top-14 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="rounded-full border-4 border-primary shadow-lg bg-white w-28 h-28 flex items-center justify-center overflow-hidden animate-pop-in">
            {avatar ? (
              <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              <FaUserCircle className="text-gray-300 w-full h-full" />
            )}
          </div>
          {/* <span className="text-xs text-gray-400 mt-1">Avatar Preview</span> */}
        </div>
        <h2 className="text-3xl font-extrabold mb-2 text-center text-primary mt-8 flex items-center gap-2">
          <FaSmile className="text-yellow-400" /> Share Your Experience
        </h2>
        <p className="text-center text-gray-500 mb-4">We love to hear from you! Your feedback helps us grow 🌟</p>
        {error && <div className="text-red-500 text-center font-semibold mb-2 animate-shake">{error}</div>}
        {success && <div className="text-green-600 text-center font-semibold mb-2 animate-fade-in">Thank you for your feedback!</div>}
        <div className="w-full mb-3">
          <label className="block font-semibold mb-1 text-primary">Name*</label>
          <input
            type="text"
            className="w-full border-2 border-primary/30 focus:border-primary rounded-xl px-4 py-2 bg-orange-50 focus:bg-white transition-all duration-200 shadow-sm"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            placeholder="Your Name"
          />
        </div>
        <div className="w-full mb-3">
          <label className="block font-semibold mb-1 text-primary">Your Experience*</label>
          <textarea
            className="w-full border-2 border-primary/30 focus:border-primary rounded-xl px-4 py-2 bg-orange-50 focus:bg-white transition-all duration-200 shadow-sm min-h-[90px] resize-none"
            value={message}
            onChange={e => setMessage(e.target.value)}
            required
            placeholder="Share your thoughts..."
          />
        </div>
        <div className="w-full mb-6">
          <label className="block font-semibold mb-1 text-primary">Avatar URL (optional)</label>
          <input
            type="url"
            className="w-full border-2 border-primary/30 focus:border-primary rounded-xl px-4 py-2 bg-orange-50 focus:bg-white transition-all duration-200 shadow-sm"
            value={avatar}
            onChange={e => setAvatar(e.target.value)}
            placeholder="https://your-photo-url.com/avatar.jpg"
          />
        </div>
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-400 via-pink-400 to-yellow-400 text-white font-bold py-3 rounded-xl shadow-lg hover:scale-105 hover:from-orange-500 hover:to-yellow-500 transition-all duration-200 disabled:opacity-60 text-lg"
          disabled={loading}
        >
          <FaPaperPlane className="text-white text-xl" />
          {loading ? 'Submitting...' : 'Submit Testimonial'}
        </button>
      </form>
    </div>
  );
};

export default TestimonialForm; 