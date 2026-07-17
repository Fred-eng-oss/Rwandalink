'use client';

import { useState, useEffect } from 'react';
import { Trash2, X, Eye, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface Registration {
  id: string;
  fullName: string;
  gender: string;
  dateOfBirth: string;
  email: string;
  phoneNumber: string;
  address: string;
  programId: string;
  passportPhoto: string;
  status: string;
  createdAt: string;
}

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [showDetail, setShowDetail] = useState<Registration | null>(null);

  const fetchRegistrations = async () => {
    try {
      const res = await fetch('/api/registrations');
      if (!res.ok) {
        const altRes = await fetch('/api/admin/registrations');
        const data = await altRes.json();
        setRegistrations(Array.isArray(data) ? data : []);
      } else {
        const data = await res.json();
        setRegistrations(Array.isArray(data) ? data : []);
      }
    } catch {
      toast.error('Failed to fetch registrations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/registrations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        toast.success('Status updated');
        setRegistrations(registrations.map(r => r.id === id ? { ...r, status } : r));
      } else {
        toast.error('Failed to update status');
      }
    } catch {
      toast.error('An error occurred');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/registrations/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Registration deleted');
        setShowDeleteConfirm(null);
        fetchRegistrations();
      } else {
        toast.error('Failed to delete registration');
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
        <h1 className="text-2xl font-bold text-gray-900">Registrations</h1>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {registrations.map((reg, index) => (
              <tr key={reg.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{reg.fullName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reg.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reg.phoneNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reg.programId}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={reg.status}
                    onChange={(e) => handleStatusChange(reg.id, e.target.value)}
                    className={`text-xs font-medium px-2 py-1 rounded-full border-0 focus:ring-2 focus:ring-blue-500 ${
                      reg.status === 'approved' ? 'bg-green-100 text-green-800' :
                      reg.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => setShowDetail(reg)} className="text-blue-600 hover:text-blue-900 p-1 rounded"><Eye size={18} /></button>
                    <button onClick={() => setShowDeleteConfirm(reg.id)} className="text-red-600 hover:text-red-900 p-1 rounded"><Trash2 size={18} /></button>
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
              <h2 className="text-lg font-semibold">Registration Details</h2>
              <button onClick={() => setShowDetail(null)} className="p-1 hover:bg-gray-100 rounded"><X size={20} /></button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Name:</span><span className="font-medium">{showDetail.fullName}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Gender:</span><span className="font-medium">{showDetail.gender}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Date of Birth:</span><span className="font-medium">{showDetail.dateOfBirth}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Email:</span><span className="font-medium">{showDetail.email}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Phone:</span><span className="font-medium">{showDetail.phoneNumber}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Address:</span><span className="font-medium">{showDetail.address}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Program ID:</span><span className="font-medium">{showDetail.programId}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Status:</span><span className="font-medium">{showDetail.status}</span></div>
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
              <h2 className="text-lg font-semibold">Delete Registration</h2>
            </div>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this registration? This action cannot be undone.</p>
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
