import React from "react";
import { Switch, Route } from "react-router-dom";

function Header(props) {
  const { modifiers } = props;

  // TODO:
  // добавить хедер на странице build-history

  const indexHeader = (
    <header className={`${modifiers} Header`}>
      <div className="Header-Content">
        <div className="Header-Title Text Text_type_headerTitle">
          School CI server
        </div>
        <div className="Header-ButtonsBlock">
          <button className="Button Button_type_control Button_icon_before">
            <div className="Button-Icon Icon Icon_type_settings"></div>
            <div className="Button-Text">Settings</div>
          </button>
        </div>
      </div>
    </header>
  );

  const settingsHeader = (
    <header className={`${modifiers} Header`}>
      <div className="Header-Content">
        <div className="Header-Title Text Text_type_headerTitle">
          School CI server
        </div>
      </div>
    </header>
  );

  const buildDetailsHeader = (
    <header className={`${modifiers} Header`}>
      <div className="Header-Content">
        <div className="Header-Title Text Text_type_repositoryName">
          philip1967/my-awesome-repo
        </div>
        <div className="Header-ButtonsBlock">
          <button className="Header-Button Button Button_type_control Button_icon_before">
            <div className="Button-Icon Icon Icon_type_restart"></div>
            <div className="Button-Text">Rebuild</div>
          </button>
          <button className="Header-Button Button Button_type_control Button_icon_only">
            <div className="Button-Icon Icon Icon_type_settings"></div>
          </button>
        </div>
      </div>
    </header>
  );

  const notFoundHeader = (
    <header className={`${modifiers} Header`}>
      <div className="Header-Content">
        <div className="Header-Title Text Text_type_headerTitle">
          School CI server
        </div>
      </div>
    </header>
  );

  return (
    <Switch>
      <Route exact path="/">
        {indexHeader}
      </Route>
      <Route path="/settings">{settingsHeader}</Route>
      <Route path="/build/:buildId">{buildDetailsHeader}</Route>
      <Route path="*">{notFoundHeader}</Route>
    </Switch>
  );
}

export default Header;
