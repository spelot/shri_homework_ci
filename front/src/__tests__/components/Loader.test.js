import React from "react";
import { shallow, mount } from "enzyme";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

import Loader from "../../components/Loader/Loader";

describe("Loader Component Tests", () => {
  describe("render without crashing", () => {
    const initialState = {
      common: {},
      settings: {},
      builds: {},
    };
    const mockStore = configureStore();
    let store, wrapper;

    const className = "Container-Main";

    beforeEach(() => {
      store = mockStore(initialState);
      wrapper = mount(
        <Provider store={store}>
          <Loader className={className} />
        </Provider>
      );
    });

    // console.log(wrapper.debug());

    it("should render the connected component", () => {
      expect(wrapper.find(Loader).length).toEqual(1);
    });
    it("should have 'Container-Main' class", () => {
      expect(wrapper.find(Loader).hasClass(className)).toEqual(true);
    });
  });
});
