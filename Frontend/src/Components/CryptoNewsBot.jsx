import React, { useState, useEffect } from 'react';

const CryptoNewsBot = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(
          `https://newsdata.io/api/1/news?apikey=pub_a6f6594f95cd45bdb63db5db45354e61&q=crypto&language=en`
        );
        const data = await res.json();
        setNews(data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📰 Crypto News Bot</h1>
      {loading ? (
        <p>Loading news...</p>
      ) : (
        <ul className="space-y-4">
          {news.map((article, index) => (
            <li key={index} className="border rounded-xl p-4 shadow hover:shadow-lg transition">
              <a href={article.link} target="_blank" rel="noopener noreferrer">
                <h2 className="text-lg font-semibold">{article.title}</h2>
              </a>
              <p className="text-sm text-gray-600">{article.pubDate}</p>
              <p>{article.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CryptoNewsBot;