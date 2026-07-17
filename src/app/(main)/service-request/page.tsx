'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Send, Loader2, CheckCircle, Building2, User, Mail, Phone, FileText, DollarSign, Calendar } from 'lucide-react';
import { toast } from 'sonner';

const serviceRequestSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  companyName: z.string().min(2, 'Company name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  serviceId: z.string().min(1, 'Please select a service'),
  projectDescription: z.string().min(20, 'Please provide a detailed description (min 20 characters)'),
  budget: z.string().min(1, 'Please select a budget range'),
  preferredDate: z.string().min(1, 'Please select a preferred date'),
});

type ServiceRequestFormData = z.infer<typeof serviceRequestSchema>;

interface Service {
  id: string;
  title: string;
  description: string;
}

const budgetRanges = [
  'Under 500,000 RWF',
  '500,000 - 1,000,000 RWF',
  '1,000,000 - 5,000,000 RWF',
  '5,000,000 - 10,000,000 RWF',
  '10,000,000 - 50,000,000 RWF',
  'Above 50,000,000 RWF',
];

export default function ServiceRequestPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [services, setServices] = useState<Service[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ServiceRequestFormData>({
    resolver: zodResolver(serviceRequestSchema),
  });

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => setServices(Array.isArray(data) ? data : data.services || []))
      .catch(() => toast.error('Failed to load services'));
  }, []);

  const onSubmit = async (data: ServiceRequestFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/service-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Submission failed');

      setIsSuccess(true);
      reset();
      toast.success('Service request submitted successfully!');
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <section className="relative py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-purple-900">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Service Request</h1>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">Professional ICT solutions for your business</p>
          </div>
        </section>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto px-4 py-20 text-center"
        >
          <div className="bg-white rounded-3xl shadow-xl p-12">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Request Submitted!</h2>
            <p className="text-gray-600 mb-8">Thank you for your interest in our services. Our team will review your request and get back to you within 24 hours.</p>
            <button onClick={() => setIsSuccess(false)} className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors">
              Submit Another Request
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <section className="relative py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-purple-900">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Service Request</h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">Tell us about your project and we will provide the best ICT solution</p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-1" /> Full Name
              </label>
              <input
                {...register('fullName')}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your full name"
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Building2 className="w-4 h-4 inline mr-1" /> Company Name
              </label>
              <input
                {...register('companyName')}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Your company name"
              />
              {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-1" /> Email
              </label>
              <input
                type="email"
                {...register('email')}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="your@email.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline mr-1" /> Phone
              </label>
              <input
                type="tel"
                {...register('phone')}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="07XXXXXXXX"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
            </div>

            {/* Service Selection */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <FileText className="w-4 h-4 inline mr-1" /> Service Selection
              </label>
              <select
                {...register('serviceId')}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">Select a Service</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.title}
                  </option>
                ))}
              </select>
              {errors.serviceId && <p className="text-red-500 text-sm mt-1">{errors.serviceId.message}</p>}
            </div>

            {/* Project Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Project Description</label>
              <textarea
                {...register('projectDescription')}
                rows={5}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="Describe your project requirements, goals, and any specific details..."
              />
              {errors.projectDescription && <p className="text-red-500 text-sm mt-1">{errors.projectDescription.message}</p>}
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <DollarSign className="w-4 h-4 inline mr-1" /> Budget Range
              </label>
              <select
                {...register('budget')}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">Select Budget Range</option>
                {budgetRanges.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
              {errors.budget && <p className="text-red-500 text-sm mt-1">{errors.budget.message}</p>}
            </div>

            {/* Preferred Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" /> Preferred Date
              </label>
              <input
                type="date"
                {...register('preferredDate')}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              {errors.preferredDate && <p className="text-red-500 text-sm mt-1">{errors.preferredDate.message}</p>}
            </div>
          </div>

          <div className="mt-10">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Submitting...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" /> Submit Request
                </>
              )}
            </button>
          </div>
        </motion.form>
      </section>
    </div>
  );
}
