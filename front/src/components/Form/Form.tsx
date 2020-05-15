import React, { useRef } from "react";
import history from "../../history";
import { useDispatch, useSelector } from "react-redux";
import processModifiers from "../../utils/processModifiers";
import { saveSettings } from "../../store/actions/settingsActions";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import "./Form.scss";
import { DefaultProps } from "../../types/defaultProps";
import {
  getRepositoryName,
  getBuildCommand,
  getMainBranch,
  getPeriod,
} from "../../store/reducers/settingsReducer";

export interface FormProps extends DefaultProps {}

function Form(props: FormProps) {
  const blockName = "Form";
  const { className = "", modifiers = [] } = props;

  const dispatch = useDispatch();

  const repositoryNameRef = useRef<HTMLInputElement>(null);
  const buildCommandRef = useRef<HTMLInputElement>(null);
  const mainBranchRef = useRef<HTMLInputElement>(null);
  const periodRef = useRef<HTMLInputElement>(null);

  const repositoryName = useSelector(getRepositoryName);
  const buildCommand = useSelector(getBuildCommand);
  const mainBranch = useSelector(getMainBranch);
  const period = useSelector(getPeriod);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event && event.preventDefault();

    const config = {
      repoName: repositoryNameRef!.current!.value,
      buildCommand: buildCommandRef!.current!.value,
      mainBranch: mainBranchRef!.current!.value,
      period: (periodRef!.current!.value as unknown) as number,
    };
    console.log("config: ", config);

    dispatch(saveSettings(config));
  };

  const handleCancel = () => {
    history.goBack();
  };

  return (
    <form
      className={`${className} ${blockName} ${processModifiers(
        blockName,
        modifiers
      )}`}
      onSubmit={handleSubmit}
    >
      <div className={`${blockName}-Content`}>
        <div className={`${blockName}-Item ${blockName}-Item_type_header`}>
          <div className={`${blockName}-Label Text Text_type_formHeader`}>
            Settings
          </div>
          <div className="Text">
            Configure repository connection{" "}
            <span className="Text-NonBreakable">
              and synchronization settings
            </span>
          </div>
        </div>
        <div className={`${blockName}-Item`}>
          <Input
            className={`${blockName}-Input`}
            modifiers={[["clear", "visible"]]}
            labelBefore={{
              text: "GitHub repository",
              className: `${blockName}-Label ${blockName}-Label_type_required`,
              modifiers: [["type", "formLabel"]],
            }}
            id="repository"
            type="text"
            placeholder="user-name/repo-name"
            name="repository"
            required
            value={repositoryName}
            forwardRef={repositoryNameRef}
          />
        </div>
        <div className={`${blockName}-Item`}>
          <Input
            className={`${blockName}-Input`}
            modifiers={[["clear", "visible"]]}
            labelBefore={{
              text: "Build command",
              className: `${blockName}-Label`,
              modifiers: [["type", "formLabel"]],
            }}
            id="command"
            type="text"
            placeholder="npm ci && npm run build"
            name="command"
            required
            value={buildCommand}
            forwardRef={buildCommandRef}
          />
        </div>
        <div className={`${blockName}-Item`}>
          <Input
            className={`${blockName}-Input`}
            modifiers={[["clear", "visible"]]}
            labelBefore={{
              text: "Main branch",
              className: `${blockName}-Label`,
              modifiers: [["type", "formLabel"]],
            }}
            id="branch"
            type="text"
            placeholder="master"
            name="branch"
            required
            value={mainBranch}
            forwardRef={mainBranchRef}
          />
        </div>
        <div className={`${blockName}-Item ${blockName}-Item_type_flat`}>
          <Input
            className={`${blockName}-Input`}
            modifiers={[
              ["size", "small"],
              ["align", "right"],
            ]}
            labelBefore={{
              text: "Synchronize every",
              className: `${blockName}-Label`,
              modifiers: [],
            }}
            labelAfter={{
              text: "minutes",
              className: `${blockName}-Label`,
              modifiers: [],
            }}
            id="minutes"
            type="text"
            inputMode="numeric"
            pattern="^[0]*[1-9][\d]*$"
            name="minutes"
            required
            value={period as string}
            forwardRef={periodRef}
          />
        </div>
        <div className={`${blockName}-Item`}>
          <div className={`${blockName}-ButtonsBlock`}>
            <Button
              className={`${blockName}-Button`}
              modifiers={[["color", "accent"]]}
              text="Save"
              type="submit"
            />
            <Button
              type="button"
              className={`${blockName}-Button`}
              onClick={handleCancel}
              text="Cancel"
            />
          </div>
        </div>
      </div>
    </form>
  );
}

export default Form;
