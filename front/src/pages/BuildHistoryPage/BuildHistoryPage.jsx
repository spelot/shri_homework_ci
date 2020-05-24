import React, { useEffect } from "react";
import constants from "../../utils/constants";
import Header from "../../components/Header/Header";
import BuildList from "../../components/BuildList/BuildList";
import { useSelector } from "react-redux";
import {
  getSettingsConfig,
  getLanguageDictionary,
  getCurrentLanguge,
} from "../../store/reducers/settingsReducer";
import i18n from "../../utils/i18n";

function BuildHistoryPage(props) {
  const { className = "" } = props;

  const dictionary = useSelector(getLanguageDictionary);
  const currentLanguage = useSelector(getCurrentLanguge);

  useEffect(() => {
    document.title = `${i18n(
      dictionary,
      currentLanguage,
      "BUILD_HISTORY"
    )} | ${i18n(dictionary, currentLanguage, "SITE_NAME")}`;
  }, [dictionary, currentLanguage]);

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
            text: i18n(dictionary, currentLanguage, "RUN_BUILD"),
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
