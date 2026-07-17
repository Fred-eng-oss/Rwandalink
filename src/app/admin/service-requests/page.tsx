'use client';

import { useState, useEffect } from 'react';
import { Trash2, X, Eye, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface ServiceRequest {
  id: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  serviceId: string;
  projectDescription: string;
  budget: string;
  preferredDate: string;
  status: string;
  createdAt: string;
}

export default function ServiceRequestsPage() {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [showDetail, setShowDetail] = useState<ServiceRequest | null>(null);

  const fetchRequests = async () => {
    try {
      let res = await fetch('/api/service-requests');
      if (!res.ok) {
        res = await fetch('/api/admin/service-requests');
      }
      const data = await res.json();
      setRequests(Array.isArray(data) ? data : []);
    } catch {
      toast.error('Failed to fetch service requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/service-requests/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        toast.success('Status updated');
        setRequests(requests.map(r => r.id === id ? { ...r, status } : r));
      } else {
        toast.error('Failed to update status');
      }
    } catch {
      toast.error('An error occurred');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/service-requests/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Service request deleted');
        setShowDeleteConfirm(null);
        fetchRequests();
      } else {
        toast.error('Failed to delete');
      }
    } catch {
      toast.error('An error occurred');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Service Requests</h1>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {requests.map((req, index) => (
              <tr key={req.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{req.fullName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{req.companyName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{req.serviceId}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={req.status}
                    onChange={(e) => handleStatusChange(req.id, e.target.value)}
                    className={`text-xs font-medium px-2 py-1 rounded-full border-0 focus:ring-2 focus:ring-blue-500 ${
                      req.status === 'completed' ? 'bg-green-100 text-green-800' :
                      req.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                      req.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => setShowDetail(req)} className="text-blue-600 hover:text-blue-900 p-1 rounded"><Eye size={18} /></button>
                    <button onClick={() => setShowDeleteConfirm(req.id)} className="text-red-600 hover:text-red-900 p-1 rounded"><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showDetail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Service Request Details</h2>
              <button onClick={() => setShowDetail(null)} className="p-1 hover:bg-gray-100 rounded"><X size={20} /></button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Name:</span><span className="font-medium">{showDetail.fullName}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Company:</span><span className="font-medium">{showDetail.companyName}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Email:</span><span className="font-medium">{showDetail.email}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Phone:</span><span className="font-medium">{showDetail.phone}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Service ID:</span><span className="font-medium">{showDetail.serviceId}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Budget:</span><span className="font-medium">{showDetail.budget}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Preferred Date:</span><span className="font-medium">{showDetail.preferredDate}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Status:</span><span className="font-medium">{showDetail.status}</span></div>
              <div className="pt-2 border-t">
                <span className="text-gray-500 text-sm">Project Description:</span>
                <p className="mt-1 text-sm text-gray-700">{showDetail.projectDescription}</p>
              </div>
              <div className="flex justify-between"><span className="text-gray-500">Created:</span><span className="font-medium">{new Date(showDetail.createdAt).toLocaleDateString()}</span></div>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-red-100 rounded-full">
                <AlertCircle className="text-red-600" size={20} />
              </div>
              <h2 className="text-lg font-semibold">Delete Service Request</h2>
            </div>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this service request? This action cannot be undone.</p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowDeleteConfirm(null)} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Cancel</button>
              <button onClick={() => handleDelete(showDeleteConfirm)} className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                <Trash2 size={18} />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
