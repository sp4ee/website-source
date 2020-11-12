// Initialize smart Substack newsletter subscription embedding
window.addEventListener("load", function () {
  const v = document.getElementsByClassName('newsletter-signup');
  function updateElement() {
    this.innerHTML = '<iframe src="https://sp4ee.substack.com/embed" frameborder="0" scrolling="no"></iframe>';
  }
  for (i = 0; i < v.length; i++) {
    v[i].addEventListener("click", updateElement);
  }
  const lbl = document.getElementsByClassName('newsletter-signup-link');
  for (i = 0; i < lbl.length; i++) {
    lbl[i].addEventListener("click", function(e) {
      e.stopPropagation = true;
      e.cancelBubble = true;
    });
  }
});

// Initialize smart YouTube video embeddings
window.addEventListener("load", function () {
  const v = document.getElementsByClassName('youtube-container');
  function updateVideo() {
    const id = this.id.replace('vid-', '');
    const w = this.clientWidth;
    const h = this.clientHeight;
    this.innerHTML =
      '<iframe src="//www.youtube.com/embed/' + id +
      '?autoplay=1" frameborder="0" width="' + w + '" height="' + h + '" allowfullscreen></iframe>';
  }
  for (i = 0; i < v.length; i++) {
    v[i].addEventListener("click", updateVideo);
  }
  const lbl = document.getElementsByClassName('youtube-placeholder-label');
  for (i = 0; i < lbl.length; i++) {
    lbl[i].addEventListener("click", function(e) {
      e.stopPropagation = true;
      e.cancelBubble = true;
    });
  }
});
