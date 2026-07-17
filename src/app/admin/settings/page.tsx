'use client';

import { useState, useEffect } from 'react';
import { Save, AlertCircle, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface Setting {
  id: string;
  key: string;
  value: string;
  type: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'company' | 'social' | 'hours'>('company');

  const [companyData, setCompanyData] = useState({
    companyName: '',
    email: '',
    phone: '',
    secondaryPhone: '',
    address: '',
    description: '',
  });

  const [socialData, setSocialData] = useState({
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: '',
    youtube: '',
    tiktok: '',
  });

  const [hoursData, setHoursData] = useState({
    monday: '',
    tuesday: '',
    wednesday: '',
    thursday: '',
    friday: '',
    saturday: '',
    sunday: '',
  });

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      setSettings(data);

      const getVal = (key: string) => data.find((s: Setting) => s.key === key)?.value || '';

      setCompanyData({
        companyName: getVal('company_name'),
        email: getVal('company_email'),
        phone: getVal('company_phone_1'),
        secondaryPhone: getVal('company_phone_2'),
        address: getVal('company_address'),
        description: getVal('company_description'),
      });

      setSocialData({
        facebook: getVal('social_facebook'),
        twitter: getVal('social_twitter'),
        instagram: getVal('social_instagram'),
        linkedin: getVal('social_linkedin'),
        youtube: getVal('youtube'),
        tiktok: getVal('tiktok'),
      });

      setHoursData({
        monday: getVal('business_hours_weekdays'),
        tuesday: getVal('business_hours_tuesday'),
        wednesday: getVal('business_hours_wednesday'),
        thursday: getVal('business_hours_thursday'),
        friday: getVal('business_hours_friday'),
        saturday: getVal('business_hours_saturday'),
        sunday: getVal('business_hours_sunday'),
      });
    } catch {
      toast.error('Failed to fetch settings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async (data: Record<string, string>) => {
    setSaving(true);
    try {
      let mapped: Record<string, string> = data;
      if (activeTab === 'company') {
        mapped = {
          company_name: data.companyName,
          company_email: data.email,
          company_phone_1: data.phone,
          company_phone_2: data.secondaryPhone,
          company_address: data.address,
          company_description: data.description,
        };
      } else if (activeTab === 'social') {
        mapped = {
          social_facebook: data.facebook,
          social_twitter: data.twitter,
          social_instagram: data.instagram,
          social_linkedin: data.linkedin,
          youtube: data.youtube,
          tiktok: data.tiktok,
        };
      } else if (activeTab === 'hours') {
        mapped = {
          business_hours_weekdays: data.monday || data.tuesday || data.wednesday || data.thursday || data.friday,
          business_hours_saturday: data.saturday,
          business_hours_sunday: data.sunday,
        };
      }
      const res = await fetch('/api/admin/settings/bulk', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings: Object.entries(mapped).map(([key, value]) => ({ key, value })) }),
      });
      if (res.ok) {
        toast.success('Settings saved');
        fetchSettings();
      } else {
        toast.error('Failed to save settings');
      }
    } catch {
      toast.error('An error occurred');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const tabs = [
    { key: 'company' as const, label: 'Company Info' },
    { key: 'social' as const, label: 'Social Links' },
    { key: 'hours' as const, label: 'Business Hours' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>

      <div className="bg-white rounded-lg shadow">
        <div className="border-b">
          <nav className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'company' && (
            <div className="space-y-4 max-w-2xl">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input type="text" value={companyData.companyName} onChange={(e) => setCompanyData({ ...companyData, companyName: e.target.value })} className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg px-3 py-2 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" value={companyData.email} onChange={(e) => setCompanyData({ ...companyData, email: e.target.value })} className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg px-3 py-2 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Primary Phone</label>
                  <input type="text" value={companyData.phone} onChange={(e) => setCompanyData({ ...companyData, phone: e.target.value })} className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg px-3 py-2 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Phone</label>
                  <input type="text" value={companyData.secondaryPhone} onChange={(e) => setCompanyData({ ...companyData, secondaryPhone: e.target.value })} className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg px-3 py-2 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea value={companyData.address} onChange={(e) => setCompanyData({ ...companyData, address: e.target.value })} className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg px-3 py-2 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" rows={2} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea value={companyData.description} onChange={(e) => setCompanyData({ ...companyData, description: e.target.value })} className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg px-3 py-2 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" rows={4} />
              </div>
              <button onClick={() => handleSave(companyData)} disabled={saving} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
                <Save size={18} />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}

          {activeTab === 'social' && (
            <div className="space-y-4 max-w-2xl">
              {Object.entries(socialData).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{key}</label>
                  <input type="url" value={value} onChange={(e) => setSocialData({ ...socialData, [key]: e.target.value })} className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg px-3 py-2 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder={`https://${key}.com/...`} />
                </div>
              ))}
              <button onClick={() => handleSave(socialData)} disabled={saving} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
                <Save size={18} />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}

          {activeTab === 'hours' && (
            <div className="space-y-4 max-w-2xl">
              <p className="text-sm text-gray-500 mb-4">Enter business hours for each day (e.g., "9:00 AM - 5:00 PM" or "Closed")</p>
              {Object.entries(hoursData).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{key}</label>
                  <input type="text" value={value} onChange={(e) => setHoursData({ ...hoursData, [key]: e.target.value })} className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg px-3 py-2 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. 9:00 AM - 5:00 PM" />
                </div>
              ))}
              <button onClick={() => handleSave(hoursData)} disabled={saving} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
                <Save size={18} />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
