import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { ref } from "vue";
import MoleculeModal from "./MoleculeModal.vue";
import AtomButton from "@/components/atoms/AtomButton";

const meta: Meta<typeof MoleculeModal> = {
  component: MoleculeModal,
  title: "Components/MoleculeModal",
  argTypes: {
    title: { control: "text" },
    show: { control: "boolean", description: "Controls modal visibility" },
  },
};

export default meta;
type Story = StoryObj<typeof MoleculeModal> & {
  args: { slotContent?: string };
};

const ModalTemplate = (args: any) => ({
  components: { MoleculeModal, AtomButton },
  setup() {
    const { slotContent, ...props } = args;
    const isShown = ref(props.show);

    const handleClose = () => {
      isShown.value = false;
    };

    return { args: props, slotContent, isShown, handleClose };
  },
  template: `
    <div>
      <AtomButton 
        v-if="!isShown" 
        @click="isShown = true" 
        style="margin-bottom: 1rem; padding: 0.5rem 1rem;"
      >
        Open Modal
      </AtomButton>

      <MoleculeModal
        v-bind="args"
        :show="isShown"
        @close="handleClose"
      >
        <div v-html="args.default" />
      </MoleculeModal>
    </div>
  `,
});

export const Default: Story = {
  render: ModalTemplate,
  args: {
    title: "",
    show: false,
    slotContent: "",
  },
};

export const DefaultOpen: Story = {
  render: ModalTemplate,
  args: {
    title: "",
    show: true,
    slotContent: "",
  },
};

export const HasTitle: Story = {
  render: ModalTemplate,
  args: {
    ...DefaultOpen.args,
    title: "Reusable Modal Component!",
  },
};

export const HasSlot: Story = {
  render: ModalTemplate,
  args: {
    ...HasTitle.args,
    default: `
      <div class="flex flex-col justify-center items-center">
        <h1>Header no.1</h1>
        <p>I am paragraph!</p>
        <strong>I am strong!</strong>
        <u>I am underline!</u>
        <i>I am italic!</i>
      </div>
    `,
  },
};
