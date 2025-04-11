<template>
  <div class="keyboard">
    <div
      v-for="(row, index) in keyboardRows"
      :key="'row-' + index"
      class="keyboard-row"
    >
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
import { defineEmits, defineProps } from 'vue'

const emit = defineEmits(['keyClick'])

defineProps({
  letterStatuses: Object
})

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
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.keyboard-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
  gap: 6px;
}

.keyboard-key {
  height: 48px;
  font-size: 16px;
  background-color: #f1f1f1;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  text-transform: uppercase;
}

.correct {
  background-color: #6aaa64 !important;
  color: white;
}
.present {
  background-color: #c9b458 !important;
  color: white;
}
.absent {
  background-color: #787c7e !important;
  color: white;
}

@media (max-width: 480px) {
  .keyboard-key {
    height: 42px;
    font-size: 14px;
  }
}
</style>
