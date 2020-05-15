import React from "react";
import Button from "../../components/Button/Button";
import Icon from "../../components/Icon/Icon";
import processModifiers from "../../utils/processModifiers";
import "./WithoutConfiguration.scss";
import { DefaultProps } from "../../types/defaultProps";

export interface WithoutConfigurationProps extends DefaultProps {
  actionFn?: () => void;
}

function WithoutConfiguration(props: WithoutConfigurationProps) {
  const blockName = "WithoutConfiguration";
  const { className = "", modifiers = [], actionFn } = props;

  return (
    <main
      className={`${className} ${blockName} ${processModifiers(
        blockName,
        modifiers
      )}`}
    >
      <div className={`${blockName}-Content`}>
        <Icon
          className={`${blockName}-Logo`}
          modifiers={[["type", "settingsLogo"]]}
        />
        <div className={`${blockName}-Description Text`}>
          Configure repository connection and synchronization settings
        </div>
        <Button
          className={`${blockName}-Button`}
          modifiers={[["color", "accent"]]}
          onClick={actionFn}
          text="Open settings"
        />
      </div>
    </main>
  );
}

export default WithoutConfiguration;
