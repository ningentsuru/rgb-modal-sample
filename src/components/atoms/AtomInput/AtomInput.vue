<script setup lang="ts">
interface Props {
  modelValue: string | number;
  type?: string;
  min?: number;
  max?: number;
  disabled?: boolean;
  placeholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  type: "text",
  disabled: false,
  placeholder: "",
});

const emit = defineEmits<{
  (event: "update:modelValue", value: string | number): void;
}>();

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const raw = target.value;

  if (props.type !== "number") {
    emit("update:modelValue", raw);
    return;
  }

  if (raw === "") {
    emit("update:modelValue", "");
    return;
  }

  const num = Number(raw);

  if (Number.isNaN(num)) {
    target.value = String(props.modelValue);
    return;
  }

  const min = props.min ?? -Infinity;
  const max = props.max ?? Infinity;
  const clamped = Math.min(Math.max(num, min), max);

  if (clamped !== num) {
    target.value = String(clamped);
  }

  emit("update:modelValue", clamped);
};
</script>

<template>
  <input
    class="atom-input w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500 transition-colors duration-200"
    v-bind="$attrs"
    :type="props.type"
    :value="props.modelValue"
    :min="props.type === 'number' ? props.min : undefined"
    :max="props.type === 'number' ? props.max : undefined"
    :disabled="props.disabled"
    :placeholder="placeholder"
    @input="handleInput"
    data-testid="atom-input"
  />
</template>
