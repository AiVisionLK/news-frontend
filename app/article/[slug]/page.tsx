'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';

interface Article {
  id: number;
  title: string;
  body: string;
  category: string;
  tags: string[];
  imageUrl: string | null;
  publishedAt: string;
}

export default function ArticlePage() {
  const { slug } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [adDone, setAdDone] = useState(false);
  const [secs, setSecs] = useState(5);

  useEffect(() => {
    axios.get(`http://16.171.149.70:3000/api/articles/${slug}`)
      .then(res => { setArticle(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    if (adDone || secs === 0) return;
    const t = setTimeout(() => setSecs(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [secs, adDone]);

  if (loading) return <div className="min-h-screen bg-gray-950 flex items-center justify-center"><p className="text-white">Loading...</p></div>;
  if (!article) return <div className="min-h-screen bg-gray-950 flex items-center justify-center"><p className="text-white">Not found.</p></div>;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {!adDone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
          <div className="bg-gray-900 rounded-2xl p-8 max-w-lg w-full mx-4 border border-gray-700 text-center">
            <p className="text-gray-400 text-xs uppercase mb-4">Advertisement</p>
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-8 mb-6">
              <p className="text-white text-2xl font-bold mb-2">Your Ad Here</p>
              <p className="text-blue-200 text-sm">Reach thousands of readers daily</p>
            </div>
            {secs > 0 ? (
              <p className="text-gray-400 text-sm">Skip in <span className="text-white font-bold">{secs}</span>s...</p>
            ) : (
              <button onClick={() => setAdDone(true)} className="bg-blue-500 text-white font-bold px-8 py-3 rounded-full text-sm">
                Skip Ad
              </button>
            )}
          </div>
        </div>
      )}
      <header className="bg-gray-900 border-b border-gray-800 py-6 px-6">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <a href="/" className="text-blue-400 text-sm">Back</a>
          <h1 className="text-2xl font-bold text-blue-400">NewsAuto</h1>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-6 py-10">
        <span className="text-xs font-bold text-blue-400 uppercase">{article.category}</span>
        <h1 className="text-3xl font-bold text-white mt-3 mb-4">{article.title}</h1>
        <p className="text-gray-400 text-sm mb-6">{new Date(article.publishedAt).toLocaleDateString()}</p>
        {article.imageUrl && <img src={article.imageUrl} alt={article.title} className="w-full h-64 object-cover rounded-xl mb-8" />}
        <div className="bg-gray-800 rounded-xl p-4 mb-8 text-center">
          <p className="text-gray-500 text-xs uppercase mb-2">Advertisement</p>
          <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-lg p-4">
            <p className="text-white font-bold">Banner Ad</p>
          </div>
        </div>
        <div className="text-gray-200 text-lg leading-relaxed whitespace-pre-line mb-10">{article.body}</div>
        <div className="flex flex-wrap gap-2 mt-6">
          {article.tags?.map(tag => <span key={tag} className="text-sm bg-gray-800 text-gray-300 px-3 py-1 rounded-full">#{tag}</span>)}
        </div>
      </main>
    </div>
  );
}