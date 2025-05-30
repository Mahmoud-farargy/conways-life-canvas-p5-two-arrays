<template>
  <div
    class="flex justify-center text-base md:text-lg items-center gap-2.5 text-center w-full py-2 md:py-2.5"
  >
    <span class="uppercase"
      >Generations <strong class="text-primary">{{ generationsCount }}</strong></span
    >
    <span class="uppercase"
      >Alive Cells <strong class="text-primary">{{ aliveCellsCount }}</strong>
    </span>
  </div>
</template>

<script setup>
// PROPS
const props = defineProps({
  generationsCount: {
    type: Number,
    required: true,
    default: 0,
  },
  aliveCellsCount: {
    type: Number,
    required: true,
    default: 0,
  },
});
</script>
