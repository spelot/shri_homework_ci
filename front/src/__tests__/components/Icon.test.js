import React from "react";
import { shallow, mount } from "enzyme";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

import Icon from "../../components/Icon/Icon";

describe("Icon Component Tests", () => {
  describe("render without crashing", () => {
    const className = "Container-Main";

    const wrapper = shallow(<Icon className={className} />);
    // console.log(wrapper.debug());

    it("should have 'Container-Main' classes", () => {
      expect(wrapper.hasClass(className)).toEqual(true);
    });
  });
});
