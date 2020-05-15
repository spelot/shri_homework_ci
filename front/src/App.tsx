import React, { useEffect } from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import IndexPage from "./pages/IndexPage/IndexPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import BuildHistoryPage from "./pages/BuildHistoryPage/BuildHistoryPage";
import BuildDetailsPage from "./pages/BuildDetailsPage/BuildDetailsPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import "./styles/main.scss";

import Footer from "./components/Footer/Footer";
import { getSettingsConfig } from "./store/reducers/settingsReducer";
import history from "./history";
import { fetchSettingsBeforeUsingApp } from "./store/actions/settingsActions";
import {
  getIsAppLoading,
  getIsPopupActive,
  getIsInProgress,
} from "./store/reducers/commonReducer";
import Loader from "./components/Loader/Loader";
import Popup from "./components/Popup/Popup";

function App() {
  const isFetching = useSelector(getIsAppLoading);
  const isPopupActive = useSelector(getIsPopupActive);
  const isInProgress = useSelector(getIsInProgress);
  const settingsConfig = useSelector(getSettingsConfig);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSettingsBeforeUsingApp());
  }, [dispatch]);

  useEffect(() => {
    const root = document.getElementById("root")!;
    if (isPopupActive) {
      root.classList.add("Container_popup_active");
    } else {
      root.classList.remove("Container_popup_active");
    }
  }, [isPopupActive]);

  useEffect(() => {
    const root = document.getElementById("root")!;
    if (isInProgress) {
      root.classList.add("Container_inactive");
    } else {
      root.classList.remove("Container_inactive");
    }
  }, [isInProgress]);

  return (
    <>
      {isFetching ? (
        <Loader />
      ) : (
        <Router history={history}>
          <Switch>
            <Route
              exact
              path="/"
              render={() =>
                settingsConfig.repoName ? (
                  <BuildHistoryPage className="Container-Main" />
                ) : (
                  <IndexPage className="Container-Main" />
                )
              }
            />
            <Route
              path="/build/:buildId"
              render={({ location }) =>
                settingsConfig.repoName ? (
                  <BuildDetailsPage className="Container-Main" />
                ) : (
                  <Redirect to={{ pathname: "/", state: { from: location } }} />
                )
              }
            />
            <Route path="/settings">
              <SettingsPage className="Container-Main" />
            </Route>
            <Route path="*">
              <NotFoundPage className="Container-Main" />
            </Route>
          </Switch>

          <Footer className="Container-Footer" />
          {isPopupActive && <Popup modifiers={[["popup"]]} />}
        </Router>
      )}
    </>
  );
}

export default App;
