import React from "react";
import { Link } from "react-router-dom";

function Footer(props) {
  const { modifiers } = props;

  return (
    <footer className={`${modifiers} Footer`}>
      <div className="Footer-Content">
        <div className="Footer-LinksWrapper">
          <Link to="/support" className="Footer-Link MyLink MyLink_type_footer">
            Support
          </Link>
          <Link
            to="/learning"
            className="Footer-Link MyLink MyLink_type_footer"
          >
            Learning
          </Link>
        </div>
        <div className="Footer-Credentional Text Text_type_footer">
          © 2020 Your Name
        </div>
      </div>
    </footer>
  );
}

export default Footer;
