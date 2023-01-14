import NavBar from "./components/NavBar";
import News from "./components/News";
import LoadingBar from "react-top-loading-bar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
const App = () => {
  const pageSize = 6;
  const apiKey = process.env.REACT_APP_NEWS_API;
  const [progress, setProgress] = useState(0);

  return (
    <Router>
      <NavBar />
      <LoadingBar color="#f11946" progress={progress} />
      <Switch>
        <Route exact path="/business">
          <News
            setProgress={setProgress}
            pageSize={pageSize}
            apiKey={apiKey}
            key="business"
            country="in"
            category="business"
          />
        </Route>
        <Route exact path="/entertainment">
          <News
            setProgress={setProgress}
            pageSize={pageSize}
            apiKey={apiKey}
            key="entertainment"
            country="in"
            category="entertainment"
          />
        </Route>
        <Route exact path="/">
          <News
            setProgress={setProgress}
            pageSize={pageSize}
            apiKey={apiKey}
            key="general"
            country="in"
            category="general"
          />
        </Route>
        <Route exact path="/health">
          <News
            setProgress={setProgress}
            pageSize={pageSize}
            apiKey={apiKey}
            key="health"
            country="in"
            category="health"
          />
        </Route>
        <Route exact path="/science">
          <News
            setProgress={setProgress}
            pageSize={pageSize}
            apiKey={apiKey}
            key="science"
            country="in"
            category="science"
          />
        </Route>
        <Route exact path="/sports">
          <News
            setProgress={setProgress}
            pageSize={pageSize}
            apiKey={apiKey}
            key="sports"
            country="in"
            category="sports"
          />
        </Route>
        <Route exact path="/technology">
          <News
            setProgress={setProgress}
            pageSize={pageSize}
            apiKey={apiKey}
            key="technology"
            country="in"
            category="technology"
          />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
