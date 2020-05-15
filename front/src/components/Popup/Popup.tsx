import React, { useRef } from "react";
import processModifiers from "../../utils/processModifiers";
import "./Popup.scss";
import { useDispatch } from "react-redux";
import { startNewBuild } from "../../store/actions/buildsActions";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { togglePopup } from "../../store/actions/commonActions";
import { DefaultProps } from "../../types/defaultProps";

export interface PopupProps extends DefaultProps {}

function Popup(props: PopupProps) {
  const blockName = "Form";
  const { className = "", modifiers = [] } = props;

  const dispatch = useDispatch();

  const commitHashRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event && event.preventDefault();

    const commitHash = commitHashRef!.current!.value.trim();
    console.log("commitHash: ", commitHash);

    dispatch(startNewBuild(commitHash));
  };

  const handleCancel = () => {
    commitHashRef!.current!.value = "";
    dispatch(togglePopup(false));
  };

  return (
    <div className={`Popup-Wrapper`}>
      <form
        className={`Popup ${className} ${blockName} ${processModifiers(
          blockName,
          modifiers
        )}`}
        onSubmit={handleSubmit}
      >
        <div className={`${blockName}-Content`}>
          <div className={`${blockName}-Header Text Text_type_popupHeader`}>
            New build
          </div>
          <div className={`${blockName}-Item`}>
            <Input
              className={`${blockName}-Input`}
              modifiers={[["clear", "visible"]]}
              labelBefore={{
                text: "Enter the commit hash which you want to build.",
                className: `${blockName}-Label`,
                modifiers: [["type", "formLabel"]],
              }}
              id="commit"
              type="text"
              placeholder="Commit hash"
              pattern="\S+"
              name="commit"
              required
              value=""
              forwardRef={commitHashRef}
            />
          </div>
          <div className={`${blockName}-Item`}>
            <div className={`${blockName}-ButtonsBlock`}>
              <Button
                className={`${blockName}-Button`}
                modifiers={[["color", "accent"]]}
                text="Run build"
                type="submit"
              />
              <Button
                type="button"
                className={`${blockName}-Button`}
                modifiers={[["color", "transparent"]]}
                onClick={handleCancel}
                text="Cancel"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Popup;
