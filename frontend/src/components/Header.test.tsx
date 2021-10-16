import { shallow } from "enzyme";

import Header from "./Header";

describe("Header", () => {
  const wrapper = shallow(
    <Header>
      <p>Yeah!</p>
    </Header>
  );

  describe("renders", () => {
    it("should load default text", () => {
      expect(wrapper.contains("Home")).toBe(true);
    });
  });
});
