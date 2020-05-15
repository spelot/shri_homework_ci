import React from "react";
import { Link } from "react-router-dom";
import processModifiers from "../../utils/processModifiers";
import "./Footer.scss";
import { DefaultProps } from "../../types/defaultProps";

export interface FooterProps extends DefaultProps {}

function Footer(props: FooterProps) {
  const blockName = "Footer";
  const { className = "", modifiers = [] } = props;

  return (
    <footer
      className={`${className} ${blockName} ${processModifiers(
        blockName,
        modifiers
      )}`}
    >
      <div className={`${blockName}-Content`}>
        <div className={`${blockName}-LinksWrapper`}>
          <Link
            to="/support"
            className={`${blockName}-Link MyLink MyLink_type_footer`}
          >
            Support
          </Link>
          <Link
            to="/learning"
            className={`${blockName}-Link MyLink MyLink_type_footer`}
          >
            Learning
          </Link>
        </div>
        <div className={`${blockName}-Credentional Text Text_type_footer`}>
          © 2020 Your Name
        </div>
      </div>
    </footer>
  );
}

export default Footer;
