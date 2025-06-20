// 初始化函数
// 性能优化版本
const MAX_DOTS = 30; // 限制最大圆点数量
const FADE_DURATION = 1500; // 缩短动画时间

function initDisappearEffect() {
  // 使用requestAnimationFrame优化性能
  requestAnimationFrame(() => {
    const notes = document.querySelectorAll('.note[data-disappear="true"]');
    if (!notes.length) return;

    // 分批处理笔记
    processNotesInBatches(notes, 2); // 每次处理2个笔记
  });
}

function processNotesInBatches(notes, batchSize) {
  let processed = 0;
  
  function processBatch() {
    const batch = Array.from(notes).slice(processed, processed + batchSize);
    batch.forEach(note => {
      const content = note.querySelector('.note-content');
      if (!content) return;
      
      // 使用will-change提示浏览器优化
      content.style.willChange = 'opacity';
      
      const textNodes = getTextNodes(content);
      if (!textNodes.length) return;
      
      applyEffects(textNodes);
    });
    
    processed += batchSize;
    if (processed < notes.length) {
      requestAnimationFrame(processBatch);
    }
  }
  
  processBatch();
}

function applyEffects(nodes) {
  const selectedNodes = selectRandomNodes(nodes, 0.5); // 减少到50%
  
  selectedNodes.forEach((node, i) => {
    setTimeout(() => {
      const wrapper = document.createElement('span');
      wrapper.className = 'disappearing-text';
      node.parentNode.replaceChild(wrapper, node);
      wrapper.appendChild(node);
      
      wrapper.style.transition = `opacity ${FADE_DURATION}ms ease`;
      
      setTimeout(() => {
        wrapper.classList.add('faded');
        createLimitedDots(wrapper);
      }, Math.random() * 1000);
    }, i * 100);
  });
}

function createLimitedDots(element) {
  const rect = element.getBoundingClientRect();
  const dotCount = Math.min(3, MAX_DOTS); // 每个元素最多3个圆点
  
  for (let i = 0; i < dotCount; i++) {
    setTimeout(() => {
      createDot(rect);
    }, i * 300);
  }
}

// 获取所有文本节点
function getAllTextNodes(element) {
  const walker = document.createTreeWalker(
    element,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: node => node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
    }
  );
  
  const nodes = [];
  let node;
  while (node = walker.nextNode()) nodes.push(node);
  return nodes;
}

// 随机选择节点
function selectRandomNodes(nodes, percentage) {
  return [...nodes]
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.floor(nodes.length * percentage));
}

// 应用消失效果
function applyDisappearEffect(nodes) {
  nodes.forEach((node, i) => {
    // 创建包裹元素
    const wrapper = document.createElement('span');
    wrapper.className = 'disappearing-text';
    
    // 替换原始节点
    node.parentNode.replaceChild(wrapper, node);
    wrapper.appendChild(node);
    
    // 延迟应用效果
    setTimeout(() => {
      wrapper.classList.add('faded');
      createFloatingDots(wrapper, node.textContent.length);
    }, Math.random() * 3000 + i * 100);
  });
}

// 创建漂浮圆点
function createFloatingDots(element, count) {
  const rect = element.getBoundingClientRect();
  const colors = ['#FF5252', '#FF4081', '#E040FB', '#7C4DFF', '#536DFE', '#448AFF', '#40C4FF', '#18FFFF', '#64FFDA', '#69F0AE'];
  
  // 每个字符创建1-3个圆点
  const dotCount = Math.min(count * 3, 100); // 限制最大100个圆点
  
  for (let i = 0; i < dotCount; i++) {
    const dot = document.createElement('div');
    dot.className = 'floating-dot';
    
    // 随机属性
    const size = Math.random() * 12 + 3;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = rect.left + Math.random() * rect.width;
    const top = rect.top + Math.random() * rect.height;
    
    // 设置样式
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    dot.style.background = color;
    dot.style.left = `${left}px`;
    dot.style.top = `${top}px`;
    dot.style.animationDelay = `${Math.random() * 5}s`;
    dot.style.animationDuration = `${Math.random() * 3 + 4}s`;
    
    document.body.appendChild(dot);
  }
}

// 页面加载后初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDisappearEffect);
} else {
  initDisappearEffect();
}

// 监听内容变化重新初始化
const observer = new MutationObserver(initDisappearEffect);
observer.observe(document.body, {
  childList: true,
  subtree: true,
  characterData: true
});

// 使用轻量级的动画
function createDot(rect) {
  const dot = document.createElement('div');
  dot.className = 'floating-dot';
  
  // ...简化样式...
  document.body.appendChild(dot);
  
  // 自动移除旧圆点
  setTimeout(() => {
    dot.remove();
  }, 5000);
}