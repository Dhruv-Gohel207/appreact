import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = ({ country = 'us', pageSize = 12, category = 'general', apiKey, setProgress }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const updateNews = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;

    try {
      setLoading(true); // Start spinner
      let data = await fetch(url);
      let parsedData = await data.json();

      // Filter out duplicates based on unique URLs
      setArticles(prevArticles => {
        const articleSet = new Set(prevArticles.map(article => article.url));
        const uniqueArticles = parsedData.articles.filter(article => !articleSet.has(article.url));
        return [...prevArticles, ...uniqueArticles];
      });

      setTotalResults(parsedData.totalResults);
      setLoading(false); // Stop spinner
    } catch (error) {
      console.error("Error fetching data: ", error);
      setLoading(false); // Stop spinner on error
    }
  };

  useEffect(() => {
    setProgress(10);
    updateNews();
    setProgress(100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const fetchMoreData = () => {
    if (!loading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <div className='container sm:m-5'>
      <h2 className='text-center my-2'>NEWS - Top {category} Headlines</h2>

      {/* Show spinner when loading and no articles are loaded yet */}
      {loading && articles.length === 0 && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults} // Check if there are more articles to load
        loader={<Spinner />} // Spinner for when loading more data
      >
        <div className='container'>
          <div className='row'>
            {articles.map((e, index) => (
              e.title ? (
                <div className='col-md-4' key={e.url + index}>
                  <NewsItem 
                    title={e.title || "No Title Available"} 
                    description={e.description || "No Description Available"} 
                    imageUrl={e.urlToImage || "https://via.placeholder.com/150"} 
                    newsUrl={e.url} 
                    author={e.author || "Unknown"} 
                    date={e.publishedAt || new Date()} 
                    source={e.source ? e.source.name : "Unknown Source"}
                  />
                </div>
              ) : null
            ))}
          </div>
        </div>
      </InfiniteScroll>

      {/* No more articles message */}
      {!loading && articles.length >= totalResults && (
        <p className="text-center">No more articles to display</p>
      )}
    </div>
  );
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string.isRequired,
  setProgress: PropTypes.func.isRequired,
};

export default News;
