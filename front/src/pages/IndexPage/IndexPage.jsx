import React, { useEffect } from "react";
import constants from "../../utils/constants";
import history from "../../history";
import WithoutConfiguration from "../../components/WithoutConfiguration/WithoutConfiguration";
import Header from "../../components/Header/Header";
import { useSelector } from "react-redux";
import {
  getLanguageDictionary,
  getCurrentLanguge,
} from "../../store/reducers/settingsReducer";
import i18n from "../../utils/i18n";

function IndexPage(props) {
  const { className = "", modifiers = [] } = props;

  const dictionary = useSelector(getLanguageDictionary);
  const currentLanguage = useSelector(getCurrentLanguge);

  useEffect(() => {
    document.title = i18n(dictionary, currentLanguage, "SITE_NAME");
  }, [dictionary, currentLanguage]);

  return (
    <>
      <Header
        className="Container-Header"
        title={{
          text: i18n(dictionary, currentLanguage, "SITE_NAME"),
          modifiers: [["type", "headerTitle"]],
        }}
        buttons={[
          {
            modifiers: [
              ["type", "control"],
              ["icon", "before"],
            ],
            onClick: constants.GO_TO_SETTINGS,
            text: i18n(dictionary, currentLanguage, "SETTINGS"),
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
