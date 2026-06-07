'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Article {
  id: number;
  title: string;
  slug: string;
  metaDesc: string;
  category: string;
  tags: string[];
  imageUrl: string | null;
  publishedAt: string;
}

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3000/api/articles')
      .then(res => {
        setArticles(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="bg-gray-900 border-b border-gray-800 py-6 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-blue-400">📰 NewsAuto</h1>
          <p className="text-gray-400 text-sm mt-1">AI-Powered Automated News</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {loading ? (
          <div className="text-center text-gray-400 py-20">
            <p className="text-xl">Loading articles...</p>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center text-gray-400 py-20">
            <p className="text-xl">No articles found.</p>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-semibold text-gray-300 mb-6">
              Latest News — {articles.length} articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map(article => (
                <div key={article.id}
                  className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-blue-500 transition-all duration-200 cursor-pointer"
                  onClick={() => window.location.href = `/article/${article.slug}`}
                >
                  {article.imageUrl && (
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-5">
                    <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                      {article.category}
                    </span>
                    <h3 className="text-white font-bold text-lg mt-2 mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-3">
                      {article.metaDesc}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {article.tags?.slice(0,3).map(tag => (
                        <span key={tag} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-600 text-xs mt-3">
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}