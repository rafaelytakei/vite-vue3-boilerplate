<template>
  <div class="p-32">
    <VSlider :value-formatter="formatter" />
  </div>
</template>

<script setup lang="ts">
const formatter = (val: number) => {
  return val.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
}
</script>

<style scoped></style>
