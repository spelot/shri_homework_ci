import React from "react";
import processModifiers from "../../utils/processModifiers";
import "./BuildLog.scss";
import { DefaultProps } from "../../types/defaultProps";

export interface BuildLogProps extends DefaultProps {
  logString: string;
}

function BuildLog(props: BuildLogProps) {
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
