import { onMounted, onUnmounted, ref, computed } from "vue";

export const useGame = () => {
//VARS
const rows = ref(25);
const cols = ref(25);
const cellSize = 20;
const gridSize = rows.value * cols.value;

// REFS
const grid = ref([]);
const gameSpeed = ref(80);
const interval = ref(null);
const isGamePlaying = ref(false);
const generationsCount = ref(0);

// COMPUTED PROPERTIES
const aliveCellsCount = computed(() => grid.value?.flat().filter((col) => col).length || 0);

// FUNCTIONS
// Step #1 - creating an empty array - done
const createEmptyArray = () => {
  const result = [];
  for (let i = 0; i < rows.value; i++) {
    result[i] = [];
    for (let j = 0; j < cols.value; j++) {
      result[i].push(false);
    }
  }
  return result;
};

// Step #2  - handling clicking and grid randomizing - done
const handleCellClicking = (rowsIndex, colIndex) => {
  const isActive = grid.value[rowsIndex][colIndex];
  grid.value[rowsIndex][colIndex] = !isActive;
};

const randomizeGrid = () => {
  const newGridArray = [];
  for (let i = 0; i < rows.value; i++) {
    newGridArray[i] = [];
    for (let j = 0; j < cols.value; j++) {
      const rnm = Math.floor(Math.random() * 2) ? true : false;
      newGridArray[i].push(rnm);
    }
  }
  generationsCount.value = 0;
  grid.value = newGridArray;
};

// Step #3 - generating the next frame - done
const countNeighbours = (x, y) => {
  if (!grid.value.length || !grid.value[0].length) return 0;

  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      const row = x + i;
      const col = y + j;

      if (row >= 0 && row < rows.value && col >= 0 && col < cols.value) {
        count += grid.value[row][col];
      }
    }
  }
  return count;
};
const calcNextGeneration = () => {
  const nextFrame = grid.value?.map((rows, rowIndex) => {
    return rows.map((cell, colIndex) => {
      const aliveNeighbours = countNeighbours(rowIndex, colIndex);
      if (cell && (aliveNeighbours < 2 || aliveNeighbours > 3)) {
        return false;
      } else if (!cell && aliveNeighbours === 3) {
        return true;
      } else {
        return cell;
      }
    });
  });
  generationsCount.value++;
  grid.value = nextFrame;
};
const runGame = () => {
  stopGame();
  isGamePlaying.value = true;
  interval.value = setInterval(() => {
    calcNextGeneration();
  }, gameSpeed.value);
};
const stopGame = () => {
  if (interval.value) {
    clearInterval(interval.value);
    interval.value = null;
  }
  isGamePlaying.value = false;
};


const toggleGame = () => {
  if (isGamePlaying.value) {
    stopGame();
    return;
  }
  runGame();
};

const stepGame = () => {
  calcNextGeneration();
};
const resetGame = () => {
  stopGame();
  const newGridArray = createEmptyArray();
  grid.value = newGridArray;
  generationsCount.value = 0;
};

// LIFECYCLE HOOKS
onMounted(() => {
  if (import.meta?.env?.MODE !== "test") {
    grid.value = createEmptyArray();
  }
});

onUnmounted(() => {
  stopGame();
});

 return {
    // return properties
    grid,
    cellSize,
    aliveCellsCount,
    generationsCount,
    isGamePlaying,
    rows,
    cols,
    gridSize,
    gameSpeed,
    // return methods
    handleCellClicking,
    toggleGame,
    stepGame,
    resetGame,
    randomizeGrid,
    countNeighbours,
    calcNextGeneration
 }
}