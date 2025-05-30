<template>
  <div>
    <div class="cursor-pointer">
      <div v-for="(row, rowsIndex) in grid" :key="rowsIndex" class="flex">
        <div
          v-for="(col, colIndex) in row"
          :key="colIndex"
          :class="`flex border ${col ? 'bg-gray-700 dark:bg-gray-400' : 'bg-white dark:bg-gray-800'} border-gray-300 dark:border-gray-600`.trim()"
          :style="`width: ${cellSize}px; height: ${cellSize}px;`"
          @click="handleCellClicking(rowsIndex, colIndex, col)"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
// PROPS
const props = defineProps({
  grid: {
    type: Array,
    default: [],
    required: true,
  },
  cellSize: {
    type: Number,
    required: true,
    default: 20,
  },
  handleCellClicking: {
    type: Function,
    required: true,
  },
});
</script>
