<script setup lang="ts">
import { ref } from "vue";
import { useRandomNumber } from "@/composables/useRandomNumber";
import OrganismChangeBackgroundDiv from "@/components/organisms/OrganismChangeBackgroundDiv";

const { getRandomWithRange } = useRandomNumber();

const red = ref<number>(0);
const green = ref<number>(0);
const blue = ref<number>(0);

function handleColorReset() {
  red.value = 0;
  green.value = 0;
  blue.value = 0;
}

function fixedRandomRange() {
  return getRandomWithRange(0, 255);
}

function handleRandomizer() {
  red.value = fixedRandomRange();
  green.value = fixedRandomRange();
  blue.value = fixedRandomRange();
}

function handleFixedRandomRange(channel: string, value?: number) {
  if (!channel) return;

  const newValue = value !== undefined ? value : fixedRandomRange();

  if (channel === "red") red.value = newValue;
  if (channel === "green") green.value = newValue;
  if (channel === "blue") blue.value = newValue;
}
</script>

<template>
  <div
    class="flex flex-col justify-center items-center w-screen h-screen bg-gray-300 gap-2"
  >
    <OrganismChangeBackgroundDiv
      :red="red"
      :green="green"
      :blue="blue"
      @randomizer="handleRandomizer"
      @color-reset="handleColorReset"
      @fixed-random-range="handleFixedRandomRange"
    />
  </div>
</template>
