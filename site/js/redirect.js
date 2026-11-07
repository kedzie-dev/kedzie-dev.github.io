// Preserve bookmarked filters and heading fragments on legacy URLs.
(function () {
  var target = document.currentScript.dataset.target;
  window.location.replace(target + window.location.search + window.location.hash);
})();
