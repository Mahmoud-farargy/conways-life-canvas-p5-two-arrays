<template>
  <div ref="canvasRef" />
</template>

<script setup>
import { onMounted, onUnmounted, ref, toRefs } from "vue";

// PROPS
const props = defineProps({
  grid: {
    type: Array,
    default: () => [],
    required: true
  },
  handleCellClicking: {
    type: Function,
    required: true 
  },
  gameSpeed:{
    type: Number,
    default: 100,
  },
  cellSize: {
    type: Number,
    default: 20,
  },
  rows: {
    type: Number,
    default: 25,
  },
  cols: {
    type: Number,
    default: 25,
  },
});

// REFS
const canvasRef = ref(null);
const { grid, cols, rows, cellSize, gameSpeed } = toRefs(props);

// LIFECYCLE HOOKS
onMounted(() => {
  const { handleCellClicking } = props;

  const canvas = document.createElement("canvas");
  canvas.width = cols.value * cellSize.value;
  canvas.height = rows.value * cellSize.value;
  canvasRef.value.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < rows.value; i++) {
      for (let j = 0; j < cols.value; j++) {
        const alive = grid.value[i]?.[j];
        ctx.fillStyle = alive ? "#c93f3f" : "#fff";
        ctx.strokeStyle = "#ccc";
        ctx.fillRect(j * cellSize.value, i * cellSize.value, cellSize.value, cellSize.value);
        ctx.strokeRect(j * cellSize.value, i * cellSize.value, cellSize.value, cellSize.value);
      }
    }
  };

  canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const col = Math.floor((e.clientX - rect.left)/cellSize.value);
    const row = Math.floor((e.clientY - rect.top) /cellSize.value);

    handleCellClicking(row, col);
    draw();
  });

  const redraw = setInterval(draw, gameSpeed.value);

  onUnmounted(() => {
    clearInterval(redraw);
    canvas.remove();
  });

  draw();
});
</script>
