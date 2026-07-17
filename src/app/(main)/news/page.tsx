import { Suspense } from 'react';
import NewsList from './news-list';

async function getNews(page: number = 1, category?: string, search?: string) {
  const params = new URLSearchParams({ page: String(page), limit: '9' });
  if (category) params.set('category', category);
  if (search) params.set('search', search);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/news?${params}`, { cache: 'no-store' });
  if (!res.ok) return { news: [], total: 0, totalPages: 0 };
  return res.json();
}

export const metadata = {
  title: 'News | SmartLink Rwanda',
  description: 'Stay updated with the latest news and announcements from SmartLink Rwanda.',
};

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string; search?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const category = params.category || '';
  const search = params.search || '';

  const data = await getNews(page, category, search);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <section className="relative py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-purple-900">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">News & Updates</h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">Stay informed about SmartLink Rwanda&apos;s latest developments</p>
        </div>
      </section>

      <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-20 text-center text-gray-500">Loading news...</div>}>
        <NewsList
          initialNews={data.news || []}
          total={data.total || 0}
          totalPages={data.totalPages || 0}
          currentPage={page}
          currentCategory={category}
          currentSearch={search}
        />
      </Suspense>
    </div>
  );
}
