'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';

interface Article {
  id: number;
  title: string;
  body: string;
  metaDesc: string;
  category: string;
  tags: string[];
  imageUrl: string | null;
  publishedAt: string;
}

export default function ArticlePage() {
  const { slug } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [adVisible, setAdVisible] = useState(true);
  const [adCountdown, setAdCountdown] = useState(5);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/articles/${slug}`)
      .then(res => {
        setArticle(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    if (!adVisible || adCountdown === 0) return;
    const timer = setTimeout(() => setAdCountdown(prev => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [adCountdown, adVisible]);

  if (loading) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <p className="text-white text-xl">Loading...</p>
    </div>
  );

  if (!article) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <p className="text-white text-xl">Article not found.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {adVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
          <div className="bg-gray-900 rounded-2xl p-8 max-w-lg w-full mx-4 border border-gray-700 text-center">
            <p className="text-gray-400 text-xs uppercase tracking-widest mb-4">Advertisement</p>
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-8 mb-6">
              <p className="text-white text-2xl font-bold mb-2">Your Ad Here</p>
              <p className="text-blue-200 text-sm">Reach thousands of readers daily</p>
              
                href="https://example.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block bg-white text-blue-600 font-bold px-6 py-2 rounded-full text-sm"
              >
                Learn More
              </a>
            </div>
            {adCountdown > 0 ? (
              <p className="text-gray-400 text-sm">
                Skip ad in <span className="text-white font-bold">{adCountdown}</span> seconds...
              </p>
            ) : (
              <button
                onClick={() => setAdVisible(false)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-8 py-3 rounded-full text-sm"
              >
                Skip Ad
              </button>
            )}
          </div>
        </div>
      )}

      <header className="bg-gray-900 border-b border-gray-800 py-6 px-6">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <a href="/" className="text-blue-400 hover:text-blue-300 text-sm">Back</a>
          <h1 className="text-2xl font-bold text-blue-400">NewsAuto</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
          {article.category}
        </span>
        <h1 className="text-3xl font-bold text-white mt-3 mb-4 leading-tight">
          {article.title}
        </h1>
        <p className="text-gray-400 text-sm mb-6">
          {new Date(article.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
          })}
        </p>
        {article.imageUrl && (
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-64 object-cover rounded-xl mb-8"
          />
        )}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 mb-8 text-center">
          <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">Advertisement</p>
          <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-lg p-4">
            <p className="text-white font-bold">Banner Ad — Your Product Here</p>
          </div>
        </div>
        <div className="text-gray-200 text-lg leading-relaxed whitespace-pre-line mb-10">
          {article.body}
        </div>
        <div className="flex flex-wrap gap-2 mt-6">
          {article.tags?.map(tag => (
            <span key={tag} className="text-sm bg-gray-800 text-gray-300 px-3 py-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 mt-10 text-center">
          <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">Advertisement</p>
          <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-lg p-4">
            <p className="text-white font-bold">Bottom Banner Ad</p>
          </div>
        </div>
      </main>
    </div>
  );
}