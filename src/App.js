import React from "react";
import { CSSTransition } from "react-transition-group";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { News } from "./pages/news/News";
import { NewsPost } from "./pages/news/NewsPost";
import { Musics } from "./pages/musics/Musics";
import { Videos } from "./pages/videos/Videos";
import { Empty } from "./pages/empty/Empty";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      animSpectrs: true,
      openDropdown: false,
      userStopBgAudio: false,
      showScrollBtn: false,
    };
    this.bgAudio = React.createRef();
    this.playBgAudio = this.playBgAudio.bind(this);
    this.stopBgAudio = this.stopBgAudio.bind(this);
    this.setAudioState = this.setAudioState.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
    this.showScrollBtn = this.showScrollBtn.bind(this);
  }
  componentDidMount() {
    this.bgAudio.current.volume = 0.1;
    document.addEventListener("playing", this.stopBgAudio, true);
    document.addEventListener("pause", this.playBgAudio, true);
    window.addEventListener("scroll", this.showScrollBtn);
  }
  setAudioState() {
    if (this.state.animSpectrs) {
      this.setState({
        animSpectrs: false,
        userStopBgAudio: true,
      });
      this.bgAudio.current.pause();
    } else {
      this.setState({
        animSpectrs: true,
        userStopBgAudio: false,
      });
      this.bgAudio.current.play();
    }
  }
  playBgAudio(e) {
    if (e.target !== this.bgAudio.current && !this.state.userStopBgAudio) {
      this.setState({
        animSpectrs: true,
      });
      this.bgAudio.current.play();
    }
  }
  stopBgAudio(e) {
    if (e.target !== this.bgAudio.current && !this.state.userStopBgAudio) {
      this.setState({
        animSpectrs: false,
      });
      this.bgAudio.current.pause();
    }
  }
  showScrollBtn() {
    const root = document.documentElement || document.body;
    this.setState({
      showScrollBtn: root.scrollTop > 0,
    });
  }
  scrollToTop() {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }
  toggleDropdown() {
    this.setState(({ openDropdown }) => ({
      openDropdown: !openDropdown,
    }));
  }
  closeDropdown() {
    this.setState({
      openDropdown: false,
    });
  }
  render() {
    return (
      <BrowserRouter>
        <div className={`App ${this.state.openDropdown ? "full-height" : ""}`}>
          <header className="header">
            <div className="container">
              <div className="header__row">
                <NavLink to="/">
                  <img src={require("./assets/img/logo.svg")} alt="Triangle" />
                </NavLink>
                <nav className="menu hidden">
                  <li className="menu__item">
                    <NavLink
                      to="/"
                      className="menu__link"
                      activeClassName="active"
                      exact
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="menu__item">
                    <NavLink
                      to="/news"
                      className="menu__link"
                      activeClassName="active"
                    >
                      News
                    </NavLink>
                  </li>
                  <li className="menu__item">
                    <NavLink
                      to="/musics"
                      className="menu__link"
                      activeClassName="active"
                    >
                      Musics
                    </NavLink>
                  </li>
                  <li className="menu__item">
                    <NavLink
                      to="/videos"
                      className="menu__link"
                      activeClassName="active"
                    >
                      Videos
                    </NavLink>
                  </li>
                </nav>
                <div
                  onClick={this.setAudioState}
                  className={`spectrs ${
                    this.state.animSpectrs ? "active" : ""
                  }`}
                >
                  <div className="spectr"></div>
                  <div className="spectr spectr2"></div>
                  <div className="spectr spectr3"></div>
                  <div className="spectr spectr4"></div>
                  <div className="spectr spectr5"></div>
                </div>
                <audio
                  ref={this.bgAudio}
                  className="bg-audio"
                  src={require("./assets/audios/bg.mp3")}
                  autoPlay
                  loop
                ></audio>
                <button
                  className="hamburger"
                  onClick={this.toggleDropdown}
                  style={{
                    background: `url(${require(`./assets/img/${
                      this.openDropdown ? "cross" : "hamburger"
                    }.svg`)}) no-repeat center`,
                  }}
                ></button>
              </div>
            </div>
          </header>
          <CSSTransition
            in={this.state.openDropdown}
            timeout={200}
            classNames="dropdown fade"
            mountOnEnter
            unmountOnExit
          >
            <div>
              <nav className="menu">
                <li className="menu__item">
                  <NavLink
                    to="/"
                    className="menu__link"
                    activeClassName="active"
                    onClick={this.closeDropdown}
                    exact
                  >
                    Home
                  </NavLink>
                </li>
                <li className="menu__item">
                  <NavLink
                    to="/news"
                    className="menu__link"
                    activeClassName="active"
                    onClick={this.closeDropdown}
                  >
                    News
                  </NavLink>
                </li>
                <li className="menu__item">
                  <NavLink
                    to="/musics"
                    className="menu__link"
                    activeClassName="active"
                    onClick={this.closeDropdown}
                  >
                    Musics
                  </NavLink>
                </li>
                <li className="menu__item">
                  <NavLink
                    to="/videos"
                    className="menu__link"
                    activeClassName="active"
                    onClick={this.closeDropdown}
                  >
                    Videos
                  </NavLink>
                </li>
              </nav>
            </div>
          </CSSTransition>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/news" component={News} exact />
            <Route path="/news/:id" component={NewsPost} />
            <Route path="/musics/:id?" component={Musics} exact />
            <Route path="/videos" component={Videos} />
            <Route path="*" component={Empty} />
          </Switch>
        </div>
        {this.state.showScrollBtn ? (
          <button className="scroll" onClick={this.scrollToTop}></button>
        ) : null}
      </BrowserRouter>
    );
  }
}

export default App;
