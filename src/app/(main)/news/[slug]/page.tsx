import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, Tag, ArrowLeft, Share2 } from 'lucide-react';
import type { Metadata } from 'next';

async function getNewsBySlug(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/news/${slug}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

async function getRelatedNews(category: string, currentSlug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/news?category=${category}&limit=3`, { cache: 'no-store' });
  if (!res.ok) return [];
  const data = await res.json();
  return (data.news || []).filter((item: { slug: string }) => item.slug !== currentSlug).slice(0, 3);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);
  if (!article) return { title: 'Not Found' };
  return {
    title: `${article.title} | SmartLink Rwanda`,
    description: article.excerpt,
  };
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);

  if (!article) notFound();

  const related = await getRelatedNews(article.category, slug);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <section className="relative py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-purple-900">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/news" className="inline-flex items-center gap-2 text-blue-200 hover:text-white transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to News
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-blue-500/20 text-blue-200 text-xs font-semibold px-3 py-1 rounded-full border border-blue-400/30">
              {article.category}
            </span>
            <span className="flex items-center gap-1 text-blue-200 text-sm">
              <Calendar className="w-4 h-4" />
              {new Date(article.publishedAt || article.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white max-w-4xl">{article.title}</h1>
          <div className="flex items-center gap-4 mt-6 text-blue-200">
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {article.author || 'SmartLink Rwanda'}
            </span>
          </div>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {article.image && (
          <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-10 shadow-xl">
            <Image src={article.image} alt={article.title} fill className="object-cover" />
          </div>
        )}

        <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700">
          {article.content}
        </div>

        <div className="flex items-center gap-4 mt-12 pt-8 border-t border-gray-200">
          <span className="text-gray-600 font-semibold flex items-center gap-2">
            <Tag className="w-4 h-4" /> {article.category}
          </span>
          <div className="flex gap-3 ml-auto">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(article.title + ' - ' + (typeof window !== 'undefined' ? window.location.href : ''))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-green-500 text-white hover:bg-green-600 transition-colors"
            >
              <Share2 className="w-5 h-5" />
            </a>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {related.map((item: { id: string; title: string; slug: string; excerpt: string; image?: string; category: string; publishedAt: string }) => (
              <Link
                key={item.id}
                href={`/news/${item.slug}`}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all"
              >
                {item.image ? (
                  <div className="relative h-40">
                    <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                ) : (
                  <div className="h-40 bg-gradient-to-br from-blue-500 to-purple-600" />
                )}
                <div className="p-5">
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">{item.category}</span>
                  <h3 className="text-lg font-bold text-gray-900 mt-2 group-hover:text-blue-600 transition-colors line-clamp-2">{item.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
