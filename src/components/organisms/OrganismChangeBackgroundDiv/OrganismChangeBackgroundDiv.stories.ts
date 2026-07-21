import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { ref } from "vue";
import OrganismChangeBackgroundDiv from "./OrganismChangeBackgroundDiv.vue";

const meta: Meta<typeof OrganismChangeBackgroundDiv> = {
  component: OrganismChangeBackgroundDiv,
  title: "Components/OrganismChangeBackgroundDiv",
  argTypes: {
    red: {
      control: "number",
      min: 0,
      max: 255,
      description: "Red channel value",
    },
    green: {
      control: "number",
      min: 0,
      max: 255,
      description: "Green channel value",
    },
    blue: {
      control: "number",
      min: 0,
      max: 255,
      description: "Blue channel value",
    },
    onRandomizer: { action: "randomizer" },
    onColorReset: { action: "colorReset" },
    onFixedRandomRange: { action: "fixedRandomRange" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const OrganismTemplate = (args: any) => ({
  components: { OrganismChangeBackgroundDiv },
  setup() {
    const red = ref(args.red);
    const green = ref(args.green);
    const blue = ref(args.blue);

    const handleRandomizer = () => {
      red.value = Math.floor(Math.random() * 256);
      green.value = Math.floor(Math.random() * 256);
      blue.value = Math.floor(Math.random() * 256);
    };

    const handleColorReset = () => {
      red.value = 0;
      green.value = 0;
      blue.value = 0;
    };

    const handleFixedRandomRange = (channel: string, _value?: number) => {
      if (channel === "red") red.value = Math.floor(Math.random() * 256);
      if (channel === "green") green.value = Math.floor(Math.random() * 256);
      if (channel === "blue") blue.value = Math.floor(Math.random() * 256);
    };

    return {
      args,
      red,
      green,
      blue,
      handleRandomizer,
      handleColorReset,
      handleFixedRandomRange,
    };
  },
  template: `
    <OrganismChangeBackgroundDiv
      class="w-[calc(100vw-32px)]! h-[calc(100vh-32px)]!"
      :red="red"
      :green="green"
      :blue="blue"
      @randomizer="handleRandomizer"
      @color-reset="handleColorReset"
      @fixed-random-range="handleFixedRandomRange"
    />
  `,
});

export const Default: Story = {
  render: OrganismTemplate,
  args: {
    red: 100,
    green: 150,
    blue: 200,
  },
};

export const InitialBlack: Story = {
  render: OrganismTemplate,
  args: {
    red: 0,
    green: 0,
    blue: 0,
  },
};

export const InitialWhite: Story = {
  render: OrganismTemplate,
  args: {
    red: 255,
    green: 255,
    blue: 255,
  },
};
