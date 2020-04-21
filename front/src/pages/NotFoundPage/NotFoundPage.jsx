import React, { useEffect } from "react";
import NotFound from "../../components/NotFound/NotFound";
import constants from "../../utils/constants";
import Header from "../../components/Header/Header";

function NotFoundPage(props) {
  const { className = "", modifiers = [] } = props;

  useEffect(() => {
    document.title = `Page not found | ${constants.SITE_NAME}`;
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
      <NotFound className={className} modifiers={modifiers} />
    </>
  );
}

export default NotFoundPage;
