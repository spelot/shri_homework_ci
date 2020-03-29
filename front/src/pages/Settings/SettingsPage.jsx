import React, { useEffect } from "react";
import constants from "../../utils/constants";
import { useHistory } from "react-router-dom";

function SettingsPage(props) {
  const { modifiers } = props;

  const history = useHistory();

  useEffect(() => {
    document.title = `Settings | ${constants.SITE_NAME}`;
  });

  return (
    <form className={`${modifiers} Form`}>
      <div className="Form-Content">
        <div className="Form-Item Form-Item_type_header">
          <div className="Form-Label Text Text_type_formHeader">Settings</div>
          <div className="Text">
            Configure repository connection{" "}
            <span className="Text-NonBreakable">
              and synchronization settings
            </span>
          </div>
        </div>
        <div className="Form-Item">
          <label
            htmlFor="repository"
            className="Form-Label Form-Label_type_required Text Text_type_formLabel"
          >
            GitHub repository
          </label>
          <div className="Form-Input Input Input_clear_visible">
            <input
              id="repository"
              className="Input-Control"
              type="text"
              value=""
              placeholder="user-name/repo-name"
              name="repository"
              required
            />
            <div className="Input-ClearIcon Icon Icon_type_clear"></div>
          </div>
        </div>
        <div className="Form-Item">
          <label
            htmlFor="command"
            className="Form-Label Text Text_type_formLabel"
          >
            Build command
          </label>
          <div className="Form-Input Input Input_clear_visible">
            <input
              id="command"
              className="Input-Control"
              type="text"
              value=""
              placeholder="npm ci && npm run build"
              name="command"
            />
            <div className="Input-ClearIcon Icon Icon_type_clear"></div>
          </div>
        </div>
        <div className="Form-Item">
          <label
            htmlFor="branch"
            className="Form-Label Text Text_type_formLabel"
          >
            Main branch
          </label>
          <div className="Form-Input Input Input_clear_visible">
            <input
              id="branch"
              className="Input-Control"
              type="text"
              value=""
              placeholder="master"
              name="branch"
            />
            <div className="Input-ClearIcon Icon Icon_type_clear"></div>
          </div>
        </div>
        <div className="Form-Item Form-Item_type_flat">
          <div className="Form-Label Text">Synchronize every</div>
          <div className="Form-Input Input Input_size_small Input_align_right">
            <input
              id="minutes"
              className="Input-Control"
              name="minutes"
              type="text"
              value="10"
              inputMode="numeric"
              pattern="^[0]*[1-9][\d]*$"
              required
            />
          </div>
          <div className="Form-Label Text">minutes</div>
        </div>
        <div className="Form-Item">
          <div className="Form-ButtonsBlock">
            <button
              type="submit"
              className="Form-Button Button Button_color_accent"
            >
              <div className="Button-Text">Save</div>
            </button>
            <button
              type="button"
              className="Form-Button Button"
              onClick={() => history.goBack()}
            >
              <div className="Button-Text">Cancel</div>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default SettingsPage;
