<template>
  <div class="keyboard">
    <div
      v-for="(row, index) in keyboardRows"
      :key="'row-' + index"
      class="keyboard-row"
      :class="'row-' + (index + 1)"
    >
      <button
        v-for="(key, keyIndex) in row"
        :key="'key-' + keyIndex"
        @click="handleKeyClick(key)"
        :class="['keyboard-key', letterStatuses?.[key], {
          'key-wide': key === 'backspace' || key === 'enter'
        }]"
      >
        <template v-if="key === 'backspace'">
          <span class="key-icon">&larr;</span>
          <span class="key-text">Delete</span>
        </template>
        <template v-else-if="key === 'enter'">
          <span class="key-icon">&#8629;</span>
          <span class="key-text">Enter</span>
        </template>
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
  margin-top: 1.5rem;
  width: 95vw;
  max-width: 400px;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  gap: clamp(2px, 0.6vw, 5px);
  padding: 0;
}

.keyboard-row {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: clamp(2px, 0.5vw, 4px);
}

/* 所有行统一布局 */
.row-1, .row-2, .row-3 {
  margin: 0 auto;
}

.keyboard-key {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0;
  font-family: 'Arial', 'Roboto', sans-serif;
  line-height: 1;
  height: clamp(55px, 13vw, 75px);
  font-size: clamp(16px, 3.5vw, 20px);
  font-weight: 600;
  background-color: #f1f1f1;
  border: none;
  border-radius: clamp(4px, 1vw, 6px);
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex: 1;
}

/* 宽按键样式 */
.key-wide {
  flex: 1.5;
}

.key-text {
  font-size: clamp(11px, 2.5vw, 14px);
  margin-top: 1px;
  display: none;
}

.key-icon {
  font-size: clamp(18px, 4vw, 26px);
}

.keyboard-key:hover {
  background-color: #e8e8e8;
  transform: translateY(-1px);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
}

.keyboard-key:active {
  transform: translateY(0);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
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

.correct:hover,
.present:hover,
.absent:hover {
  opacity: 0.9;
}

/* 移动端优化 */
@media (max-width: 600px) {
  .keyboard {
    width: 96vw;
    gap: clamp(2px, 0.6vw, 4px);
  }
  
  .keyboard-row {
    gap: clamp(1px, 0.3vw, 3px);
  }
  
  .keyboard-key {
    height: clamp(50px, 14vw, 65px);
  }
  
  .key-text {
    display: block;
  }
}

/* 超小屏幕优化 */
@media (max-width: 360px) {
  .keyboard {
    width: 98vw;
    gap: clamp(1px, 0.4vw, 3px);
  }
  
  .keyboard-row {
    gap: clamp(1px, 0.2vw, 2px);
  }
  
  .keyboard-key {
    height: clamp(45px, 13vw, 55px);
    font-size: clamp(12px, 3vw, 16px);
  }
}

/* 大屏幕优化 */
@media (min-width: 768px) {
  .keyboard {
    width: 100%;
    max-width: 380px;
    gap: 4px;
  }
  
  .keyboard-row {
    gap: 3px;
  }
  
  .keyboard-key {
    height: 70px;
    font-size: 18px;
  }
  
  .key-text {
    display: block;
    font-size: 12px;
  }
}

/* 超大屏幕优化 */
@media (min-width: 1200px) {
  .keyboard {
    max-width: 420px;
  }
  
  .keyboard-key {
    height: 75px;
    font-size: 20px;
  }
}
</style>
