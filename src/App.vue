<template>
  <div
    class="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 flex flex-col items-center justify-center px-4 py-6"
  >
    <!-- == Title == -->
    <header>
      <h1 class="text-3xl md:text-4xl font-bold mb-6">Conway’s Game of Life</h1>
    </header>
    
    <!-- == Grids Card == -->
    <main
      class="flex justify-center bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-4 md:p-6 w-full max-w-xl"
    >
      <!-- Grid Types -->
      <P5Grid
        v-if="currentMode === 'p5'"
        :grid="grid"
        :handleCellClicking="handleCellClicking"
        :cellSize="cellSize"
        :rows="rows"
        :cols="cols"
      />
      <CanvasGrid
        v-else-if="currentMode === 'canvas'"
        :grid="grid"
        :handleCellClicking="handleCellClicking"
        :cellSize="cellSize"
        :rows="rows"
        :cols="cols"
        :gameSpeed="gameSpeed"
      />
      <TwoArraysGrid
        v-else
        :grid="grid"
        :handleCellClicking="handleCellClicking"
        :cellSize="cellSize"
      />
    </main>
    
    <footer>   
      <!-- == Stats == -->
      <GameStats
        :generationsCount="generationsCount"
        :aliveCellsCount="aliveCellsCount"
      />
      <!-- == Controls == -->
      <GameControls
        v-model:currentMode="currentMode"
        :isGamePlaying="isGamePlaying"
        :toggleGame="toggleGame"
        :stepGame="stepGame"
        :resetGame="resetGame"
        :randomizeGrid="randomizeGrid"
      />
    </footer>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useGame } from "@/composables/useGame"
import {
  TwoArraysGrid,
  CanvasGrid,
  P5Grid,
  GameControls,
  GameStats,
} from "@/components"
// Refs
const currentMode = ref("two_arrays")

const {
  // Properties
  grid,
  cellSize,
  aliveCellsCount,
  generationsCount,
  isGamePlaying,
  rows,
  cols,
  gameSpeed,
  // Methods
  toggleGame,
  stepGame,
  resetGame,
  randomizeGrid,
  handleCellClicking,
} = useGame()
</script>
