import React, { useEffect } from "react";
import constants from "../../utils/constants";
import BuildDetails from "../../components/BuildDetails/BuildDetails";
import { useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import { getSettingsConfig } from "../../store/reducers/settingsReducer";
import { DefaultProps } from "../../types/defaultProps";

export interface BuildDetailsPageProps extends DefaultProps {}

function BuildDetailsPage(props: BuildDetailsPageProps) {
  const { className = "" } = props;

  useEffect(() => {
    document.title = `Build details | ${constants.SITE_NAME}`;
  }, []);

  const settingsConfig = useSelector(getSettingsConfig);

  return (
    <>
      <Header
        className="Container-Header"
        title={{
          text: settingsConfig.repoName!,
          modifiers: [["type", "repositoryName"]],
        }}
        buttons={[
          {
            modifiers: [
              ["type", "control"],
              ["icon", "before"],
            ],
            onClick: constants.REBUILD,
            text: "Rebuild",
            iconType: "restart",
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
      <BuildDetails className={className} />
    </>
  );
}

export default BuildDetailsPage;
