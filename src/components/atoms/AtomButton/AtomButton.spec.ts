import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import AtomButton from "./AtomButton.vue";
import { Default, Primary, Destructive } from "./AtomButton.stories";

describe("AtomButton", () => {
  it("renders properly using Storybook args (Default)", () => {
    const wrapper = mount(AtomButton, {
      props: {
        variant: Default.args?.variant,
      },
      slots: {
        default: Default.args?.default as string,
      },
    });

    expect(wrapper.text()).toContain("Default Variant");
  });

  it("receives correct props from Storybook args (Primary)", () => {
    const wrapper = mount(AtomButton, {
      props: {
        variant: Primary.args?.variant,
      },
      slots: {
        default: Primary.args?.default as string,
      },
    });

    expect(wrapper.props("variant")).toEqual("primary");
    expect(wrapper.text()).toContain("Primary Variant");
  });

  it("renders Destructive variant correctly", () => {
    const wrapper = mount(AtomButton, {
      props: {
        variant: Destructive.args?.variant,
      },
      slots: {
        default: Destructive.args?.default as string,
      },
    });

    expect(wrapper.props("variant")).toEqual("destructive");
    expect(wrapper.text()).toContain("Destructive Variant");
  });
});
