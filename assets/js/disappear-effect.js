function initDisappearEffect() {
  document.querySelectorAll('.note[data-disappear="true"]').forEach(note => {
    const content = note.querySelector('.note-content');
    const textNodes = getTextNodes(content);
    const dots = [];

    // 随机选择要消失的文字
    const randomIndices = getRandomIndices(textNodes);

    randomIndices.forEach((index, i) => {
      setTimeout(() => {
        const node = textNodes[index];
        if (!node || !node.style) { // 添加检查
          console.warn('Text node not found at index:', index);
          return;
        }
        
        const range = document.createRange();
        range.selectNodeContents(node);
        const rect = range.getBoundingClientRect();

        // 淡出文字
        node.style.opacity = '0.1';

        // 创建3-5个随机圆点
        const dotCount = Math.floor(Math.random() * 3) + 3;
        for (let j = 0; j < dotCount; j++) {
          createDot(note, rect, dots);
        }
      }, i * 300);
    });

    // 让圆点持续浮动
    animateDots(dots);
  });
}

function createDot(note, rect, dots) {
  const dot = document.createElement('div');
  dot.className = 'floating-dot';
  
  // 随机大小 (3-8px)
  const size = Math.random() * 5 + 3;
  dot.style.width = `${size}px`;
  dot.style.height = `${size}px`;
  
  // 随机颜色
  dot.style.background = `hsl(${Math.random() * 360}, 80%, 60%)`;
  
  // 随机位置 (在文字周围)
  const x = rect.left + Math.random() * rect.width;
  const y = rect.top + Math.random() * rect.height;
  dot.style.left = `${x}px`;
  dot.style.top = `${y}px`;
  
  // 随机动画时长
  dot.style.animationDuration = `${Math.random() * 5 + 5}s`;
  
  document.body.appendChild(dot);
  dots.push({
    element: dot,
    x: x,
    y: y,
    speedX: (Math.random() - 0.5) * 0.2,
    speedY: (Math.random() - 0.5) * 0.2
  });
}

function animateDots(dots) {
  function update() {
    dots.forEach(dot => {
      dot.x += dot.speedX;
      dot.y += dot.speedY;
      
      // 边界检查
      if (dot.x < 0 || dot.x > window.innerWidth) {
        dot.speedX *= -1;
      }
      if (dot.y < 0 || dot.y > window.innerHeight) {
        dot.speedY *= -1;
      }
      
      dot.element.style.left = `${dot.x}px`;
      dot.element.style.top = `${dot.y}px`;
    });
    
    requestAnimationFrame(update);
  }
  
  update();
}

function getRandomIndices(textNodes) {
  const indices = [];
  const count = Math.floor(textNodes.length * 0.9); // 修改为消失90%的文字
  
  while (indices.length < count) {
    const index = Math.floor(Math.random() * textNodes.length);
    if (!indices.includes(index)) {
      indices.push(index);
    }
  }
  
  return indices;
}

function getTextNodes(element) {
  const walker = document.createTreeWalker(
    element,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: function(node) {
        // 跳过空白文本节点
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
  
  // 添加对Markdown渲染后HTML结构的处理
  const markdownElements = element.querySelectorAll('p, li, h1, h2, h3, h4, h5, h6, blockquote');
  markdownElements.forEach(el => {
    const innerWalker = document.createTreeWalker(
      el,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function(node) {
          return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        }
      },
      false
    );
    
    while (node = innerWalker.nextNode()) {
      if (!textNodes.includes(node)) {
        textNodes.push(node);
      }
    }
  });
  
  return textNodes;
}

document.addEventListener('DOMContentLoaded', initDisappearEffect);