import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const updateNews = async () => {
    props.setProgress(10);  
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    
    setLoading(true);  // Show spinner while loading

    try {
      let data = await fetch(url);
      props.setProgress(50);
      let parsedData = await data.json();
      props.setProgress(70);

      // Use spread operator to append new articles to the existing ones
      setArticles(prevArticles => [...prevArticles, ...parsedData.articles]);
      setTotalResults(parsedData.totalResults);
      setLoading(false);  // Stop spinner
      props.setProgress(100);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setLoading(false);  // Stop spinner even on error
      props.setProgress(100);
    }
  };

  useEffect(() => {
    updateNews();  // Call updateNews when the component mounts
    // eslint-disable-next-line
  }, [page]);  // Re-run the effect when the page changes

  const fetchMoreData = async () => {
    setPage(page + 1);  // Increment the page number to fetch more data
  };

  return (
    <div className='container sm:m-5'>
      <h2 className='text-center my-2'>NEWS - Top {props.category} Headlines</h2>
      
      {/* Show spinner when loading and no articles are loaded yet */}
      {loading && articles.length === 0 && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}  // Check if there are more articles to load
        loader={<Spinner />}  // Spinner for when loading more data
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

News.defaultProps = {
  country: 'us',
  pageSize: 12,
  category: 'general'
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
};

export default News;
