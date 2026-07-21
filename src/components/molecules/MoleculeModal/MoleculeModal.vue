<script setup lang="ts">
import { ref, watch, nextTick } from "vue";
import AtomButton from "@/components/atoms/AtomButton";

interface Props {
  title: string;
  show: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: "",
  show: false,
});

const emit = defineEmits(["close"]);

const modalRef = ref<HTMLElement | null>(null);

const handleClose = () => {
  emit("close");
};

const focusFirstElement = () => {
  if (!modalRef.value) return;

  const focusableElements = modalRef.value.querySelectorAll<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  );

  if (focusableElements.length > 0) {
    (focusableElements[0] as HTMLElement).focus();
  }
};

watch(
  () => props.show,
  async (newVal) => {
    if (newVal) {
      await nextTick();
      focusFirstElement();
    }
  },
);
</script>

<template>
  <Teleport to="body">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      data-testid="molecule-modal-backdrop"
      @click="handleClose"
    >
      <dialog
        ref="modalRef"
        open
        class="molecule-modal relative z-50 m-4 w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
        data-testid="molecule-modal"
        @click.stop
      >
        <div class="flex flex-col">
          <div class="mb-4 flex items-center justify-between">
            <h2 class="mb-4 flex items-center justify-between">
              {{ props.title }}
            </h2>
          </div>

          <div class="mb-6 text-gray-600">
            <slot name="default" />
          </div>

          <div class="flex justify-end">
            <AtomButton variant="destructive" @click="handleClose">
              Close
            </AtomButton>
          </div>
        </div>
      </dialog>
    </div>
  </Teleport>
</template>
