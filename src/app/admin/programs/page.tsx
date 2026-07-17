'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Save, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface Program {
  id: string;
  title: string;
  slug: string;
  description: string;
  duration: string;
  requirements: string;
  learningOutcomes: string;
  image: string;
  order: number;
  isActive: boolean;
}

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    duration: '',
    requirements: '',
    learningOutcomes: '',
    image: '',
    order: 0,
    isActive: true,
  });

  const fetchPrograms = async () => {
    try {
      const res = await fetch('/api/programs');
      const data = await res.json();
      setPrograms(Array.isArray(data) ? data : []);
    } catch {
      toast.error('Failed to fetch programs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingProgram
        ? `/api/admin/programs/${editingProgram.id}`
        : '/api/programs';
      const method = editingProgram ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success(editingProgram ? 'Program updated' : 'Program created');
        setShowModal(false);
        setEditingProgram(null);
        resetForm();
        fetchPrograms();
      } else {
        toast.error('Failed to save program');
      }
    } catch {
      toast.error('An error occurred');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/programs/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Program deleted');
        setShowDeleteConfirm(null);
        fetchPrograms();
      } else {
        toast.error('Failed to delete program');
      }
    } catch {
      toast.error('An error occurred');
    }
  };

  const handleEdit = (program: Program) => {
    setEditingProgram(program);
    setFormData({
      title: program.title,
      slug: program.slug,
      description: program.description,
      duration: program.duration,
      requirements: program.requirements,
      learningOutcomes: program.learningOutcomes,
      image: program.image,
      order: program.order,
      isActive: program.isActive,
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      description: '',
      duration: '',
      requirements: '',
      learningOutcomes: '',
      image: '',
      order: 0,
      isActive: true,
    });
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
        <h1 className="text-2xl font-bold text-gray-900">Programs</h1>
        <button
          onClick={() => { resetForm(); setEditingProgram(null); setShowModal(true); }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Add Program
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {programs.map((program, index) => (
              <tr key={program.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {program.image ? (
                    <img src={program.image} alt={program.title} className="w-12 h-12 rounded-lg object-cover" />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center text-gray-400 text-xs">No img</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{program.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{program.duration}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    program.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {program.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => handleEdit(program)} className="text-blue-600 hover:text-blue-900 p-1 rounded">
                      <Pencil size={18} />
                    </button>
                    <button onClick={() => setShowDeleteConfirm(program.id)} className="text-red-600 hover:text-red-900 p-1 rounded">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">{editingProgram ? 'Edit Program' : 'Add Program'}</h2>
              <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-100 rounded"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg px-3 py-2 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                <input type="text" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg px-3 py-2 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg px-3 py-2 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" rows={3} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <input type="text" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg px-3 py-2 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. 3 months" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Program Image</label>
                  {formData.image ? (
                    <div className="relative">
                      <img src={formData.image} alt="Preview" className="w-full h-32 object-cover rounded-lg border border-gray-200" />
                      <button type="button" onClick={() => setFormData({ ...formData, image: '' })} className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700">
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-colors">
                      <Plus className="w-8 h-8 text-gray-400 mb-1" />
                      <span className="text-sm text-gray-500">Upload Image</span>
                      <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                        const file = e.target.files?.[0]; if (!file) return;
                        const fd = new FormData(); fd.append('file', file);
                        try {
                          const res = await fetch('/api/upload', { method: 'POST', body: fd });
                          const data = await res.json();
                          if (data.url) { setFormData({ ...formData, image: data.url }); toast.success('Image uploaded'); }
                          else toast.error('Upload failed');
                        } catch { toast.error('Upload failed'); }
                      }} />
                    </label>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Requirements</label>
                <textarea value={formData.requirements} onChange={(e) => setFormData({ ...formData, requirements: e.target.value })} className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg px-3 py-2 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" rows={3} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Learning Outcomes</label>
                <textarea value={formData.learningOutcomes} onChange={(e) => setFormData({ ...formData, learningOutcomes: e.target.value })} className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg px-3 py-2 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" rows={3} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                  <input type="number" value={String(formData.order)} onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })} className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg px-3 py-2 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div className="flex items-center pt-6">
                  <input type="checkbox" id="isActive" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                  <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">Active</label>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Cancel</button>
                <button type="submit" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Save size={18} />
                  {editingProgram ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
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
              <h2 className="text-lg font-semibold">Delete Program</h2>
            </div>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this program? This action cannot be undone.</p>
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
