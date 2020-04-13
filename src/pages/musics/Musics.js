import React from "react";
import { Link } from "react-router-dom";
import NProgress from "nprogress";
import "./musics.scss";

export class Musics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      musics: [],
      loading: false,
    };
    this.loadMore = this.loadMore.bind(this);
  }
  UNSAFE_componentWillMount() {
    NProgress.start();
  }
  componentDidMount() {
    document.title = "Musics — Triangle";
    NProgress.done();
    this.unlisten = this.props.history.listen(() => {
      window.scrollTo(0, 0);
      this.fetchMusics();
    });
    this.fetchMusics();
    window.addEventListener("scroll", () => {
      const root = document.documentElement || document.body;
      if (
        root.scrollTop + window.innerHeight === root.offsetHeight &&
        this.state.musics.length < this.musicsList.length
      )
        this.loadMore();
    });
  }
  componentWillUnmount() {
    this.unlisten();
  }
  fetchMusics() {
    fetch("../db/db.json")
      .then((response) => response.json())
      .then((data) => {
        const id = +this.props.match.params.id || 1;
        this.music = data.musics.find((e) => e.id === id);
        data.musics.sort((a, b) => b.id - a.id);
        this.musicsList = data.musics.filter((e) => e.id !== id);
        this.setState({
          musics: this.musicsList.slice(0, 7),
        });
      });
  }
  loadMore() {
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      this.setState(({ musics }) => ({
        musics: [
          ...musics,
          ...this.musicsList.slice(musics.length, musics.length + 7),
        ],
        loading: false,
      }));
    }, 2000);
  }
  render() {
    return (
      <section>
        <div className="container">
          {this.music ? (
            <div className="music">
              <img
                src={require(`../../assets/img/${this.music.img}`)}
                className="music__img"
                alt=""
              />
              <div className="music__content">
                <h2 className="music__title">{this.music.title}</h2>
                <audio
                  ref="musicAudio"
                  className="music__audio"
                  src={require(`../../assets/audios/${this.music.audio}.mp3`)}
                  controls
                ></audio>
              </div>
            </div>
          ) : null}
          <div className="musics">
            {this.state.musics
              ? this.state.musics.map((post) => (
                  <div className="musics__card" key={post.id}>
                    <Link to={`/musics/${post.id}`}>
                      <img
                        src={require(`../../assets/img/${post.img}`)}
                        className="musics__img"
                        alt=""
                      />
                    </Link>
                    <Link to={`/musics/${post.id}`} className="musics__title">
                      {post.title}
                    </Link>
                  </div>
                ))
              : null}
          </div>
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
