document.addEventListener('DOMContentLoaded', () => {
  const notes = document.querySelectorAll('.note[data-disappear="true"]');
  
  notes.forEach(note => {
    const content = note.querySelector('.note-content');
    if (!content) return;
    
    // 获取所有文本节点
    const textNodes = getTextNodes(content);
    
    // 随机选择90%的文本节点进行消失效果
    const nodesToFade = textNodes.sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(textNodes.length * 0.9));
    
    nodesToFade.forEach(node => {
      // 创建包裹元素
      const wrapper = document.createElement('span');
      wrapper.className = 'disappearing-text';
      node.parentNode.replaceChild(wrapper, node);
      wrapper.appendChild(node);
      
      // 添加消失效果
      setTimeout(() => {
        wrapper.classList.add('faded');
        
        // 创建漂浮圆点
        createFloatingDots(wrapper, node.textContent.length);
      }, Math.random() * 2000);
    });
  });
});

function getTextNodes(element) {
  const walker = document.createTreeWalker(
    element,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: function(node) {
        return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    },
    false
  );
  
  const textNodes = [];
  let node;
  while (node = walker.nextNode()) {
    textNodes.push(node);
  }
  
  return textNodes;
}

function createFloatingDots(element, count) {
  const rect = element.getBoundingClientRect();
  const colors = ['#FF5252', '#FF4081', '#E040FB', '#7C4DFF', '#536DFE', '#448AFF', '#40C4FF', '#18FFFF', '#64FFDA', '#69F0AE'];
  
  for (let i = 0; i < Math.min(count, 5); i++) {
    const dot = document.createElement('div');
    dot.className = 'floating-dot';
    
    const size = Math.random() * 10 + 5;
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    dot.style.background = color;
    dot.style.left = `${rect.left + Math.random() * rect.width}px`;
    dot.style.top = `${rect.top + Math.random() * rect.height}px`;
    dot.style.animationDelay = `${Math.random() * 5}s`;
    
    document.body.appendChild(dot);
  }
}