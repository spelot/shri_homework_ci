import React, { useEffect } from "react";
import constants from "../../utils/constants";
import history from "../../history";
import WithoutConfiguration from "../../components/WithoutConfiguration/WithoutConfiguration";
import Header from "../../components/Header/Header";

function IndexPage(props) {
  const { className = "", modifiers = [] } = props;

  useEffect(() => {
    document.title = constants.SITE_NAME;
  }, []);

  return (
    <>
      <Header
        className="Container-Header"
        title={{
          text: constants.SITE_NAME,
          modifiers: [["type", "headerTitle"]],
        }}
        buttons={[
          {
            modifiers: [
              ["type", "control"],
              ["icon", "before"],
            ],
            onClick: constants.GO_TO_SETTINGS,
            text: "Settings",
            iconType: "settings",
          },
        ]}
      />
      <WithoutConfiguration
        className={className}
        modifiers={modifiers}
        actionFn={() => history.push("/settings")}
      />
    </>
  );
}

export default IndexPage;
