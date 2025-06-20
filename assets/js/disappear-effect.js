/**
 * 初始化文字消失效果
 */
function initDisappearEffect() {
  // 获取所有需要应用消失效果的笔记元素
  const notes = document.querySelectorAll('.note[data-disappear="true"]');
  
  notes.forEach(note => {
    // 获取元素内的所有文本节点
    const textNodes = getTextNodes(note);
    
    textNodes.forEach(node => {
      const text = node.nodeValue;
      const chars = text.split('');
      // 随机选择60%的字符应用效果
      const selectedIndices = selectRandomChars(chars.length);
      
      const parent = node.parentNode;
      const spanWrapper = document.createElement('span');
      spanWrapper.className = 'disappear-effect';
      
      // 构建新的HTML内容，为选中的字符添加span标签
      const newContent = chars.map((char, index) => {
        if (selectedIndices.includes(index)) {
          // 为每个字符添加随机延迟和零宽度空格
          return `<span style="transition-delay: ${Math.random() * 2}s">${char}​</span>`;
        }
        return char;
      }).join('');
      
      spanWrapper.innerHTML = newContent;
      parent.replaceChild(spanWrapper, node);
      
      // 延迟执行以确保DOM更新完成
      setTimeout(() => {
        const spans = spanWrapper.querySelectorAll('span');
        spans.forEach(span => {
          // 根据设置的延迟时间触发消失效果
          setTimeout(() => {
            span.classList.add('hidden');
            // 在字符位置创建小圆点
            createDotsAtPosition(note, span.offsetLeft, span.offsetTop);
          }, parseFloat(span.style.transitionDelay) * 1000);
        });
      }, 100);
    });
  });
  
  // 防止复制包含零宽度空格的文本
  document.addEventListener('copy', (e) => {
    if (window.getSelection().toString().includes('\u200B')) {
      e.preventDefault();
    }
  });
}

/**
 * 获取元素内的所有文本节点
 * @param {HTMLElement} element - 要搜索的DOM元素
 * @returns {Array} 文本节点数组
 */
function getTextNodes(element) {
  const walker = document.createTreeWalker(
    element,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );
  
  const textNodes = [];
  let node;
  
  while (node = walker.nextNode()) {
    if (node.nodeValue.trim() !== '') {
      textNodes.push(node);
    }
  }
  
  return textNodes;
}

/**
 * 随机选择指定数量的字符索引
 * @param {number} totalChars - 总字符数
 * @returns {Array} 选中的字符索引数组
 */
function selectRandomChars(totalChars) {
  // 计算要选择的字符数量（总字符的60%）
  const count = Math.floor(totalChars * 0.6);
  const indices = [];
  
  // 随机选择不重复的索引
  while (indices.length < count) {
    const randomIndex = Math.floor(Math.random() * totalChars);
    if (!indices.includes(randomIndex)) {
      indices.push(randomIndex);
    }
  }
  
  return indices;
}

/**
 * 在指定位置创建小圆点
 * @param {HTMLElement} container - 容器元素
 * @param {number} x - 水平位置
 * @param {number} y - 垂直位置
 */
function createDotsAtPosition(container, x, y) {
  // 随机生成1-2个小圆点
  const dotCount = 1 + Math.floor(Math.random() * 2);
  // 获取定义的淡雅色系
  const colors = getComputedStyle(document.documentElement)
    .getPropertyValue('--dot-colors')
    .split(',')
    .map(color => color.trim());
  
  for (let i = 0; i < dotCount; i++) {
    const dot = document.createElement('div');
    dot.className = 'disappear-dot';
    // 设置随机移动方向
    dot.style.setProperty('--move-x', `${Math.random() * 2 - 1}rem`);
    dot.style.setProperty('--move-y', `${Math.random() * 2 - 1}rem`);
    // 设置初始位置（在字符位置附近随机偏移）
    dot.style.left = `${x + Math.random() * 10 - 5}px`;
    dot.style.top = `${y + Math.random() * 10 - 5}px`;
    // 随机选择颜色
    dot.style.setProperty('--dot-color', colors[Math.floor(Math.random() * colors.length)]);
    // 设置动画持续时间和循环
    dot.style.animation = `float ${3 + Math.random() * 4}s ease-in-out infinite`;
    
    container.appendChild(dot);
    
    // 设置小圆点随机消失
    setTimeout(() => {
      dot.style.opacity = '0';
      setTimeout(() => dot.remove(), 1000);
    }, 5000 + Math.random() * 5000);
  }
}

// 当DOM加载完成后初始化效果
document.addEventListener('DOMContentLoaded', initDisappearEffect);