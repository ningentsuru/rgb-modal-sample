import { describe, it, expect, afterEach } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import type { ComponentPublicInstance } from "vue";
import MoleculeModal from "./MoleculeModal.vue";
import { Default, DefaultOpen, HasTitle } from "./MoleculeModal.stories";

type MoleculeModalWrapper = VueWrapper<
  ComponentPublicInstance<typeof MoleculeModal>
>;

describe("MoleculeModal", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("renders properly using Storybook args (DefaultOpen)", () => {
    const wrapper: MoleculeModalWrapper = mount(MoleculeModal, {
      props: {
        title: DefaultOpen.args?.title as string,
        show: DefaultOpen.args?.show as boolean,
        onClose: () => {},
      },
      global: {
        stubs: {
          Teleport: true,
        },
      },
    });

    expect(wrapper.find('[data-testid="molecule-modal"]').exists()).toBe(true);
    expect(wrapper.text()).toContain("Close");
  });

  it("receives correct props from Storybook args (HasTitle)", () => {
    const wrapper: MoleculeModalWrapper = mount(MoleculeModal, {
      props: {
        title: HasTitle.args?.title as string,
        show: HasTitle.args?.show as boolean,
        onClose: () => {},
      },
      global: {
        stubs: {
          Teleport: true,
        },
      },
    });

    expect(wrapper.props("title")).toEqual("Hello world!");
    expect(wrapper.find("h2").text()).toContain("Hello world!");
  });

  it("does not render when show is false (Default)", () => {
    const wrapper: MoleculeModalWrapper = mount(MoleculeModal, {
      props: {
        title: Default.args?.title as string,
        show: Default.args?.show as boolean,
        onClose: () => {},
      },
      global: {
        stubs: {
          Teleport: true,
        },
      },
    });

    expect(wrapper.find('[data-testid="molecule-modal"]').exists()).toBe(false);
    expect(wrapper.html()).not.toContain("molecule-modal");
  });

  it("emits close event when close button is clicked", async () => {
    const wrapper: MoleculeModalWrapper = mount(MoleculeModal, {
      props: {
        title: "Test Modal",
        show: true,
        onClose: () => {},
      },
      global: {
        stubs: {
          Teleport: true,
          AtomButton: true,
        },
      },
    });

    const closeButton = wrapper.findComponent({ name: "AtomButton" });
    await closeButton.trigger("click");

    expect(wrapper.emitted("close")).toHaveLength(1);
  });
});
