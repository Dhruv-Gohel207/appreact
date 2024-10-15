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
    setLoading(true);  // No 'this' anymore, use setLoading instead

    try {
      let data = await fetch(url);
      props.setProgress(50);
      let parsedData = await data.json();
      props.setProgress(70);
      
      setArticles(parsedData.articles);  // Use setArticles to update articles state
      setTotalResults(parsedData.totalResults);
      setLoading(false);
      props.setProgress(100);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setLoading(false);
      props.setProgress(100);
      setLoading(false);

    }
  };

  useEffect(() => {
    updateNews();  // Call updateNews when the component mounts
    // eslint-disable-next-line
  }, [page]);  // Re-run the effect when the page changes

  const fetchMoreData = async () => {
    setPage(page + 1);  // Increment the page number
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
    
    let data = await fetch(url);
    let parsedData = await data.json();
    
    setArticles(articles.concat(parsedData.articles));  // Append new articles to the existing ones
    setTotalResults(parsedData.totalResults);
  };

  return (
    <div className='container sm:m-5'>
      <h2 className='text-center my-2'>NEWS - Top {props.category} Headlines</h2>
      
      {loading && <Spinner />}
      
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className='container'>
          <div className='row'>
            {!loading && articles.map((e) => (
              e.title ? (
                <div className='col-md-4' key={e.url}>
                  
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
