// Shared header component
(function() {
  const isSubdir = window.location.pathname.includes('/essays/') ||
                   window.location.pathname.includes('/art-stuff/');
  const prefix = isSubdir ? '../' : './';
  const isHomepage = window.location.pathname === '/' ||
                     window.location.pathname.endsWith('/index.html') ||
                     window.location.pathname === '';

  const headerHTML = `
    <div class="header">
      <div class="name"${isHomepage ? ' id="nameSpinner"' : ''}>conrad soon</div>
      <nav>
        <a href="${prefix}">about</a>
        <a href="${prefix}art-stuff.html" class="disabled">art stuff</a>
        <a href="${prefix}thoughts.html">thoughts</a>
        <button id="toggleTheme">Toggle Night Mode</button>
      </nav>
    </div>
    <hr />
  `;

  const headerContainer = document.getElementById('shared-header');
  if (headerContainer) {
    headerContainer.innerHTML = headerHTML;
  }
})();
