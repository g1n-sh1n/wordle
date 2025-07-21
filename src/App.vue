<template>
  <div class="wordle-container" @keydown="handleKey" tabindex="0">
    <h1>Intellectual Disability Diagnoser</h1>
    <DisclaimerModal ref="modal" />
    <span v-if="!acknowledged" @click="openDisclaimer" class="disclaimer-btn">
      Disclaimer
    </span>
    <div class="grid">
      <div
        v-for="(row, rowIndex) in 6"
        :key="'row-' + rowIndex"
        :class="['row', { 'row-shaking': shakingRow === rowIndex }]"
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
      <div v-if="isCorrect">
        <p>おめでとう</p>
        <p>You are not mentally retarded, you can obtain a professional diagnostic report</p>
        <p>(note: due to tariffs you will be charged an additional 104% diagnostic fee)</p>
      </div>
      <div v-else>
        <p>The right answer is： {{targetWord.toUpperCase()}}</p>
        <p>すみません</p>
        <p>You have been diagnosed as mentally retarded by Doctor Gin. Please contact us offline to discuss the cost and schedule of your follow-up treatment plan.</p>
      </div>
    </div>

    <VirtualKeyboard @keyClick="handleKey" :letterStatuses="letterStatuses"/>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import VirtualKeyboard from './components/VirtualKeyboard.vue'
import dictionary from './assets/dictionary.json'
import answerWords from './assets/answer_words.json'
import { onMounted, onBeforeUnmount } from 'vue'
import DisclaimerModal from '@/components/DisclaimerModal.vue'

const acknowledged = ref(false)
const modal = ref(null)

const checkAcknowledged = () => {
  acknowledged.value = localStorage.getItem('disclaimerAcknowledged') === 'true'
}

const openDisclaimer = () => {
  modal.value?.openModal()
}

onMounted(() => {
  checkAcknowledged()
  window.addEventListener('disclaimer-acknowledged', checkAcknowledged)
})

// 验证词典 - 用于检查用户输入是否合法
const validationWords = dictionary.words 
// 答案池 - 用于随机选择游戏答案
const answerPool = answerWords.words
const targetWord = answerPool[Math.floor(Math.random() * answerPool.length)].toLowerCase()

const guesses = ref([]) 
const currentGuess = ref('')
const maxRows = 6
const gameOver = computed(() => guesses.value.length >= maxRows || isCorrect.value)
const isCorrect = computed(() => guesses.value.some(g => g.toLowerCase() === targetWord.toLowerCase()))
const shakingRow = ref(null)

const preventDoubleTapZoom = (event) => {
  event.preventDefault()  
}

onMounted(() => {
  document.addEventListener('dblclick', preventDoubleTapZoom, { passive: false })
})

onBeforeUnmount(() => {
  document.removeEventListener('dblclick', preventDoubleTapZoom, { passive: false })
})


function isValidGuess(word) {
  return word.length === 5 && validationWords.includes(word.toLowerCase())
}


function handleKey(key) {
  if (gameOver.value) return

  if(key?.key){
    key = key.key.toLowerCase()
  }

  shakingRow.value = null

  if (key === 'enter' && currentGuess.value.length === 5) {
    if (isValidGuess(currentGuess.value)) {
      guesses.value.push(currentGuess.value)
      currentGuess.value = ''
    } else {
      shakingRow.value = guesses.value.length
    }
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

@keyframes shake {
  0% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  50% { transform: translateX(4px); }
  75% { transform: translateX(-4px); }
  100% { transform: translateX(0); }
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

.row-shaking{
    animation: shake 0.5s ease-in-out;
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
  font-size: 14px;
  display: flex;
}

.disclaimer-btn {
  text-align: center;
  font-size: 14px;
  color: #64748b; 
  cursor: pointer;
  transition: color 0.2s ease;
  margin-bottom: 30px;
}
</style>
