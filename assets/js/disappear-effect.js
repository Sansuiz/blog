// 在initDisappearEffect函数中添加
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
        const span = document.createElement('span');
        span.textContent = char;
        
        if (charsToFade.includes(i)) {
          span.className = 'disappearing-char';
          
          // 为每个字符设置随机延迟
          const delay = Math.random() * 3000;
          span.style.transitionDelay = `${delay}ms`;
          
          // 添加消失效果
          setTimeout(() => {
            span.classList.add('faded');
            createDotsAtPosition(span);
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

function createDotsAtPosition(element) {
  const rect = element.getBoundingClientRect();
  const colors = ['#FF5252', '#FF4081', '#E040FB', '#7C4DFF', '#536DFE', '#448AFF'];
  
  // 创建2-4个圆点
  const dotCount = 2 + Math.floor(Math.random() * 3);
  
  for (let i = 0; i < dotCount; i++) {
    const dot = document.createElement('div');
    dot.className = 'floating-dot';
    
    // 随机属性
    dot.style.left = `${rect.left + rect.width/2}px`;
    dot.style.top = `${rect.top}px`;
    dot.style.background = colors[Math.floor(Math.random() * colors.length)];
    dot.style.setProperty('--move-x', (Math.random() * 2 - 1).toFixed(2));
    dot.style.setProperty('--move-y', Math.random().toFixed(2));
    dot.style.animationDelay = `${i * 0.2}s`;
    
    document.body.appendChild(dot);
    
    // 动画结束后移除
    dot.addEventListener('animationend', () => dot.remove());
  }
}

// 初始化
if (document.readyState !== 'loading') {
  initDisappearEffect();
} else {
  document.addEventListener('DOMContentLoaded', initDisappearEffect);
}

// 在创建消失字符时修改
function createDisappearingChar(char) {
  const span = document.createElement('span');
  span.textContent = char + '\u200B'; // 添加零宽空格
  span.className = 'disappearing-char';
  
  // 添加CSS样式防止选中
  span.style.userSelect = 'none';
  span.style.webkitUserSelect = 'none';
  
  return span;
}