/* eslint-disable no-unused-vars */
/* eslint-disable no-const-assign */
import React, { useState, useEffect } from 'react';
import Newsitem from './Newsitem';
import Navbar from './Navbar';

const NewsBoard = () => {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${import.meta.env.VITE_API_KEY}`;
        if (searchTerm) {
          url += `&q=${searchTerm}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setArticles(data.articles);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [searchTerm]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div>
       <Navbar handleSearch={handleSearch} /> 
      <h2 className="text-center">Latest <span className="badge bg-danger">News</span></h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        articles.map((news, index) => (
          <Newsitem
            key={index}
            title={news.title}
            description={news.description}
            src={news.urlToImage}
            url={news.url}
          />
        ))
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default NewsBoard;