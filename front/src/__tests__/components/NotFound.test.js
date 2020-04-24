import React from "react";
import { shallow, mount } from "enzyme";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

import NotFound from "../../components/NotFound/NotFound";
import { Link } from "react-router-dom";

describe("NotFound Component Tests", () => {
  describe("render without crashing", () => {
    const className = "Container-Main";

    const wrapper = shallow(<NotFound className={className} />);
    // console.log(wrapper.debug());

    it("should have 'Container-Main' classes", () => {
      expect(wrapper.hasClass(className)).toEqual(true);
    });

    it("should render 1 Link", () => {
      expect(wrapper.find(Link)).toHaveLength(1);
    });
  });
});
