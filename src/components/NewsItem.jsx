import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let {title, description, ImageUrl, newsUrl, author, date, source} = this.props;
    return (
      <>
        <div className ="card">
        <span className ="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{zIndex:'1', left: '90%'}}>{source}
  </span>
          <img src= {ImageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">
              {description}...
            </p>
            <p class="card-text"><small class="text-muted">By {author} on {new Date (date).toGMTString()}</small></p>
            <a href= {newsUrl} target = '_blank' className="btn btn-sm btn-primary">
              Read More
            </a>
          </div>
        </div>
      </>
    );
  }
}

export default NewsItem;
