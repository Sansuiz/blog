document.addEventListener('DOMContentLoaded', function() {
  // 将markdown中的[@...]转换为完整的胶囊按钮
  const contentElements = document.querySelectorAll('.content');
  contentElements.forEach(el => {
    el.innerHTML = el.innerHTML.replace(
      /\[@([^\]]+)\]\((https?:\/\/[^\)]+)\)/g,
      '<a href="$2" class="capsule-button">' +
      '<img src="/images/avatar.png" class="capsule-avatar" alt="$1">' +
      '<span class="capsule-name">$1</span>' +
      '</a>'
    );
  });
});