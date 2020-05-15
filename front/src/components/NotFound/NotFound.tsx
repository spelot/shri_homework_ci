import React from "react";
import processModifiers from "../../utils/processModifiers";
import { Link } from "react-router-dom";
import "./NotFound.scss";
import { DefaultProps } from "../../types/defaultProps";

export interface NotFoundProps extends DefaultProps {}

function NotFound(props: NotFoundProps) {
  const blockName = "NotFound";
  const { className = "", modifiers = [] } = props;

  return (
    <main
      className={`${className} ${blockName} ${processModifiers(
        blockName,
        modifiers
      )}`}
    >
      <div className={`${blockName}-Content`}>
        Page not found. Error 404. <Link to="/">Go to home page</Link>.
      </div>
    </main>
  );
}

export default NotFound;
