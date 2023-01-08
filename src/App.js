import NavBar from "./components/NavBar";
import News from "./components/News";
import LoadingBar from "react-top-loading-bar";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Component } from "react";

export default class App extends Component {
  pageSize = 6;

  state = {
    progress: 0,
  };

  setProgress = (progress) => {
    this.setState({ progress: progress });
  };

  render() {
    return (
      <Router>
        <NavBar />
        <LoadingBar color="#f11946" progress={this.state.progress} />
        <Switch>
          <Route exact path="/business">
            <News
              setProgress={this.setProgress}
              pageSize={this.pageSize}
              key="business"
              country="in"
              category="business"
            />
          </Route>
          <Route exact path="/entertainment">
            <News
              setProgress={this.setProgress}
              pageSize={this.pageSize}
              key="entertainment"
              country="in"
              category="entertainment"
            />
          </Route>
          <Route exact path="/">
            <News
              setProgress={this.setProgress}
              pageSize={this.pageSize}
              key="general"
              country="in"
              category="general"
            />
          </Route>
          <Route exact path="/health">
            <News
              setProgress={this.setProgress}
              pageSize={this.pageSize}
              key="health"
              country="in"
              category="health"
            />
          </Route>
          <Route exact path="/science">
            <News
              setProgress={this.setProgress}
              pageSize={this.pageSize}
              key="science"
              country="in"
              category="science"
            />
          </Route>
          <Route exact path="/sports">
            <News
              setProgress={this.setProgress}
              pageSize={this.pageSize}
              key="sports"
              country="in"
              category="sports"
            />
          </Route>
          <Route exact path="/technology">
            <News
              setProgress={this.setProgress}
              pageSize={this.pageSize}
              key="technology"
              country="in"
              category="technology"
            />
          </Route>
        </Switch>
      </Router>
    );
  }
}

