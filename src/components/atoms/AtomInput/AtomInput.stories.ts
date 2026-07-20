import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { ref } from "vue";
import AtomInput from "./AtomInput.vue";

const meta: Meta<typeof AtomInput> = {
  component: AtomInput,
  title: "Components/AtomInput",
  argTypes: {
    modelValue: { control: "text", description: "Input value (v-model)" },
    disabled: { control: "boolean" },
    min: { control: "number" },
    max: { control: "number" },
  },
};

export default meta;
type Story = StoryObj<typeof AtomInput>;

const InputTemplate = (args: any) => ({
  components: { AtomInput },
  setup() {
    const model = ref(args.modelValue);

    return { args, model };
  },
  template: `
    <AtomInput 
      v-bind="args" 
      :modelValue="model" 
      @update:modelValue="model = $event" 
    />
  `,
});

export const Default: Story = {
  render: InputTemplate,
  args: {
    modelValue: "",
    placeholder: "Enter text...",
    disabled: false,
  },
};

export const WithMinMax: Story = {
  render: InputTemplate,
  args: {
    modelValue: 50,
    type: "number",
    min: 0,
    max: 100,
    placeholder: "0 to 100",
  },
};

export const Disabled: Story = {
  render: InputTemplate,
  args: {
    modelValue: "Cannot edit this",
    disabled: true,
  },
};
