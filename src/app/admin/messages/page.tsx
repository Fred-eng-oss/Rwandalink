'use client';

import { useState, useEffect } from 'react';
import { Trash2, X, Eye, AlertCircle, Mail, MailOpen } from 'lucide-react';
import toast from 'react-hot-toast';

interface Message {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [showDetail, setShowDetail] = useState<Message | null>(null);

  const fetchMessages = async () => {
    try {
      let res = await fetch('/api/messages');
      if (!res.ok) {
        res = await fetch('/api/admin/messages');
      }
      const data = await res.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch {
      toast.error('Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const markAsRead = async (id: string) => {
    try {
      await fetch(`/api/admin/messages/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead: true }),
      });
      setMessages(messages.map(m => m.id === id ? { ...m, isRead: true } : m));
    } catch {
      // silent
    }
  };

  const handleView = (msg: Message) => {
    setShowDetail(msg);
    if (!msg.isRead) {
      markAsRead(msg.id);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/messages/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Message deleted');
        setShowDeleteConfirm(null);
        fetchMessages();
      } else {
        toast.error('Failed to delete message');
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
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        <span className="text-sm text-gray-500">{messages.filter(m => !m.isRead).length} unread</span>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {messages.map((msg) => (
              <tr key={msg.id} className={!msg.isRead ? 'bg-blue-50' : 'bg-white'}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {msg.isRead ? (
                    <MailOpen size={18} className="text-gray-400" />
                  ) : (
                    <Mail size={18} className="text-blue-600" />
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{msg.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{msg.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{msg.subject}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(msg.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => handleView(msg)} className="text-blue-600 hover:text-blue-900 p-1 rounded"><Eye size={18} /></button>
                    <button onClick={() => setShowDeleteConfirm(msg.id)} className="text-red-600 hover:text-red-900 p-1 rounded"><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {messages.length === 0 && (
          <div className="text-center py-12 text-gray-500">No messages yet.</div>
        )}
      </div>

      {showDetail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Message from {showDetail.name}</h2>
              <button onClick={() => setShowDetail(null)} className="p-1 hover:bg-gray-100 rounded"><X size={20} /></button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Name:</span><span className="font-medium">{showDetail.name}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Email:</span><span className="font-medium">{showDetail.email}</span></div>
              {showDetail.phone && <div className="flex justify-between"><span className="text-gray-500">Phone:</span><span className="font-medium">{showDetail.phone}</span></div>}
              <div className="flex justify-between"><span className="text-gray-500">Subject:</span><span className="font-medium">{showDetail.subject}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Date:</span><span className="font-medium">{new Date(showDetail.createdAt).toLocaleString()}</span></div>
              <div className="pt-3 border-t">
                <span className="text-gray-500 text-sm">Message:</span>
                <p className="mt-2 text-sm text-gray-700 whitespace-pre-wrap">{showDetail.message}</p>
              </div>
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
              <h2 className="text-lg font-semibold">Delete Message</h2>
            </div>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this message? This action cannot be undone.</p>
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
