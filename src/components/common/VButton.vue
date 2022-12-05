<template>
  <button
    class="border-1 border-color-current rounded-md px-4 py-2"
    :class="{
      'text-primary': color === 'primary',
      'text-secondary': color === 'secondary',
    }"
  >
    Test Content
  </button>
</template>

<script setup lang="ts">
defineProps({
  color: {
    type: String,
    default: 'primary',
  },
})
</script>

<style scoped></style>
