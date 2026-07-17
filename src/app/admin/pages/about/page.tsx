'use client';

import { useState, useEffect } from 'react';
import { Save, Upload, X } from 'lucide-react';
import toast from 'react-hot-toast';

interface Setting {
  id: string;
  key: string;
  value: string;
}

export default function AboutPageEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [overviewData, setOverviewData] = useState({
    title: '',
    subtitle: '',
    description: '',
    image: '',
  });

  const [missionData, setMissionData] = useState({
    missionTitle: '',
    missionDescription: '',
    visionTitle: '',
    visionDescription: '',
  });

  const [valuesData, setValuesData] = useState({
    value1Title: '', value1Desc: '',
    value2Title: '', value2Desc: '',
    value3Title: '', value3Desc: '',
    value4Title: '', value4Desc: '',
    value5Title: '', value5Desc: '',
    value6Title: '', value6Desc: '',
  });

  const fetchData = async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      const v = (key: string) => data.find((s: Setting) => s.key === key)?.value || '';

      setOverviewData({
        title: v('about_overview_title'),
        subtitle: v('about_overview_subtitle'),
        description: v('about_overview_description'),
        image: v('about_overview_image'),
      });
      setMissionData({
        missionTitle: v('about_mission_title'),
        missionDescription: v('about_mission_description'),
        visionTitle: v('about_vision_title'),
        visionDescription: v('about_vision_description'),
      });
      setValuesData({
        value1Title: v('about_value_1_title'), value1Desc: v('about_value_1_desc'),
        value2Title: v('about_value_2_title'), value2Desc: v('about_value_2_desc'),
        value3Title: v('about_value_3_title'), value3Desc: v('about_value_3_desc'),
        value4Title: v('about_value_4_title'), value4Desc: v('about_value_4_desc'),
        value5Title: v('about_value_5_title'), value5Desc: v('about_value_5_desc'),
        value6Title: v('about_value_6_title'), value6Desc: v('about_value_6_desc'),
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

  const uploadImage = async (file: File): Promise<string | null> => {
    const fd = new FormData();
    fd.append('file', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      return data.url || null;
    } catch { return null; }
  };

  const ImageUpload = ({ label, value, onChange }: { label: string; value: string; onChange: (url: string) => void }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {value ? (
        <div className="relative">
          <img src={value} alt="Preview" className="w-full h-40 object-cover rounded-lg border border-gray-200" />
          <button type="button" onClick={() => onChange('')} className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"><X size={14} /></button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-colors">
          <Upload className="w-8 h-8 text-gray-400 mb-1" />
          <span className="text-sm text-gray-500">Upload Image</span>
          <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
            const file = e.target.files?.[0]; if (!file) return;
            toast.loading('Uploading...');
            const url = await uploadImage(file); toast.dismiss();
            if (url) { onChange(url); toast.success('Uploaded'); } else toast.error('Failed');
          }} />
        </label>
      )}
    </div>
  );

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>;
  }

  const inputClass = "w-full border border-gray-300 bg-white text-gray-900 rounded-lg px-3 py-2 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit About Page</h1>

      {/* Company Overview */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Company Overview</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Page Title</label>
            <input type="text" value={overviewData.title} onChange={(e) => setOverviewData({ ...overviewData, title: e.target.value })} className={inputClass} placeholder="e.g. About SmartLink Rwanda" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
            <input type="text" value={overviewData.subtitle} onChange={(e) => setOverviewData({ ...overviewData, subtitle: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea value={overviewData.description} onChange={(e) => setOverviewData({ ...overviewData, description: e.target.value })} className={inputClass} rows={5} />
          </div>
          <ImageUpload label="Company Image" value={overviewData.image} onChange={(url) => setOverviewData({ ...overviewData, image: url })} />
          <button onClick={() => handleSave({
            about_overview_title: overviewData.title,
            about_overview_subtitle: overviewData.subtitle,
            about_overview_description: overviewData.description,
            about_overview_image: overviewData.image,
          })} disabled={saving} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
            <Save size={18} /> {saving ? 'Saving...' : 'Save Overview'}
          </button>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Mission & Vision</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-medium text-gray-700">Mission</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input type="text" value={missionData.missionTitle} onChange={(e) => setMissionData({ ...missionData, missionTitle: e.target.value })} className={inputClass} placeholder="Our Mission" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea value={missionData.missionDescription} onChange={(e) => setMissionData({ ...missionData, missionDescription: e.target.value })} className={inputClass} rows={4} />
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="font-medium text-gray-700">Vision</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input type="text" value={missionData.visionTitle} onChange={(e) => setMissionData({ ...missionData, visionTitle: e.target.value })} className={inputClass} placeholder="Our Vision" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea value={missionData.visionDescription} onChange={(e) => setMissionData({ ...missionData, visionDescription: e.target.value })} className={inputClass} rows={4} />
              </div>
            </div>
          </div>
          <button onClick={() => handleSave({
            about_mission_title: missionData.missionTitle,
            about_mission_description: missionData.missionDescription,
            about_vision_title: missionData.visionTitle,
            about_vision_description: missionData.visionDescription,
          })} disabled={saving} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
            <Save size={18} /> {saving ? 'Saving...' : 'Save Mission & Vision'}
          </button>
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Core Values</h2>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Value {i} Title</label>
                <input type="text" value={valuesData[`value${i}Title` as keyof typeof valuesData]} onChange={(e) => setValuesData({ ...valuesData, [`value${i}Title`]: e.target.value })} className={inputClass} placeholder={`e.g. ${['Innovation', 'Integrity', 'Excellence', 'Community', 'Growth', 'Collaboration'][i - 1]}`} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Value {i} Description</label>
                <input type="text" value={valuesData[`value${i}Desc` as keyof typeof valuesData]} onChange={(e) => setValuesData({ ...valuesData, [`value${i}Desc`]: e.target.value })} className={inputClass} />
              </div>
            </div>
          ))}
          <button onClick={() => {
            const mapped: Record<string, string> = {};
            for (let i = 1; i <= 6; i++) {
              mapped[`about_value_${i}_title`] = valuesData[`value${i}Title` as keyof typeof valuesData];
              mapped[`about_value_${i}_desc`] = valuesData[`value${i}Desc` as keyof typeof valuesData];
            }
            handleSave(mapped);
          }} disabled={saving} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
            <Save size={18} /> {saving ? 'Saving...' : 'Save Core Values'}
          </button>
        </div>
      </div>
    </div>
  );
}
