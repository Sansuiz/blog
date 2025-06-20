function initDisappearEffect() {
  const notes = document.querySelectorAll('.note[data-disappear="true"]');
  if (!notes.length) return;

  notes.forEach(note => {
    const content = note.querySelector('.note-content');
    if (!content) return;

    // 获取所有文本节点
    const textNodes = getTextNodes(content);
    if (!textNodes.length) return;

    // 处理每个文本节点
    textNodes.forEach(node => {
      // 将文本拆分为单个字符
      const text = node.nodeValue;
      const chars = text.split('');
      
      // 随机选择60%的字符
      const charsToFade = selectRandomChars(chars, 0.6);
      
      // 用span包裹每个字符
      const fragment = document.createDocumentFragment();
      chars.forEach((char, i) => {
        const span = createDisappearingChar(char);
        
        if (charsToFade.includes(i)) {
          // 为每个字符设置随机延迟
          const delay = Math.random() * 3000;
          span.style.transitionDelay = `${delay}ms`;
          
          // 添加消失效果
          setTimeout(() => {
            span.classList.add('faded');
            createDotsAtPosition(span, note);
          }, delay + 500);
        }
        
        fragment.appendChild(span);
      });
      
      // 替换原始文本节点
      node.parentNode.replaceChild(fragment, node);
    });
  });

  // 阻止复制消失的文本
  document.addEventListener('copy', (e) => {
    const selection = window.getSelection();
    if (selection.toString().includes('\u200B')) {
      e.preventDefault();
    }
  });
}

function getTextNodes(element) {
  const walker = document.createTreeWalker(
    element,
    NodeFilter.SHOW_TEXT,
    { acceptNode: node => node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT },
    false
  );
  
  const nodes = [];
  let node;
  while (node = walker.nextNode()) nodes.push(node);
  return nodes;
}

function selectRandomChars(chars, percentage) {
  const indices = chars.map((_, i) => i);
  return indices
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.floor(chars.length * percentage));
}

function createDotsAtPosition(element, container) {
  const rect = element.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  const colors = ['#FF5252', '#FF4081', '#E040FB', '#7C4DFF', '#536DFE', '#448AFF'];
  
  // 创建1-2个圆点
  const dotCount = 1 + Math.floor(Math.random() * 2);
  
  for (let i = 0; i < dotCount; i++) {
    const dot = document.createElement('div');
    dot.className = 'floating-dot';
    
    // 从文字位置开始
    const startX = rect.left - containerRect.left + rect.width/2;
    const startY = rect.top - containerRect.top;
    
    // 随机目标位置
    const targetX = Math.random() * containerRect.width;
    const targetY = Math.random() * containerRect.height;
    
    dot.style.left = `${startX}px`;
    dot.style.top = `${startY}px`;
    dot.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    // 设置动画变量
    dot.style.setProperty('--target-x', `${targetX - startX}px`);
    dot.style.setProperty('--target-y', `${targetY - startY}px`);
    
    container.appendChild(dot);
  }
}

function createDisappearingChar(char) {
  const span = document.createElement('span');
  span.textContent = char + '\u200B'; // 添加零宽空格
  span.className = 'disappearing-char';
  
  // 添加CSS样式防止选中
  span.style.userSelect = 'none';
  span.style.webkitUserSelect = 'none';
  
  return span;
}

// 初始化
if (document.readyState !== 'loading') {
  initDisappearEffect();
} else {
  document.addEventListener('DOMContentLoaded', initDisappearEffect);
}