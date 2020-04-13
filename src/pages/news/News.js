import React from "react";
import { Link } from "react-router-dom";
import NProgress from "nprogress";
import "./news.scss";

export class News extends React.Component {
  constructor() {
    super();
    this.state = {
      news: [],
      loading: false,
    };
    this.loadMore = this.loadMore.bind(this);
  }
  UNSAFE_componentWillMount() {
    NProgress.start();
  }
  componentDidMount() {
    document.title = "News — Triangle";
    NProgress.done();
    fetch("./db/db.json")
      .then((response) => response.json())
      .then((data) => {
        this.newsList = data.news.sort((a, b) => b.id - a.id);
        this.setState({ news: this.newsList.slice(0, 9) });
      });
    window.addEventListener("scroll", () => {
      const root = document.documentElement || document.body;
      if (
        root.scrollTop + window.innerHeight === root.offsetHeight &&
        this.state.news.length < this.newsList.length
      )
        this.loadMore();
    });
  }
  loadMore() {
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      this.setState(({ news }) => ({
        news: [...news, ...this.newsList.slice(news.length, news.length + 3)],
        loading: false,
      }));
    }, 2000);
  }
  render() {
    return (
      <section>
        <div className="container">
          <ul className="news">
            {this.state.news
              ? this.state.news.map((post) => (
                  <li className="news__card" key={post.id}>
                    <Link to={`/news/${post.id}`} className="news__head">
                      <img
                        src={require(`../../assets/img/${post.img}`)}
                        className="full"
                        alt=""
                      />
                    </Link>
                    <Link
                      className="news__card-title news-title"
                      to={`/news/${post.id}`}
                    >
                      {post.title}
                    </Link>
                    <p className="news-txt">{post.date}</p>
                  </li>
                ))
              : null}
          </ul>
          {this.state.loading ? (
            <div className="loading">
              <img
                src={require("../../assets/img/loading.svg")}
                alt="Loading..."
              />
            </div>
          ) : null}
        </div>
      </section>
    );
  }
}
