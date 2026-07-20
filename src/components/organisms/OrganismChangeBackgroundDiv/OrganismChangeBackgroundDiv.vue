<script setup lang="ts">
import { ref, computed } from "vue";
import AtomButton from "@/components/atoms/AtomButton";
import AtomInput from "@/components/atoms/AtomInput";
import MoleculeModal from "@/components/molecules/MoleculeModal";

interface Props {
  red: number;
  green: number;
  blue: number;
}

const props = withDefaults(defineProps<Props>(), {
  red: 0,
  green: 0,
  blue: 0,
});

const emit = defineEmits(["randomizer", "colorReset", "fixedRandomRange"]);

const showModal = ref<boolean>(false);

const colorBg = computed(() => ({
  backgroundColor: `rgb(${props.red}, ${props.green}, ${props.blue})`,
}));

const updateColor = (
  channel: "red" | "green" | "blue",
  value: string | number,
) => {
  emit("fixedRandomRange", channel, Number(value));
};
</script>

<template>
  <div class="organism-change-background-div">
    <h1 class="title">Change the Div background below.</h1>
    <div class="preview" :style="colorBg" />
    <div class="rgb-wrapper">
      <span>R:{{ props.red }}</span>
      <span>G:{{ props.green }}</span>
      <span>B:{{ props.blue }}</span>
    </div>
    <div class="buttons">
      <AtomButton variant="primary" @click="showModal = true">
        Open Modal!
      </AtomButton>
      <AtomButton variant="default" @click="emit('randomizer')">
        Random
      </AtomButton>
      <AtomButton variant="destructive" @click="emit('colorReset')">
        Reset
      </AtomButton>
    </div>
    <MoleculeModal
      title="RGB Form"
      :show="showModal"
      @close="showModal = false"
    >
      <label for="red">Red:</label>
      <div class="field-wrapper">
        <AtomInput
          type="number"
          :model-value="props.red"
          @update:model-value="(val) => updateColor('red', val)"
          :min="0"
          :max="255"
          placeholder="Enter from 0-255"
        />
        <AtomButton @click="emit('fixedRandomRange', 'red')">Random</AtomButton>
      </div>

      <label for="green">Green:</label>
      <div class="field-wrapper">
        <AtomInput
          type="number"
          :model-value="props.green"
          @update:model-value="(val) => updateColor('green', val)"
          :min="0"
          :max="255"
          placeholder="Enter from 0-255"
        />
        <AtomButton @click="emit('fixedRandomRange', 'green')">
          Random
        </AtomButton>
      </div>

      <label for="blue">Blue:</label>
      <div class="field-wrapper">
        <AtomInput
          type="number"
          :model-value="props.blue"
          @update:model-value="(val) => updateColor('blue', val)"
          :min="0"
          :max="255"
          placeholder="Enter from 0-255"
        />
        <AtomButton @click="emit('fixedRandomRange', 'blue')">
          Random
        </AtomButton>
      </div>
    </MoleculeModal>
  </div>
</template>

<style scoped>
@reference "@/style.css";

.organism-change-background-div {
  @apply flex flex-col justify-center items-center w-screen h-screen bg-gray-300 gap-2;
}

.title {
  @apply text-2xl;
}

.preview {
  @apply w-100 h-100 border border-black;
}

.rgb-wrapper {
  @apply flex justify-center gap-4;
}

.buttons {
  @apply flex justify-center gap-2;
}

.field-wrapper {
  @apply flex gap-4;
}
</style>
