import React from "react";
import processModifiers from "../../utils/processModifiers";
import "./BuildLog.scss";

function BuildLog(props) {
  const blockName = "BuildLog";
  const { className = "", modifiers = [], logString = "" } = props;

  return (
    <pre
      className={`${className} ${blockName} ${processModifiers(
        blockName,
        modifiers
      )}`}
      dangerouslySetInnerHTML={{ __html: logString }}
    />
  );
}

export default BuildLog;
