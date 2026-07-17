"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, ArrowRight, Image as ImageIcon } from "lucide-react";

interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  category: string | null;
  featuredImage: string | null;
  publishedAt: string | null;
  createdAt: string;
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const gradients = [
  "from-blue-600 to-blue-800",
  "from-emerald-600 to-emerald-800",
  "from-amber-500 to-orange-600",
  "from-purple-600 to-purple-800",
  "from-red-500 to-red-700",
];

export default function NewsPreview() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);

  useEffect(() => {
    fetch("/api/news?limit=3")
      .then((r) => r.json())
      .then((data) => {
        const list = data.news || (Array.isArray(data) ? data : []);
        setArticles(list.filter((a: NewsArticle) => a.slug).slice(0, 3));
      })
      .catch(() => {});
  }, []);

  if (articles.length === 0) return null;

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full mb-4">
            Latest News
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Stay <span className="text-blue-800">Updated</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Keep up with the latest news, events, and announcements from
            SmartLink Rwanda.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <div className="relative h-48 overflow-hidden">
                {article.featuredImage ? (
                  <>
                    <img
                      src={article.featuredImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </>
                ) : (
                  <div
                    className={`w-full h-full bg-gradient-to-br ${gradients[index % gradients.length]} flex items-center justify-center`}
                  >
                    <ImageIcon className="w-12 h-12 text-white/30" />
                  </div>
                )}
                {article.category && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                      {article.category}
                    </span>
                  </div>
                )}
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/10 rounded-full" />
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent" />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {formatDate(article.publishedAt || article.createdAt)}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-800 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {article.excerpt || "Read more about this topic..."}
                </p>
                <Link
                  href={`/news/${article.slug}`}
                  className="inline-flex items-center gap-1 text-blue-800 font-medium text-sm hover:text-blue-900 transition-colors"
                >
                  Read More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Link
            href="/news"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-blue-800 hover:bg-blue-900 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-blue-800/30 hover:shadow-blue-800/50"
          >
            View All News
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
