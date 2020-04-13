import React from "react";
import { Link } from "react-router-dom";
import NProgress from "nprogress";
import "./newsPost.scss";
import "./news.scss";

export class NewsPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newNews: [],
    };
  }
  UNSAFE_componentWillMount() {
    NProgress.start();
  }
  componentDidMount() {
    document.title = "News — Triangle";
    NProgress.done();
    this.unlisten = this.props.history.listen(() => {
      window.scrollTo(0, 0);
      this.fetchNews();
    });
    this.fetchNews();
  }
  componentWillUnmount() {
    this.unlisten();
  }
  fetchNews() {
    fetch("../db/db.json")
      .then((response) => response.json())
      .then((data) => {
        const id = +this.props.match.params.id;
        this.newsPost = data.news.find((e) => e.id === id);
        data.news.sort((a, b) => b.id - a.id);
        this.newsList = data.news.filter((e) => e.id !== id);
        this.setState({
          newNews: this.newsList.slice(0, 3),
        });
      });
  }
  render() {
    return (
      <section>
        <div className="container">
          {this.newsPost ? (
            <div className="post">
              <img
                src={require(`../../assets/img/${this.newsPost.img}`)}
                className="post__img"
                alt=""
              />
              <h2 className="news-title">{this.newsPost.title}</h2>
              <p className="post__desc news-txt">{this.newsPost.desc}</p>
            </div>
          ) : null}
          <ul className="news">
            {this.state.newNews
              ? this.state.newNews.map((post) => (
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
        </div>
      </section>
    );
  }
}
