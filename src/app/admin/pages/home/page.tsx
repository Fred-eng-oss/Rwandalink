'use client';

import { useState, useEffect } from 'react';
import { Save, Upload, X } from 'lucide-react';
import toast from 'react-hot-toast';

interface Setting {
  id: string;
  key: string;
  value: string;
}

export default function HomePageEditor() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [heroData, setHeroData] = useState({
    heroTitle: '',
    heroSubtitle: '',
    heroBadge: '',
    heroImage: '',
  });

  const [aboutData, setAboutData] = useState({
    aboutTitle: '',
    aboutDescription: '',
    aboutImage: '',
  });

  const [statsData, setStatsData] = useState({
    stat1Number: '',
    stat1Label: '',
    stat2Number: '',
    stat2Label: '',
    stat3Number: '',
    stat3Label: '',
    stat4Number: '',
    stat4Label: '',
  });

  const [ctaData, setCtaData] = useState({
    ctaTitle: '',
    ctaDescription: '',
    ctaButtonText: '',
    ctaButtonLink: '',
    ctaImage: '',
  });

  const fetchData = async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      setSettings(data);
      const v = (key: string) => data.find((s: Setting) => s.key === key)?.value || '';

      setHeroData({
        heroTitle: v('home_hero_title'),
        heroSubtitle: v('home_hero_subtitle'),
        heroBadge: v('home_hero_badge'),
        heroImage: v('home_hero_image'),
      });
      setAboutData({
        aboutTitle: v('home_about_title'),
        aboutDescription: v('home_about_description'),
        aboutImage: v('home_about_image'),
      });
      setStatsData({
        stat1Number: v('home_stat_1_number'),
        stat1Label: v('home_stat_1_label'),
        stat2Number: v('home_stat_2_number'),
        stat2Label: v('home_stat_2_label'),
        stat3Number: v('home_stat_3_number'),
        stat3Label: v('home_stat_3_label'),
        stat4Number: v('home_stat_4_number'),
        stat4Label: v('home_stat_4_label'),
      });
      setCtaData({
        ctaTitle: v('home_cta_title'),
        ctaDescription: v('home_cta_description'),
        ctaButtonText: v('home_cta_button_text'),
        ctaButtonLink: v('home_cta_button_link'),
        ctaImage: v('home_cta_image'),
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
      if (res.ok) {
        toast.success('Page content saved');
        fetchData();
      } else {
        toast.error('Failed to save');
      }
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
    } catch {
      return null;
    }
  };

  const ImageUpload = ({ label, value, onChange }: { label: string; value: string; onChange: (url: string) => void }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {value ? (
        <div className="relative">
          <img src={value} alt="Preview" className="w-full h-40 object-cover rounded-lg border border-gray-200" />
          <button type="button" onClick={() => onChange('')} className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700">
            <X size={14} />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-colors">
          <Upload className="w-8 h-8 text-gray-400 mb-1" />
          <span className="text-sm text-gray-500">Upload Image</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              toast.loading('Uploading...');
              const url = await uploadImage(file);
              toast.dismiss();
              if (url) { onChange(url); toast.success('Image uploaded'); }
              else toast.error('Upload failed');
            }}
          />
        </label>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const inputClass = "w-full border border-gray-300 bg-white text-gray-900 rounded-lg px-3 py-2 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Home Page</h1>

      {/* Hero Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Hero Section</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Badge Text</label>
            <input type="text" value={heroData.heroBadge} onChange={(e) => setHeroData({ ...heroData, heroBadge: e.target.value })} className={inputClass} placeholder="e.g. Leading ICT Solutions in Rwanda" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Main Title</label>
            <input type="text" value={heroData.heroTitle} onChange={(e) => setHeroData({ ...heroData, heroTitle: e.target.value })} className={inputClass} placeholder="e.g. Empowering Rwanda's Digital Future" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
            <textarea value={heroData.heroSubtitle} onChange={(e) => setHeroData({ ...heroData, heroSubtitle: e.target.value })} className={inputClass} rows={3} placeholder="Description text below the title" />
          </div>
          <ImageUpload label="Hero Background Image" value={heroData.heroImage} onChange={(url) => setHeroData({ ...heroData, heroImage: url })} />
          <button onClick={() => handleSave({
            home_hero_title: heroData.heroTitle,
            home_hero_subtitle: heroData.heroSubtitle,
            home_hero_badge: heroData.heroBadge,
            home_hero_image: heroData.heroImage,
          })} disabled={saving} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
            <Save size={18} /> {saving ? 'Saving...' : 'Save Hero'}
          </button>
        </div>
      </div>

      {/* About Preview Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">About Preview Section</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
            <input type="text" value={aboutData.aboutTitle} onChange={(e) => setAboutData({ ...aboutData, aboutTitle: e.target.value })} className={inputClass} placeholder="e.g. About SmartLink Rwanda" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea value={aboutData.aboutDescription} onChange={(e) => setAboutData({ ...aboutData, aboutDescription: e.target.value })} className={inputClass} rows={4} placeholder="Brief description for the home page about section" />
          </div>
          <ImageUpload label="About Section Image" value={aboutData.aboutImage} onChange={(url) => setAboutData({ ...aboutData, aboutImage: url })} />
          <button onClick={() => handleSave({
            home_about_title: aboutData.aboutTitle,
            home_about_description: aboutData.aboutDescription,
            home_about_image: aboutData.aboutImage,
          })} disabled={saving} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
            <Save size={18} /> {saving ? 'Saving...' : 'Save About Section'}
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Statistics Section</h2>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Stat {i}</label>
              <input type="text" value={statsData[`stat${i}Number` as keyof typeof statsData]} onChange={(e) => setStatsData({ ...statsData, [`stat${i}Number`]: e.target.value })} className={inputClass} placeholder="Number (e.g. 500+)" />
              <input type="text" value={statsData[`stat${i}Label` as keyof typeof statsData]} onChange={(e) => setStatsData({ ...statsData, [`stat${i}Label`]: e.target.value })} className={inputClass} placeholder="Label (e.g. Students Trained)" />
            </div>
          ))}
        </div>
        <button onClick={() => handleSave({
          home_stat_1_number: statsData.stat1Number, home_stat_1_label: statsData.stat1Label,
          home_stat_2_number: statsData.stat2Number, home_stat_2_label: statsData.stat2Label,
          home_stat_3_number: statsData.stat3Number, home_stat_3_label: statsData.stat3Label,
          home_stat_4_number: statsData.stat4Number, home_stat_4_label: statsData.stat4Label,
        })} disabled={saving} className="mt-4 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
          <Save size={18} /> {saving ? 'Saving...' : 'Save Stats'}
        </button>
      </div>

      {/* CTA Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Call-to-Action Section</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input type="text" value={ctaData.ctaTitle} onChange={(e) => setCtaData({ ...ctaData, ctaTitle: e.target.value })} className={inputClass} placeholder="e.g. Ready to Get Started?" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea value={ctaData.ctaDescription} onChange={(e) => setCtaData({ ...ctaData, ctaDescription: e.target.value })} className={inputClass} rows={3} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
              <input type="text" value={ctaData.ctaButtonText} onChange={(e) => setCtaData({ ...ctaData, ctaButtonText: e.target.value })} className={inputClass} placeholder="e.g. Contact Us" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Button Link</label>
              <input type="text" value={ctaData.ctaButtonLink} onChange={(e) => setCtaData({ ...ctaData, ctaButtonLink: e.target.value })} className={inputClass} placeholder="e.g. /contact" />
            </div>
          </div>
          <ImageUpload label="CTA Background Image" value={ctaData.ctaImage} onChange={(url) => setCtaData({ ...ctaData, ctaImage: url })} />
          <button onClick={() => handleSave({
            home_cta_title: ctaData.ctaTitle,
            home_cta_description: ctaData.ctaDescription,
            home_cta_button_text: ctaData.ctaButtonText,
            home_cta_button_link: ctaData.ctaButtonLink,
            home_cta_image: ctaData.ctaImage,
          })} disabled={saving} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
            <Save size={18} /> {saving ? 'Saving...' : 'Save CTA'}
          </button>
        </div>
      </div>
    </div>
  );
}
