import React from "react";
import NProgress from "nprogress";
import "./empty.scss";

export class Empty extends React.Component {
  componentWillMount() {
    NProgress.start();
  }
  componentDidMount() {
    document.title = "404 — Triangle";
    document.body.classList.add("full-height");
    NProgress.done();
  }
  componentWillUnmount() {
    document.body.classList.remove("full-height");
  }
  render() {
    return (
      <section class="empty">
        <div class="container">
          <div class="empty__content">
            <h2 class="empty__title">404</h2>
            <p class="empty__txt">Whoops! Nothing here pal.</p>
          </div>
        </div>
      </section>
    );
  }
}
