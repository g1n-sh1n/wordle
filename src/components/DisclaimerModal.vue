<template>
    <Teleport to="body">
      <div v-if="show" class="modal-overlay">
        <div class="modal-content">
          <h2>免责声明 / Disclaimer / 免責事項 / Aviso Legal</h2>
  
          <div class="modal-text">
            <p><strong>中文：</strong>本游戏为个人创作，仅供朋友之间娱乐使用，不具有任何商业用途或营利行为。所有内容均为虚构，仅为搞笑和娱乐目的，不针对任何个人、组织或群体，不包含任何形式的侮辱、歧视或恶意中伤。游戏中所涉及的内容、角色或情节纯属巧合，如有雷同，纯属巧合。开发者对因使用本游戏所产生的任何直接或间接后果不承担任何法律责任。请理性娱乐，谢谢理解与支持！</p>
  
            <p><strong>English:</strong> This game is a personal creation, intended solely for entertainment among friends. It has no commercial purpose or profit-making intent. All content is fictional and created purely for humor. It is not directed at any individual, organization, or group, and contains no insults or discrimination. The developer assumes no legal responsibility for any consequences. Please enjoy responsibly!</p>
  
            <p><strong>日本語：</strong>本ゲームは友人同士の娯楽目的で作られた個人作品です。商業的な目的や利益はありません。内容はすべてフィクションで、ユーモアのために作られています。特定の個人・団体を侮辱する意図はなく、開発者はあらゆる結果に法的責任を負いません。常識の範囲でお楽しみください。</p>
  
            <p><strong>Español:</strong> Este juego es una creación personal, destinado únicamente al entretenimiento entre amigos. No tiene fines comerciales ni de lucro. Todo el contenido es ficticio y creado con fines humorísticos. No está dirigido a ninguna persona o grupo, y el desarrollador no asume responsabilidad legal. ¡Disfrútalo con responsabilidad!</p>
          </div>
  
          <button @click="closeModal">我知道了 / Got it</button>
        </div>
      </div>
    </Teleport>
  </template>
  
  <script setup>
  import { ref, onMounted, defineExpose } from 'vue'
  
  const show = ref(false)
  
  const openModal = () => {
    show.value = true
  }
  const closeModal = () => {
    show.value = false
    localStorage.setItem('disclaimerAcknowledged', 'true')
    window.dispatchEvent(new Event('disclaimer-acknowledged'))
  }
  
  defineExpose({ openModal }) 
  
  onMounted(() => {
  })
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    width: 90%;
    max-height: 85%;
    overflow-y: auto;
    border-radius: 12px;
    font-size: 14px;
    line-height: 1.6;
  }
  
  .modal-text {
    margin-bottom: 20px;
  }
  
  button {
  width: 100%;
  padding: 12px;
  background-color: #fcd34d; 
  color: #1f2937; 
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

button:hover {
  background-color: #fbbf24; 
}
  </style>
  