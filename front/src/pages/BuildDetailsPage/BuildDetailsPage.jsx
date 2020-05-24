import React, { useEffect } from "react";
import constants from "../../utils/constants";
import BuildDetails from "../../components/BuildDetails/BuildDetails";
import { useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import {
  getSettingsConfig,
  getLanguageDictionary,
  getCurrentLanguge,
} from "../../store/reducers/settingsReducer";
import i18n from "../../utils/i18n";

function BuildDetailsPage(props) {
  const { className = "" } = props;

  const dictionary = useSelector(getLanguageDictionary);
  const currentLanguage = useSelector(getCurrentLanguge);

  useEffect(() => {
    document.title = `${i18n(
      dictionary,
      currentLanguage,
      "BUILD_DETAILS"
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
            onClick: constants.REBUILD,
            text: i18n(dictionary, currentLanguage, "REBUILD"),
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
