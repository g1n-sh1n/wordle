<template>
  <div class="keyboard">
    <div v-for="(row, index) in keyboardRows" :key="'row-' + index" class="keyboard-row">
      <button
        v-for="(key, keyIndex) in row"
        :key="'key-' + keyIndex"
        @click="handleKeyClick(key)"
        :class="['keyboard-key', letterStatuses?.[key]]"
      >
        <template v-if="key === 'backspace'">&larr;</template>
        <template v-else-if="key === 'enter'">&#8629;</template>
        <template v-else>{{ key }}</template>
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue'

defineProps({
  letterStatuses: Object
})

const emit = defineEmits(['keyClick'])

const keyboardRows = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['backspace', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'enter']
]

function handleKeyClick(key) {
  emit('keyClick', key)
}
</script>

<style scoped>
.keyboard {
  margin-top: 30px;
  width: 100%;
  max-width: 500px;
  margin-inline: auto;
}

.keyboard-row {
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-bottom: 8px;
}

.keyboard-key {
  flex: 1;
  height: 50px;
  font-size: 18px;
  background-color: #f1f1f1;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  text-transform: uppercase;
  max-width: 1fr;
}

.keyboard-key:hover {
  background-color: #bbb;
}

.keyboard-key:active {
  background-color: #aaa;
}

@media (max-width: 480px) {
  .keyboard-key {
    height: 44px;
    font-size: 16px;
  }
}

.correct {
  background-color: #6aaa64;
  color: white;
}

.present {
  background-color: #c9b458;
  color: white;
}

.absent {
  background-color: #787c7e;
  color: white;
}
</style>
