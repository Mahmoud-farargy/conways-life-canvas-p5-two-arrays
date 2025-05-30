<template>
  <div ref="canvasRef" />
</template>
<script setup>
import { onMounted, onUnmounted, ref, toRefs } from "vue";
import p5 from "p5";

// PROPS
const props = defineProps({
  grid: {
    type: Array,
    default: [],
    required: true,
  },
  handleCellClicking: {
    type: Function,
    required: true,
  },
  cellSize: {
    type: Number,
    required: true,
    default: 20,
  },
  rows: {
    type: Number,
    required: true,
    default: 25,
  },
  cols: {
    type: Number,
    required: true,
    default: 25,
  },
});
// REFS
const canvasRef = ref(null);
const { grid, cols, rows, cellSize } = toRefs(props);

// LIFECYCLE HOOKS
onMounted(() => {
  const { handleCellClicking } = props;

  const p5Instance = new p5((sketch) => {
    sketch.setup = () => {
      const canvas = sketch.createCanvas(rows.value * cellSize.value, cols.value * cellSize.value);
      canvas.parent(canvasRef.value);
    };

    sketch.draw = () => {
      sketch.background(240);

      for (let i = 0; i < rows.value; i++) {
        for (let j = 0; j < cols.value; j++) {

          if (!grid.value) return;
          const isAlive = grid.value[i][j];
          sketch.stroke(200);
          sketch.fill(isAlive ? "#2c3e50" : "#ffffff");
          sketch.rect(i * cellSize.value, j * cellSize.value, cellSize.value, cellSize.value);
        }
      }
    };

    sketch.mousePressed = () => {
      if (!grid.value) return;
      
      const x = Math.floor(sketch.mouseX / cellSize.value);
      const y = Math.floor(sketch.mouseY / cellSize.value);

      if (x >= 0 && x < rows.value && x >= 0 && y < cols.value) {
        handleCellClicking(x, y);
      }
    };
  });

  onUnmounted(() => {
    p5Instance.remove();
  });
});
</script>
