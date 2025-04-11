<template>
  <div class="wordle-container" @keydown="handleKey" tabindex="0">
    <h1>Gin's Daily Wordle</h1>
    <div class="grid">
      <div
        v-for="(row, rowIndex) in 6"
        :key="'row-' + rowIndex"
        class="row"
      >
        <div
          v-for="(col, colIndex) in 5"
          :key="'col-' + colIndex"
          :class="['cell', getCellClass(rowIndex, colIndex)]"
        >
          {{ getLetter(rowIndex, colIndex) }}
        </div>
      </div>
    </div>

    <div v-if="gameOver" class="result">
      {{ isCorrect ? '🎉 bravo！' : '😞 The right answer is：' + targetWord.toUpperCase() }}
    </div>

    <VirtualKeyboard @keyClick="handleKeyClick"   :letterStatuses="letterStatuses"/>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import VirtualKeyboard from './components/VirtualKeyboard.vue'
import dictionary from './assets/dictionary.json'
import { onMounted, onBeforeUnmount } from 'vue'

const wordPool = dictionary.words 
const targetWord = wordPool[Math.floor(Math.random() * wordPool.length)].toLowerCase()

const guesses = ref([]) 
const currentGuess = ref('')
const maxRows = 6
const gameOver = computed(() => guesses.value.length >= maxRows || isCorrect.value)
const isCorrect = computed(() => guesses.value.some(g => g.toLowerCase() === targetWord.toLowerCase()))

const preventDoubleTapZoom = (event) => {
  event.preventDefault()  // 阻止双击缩放
}

onMounted(() => {
  document.addEventListener('dblclick', preventDoubleTapZoom, { passive: false })
})

onBeforeUnmount(() => {
  document.removeEventListener('dblclick', preventDoubleTapZoom, { passive: false })
})


// function isValidGuess(word) {
//   return word.length === 5 && wordPool.includes(word.toLowerCase())
// }

function handleKey(e) {
  if (gameOver.value) return

  const key = e.key.toLowerCase()

  if (key === 'enter') {
     if (currentGuess.value.length === 5) {
    //   if (isValidGuess(currentGuess.value)) {
        guesses.value.push(currentGuess.value)
        currentGuess.value = ''
    //   } else {
    //     alert('请输入有效的单词！')
    //   }
     }
  } else if (key === 'backspace') {
    currentGuess.value = currentGuess.value.slice(0, -1)
  } else if (/^[a-z]$/.test(key) && currentGuess.value.length < 5) {
    currentGuess.value += key
  }
}

function handleKeyClick(key) {
  if (gameOver.value) return

  if (key === 'enter' && currentGuess.value.length === 5) {
    // if (isValidGuess(currentGuess.value)) {
    //   guesses.value.push(currentGuess.value)
    //   currentGuess.value = ''
    // } else {
    //   alert('！')
    // }
     guesses.value.push(currentGuess.value)
      currentGuess.value = ''
  } else if (key === 'backspace') {
    currentGuess.value = currentGuess.value.slice(0, -1)
  } else if (/^[a-z]$/.test(key) && currentGuess.value.length < 5) {
    currentGuess.value += key
  }
}

function getLetter(row, col) {
  if (row < guesses.value.length) {
    return guesses.value[row][col]?.toUpperCase() || ''
  } else if (row === guesses.value.length) {
    return currentGuess.value[col]?.toUpperCase() || ''
  }
  return ''
}

function getCellClass(row, col) {
  const word = row < guesses.value.length ? guesses.value[row] : null
  if (!word) return ''

  const letter = word[col]
  const correctLetter = targetWord[col]

  if (letter === correctLetter) return 'correct'
  else if (targetWord.includes(letter)) return 'present'
  else return 'absent'
}

const letterStatuses = computed(() => {
  const statusMap = {}

  guesses.value.forEach(guess => {
    guess.split('').forEach((letter, i) => {
      if (targetWord[i] === letter) {
        statusMap[letter] = 'correct'
      } else if (targetWord.includes(letter)) {
        // 不要覆盖已有的 correct 状态
        if (statusMap[letter] !== 'correct') {
          statusMap[letter] = 'present'
        }
      } else {
        if (!statusMap[letter]) {
          statusMap[letter] = 'absent'
        }
      }
    })
  })

  return statusMap
})

</script>

<style scoped>
html, body {
  touch-action: manipulation; 
}
.wordle-container {
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Segoe UI', sans-serif;
  padding: 0 40px;
  outline: none;
}

h1 {
  font-size: 20px;
  margin-bottom: 20px;
  color: #333;
}

.grid {
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  gap: 6px;
}

.row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 6px;
}

.cell {
  width: 50px;
  height: 50px;
  border: 2px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  background-color: white;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.correct {
  background-color: #6aaa64;
  color: white;
  border-color: #6aaa64;
}

.present {
  background-color: #c9b458;
  color: white;
  border-color: #c9b458;
}

.absent {
  background-color: #787c7e;
  color: white;
  border-color: #787c7e;
}

.result {
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
}
</style>
