import React, { useEffect } from "react";
import constants from "../../utils/constants";
import Header from "../../components/Header/Header";
import Form from "../../components/Form/Form";

function SettingsPage(props) {
  const { className = "", modifiers = [] } = props;

  useEffect(() => {
    document.title = `Settings | ${constants.SITE_NAME}`;
  }, []);

  return (
    <>
      <Header
        className="Container-Header"
        title={{
          text: constants.SITE_NAME,
          modifiers: [["type", "headerTitle"]]
        }}
      />
      <Form className={className} modifiers={modifiers} />
    </>
  );
}

export default SettingsPage;
