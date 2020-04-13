import React from "react";
import NProgress from "nprogress";
import "./videos.scss";

export class Videos extends React.Component {
  constructor() {
    super();
    this.state = {
      videos: [],
      loading: false,
    };
    this.loadMore = this.loadMore.bind(this);
  }
  UNSAFE_componentWillMount() {
    NProgress.start();
  }
  componentDidMount() {
    document.title = "Videos — Triangle";
    NProgress.done();
    fetch("../db/db.json")
      .then((response) => response.json())
      .then((data) => {
        this.videosList = data.videos.sort((a, b) => b.id - a.id);
        this.setState({
          videos: this.videosList.slice(0, 9),
        });
      });
    window.addEventListener("scroll", () => {
      const root = document.documentElement || document.body;
      if (
        root.scrollTop + window.innerHeight === root.offsetHeight &&
        this.state.videos.length < this.videosList.length
      )
        this.loadMore();
    });
  }
  loadMore() {
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      this.setState(({ videos }) => ({
        videos: [
          ...videos,
          ...this.videosList.slice(videos.length, videos.length + 3),
        ],
        loading: false,
      }));
    }, 2000);
  }
  insertVideo(e) {
    e.target.parentNode.innerHTML = `<video src="${require(`../../assets/videos/${e.target.dataset.video}`)}" autoplay controls></video>`;
  }
  render() {
    return (
      <section>
        <div className="container">
          <ul className="videos">
            {this.state.videos
              ? this.state.videos.map((post) => (
                  <li className="video" key={post.id}>
                    <img
                      className="full"
                      src={require(`../../assets/img/${post.img}`)}
                      alt=""
                    />
                    <button
                      onClick={this.insertVideo}
                      className="play"
                      data-video={`${post.video}`}
                    ></button>
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
