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
      class="molecule-modal-backdrop"
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
        <div class="dialog-container">
          <div class="header">
            <h2 class="title">
              {{ props.title }}
            </h2>
          </div>

          <div class="slot-wrapper">
            <slot name="default" />
          </div>

          <div class="footer">
            <AtomButton variant="destructive" @click="handleClose">
              Close
            </AtomButton>
          </div>
        </div>
      </dialog>
    </div>
  </Teleport>
</template>

<style scoped>
@reference "@/style.css";

.molecule-modal-backdrop {
  @apply fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm;
}

.molecule-modal {
  @apply relative z-50 m-4 w-full max-w-md rounded-lg bg-white p-6 shadow-xl;
}

.dialog-container {
  @apply flex flex-col;
}

.header {
  @apply mb-4 flex items-center justify-between;
}

.title {
  @apply text-xl font-semibold text-gray-900;
}

.slot-wrapper {
  @apply mb-6 text-gray-600;
}

.footer {
  @apply flex justify-end;
}
</style>
