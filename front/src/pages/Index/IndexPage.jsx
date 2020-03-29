import React, { useEffect } from "react";
import constants from "../../utils/constants";

function IndexPage(props) {
  const { modifiers } = props;

  useEffect(() => {
    document.title = constants.SITE_NAME;
  });

  return (
    <main className={`${modifiers} WithoutConfiguration`}>
      <div className="WithoutConfiguration-Content">
        <div className="WithoutConfiguration-Logo Icon Icon_type_settingsLogo"></div>
        <div className="WithoutConfiguration-Description Text">
          Configure repository connection{" "}
          <span className="Text-NonBreakable">
            and synchronization settings
          </span>
        </div>
        <button className="WithoutConfiguration-Button Button Button_color_accent">
          <div className="Button-Text">Open settings</div>
        </button>
      </div>
    </main>
  );
}

export default IndexPage;
