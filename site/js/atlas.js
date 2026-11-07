(function () {
  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char];
    });
  }

  function setupCodeCopy() {
    if (!navigator.clipboard) return;
    document.querySelectorAll('.article-content pre:not(.mermaid)').forEach(function (pre) {
      var wrapper = pre.parentElement && pre.parentElement.classList.contains('highlight')
        ? pre.parentElement : document.createElement('div');
      if (!wrapper.classList.contains('highlight')) {
        pre.before(wrapper);
        wrapper.appendChild(pre);
      }
      wrapper.classList.add('highlight-wrapper');
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'copy-button';
      button.textContent = '복사';
      button.addEventListener('click', function () {
        navigator.clipboard.writeText(pre.innerText).then(function () {
          button.textContent = '복사됨';
          setTimeout(function () { button.textContent = '복사'; }, 1500);
        }).catch(function () { button.textContent = '복사 실패'; });
      });
      wrapper.prepend(button);
    });
  }

  function setupSearch() {
    var panel = document.getElementById('search-panel');
    if (!panel) return;
    var input = document.getElementById('search-query');
    var results = document.getElementById('search-results');
    var indexPromise;
    var previousFocus;

    function getIndex() {
      if (!indexPromise) indexPromise = fetch('/index.json')
        .then(function (response) { return response.ok ? response.json() : []; })
        .catch(function () { return []; });
      return indexPromise;
    }
    function openSearch() {
      previousFocus = document.activeElement;
      panel.hidden = false;
      input.value = '';
      results.textContent = '검색어를 입력하세요.';
      input.focus();
      getIndex();
    }
    function closeSearch() {
      panel.hidden = true;
      if (previousFocus && previousFocus.focus) previousFocus.focus();
    }
    function render(items, query) {
      var q = query.trim().toLowerCase();
      if (q.length < 2) { results.textContent = '두 글자 이상 입력하세요.'; return; }
      var matches = items.filter(function (item) {
        return [item.title, item.summary, item.section, item.content].join(' ').toLowerCase().includes(q);
      }).slice(0, 10);
      results.innerHTML = matches.length ? matches.map(function (item) {
        return '<a class="search-result" role="listitem" href="' + item.url + '"><strong>' +
          escapeHtml(item.title) + '</strong><span>' + escapeHtml(item.summary || item.section || '') + '</span></a>';
      }).join('') : '검색 결과가 없습니다.';
    }

    input.addEventListener('input', function () {
      getIndex().then(function (items) { render(items, input.value); });
    });
    document.querySelectorAll('.search-toggle').forEach(function (button) {
      button.addEventListener('click', openSearch);
    });
    panel.querySelector('.search-close').addEventListener('click', closeSearch);
    panel.addEventListener('click', function (event) {
      if (event.target === panel) closeSearch();
    });
    document.addEventListener('keydown', function (event) {
      if (panel.hidden) {
        if (event.key === '/' && !/input|textarea|select/i.test(document.activeElement.tagName)) {
          event.preventDefault(); openSearch();
        }
        return;
      }
      if (event.key === 'Escape') { closeSearch(); return; }
      if (event.key !== 'Tab') return;
      var focusable = Array.from(panel.querySelectorAll('button, input, a[href]'));
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    setupCodeCopy();
    setupSearch();
  });
})();
