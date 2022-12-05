import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    pageSize: 5,
    country: "in",
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  articles = [];

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async update() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6ec6bc24ffa544bfa63f42f338885965
&pageSize=${this.props.pageSize}&page=${this.state.page}`;
    this.setState({ loading: true });
    try {
      const res = await fetch(url);
      const data = await res.json();
      this.setState({
        articles: data.articles,
        page: this.state.page,
        loading: false,
      });
    } catch (e) {
      console.log("something is not working");
    }
  }

  async componentDidMount() {
    this.update();
  }

  previousclickHandler = async () => {
    this.setState({
      page: this.state.page - 1,
    });
    this.update();
  };

  nextclickHandler = async () => {
    this.setState({
      page: this.state.page + 1,
    });
    this.update();
  };
  render() {
    return (
      <>
        <div className="container my-3">
          <h2 className="text-center">Top news headlines of the day!</h2>
          {this.state.loading && <Spinner />}
          <div className="row my-4">
            {!this.state.loading &&
              this.state.articles.map((element) => {
                return (
                  <div className="col-md-4 my-3">
                    <NewsItem
                      key={element.url}
                      description={
                        element.descripton
                          ? element.description.slice(0, 80)
                          : ""
                      }
                      ImageUrl={
                        element.urlToImage
                          ? element.urlToImage
                          : "https://c.ndtvimg.com/2022-11/l6f5gmho_elon-musk-reuters_625x300_07_November_22.jpg"
                      }
                      title={element.title ? element.title.slice(0, 45) : ""}
                      newsUrl={element.url}
                      author={!element.author ? "Unknown" : element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
          </div>
          <div className="container d-flex justify-content-between my-2">
            <button
              className="btn btn-dark"
              disabled={this.state.page <= 1}
              onClick={this.previousclickHandler}
            >
              &larr; Previous
            </button>
            <button
              className="btn btn-dark"
              onClick={this.nextclickHandler}
              disabled={
                this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)
              }
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </>
    )
  }
}
export default News;
