// 极简实现
function initDisappearEffect() {
  const notes = document.querySelectorAll('.note[data-disappear="true"]');
  if (!notes.length) return;

  notes.forEach(note => {
    note.classList.add('disappearing-note');
    
    // 延迟添加消失效果
    setTimeout(() => {
      note.classList.add('faded');
      
      // 极简圆点生成（每个笔记最多3个）
      for (let i = 0; i < 3; i++) {
        createDot(note);
      }
    }, Math.random() * 1000);
  });
}

function createDot(note) {
  const dot = document.createElement('div');
  dot.className = 'floating-dot';
  
  // 使用笔记文字颜色
  dot.style.color = window.getComputedStyle(note).color;
  
  // 随机位置
  const rect = note.getBoundingClientRect();
  dot.style.left = `${rect.left + Math.random() * rect.width}px`;
  dot.style.top = `${rect.top + Math.random() * rect.height}px`;
  
  // 随机延迟
  dot.style.animationDelay = `${Math.random()}s`;
  
  document.body.appendChild(dot);
  
  // 动画结束后移除
  dot.addEventListener('animationend', () => dot.remove());
}

// 轻量级初始化
if (document.readyState !== 'loading') {
  initDisappearEffect();
} else {
  document.addEventListener('DOMContentLoaded', initDisappearEffect);
}