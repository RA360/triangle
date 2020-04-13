import React from "react";
import NProgress from "nprogress";
import "./home.scss";

export class Home extends React.Component {
  UNSAFE_componentWillMount() {
    NProgress.start();
  }
  componentDidMount() {
    document.title = "Home — Triangle";
    document.body.classList.add("full-height");
    NProgress.done();
  }
  componentWillUnmount() {
    document.body.classList.remove("full-height");
  }
  render() {
    return (
      <section className="home">
        <div className="container">
          <div className="home__row">
            <h1 className="home__title">
              Great
              <span className="italic">Music</span> Production.
            </h1>
            <p className="slogan">Breath, Music, Repeat.</p>
          </div>
        </div>
      </section>
    );
  }
}
