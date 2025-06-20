function initDisappearEffect() {
  document.querySelectorAll('.note[data-disappear="true"]').forEach(note => {
    const content = note.querySelector('.note-content');
    const textNodes = getTextNodes(content);
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex >= textNodes.length) {
        clearInterval(interval);
        return;
      }

      const node = textNodes[currentIndex];
      const text = node.textContent;
      const parent = node.parentNode;
      const range = document.createRange();
      range.setStart(node, 0);
      range.setEnd(node, 1);
      const rect = range.getBoundingClientRect();

      // 创建圆点
      const dot = document.createElement('div');
      dot.className = 'dot';
      dot.style.width = `${Math.random() * 10 + 5}px`;
      dot.style.height = dot.style.width;
      dot.style.background = `hsl(${Math.random() * 360}, 70%, 60%)`;
      dot.style.left = `${rect.left}px`;
      dot.style.top = `${rect.top}px`;
      document.body.appendChild(dot);

      // 淡出文字
      node.textContent = text.substring(1);
      currentIndex++;
    }, 300);
  });
}

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
    if (node.textContent.trim()) {
      textNodes.push(node);
    }
  }
  return textNodes;
}

document.addEventListener('DOMContentLoaded', initDisappearEffect);