'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import NewsCard from '@/components/news/news-card';

interface NewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image?: string;
  category: string;
  publishedAt: string;
}

interface NewsListProps {
  initialNews: NewsItem[];
  total: number;
  totalPages: number;
  currentPage: number;
  currentCategory: string;
  currentSearch: string;
}

const categories = ['All', 'Technology', 'Education', 'Business', 'Events', 'Company'];

export default function NewsList({
  initialNews,
  totalPages,
  currentPage,
  currentCategory,
  currentSearch,
}: NewsListProps) {
  const router = useRouter();
  const [search, setSearch] = useState(currentSearch);

  const navigate = (params: Record<string, string>) => {
    const url = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val) url.set(key, val);
    });
    router.push(`/news?${url.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ page: '1', category: currentCategory, search });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-6 mb-12">
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search news..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </form>
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => navigate({ page: '1', category: cat === 'All' ? '' : cat, search })}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                (cat === 'All' && !currentCategory) || currentCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {initialNews.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No news articles found.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {initialNews.map((item) => (
            <NewsCard key={item.id} {...item} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-12">
          <button
            disabled={currentPage <= 1}
            onClick={() => navigate({ page: String(currentPage - 1), category: currentCategory, search })}
            className="p-3 rounded-xl bg-white border border-gray-200 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-gray-600 font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage >= totalPages}
            onClick={() => navigate({ page: String(currentPage + 1), category: currentCategory, search })}
            className="p-3 rounded-xl bg-white border border-gray-200 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
