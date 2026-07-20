import { describe, it, expect } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import type { ComponentPublicInstance } from "vue";
import OrganismChangeBackgroundDiv from "./OrganismChangeBackgroundDiv.vue";
import { Default, InitialBlack } from "./OrganismChangeBackgroundDiv.stories";

type OrganismWrapper = VueWrapper<
  ComponentPublicInstance<typeof OrganismChangeBackgroundDiv>
>;

describe("OrganismChangeBackgroundDiv", () => {
  const mountWithReactiveProps = (initialArgs: any) => {
    const red = { value: initialArgs.red };
    const green = { value: initialArgs.green };
    const blue = { value: initialArgs.blue };

    const wrapper: OrganismWrapper = mount(OrganismChangeBackgroundDiv, {
      props: {
        red: red.value,
        green: green.value,
        blue: blue.value,
        onRandomizer: () => {
          red.value = Math.floor(Math.random() * 256);
          green.value = Math.floor(Math.random() * 256);
          blue.value = Math.floor(Math.random() * 256);
          wrapper.setProps({
            red: red.value,
            green: green.value,
            blue: blue.value,
          });
        },
        onColorReset: () => {
          red.value = 0;
          green.value = 0;
          blue.value = 0;
          wrapper.setProps({ red: 0, green: 0, blue: 0 });
        },
        onFixedRandomRange: (channel: string) => {
          const newVal = Math.floor(Math.random() * 256);
          if (channel === "red") {
            red.value = newVal;
            wrapper.setProps({ red: newVal });
          }
          if (channel === "green") {
            green.value = newVal;
            wrapper.setProps({ green: newVal });
          }
          if (channel === "blue") {
            blue.value = newVal;
            wrapper.setProps({ blue: newVal });
          }
        },
      },
      global: {
        stubs: {
          Teleport: true,
          MoleculeModal: true,
        },
      },
    });

    return { wrapper, red, green, blue };
  };

  it("renders properly using Storybook args (Default)", () => {
    const { wrapper } = mountWithReactiveProps(Default.args);

    expect(wrapper.find(".organism-change-background-div").exists()).toBe(true);
    expect(wrapper.text()).toContain("Change the Div background below.");

    expect(wrapper.text()).toContain(`R:${Default.args?.red}`);
    expect(wrapper.text()).toContain(`G:${Default.args?.green}`);
    expect(wrapper.text()).toContain(`B:${Default.args?.blue}`);
  });

  it("displays correct background color based on props", () => {
    const { wrapper } = mountWithReactiveProps({
      red: 50,
      green: 100,
      blue: 150,
    });

    const preview = wrapper.find(".preview");
    expect(preview.element.getAttribute("style")).toContain(
      "rgb(50, 100, 150)",
    );
  });

  it("resets colors to 0 when colorReset is emitted", async () => {
    const { wrapper } = mountWithReactiveProps({
      red: 100,
      green: 100,
      blue: 100,
    });

    const resetButton = wrapper.findAllComponents({ name: "AtomButton" }).at(2);
    expect(resetButton?.text()).toContain("Reset");

    await resetButton?.trigger("click");

    expect(wrapper.props("red")).toBe(0);
    expect(wrapper.props("green")).toBe(0);
    expect(wrapper.props("blue")).toBe(0);

    expect(wrapper.text()).toContain("R:0");
    expect(wrapper.text()).toContain("G:0");
    expect(wrapper.text()).toContain("B:0");
  });

  it("randomizes all colors when randomizer is emitted", async () => {
    const { wrapper } = mountWithReactiveProps({ red: 0, green: 0, blue: 0 });

    const randomButton = wrapper
      .findAllComponents({ name: "AtomButton" })
      .at(1);
    expect(randomButton?.text()).toContain("Random");

    await randomButton?.trigger("click");

    expect(wrapper.props("red")).not.toBe(0);
    expect(wrapper.props("green")).not.toBe(0);
    expect(wrapper.props("blue")).not.toBe(0);
  });
});
