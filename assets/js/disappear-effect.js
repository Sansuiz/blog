// 初始化函数
function initDisappearEffect() {
  // 清除之前创建的圆点
  document.querySelectorAll('.floating-dot').forEach(dot => dot.remove());
  
  // 获取所有需要应用效果的笔记
  const notes = document.querySelectorAll('.note[data-disappear="true"]');
  if (!notes.length) return;

  // 为每个笔记应用效果
  notes.forEach(note => {
    const content = note.querySelector('.note-content');
    if (!content) return;

    // 获取所有文本节点
    const textNodes = getAllTextNodes(content);
    if (!textNodes.length) return;

    // 随机选择90%的文本节点
    const selectedNodes = selectRandomNodes(textNodes, 0.9);
    
    // 应用消失效果
    applyDisappearEffect(selectedNodes);
  });
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
// 更新颜色数组为柔和的色调
const pastelColors = [
  'rgba(200, 214, 229, 0.8)',  // 淡蓝
  'rgba(214, 200, 229, 0.8)',  // 淡紫
  'rgba(229, 200, 214, 0.8)',  // 淡粉
  'rgba(200, 229, 214, 0.8)',  // 淡绿
  'rgba(229, 214, 200, 0.8)',  // 淡黄
  'rgba(214, 229, 200, 0.8)',  // 薄荷绿
  'rgba(229, 200, 200, 0.8)',  // 淡红
  'rgba(200, 200, 229, 0.8)'   // 淡蓝紫
];

// 修改createFloatingDots函数
function createFloatingDots(element, count) {
  const rect = element.getBoundingClientRect();
  
  // 每个字符创建1-2个圆点
  const dotCount = Math.min(count * 2, 80);
  
  for (let i = 0; i < dotCount; i++) {
    const dot = document.createElement('div');
    dot.className = 'floating-dot';
    
    // 随机属性
    const size = Math.random() * 8 + 3;
    const color = pastelColors[Math.floor(Math.random() * pastelColors.length)];
    const left = rect.left + Math.random() * rect.width;
    const top = rect.top + Math.random() * rect.height;
    
    // 设置样式
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    dot.style.background = color;
    dot.style.left = `${left}px`;
    dot.style.top = `${top}px`;
    dot.style.animationDelay = `${Math.random() * 5}s`;
    
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