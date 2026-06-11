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
  body: string;
}

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://16.192.9.193:3000/api/articles')
      .then(res => { setArticles(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const topStory = articles[0];
  const featured = articles.slice(1, 4);
  const rest = articles.slice(4);

  const categories = ['Politics', 'Business', 'Technology', 'Sports', 'Health', 'Entertainment'];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Top Bar */}
      <div className="bg-gray-100 border-b border-gray-300 py-1 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-xs text-gray-500">
          <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-red-600">E-PAPER</a>
            <a href="#" className="hover:text-red-600">ADVERTISE WITH US</a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="border-b-4 border-red-600 py-4 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">
              <span className="text-red-600">PULSE</span>POINT
            </h1>
            <p className="text-xs text-gray-500 italic">Truth hurts. We report it.</p>
          </div>
          <div className="text-right text-sm text-gray-500">
            <p className="font-semibold">plusepointnews.news</p>
            <p className="text-xs">AI-Powered Global News</p>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto flex items-center gap-1 overflow-x-auto">
          <a href="/" className="px-4 py-3 text-sm font-semibold hover:bg-red-600 whitespace-nowrap transition">Home</a>
          {categories.map(cat => (
            <a key={cat} href={`#${cat}`} className="px-4 py-3 text-sm font-semibold hover:bg-red-600 whitespace-nowrap transition">{cat}</a>
          ))}
        </div>
      </nav>

      {/* Breaking News Ticker */}
      {articles.length > 0 && (
        <div className="bg-red-600 text-white py-2 px-4 flex items-center gap-4 overflow-hidden">
          <span className="font-black text-sm whitespace-nowrap bg-white text-red-600 px-2 py-1">BREAKING</span>
          <div className="overflow-hidden flex-1">
            <p className="text-sm whitespace-nowrap animate-pulse">
              {articles.slice(0, 3).map(a => a.title).join(' • ')}
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading news...</div>
        ) : articles.length === 0 ? (
          <div className="text-center py-20 text-gray-400">No articles found.</div>
        ) : (
          <>
            {/* Top Story + Featured */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Top Story */}
              {topStory && (
                <div className="lg:col-span-2 cursor-pointer group" onClick={() => window.location.href = `/article/${topStory.slug}`}>
                  <div className="relative">
                    {topStory.imageUrl ? (
                      <img src={topStory.imageUrl} alt={topStory.title} className="w-full h-80 object-cover" />
                    ) : (
                      <div className="w-full h-80 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-6xl">📰</span>
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 uppercase">{topStory.category}</span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Top Story</p>
                    <h2 className="text-2xl font-black text-gray-900 group-hover:text-red-600 transition leading-tight mb-2">
                      {topStory.title}
                    </h2>
                    <p className="text-gray-600 text-sm line-clamp-3">{topStory.metaDesc}</p>
                    <p className="text-xs text-gray-400 mt-2">{new Date(topStory.publishedAt).toLocaleDateString()}</p>
                  </div>
                </div>
              )}

              {/* Featured Articles */}
              <div className="flex flex-col gap-4">
                {featured.map(article => (
                  <div key={article.id} className="flex gap-3 cursor-pointer group border-b border-gray-200 pb-4" onClick={() => window.location.href = `/article/${article.slug}`}>
                    {article.imageUrl ? (
                      <img src={article.imageUrl} alt={article.title} className="w-24 h-20 object-cover flex-shrink-0" />
                    ) : (
                      <div className="w-24 h-20 bg-gray-200 flex-shrink-0 flex items-center justify-center">
                        <span className="text-2xl">📰</span>
                      </div>
                    )}
                    <div>
                      <span className="text-xs font-bold text-red-600 uppercase">{article.category}</span>
                      <h3 className="text-sm font-bold text-gray-900 group-hover:text-red-600 transition line-clamp-3 mt-1">
                        {article.title}
                      </h3>
                      <p className="text-xs text-gray-400 mt-1">{new Date(article.publishedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ad Banner */}
            <div className="bg-gray-100 border border-gray-300 rounded p-4 text-center mb-8">
              <p className="text-xs text-gray-400 uppercase mb-2">Advertisement</p>
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded p-4">
                <p className="text-white font-bold">Your Ad Here — advertise@plusepointnews.news</p>
              </div>
            </div>

            {/* More Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {rest.map(article => (
                <div key={article.id} className="cursor-pointer group" onClick={() => window.location.href = `/article/${article.slug}`}>
                  {article.imageUrl ? (
                    <img src={article.imageUrl} alt={article.title} className="w-full h-40 object-cover mb-3" />
                  ) : (
                    <div className="w-full h-40 bg-gray-200 flex items-center justify-center mb-3">
                      <span className="text-3xl">📰</span>
                    </div>
                  )}
                  <span className="text-xs font-bold text-red-600 uppercase">{article.category}</span>
                  <h3 className="text-sm font-bold text-gray-900 group-hover:text-red-600 transition line-clamp-3 mt-1">
                    {article.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">{new Date(article.publishedAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-10 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-black mb-2"><span className="text-red-600">PULSE</span>POINT</h2>
          <p className="text-gray-400 text-sm">AI-Powered Global News • plusepointnews.news</p>
          <p className="text-gray-600 text-xs mt-4">© 2026 PulsePoint News. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}