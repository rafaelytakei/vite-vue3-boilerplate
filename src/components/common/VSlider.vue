<template>
  <div
    ref="wrapperEl"
    class="w-full h-10 bg-gray relative rounded-3xl mt-16 overflow-y-visible"
  >
    <div
      ref="filledAreaEl"
      class="h-full gradient-bg rounded-3xl"
      :style="{ width: `${ballX + 20}px` }"
    ></div>
    <div
      v-for="i in stepCount"
      class="w-1 h-1 rounded-full absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2"
      :class="{
        'bg-white': getStepLeft(i) <= ballX,
        'bg-black': getStepLeft(i) > ballX,
        hidden: i === stepCount,
      }"
      :style="{
        left: `${getStepLeft(i)}px`,
      }"
    ></div>
    <button
      ref="ballEl"
      class="bg-primary h-full w-10 rounded-full absolute transform -translate-x-1/2 top-0 shadow"
      :style="{ left: `${ballX}px` }"
    >
      <div class="tooltip">{{ valueFormatter(currentValue) }}</div>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useDraggable } from '@vueuse/core'
const props = defineProps({
  minValue: {
    type: Number,
    default: 400000,
  },
  maxValue: {
    type: Number,
    default: 2000000,
  },
  stepCount: {
    type: Number,
    default: 16,
  },
  valueFormatter: {
    type: Function,
    default: (val: number) => val,
  },
})
const wrapperEl = ref<HTMLElement | null>()
const sliderWidth = computed(() => {
  return wrapperEl.value?.offsetWidth || 0
})
const currentValue = computed(() => {
  const dif = props.maxValue - props.minValue
  return Math.floor(
    props.minValue + ((ballX.value - 20) * dif) / (sliderWidth.value - 40)
  )
})
const ballEl = ref<HTMLElement | null>()
const { x } = useDraggable(ballEl)
const getStepLeft = (index: number) => {
  return index * (sliderWidth.value / props.stepCount)
}
const ballX = computed(() => {
  console.log(x.value)
  if (x.value < 20) return 20
  if (x.value > sliderWidth.value - 20) return sliderWidth.value - 20
  return x.value
})
</script>

<style scoped>
.gradient-bg {
  background: transparent linear-gradient(90deg, #119975 0%, #10171f 100%) 0% 0%
    no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
}

.tooltip {
  display: block;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  background: #011b2d;
  color: white;
  border-radius: 1rem;
  bottom: 100%;
  margin-bottom: 1rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
}
.tooltip::before {
  content: '';
  width: 0;
  height: 0;
  position: absolute;
  transform: translateX(-50%);
  top: 100%;
  left: 50%;
  border-left: 0.65rem solid transparent;
  border-right: 0.65rem solid transparent;
  border-top: 0.75rem solid #011b2d;
}
</style>
