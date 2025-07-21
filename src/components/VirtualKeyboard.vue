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
  width: 100%;
  max-width: min(500px, 95vw);
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  gap: clamp(4px, 1vw, 8px);
  padding: 0 0.5rem;
}

.keyboard-row {
  display: flex;
  justify-content: center;
  gap: clamp(2px, 0.5vw, 6px);
}

/* 第一行：10个按键 */
.row-1 {
  margin: 0 auto;
}

/* 第二行：9个按键，居中对齐 */
.row-2 {
  margin: 0 auto;
  padding: 0 5%;
}

/* 第三行：包含特殊按键 */
.row-3 {
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
  height: clamp(42px, 8vw, 58px);
  min-width: clamp(28px, 6vw, 44px);
  font-size: clamp(12px, 2.5vw, 16px);
  font-weight: 600;
  background-color: #f1f1f1;
  border: none;
  border-radius: clamp(4px, 1vw, 6px);
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex: 1;
  max-width: clamp(35px, 9vw, 48px);
}

/* 宽按键样式 */
.key-wide {
  flex: 1.5;
  max-width: clamp(50px, 15vw, 80px);
  min-width: clamp(45px, 12vw, 65px);
}

.key-text {
  font-size: clamp(8px, 1.8vw, 11px);
  margin-top: 1px;
  display: none;
}

.key-icon {
  font-size: clamp(14px, 3vw, 18px);
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

/* 小屏幕优化 */
@media (max-width: 480px) {
  .keyboard {
    gap: clamp(3px, 0.8vw, 6px);
    padding: 0 0.25rem;
  }
  
  .keyboard-key {
    height: clamp(38px, 9vw, 45px);
    min-width: clamp(24px, 7vw, 32px);
    max-width: clamp(30px, 8.5vw, 40px);
  }
  
  .key-wide {
    max-width: clamp(45px, 16vw, 65px);
    min-width: clamp(40px, 14vw, 55px);
  }
  
  .key-text {
    display: block;
  }
  
  .row-2 {
    padding: 0 8%;
  }
}

/* 超小屏幕优化 */
@media (max-width: 360px) {
  .keyboard {
    gap: clamp(2px, 0.6vw, 4px);
  }
  
  .keyboard-key {
    height: clamp(35px, 10vw, 42px);
    font-size: clamp(10px, 2.8vw, 14px);
  }
  
  .row-2 {
    padding: 0 10%;
  }
}

/* 大屏幕优化 */
@media (min-width: 768px) {
  .keyboard {
    gap: 8px;
  }
  
  .keyboard-row {
    gap: 6px;
  }
  
  .keyboard-key {
    height: 54px;
    min-width: 42px;
    max-width: 46px;
    font-size: 16px;
  }
  
  .key-wide {
    max-width: 74px;
    min-width: 62px;
  }
  
  .key-text {
    display: block;
    font-size: 10px;
  }
  
  .row-2 {
    padding: 0 3%;
  }
}
</style>
