import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Navbar from '../../pages/Navbar';
import '../../../../styles/landing.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 flex flex-col">
      <Navbar showSearch={false} />
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-500 to-indigo-600 py-14 mb-10">
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 drop-shadow-lg">Contact Us</h1>
          <p className="text-lg md:text-xl text-indigo-100 font-medium max-w-2xl mb-2 drop-shadow">Have questions about adoption? Need help finding the perfect pet? We're here to help make your adoption journey smooth and successful.</p>
        </div>
      </div>

      <div className="max-w-5xl w-full mx-auto px-4 flex flex-col md:flex-row gap-10 mb-16">
        {/* Contact Form */}
        <div className="flex-1 bg-white/90 rounded-xl p-8 md:p-10 border border-indigo-100">
          <h2 className="text-2xl font-bold text-purple-700 mb-6">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2 border border-indigo-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 bg-purple-50/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-indigo-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 bg-purple-50/50"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="What's this about?"
                className="w-full px-4 py-2 border border-indigo-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 bg-purple-50/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-2 border border-indigo-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 bg-purple-50/50"
                placeholder="Tell us how we can help you..."
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 disabled:bg-purple-300 text-white font-semibold py-3 px-6 rounded-lg shadow transition-colors duration-200 flex items-center justify-center gap-2 text-lg"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sending...
                </div>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="flex-1 flex flex-col gap-8 justify-between">
          <div className="bg-white/90 rounded-xl p-8 border border-purple-100 flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">Contact Information</h2>
            <div className="flex items-start gap-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Mail className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Email</h3>
                <p className="text-gray-600">info@petadopt.com</p>
                <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-indigo-100 p-3 rounded-lg">
                <Phone className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Phone</h3>
                <p className="text-gray-600">+1 (555) 123-4567</p>
                <p className="text-sm text-gray-500">Mon-Fri: 9AM-6PM EST</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <MapPin className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Address</h3>
                <p className="text-gray-600">123 Pet Street<br />Animal City, AC 12345</p>
                <p className="text-sm text-gray-500">Visit by appointment only</p>
              </div>
            </div>
          </div>
          {/* FAQ Quick Links */}
          <div className="bg-gradient-to-r from-purple-50 to-indigo-100 rounded-xl p-6 flex flex-col gap-2">
            <h3 className="font-semibold text-gray-900 mb-2">Quick Help</h3>
            <p className="text-gray-700 text-sm mb-2">Looking for answers to common questions? Check out our FAQ section first.</p>
            <Link to="/faq" className="text-purple-600 hover:text-indigo-700 font-medium text-sm">View FAQ →</Link>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Contact;