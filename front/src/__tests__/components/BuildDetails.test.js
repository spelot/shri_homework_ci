import React from "react";
import { shallow, mount } from "enzyme";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import history from "../../history";
import thunk from "redux-thunk";

const middlewares = [thunk];

import BuildDetails from "../../components/BuildDetails/BuildDetails";

describe("BuildDetails Component Tests", () => {
  describe("render without crashing", () => {
    const initialState = {
      common: {},
      settings: {
        config: {},
      },
      builds: {},
    };
    const mockStore = configureStore(middlewares);
    let store, wrapper;

    const className = "Container-Main";

    beforeEach(() => {
      store = mockStore(initialState);
      wrapper = mount(
        <Provider store={store}>
          <Router history={history}>
            <BuildDetails className={className} />
          </Router>
        </Provider>
      );
    });

    // console.log(wrapper.debug());

    it("should render the connected component", () => {
      expect(wrapper.find(BuildDetails).length).toEqual(1);
    });
    it("should have 'Container-Main' class", () => {
      expect(wrapper.find(BuildDetails).hasClass(className)).toEqual(true);
    });
  });
});
