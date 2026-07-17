'use client';

import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import toast from 'react-hot-toast';

interface Setting {
  id: string;
  key: string;
  value: string;
}

export default function ContactPageEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [heroData, setHeroData] = useState({
    heroTitle: '',
    heroSubtitle: '',
  });

  const [infoData, setInfoData] = useState({
    description: '',
    mapEmbed: '',
  });

  const [formData, setFormData] = useState({
    formTitle: '',
    formDescription: '',
  });

  const fetchData = async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      const v = (key: string) => data.find((s: Setting) => s.key === key)?.value || '';

      setHeroData({
        heroTitle: v('contact_hero_title'),
        heroSubtitle: v('contact_hero_subtitle'),
      });
      setInfoData({
        description: v('contact_info_description'),
        mapEmbed: v('contact_map_embed'),
      });
      setFormData({
        formTitle: v('contact_form_title'),
        formDescription: v('contact_form_description'),
      });
    } catch {
      toast.error('Failed to load page data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSave = async (mapped: Record<string, string>) => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/settings/bulk', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          settings: Object.entries(mapped).map(([key, value]) => ({ key, value })),
        }),
      });
      if (res.ok) { toast.success('Saved'); fetchData(); }
      else toast.error('Failed to save');
    } catch {
      toast.error('An error occurred');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>;
  }

  const inputClass = "w-full border border-gray-300 bg-white text-gray-900 rounded-lg px-3 py-2 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Contact Page</h1>

      {/* Hero Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Hero Section</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input type="text" value={heroData.heroTitle} onChange={(e) => setHeroData({ ...heroData, heroTitle: e.target.value })} className={inputClass} placeholder="e.g. Get In Touch" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
            <textarea value={heroData.heroSubtitle} onChange={(e) => setHeroData({ ...heroData, heroSubtitle: e.target.value })} className={inputClass} rows={2} />
          </div>
          <button onClick={() => handleSave({
            contact_hero_title: heroData.heroTitle,
            contact_hero_subtitle: heroData.heroSubtitle,
          })} disabled={saving} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
            <Save size={18} /> {saving ? 'Saving...' : 'Save Hero'}
          </button>
        </div>
      </div>

      {/* Contact Info Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information Section</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea value={infoData.description} onChange={(e) => setInfoData({ ...infoData, description: e.target.value })} className={inputClass} rows={3} placeholder="Text shown in the contact info area" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Google Maps Embed Code</label>
            <textarea value={infoData.mapEmbed} onChange={(e) => setInfoData({ ...infoData, mapEmbed: e.target.value })} className={inputClass} rows={4} placeholder="Paste Google Maps iframe embed code here" />
            {infoData.mapEmbed && (
              <div className="mt-2 rounded-lg overflow-hidden border border-gray-200">
                <div dangerouslySetInnerHTML={{ __html: infoData.mapEmbed }} className="w-full h-64" />
              </div>
            )}
          </div>
          <button onClick={() => handleSave({
            contact_info_description: infoData.description,
            contact_map_embed: infoData.mapEmbed,
          })} disabled={saving} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
            <Save size={18} /> {saving ? 'Saving...' : 'Save Contact Info'}
          </button>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Form Section</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Form Title</label>
            <input type="text" value={formData.formTitle} onChange={(e) => setFormData({ ...formData, formTitle: e.target.value })} className={inputClass} placeholder="e.g. Send Us a Message" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Form Description</label>
            <textarea value={formData.formDescription} onChange={(e) => setFormData({ ...formData, formDescription: e.target.value })} className={inputClass} rows={2} />
          </div>
          <button onClick={() => handleSave({
            contact_form_title: formData.formTitle,
            contact_form_description: formData.formDescription,
          })} disabled={saving} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
            <Save size={18} /> {saving ? 'Saving...' : 'Save Form Settings'}
          </button>
        </div>
      </div>
    </div>
  );
}
