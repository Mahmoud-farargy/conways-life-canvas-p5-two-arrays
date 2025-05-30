<template>
  <div class="mt-6 flex flex-wrap gap-4 justify-center">
    <button @click="toggleGame" class="btn">
      {{ isGamePlaying ? "Pause" : "Start" }}
    </button>
    <button @click="randomizeGrid" class="btn">Randomize</button>
    <button @click="resetGame" class="btn">Clear</button>
    <button @click="stepGame" :disabled="isGamePlaying" :class="`btn ${isGamePlaying ? 'opacity-50 cursor-not-allowed' : ''}`">Step</button>
    <select @change="handleChange" :model-value="currentMode" :disabled="isGamePlaying" :class="`btn ${isGamePlaying ? 'opacity-50 cursor-not-allowed' : ''}`">
        <option v-for="option in MODEOPTIONS" :key="option.id" :value="option.id"> {{ option.title }} </option>
    </select>
  </div>
</template>

<script setup>
import { MODEOPTIONS } from "@/helpers/modeOptions";
// EMITS
const emits = defineEmits(['update:currentMode']);
// PROPS
const props = defineProps({
  isGamePlaying: {
    type: Boolean,
    required: true,
  },
  stepGame: {
    type: Function,
    required: true,
  },
  toggleGame: {
    type: Function,
    required: true,
  },
  resetGame: {
    type: Function,
    required: true,
  },
  randomizeGrid: {
    type: Function,
    required: true,
  },
  currentMode: {
    type: String,
    required: true,
    default: 'two_arrays'
  }
});

const handleChange = (event) => {
    if(!event) return;
    const value = event.target.value;
    emits("update:currentMode", value)
}
</script>
