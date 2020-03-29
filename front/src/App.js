import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";

import { connect } from "react-redux";
import { saveSettings } from "./store/actions";

import IndexPage from "./pages/Index/IndexPage";
import SettingsPage from "./pages/Settings/SettingsPage";
import BuildHistoryPage from "./pages/BuildHistory/BuildHistoryPage";
import BuildDetailsPage from "./pages/BuildDetails/BuildDetailsPage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import "./styles/main.scss";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

export function App(props) {
  const { config, saveSettings } = props;
  let indexPageContent;
  if (config === null) {
    indexPageContent = <IndexPage modifiers="Container-Main" />;
  } else {
    indexPageContent = <BuildHistoryPage modifiers="Container-Main" />;
  }

  return (
    <Router>
      <Header />

      <Switch>
        <Route exact path="/">
          {indexPageContent}
        </Route>
        <Route path="/settings">
          <SettingsPage modifiers="Container-Main" />
        </Route>
        <Route path="/build/:buildId">
          <BuildDetailsPage modifiers="Container-Main" />
        </Route>
        <Route path="*">
          <NotFoundPage modifiers="Container-Main" />
        </Route>
      </Switch>

      <Footer modifiers="Container-Footer" />
    </Router>
  );
}

const mapStateToProps = state => ({
  config: state.config
});

const mapDispatchToProps = dispatch => ({
  saveSettings: config => dispatch(saveSettings(config))
});

export const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
