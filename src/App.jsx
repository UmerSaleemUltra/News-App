import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = '386007f996fd4dea94e48696b209e7b5';
  const apiUrl = `https://newsapi.org/v2/everything?q=business&from=2024-07-19&sortBy=publishedAt&apiKey=${apiKey}`;

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setArticles(data.articles);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-danger">Error: {error}</div>;
  }

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Tesla News</h1>
      <div className="row">
        {articles.map((article, index) => (
          <div className="col-lg-4 col-md-6 col-sm-12 my-3" key={index}>
            <div className="card h-100">
              {article.urlToImage && (
                <img src={article.urlToImage} className="card-img-top img-fluid" alt={article.title} />
              )}
              <div className="card-body">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text">{article.description || 'No description available.'}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  Read More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
