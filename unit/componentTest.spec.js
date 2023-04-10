// Import the `mount()` method from Vue Test Utils
import axios from "axios";
import { mount } from "@vue/test-utils";
const MockAdapter = require("axios-mock-adapter");
const mock = new MockAdapter(axios);

const MessageComponent = {
  template: "<p>{{ msg }}</p>",
  props: ["msg"]
};

it("runs a mock test", () => {
  expect(true).toBe(true);
});

it("test passing props", () => {
  const wrapper = mount(MessageComponent, {
    propsData: {
      msg: "Hello world"
    }
  });
  expect(wrapper.text()).toContain("Hello world");
});

it("test get API", async () => {
  mock.onGet("http://example.com/users").reply(200, [
    { id: 1, name: "A" },
    { id: 2, name: "B" }
  ]);

  // Call mock request
  return axios.get("http://example.com/users").then(res => {
    expect(res.data.length).toBe(2);
  });
});

it("test post API", async () => {
  mock
    .onPost("http://example.com/users", { id: "abc", name: "AAA" })
    .reply(201);

  //Call mock request
  return axios
    .post("http://example.com/users", { id: "abc", name: "AAA" })
    .then(res => {
      expect(res.status).toBe(201);
    });
});
// });
