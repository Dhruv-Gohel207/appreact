import React from 'react'

const NewsItem =(props)=> {
  
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
      <div className='container my-4 sm:m-5'>
        <div className="row justify-content-center">
          <div className="col-md-15 col-lg-10">
            <div className="card mb-8" style={{ width: "100%" }}>
              <img 
                src={imageUrl || "https://via.placeholder.com/150"} 
                className="card-img-top" 
                alt="News" 
              />
              <div className="card-body bg-secondary">
                <h5 className="card-title">
                  {title || "No Title Available"}
                  <span className='position-absolute top-0 translate-middle badge rounded-pill bg-danger' style={{ zIndex: "1", left: "90%" }}>
                    {source || "Unknown Source"}
                  </span>
                </h5>
                <p className="card-text">{description || "No Description Available"}</p>
                <p className='card-text '>
                  <small className='text-muted'>
                    By {author || "Unknown"} on {date ? new Date(date).toGMTString() : "Unknown Date"}
                  </small>
                </p>
                <a rel="noreferrer" href={newsUrl} target='_blank' className="btn btn-light">Read More</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  
}



export default NewsItem;
