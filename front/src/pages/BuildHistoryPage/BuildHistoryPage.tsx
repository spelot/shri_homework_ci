import React, { useEffect } from "react";
import constants from "../../utils/constants";
import Header from "../../components/Header/Header";
import BuildList from "../../components/BuildList/BuildList";
import { useSelector } from "react-redux";
import { getSettingsConfig } from "../../store/reducers/settingsReducer";
import { DefaultProps } from "../../types/defaultProps";

export interface BuildHistoryPageProps extends DefaultProps {}

function BuildHistoryPage(props: BuildHistoryPageProps) {
  const { className = "" } = props;

  useEffect(() => {
    document.title = `Build history | ${constants.SITE_NAME}`;
  }, []);

  const settingsConfig = useSelector(getSettingsConfig);

  return (
    <>
      <Header
        className="Container-Header"
        title={{
          text: settingsConfig.repoName,
          modifiers: [["type", "repositoryName"]],
        }}
        buttons={[
          {
            modifiers: [
              ["type", "control"],
              ["icon", "before"],
            ],
            onClick: constants.RUN_BUILD,
            text: "Run build",
            iconType: "play",
          },
          {
            modifiers: [
              ["type", "control"],
              ["icon", "only"],
            ],
            onClick: constants.GO_TO_SETTINGS,
            iconType: "settings",
          },
        ]}
      />
      <BuildList className={className} />
    </>
  );
}

export default BuildHistoryPage;
