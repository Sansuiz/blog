document.addEventListener('DOMContentLoaded', function() {
  // 将markdown中的[@...]转换为胶囊按钮
  const contentElements = document.querySelectorAll('.content');
  contentElements.forEach(el => {
    el.innerHTML = el.innerHTML.replace(
      /\[@([^\]]+)\]\((https?:\/\/[^\)]+)\)/g,
      '<a href="$2" class="capsule-button"><img src="avatar.png" class="capsule-avatar"><span>$1</span></a>'
    );
  });
});