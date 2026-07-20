import type { Meta, StoryObj } from "@storybook/vue3-vite";
import AtomButton from "./AtomButton.vue";

const meta: Meta<typeof AtomButton> = {
  component: AtomButton,
  title: "Components/AtomButton",
  argTypes: {
    default: { control: "text", description: "Default slot content" },
    variant: {
      control: "select",
      options: ["default", "primary", "destructive"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof AtomButton>;

const ButtonTemplate = (args: any, { argTypes }: any) => ({
  components: { AtomButton },
  props: Object.keys(argTypes),
  setup() {
    return { args };
  },
  template: `<AtomButton v-bind="args">{{ args.default }}</AtomButton>`,
});

export const Default: Story = {
  render: ButtonTemplate,
  args: {
    variant: "default",
    default: "Default Variant",
  },
};

export const Primary: Story = {
  render: ButtonTemplate,
  args: {
    variant: "primary",
    default: "Primary Variant",
  },
};

export const Destructive: Story = {
  render: ButtonTemplate,
  args: {
    variant: "destructive",
    default: "Destructive Variant",
  },
};
