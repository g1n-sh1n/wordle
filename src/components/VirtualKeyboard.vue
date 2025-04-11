<template>
  <div class="keyboard">
    <div v-for="(row, index) in keyboardRows" :key="'row-' + index" class="keyboard-row">
      <button
        v-for="(key, keyIndex) in row"
        :key="'key-' + keyIndex"
        @click="handleKeyClick(key)"
        class="keyboard-key"
      >
        {{ key }}
      </button>
    </div>
    <div class="keyboard-row">
      <button @click="handleKeyClick('backspace')" class="keyboard-key">⌫</button>
      <button @click="handleKeyClick('enter')" class="keyboard-key">↩</button>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue'

const emit = defineEmits(['keyClick'])

const keyboardRows = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm']
]

function handleKeyClick(key) {
  emit('keyClick', key)
}
</script>

<style scoped>
.keyboard {
  margin-top: 30px;
}

.keyboard-row {
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-bottom: 10px;
}

.keyboard-key {
  width: 30px;
  height: 30px;
  font-size: 18px;
  background-color: #f1f1f1;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.keyboard-key:hover {
  background-color: #bbb;
}

.keyboard-key:active {
  background-color: #aaa;
}
</style>
