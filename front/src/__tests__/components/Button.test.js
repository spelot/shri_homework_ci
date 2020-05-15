import React from "react";
import { shallow, mount } from "enzyme";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import history from "../../history";

import Button from "../../components/Button/Button";

describe("Button Component Tests", () => {
  describe("render without crashing", () => {
    const initialState = {
      common: {},
      settings: {
        config: {},
      },
      builds: {},
    };
    const mockStore = configureStore();
    let store, wrapper;

    const className = "Container-Main";

    beforeEach(() => {
      store = mockStore(initialState);
      wrapper = mount(
        <Provider store={store}>
          <Router history={history}>
            <Button className={className} />
          </Router>
        </Provider>
      );
    });

    // console.log(wrapper.debug());

    it("should render the connected component", () => {
      expect(wrapper.find(Button).length).toEqual(1);
    });
    it("should have 'Container-Main' class", () => {
      expect(wrapper.find(Button).hasClass(className)).toEqual(true);
    });
  });
});
