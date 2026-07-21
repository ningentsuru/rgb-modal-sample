<script setup lang="ts">
interface Props {
  variant?: "default" | "primary" | "destructive";
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
});
</script>

<template>
  <button :class="['atom-button px-4 py-2 rounded cursor-pointer', variant]" data-testid="atom-button">
    <slot />
  </button>
</template>

<style scoped>
@reference "@/style.css";

.default {
  @apply bg-white text-gray-900 border border-gray-200 hover:bg-gray-50;
}

.primary {
  @apply bg-blue-600 text-white hover:bg-blue-500;
}

.destructive {
  @apply bg-red-500 text-white hover:bg-red-600;
}
</style>
