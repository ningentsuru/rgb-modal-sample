import { describe, it, expect } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import type { ComponentPublicInstance } from "vue";
import AtomInput from "./AtomInput.vue";
import { Default, WithMinMax, Disabled } from "./AtomInput.stories";

type AtomInputWrapper = VueWrapper<ComponentPublicInstance<typeof AtomInput>>;

describe("AtomInput", () => {
  it("renders properly using Storybook args (Default)", () => {
    const wrapper: AtomInputWrapper = mount(AtomInput, {
      props: {
        modelValue: Default.args?.modelValue as string | number,
        placeholder: Default.args?.placeholder,
        disabled: Default.args?.disabled,
        "onUpdate:modelValue": (e: string | number) =>
          wrapper.setProps({ modelValue: e }),
      },
    });

    const input = wrapper.find("input");
    expect(input.element.value).toBe("");
    expect(input.element.placeholder).toBe("Enter text...");
  });

  it("receives correct props and updates modelValue (WithMinMax)", async () => {
    const wrapper: AtomInputWrapper = mount(AtomInput, {
      props: {
        modelValue: WithMinMax.args?.modelValue as string | number,
        type: WithMinMax.args?.type,
        min: WithMinMax.args?.min,
        max: WithMinMax.args?.max,
        placeholder: WithMinMax.args?.placeholder,
        "onUpdate:modelValue": (e: string | number) =>
          wrapper.setProps({ modelValue: e }),
      },
    });

    const input = wrapper.find("input");

    expect(input.element.value).toBe("50");
    expect(input.element.min).toBe("0");
    expect(input.element.max).toBe("100");

    await input.setValue("75");

    expect(wrapper.props("modelValue")).toBe(75);
    expect(input.element.value).toBe("75");
  });

  it("renders as disabled", () => {
    const wrapper: AtomInputWrapper = mount(AtomInput, {
      props: {
        modelValue: Disabled.args?.modelValue as string | number,
        disabled: Disabled.args?.disabled,
        "onUpdate:modelValue": (e: string | number) =>
          wrapper.setProps({ modelValue: e }),
      },
    });

    const input = wrapper.find("input");
    expect(input.element.disabled).toBe(true);
    expect(input.element.value).toBe("Cannot edit this");
  });
});
