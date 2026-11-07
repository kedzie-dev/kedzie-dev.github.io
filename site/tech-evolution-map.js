(() => {
  const root = document.getElementById('tech-evolution-map-root');
  const data = window.techEvolutionMap;
  if (!root || !data) return;

  const types = {
    'historical-trigger': '역사적 촉발',
    'design-prerequisite': '설계 전제',
    'solves-a-limit': '한계 해결',
    'operational-transition': '운영 전환'
  };
  const verificationLabels = { verified: '근거 확인됨', 'needs-review': '검증 대기' };
  const referenceById = new Map(data.references.map((reference) => [reference.id, reference]));
  const causalReferenceById = new Map(data.causalReferences.map((reference) => [reference.id, reference]));
  const nodeById = new Map(data.nodes.map((node) => [node.id, node]));
  const extensionsByNode = (data.extensions || []).reduce((counts, extension) => {
    counts.set(extension.mainNodeId, (counts.get(extension.mainNodeId) || 0) + 1);
    return counts;
  }, new Map());
  const selectedFromUrl = new URLSearchParams(window.location.search).get('node');
  let state = { selected: nodeById.has(selectedFromUrl) ? selectedFromUrl : 'http', era: 'all', detailed: false };
  const escape = (value) => String(value).replace(/[&<>"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[character]);

  function nodeButton(node) {
    const extensionCount = extensionsByNode.get(node.id) || 0;
    const extensionBadge = extensionCount ? `<span class="tem-node-extension" aria-label="심화 내용 ${extensionCount}개">심화 ${extensionCount}</span>` : '';
    return `<button type="button" class="tem-node domain-${node.domain}" data-node="${node.id}" aria-pressed="${node.id === state.selected}"><span class="tem-node-year">${node.mapYear}</span><strong>${escape(node.title)}</strong><span class="tem-node-english">${escape(node.english)}</span>${extensionBadge}</button>`;
  }

  function connectionEvidence(link, other, direction) {
    const verification = link.verification;
    const sources = verification.evidenceIds.map((id) => causalReferenceById.get(id)).filter(Boolean);
    const sourceHtml = sources.length
      ? sources.map((source) => `<a href="${source.url}" target="_blank" rel="noopener noreferrer">${escape(source.title)} ↗</a>`).join(', ')
      : '연결 근거 수집 전';
    return `<li><details class="tem-connection-record"><summary><span class="tem-edge ${link.type}">${types[link.type]}</span>${direction} ${escape(other.title)}<span class="tem-verification ${verification.status}">${verificationLabels[verification.status]}</span></summary><dl><div><dt>인과 메커니즘</dt><dd>${escape(verification.mechanism || '메커니즘을 작성해야 함.')}</dd></div><div><dt>시간 근거</dt><dd>${escape(verification.temporalBasis)}</dd></div><div><dt>근거 출처</dt><dd>${sourceHtml}</dd></div></dl></details></li>`;
  }

  function timeline() {
    return data.eras.filter((era) => state.era === 'all' || era.id === state.era).map((era) => {
      const nodes = data.nodes.filter((node) => node.era === era.id).sort((left, right) => left.mapYear - right.mapYear || left.title.localeCompare(right.title, 'ko'));
      return `<section class="tem-era" id="era-${era.id}" aria-labelledby="era-title-${era.id}"><header><p>${era.years}</p><h3 id="era-title-${era.id}">${era.title}</h3><span>${era.question}</span></header><div class="tem-node-grid">${nodes.map(nodeButton).join('')}</div></section>`;
    }).join('');
  }

  function detail() {
    const node = nodeById.get(state.selected);
    const reference = referenceById.get(node.sourceId);
    const related = data.links.filter((link) => link.from === node.id || link.to === node.id);
    const extensions = (data.extensions || []).filter((extension) => extension.mainNodeId === node.id);
    const grouped = ['why', 'solved', 'enabled'].map((field) => `<div><dt>${({ why: '왜 등장했나', solved: '무엇을 해결했나', enabled: '무엇을 가능하게 했나' })[field]}</dt><dd>${escape(node[field])}</dd></div>`).join('');
    const extensionHtml = extensions.length ? `<section class="tem-extensions"><h3>심화 내용</h3><p>지도의 핵심 흐름을 벗어나지 않고, 다음 질문으로 더 깊게 읽는다.</p><ul>${extensions.map((extension) => `<li><a href="${extension.url}"><strong>${escape(extension.title)}</strong><span>${escape(extension.description)} →</span></a></li>`).join('')}</ul></section>` : '';
    return `<aside class="tem-detail" aria-live="polite" aria-labelledby="tem-detail-title"><div class="tem-detail-kicker"><span class="tem-domain">${node.domain}</span><span>지도 연도 ${node.mapYear}</span></div><h2 id="tem-detail-title">${escape(node.title)} <small>${escape(node.english)}</small></h2><dl class="tem-story">${grouped}</dl>${extensionHtml}<section class="tem-connections"><h3>인과 연결 검증</h3><p>모든 화살표는 메커니즘·시간 근거·출처를 갖는 검증 대상입니다.</p><ul>${related.map((link) => { const other = nodeById.get(link.from === node.id ? link.to : link.from); return connectionEvidence(link, other, link.from === node.id ? '→' : '←'); }).join('')}</ul></section><p class="tem-reference"><strong>노드 출처</strong><a href="${reference.url}" target="_blank" rel="noopener noreferrer">${escape(reference.title)} <span aria-hidden="true">↗</span></a></p></aside>`;
  }

  function graph() {
    const selected = nodeById.get(state.selected);
    const visibleLinks = data.links.filter((link) => state.detailed || link.core).filter((link) => link.from === selected.id || link.to === selected.id);
    const relatedIds = [...new Set(visibleLinks.flatMap((link) => [link.from, link.to]))];
    const graphNodes = relatedIds.map((id) => nodeById.get(id));
    const positions = new Map();
    positions.set(selected.id, { x: 300, y: 150 });
    graphNodes.filter((node) => node.id !== selected.id).forEach((node, index) => {
      const angle = ((index / Math.max(1, graphNodes.length - 1)) * Math.PI * 1.6) + 0.75;
      positions.set(node.id, { x: 300 + Math.cos(angle) * 210, y: 150 + Math.sin(angle) * 108 });
    });
    const lines = visibleLinks.map((link) => { const a = positions.get(link.from); const b = positions.get(link.to); return `<line class="tem-graph-edge ${link.type}" x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" marker-end="url(#arrow-${link.type})"><title>${types[link.type]}</title></line>`; }).join('');
    const circles = graphNodes.map((node) => { const point = positions.get(node.id); return `<g class="tem-graph-node${node.id === selected.id ? ' is-selected' : ''}" data-node="${node.id}" transform="translate(${point.x} ${point.y})" tabindex="0" role="button" aria-label="${escape(node.title)} 선택"><circle r="${node.id === selected.id ? 37 : 29}"></circle><text y="5">${escape(node.title)}</text></g>`; }).join('');
    const empty = visibleLinks.length === 0 ? '<p class="tem-graph-empty">핵심 경로에서 직접 연결된 노드가 없습니다. 상세 연결을 켜 보세요.</p>' : '';
    return `<section class="tem-graph-panel" aria-labelledby="tem-graph-title"><header><div><p class="tem-eyebrow">CAUSAL GRAPH</p><h2 id="tem-graph-title">선택 그래프</h2><p>선은 “관련 있음”이 아니라, 설명 가능한 인과 주장입니다.</p></div><label class="tem-toggle"><input type="checkbox" data-detailed ${state.detailed ? 'checked' : ''}><span>상세 연결 보기</span></label></header>${empty}<svg class="tem-graph" viewBox="0 0 600 300" role="img" aria-label="${escape(selected.title)}의 인과 관계 그래프"><defs>${Object.keys(types).map((type) => `<marker id="arrow-${type}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z"></path></marker>`).join('')}</defs>${lines}${circles}</svg><div class="tem-legend">${Object.entries(types).map(([type, label]) => `<span><i class="${type}"></i>${label}</span>`).join('')}</div></section>`;
  }

  function render() {
    root.innerHTML = `<section class="tech-evolution-map" aria-label="기술 진화 지도"><header class="tem-hero"><p class="tem-eyebrow">TECH EVOLUTION MAP · ${data.nodes.length} NODES</p><h1>기술은 목록이 아니라,<br><em>한계를 넘기 위해 이어진 선택</em>이다.</h1><p>웹의 탄생부터 AI 에이전트까지. 시간축을 따라 읽고, 한 노드가 해결한 한계와 다음 변화를 탐색하세요.</p><div class="tem-metrics"><span><strong>6</strong> 시대</span><span><strong>${data.nodes.length}</strong> 기술 노드</span><span><strong>${data.links.length}</strong> 인과 연결</span></div></header><nav class="tem-era-filter" aria-label="시대 필터"><button type="button" data-era="all" aria-pressed="${state.era === 'all'}">전체</button>${data.eras.map((era) => `<button type="button" data-era="${era.id}" aria-pressed="${state.era === era.id}">${era.years}</button>`).join('')}</nav><div class="tem-layout"><main class="tem-timeline"><div class="tem-section-head"><p class="tem-eyebrow">READ THE PATH</p><h2>시간을 따라, 원인을 읽기</h2><p>각 노드를 선택하면 등장 배경, 다음 기술의 조건, 인과 연결 근거를 확인할 수 있습니다.</p></div>${timeline()}</main><div class="tem-sticky">${detail()}</div></div>${graph()}<section class="tem-method"><p class="tem-eyebrow">HOW TO READ</p><h2>두 가지 질문으로 읽는다</h2><div><article><strong>1</strong><h3>이전의 한계는 무엇이었나?</h3><p>기술은 기존 시스템의 비용·규모·복잡성·신뢰성 문제에 대한 응답으로 읽습니다.</p></article><article><strong>2</strong><h3>무엇을 가능하게 했나?</h3><p>시간 순서가 아닌, 다음 기술의 조건을 만든 연결만 표시합니다.</p></article></div></section><section class="tem-bibliography"><p class="tem-eyebrow">REFERENCES</p><h2>전체 참고문헌</h2><ol>${data.references.map((reference) => `<li><a href="${reference.url}" target="_blank" rel="noopener noreferrer">${escape(reference.title)} <span aria-hidden="true">↗</span></a></li>`).join('')}</ol></section></section>`;
  }

  function select(nodeId) { state.selected = nodeId; render(); requestAnimationFrame(() => root.querySelector('.tem-detail')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })); }
  root.addEventListener('click', (event) => { const node = event.target.closest('[data-node]'); const era = event.target.closest('[data-era]'); if (node) select(node.dataset.node); else if (era) { state.era = era.dataset.era; render(); } });
  root.addEventListener('change', (event) => { if (event.target.matches('[data-detailed]')) { state.detailed = event.target.checked; render(); } });
  root.addEventListener('keydown', (event) => { const node = event.target.closest('.tem-graph-node'); if (node && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); select(node.dataset.node); } });
  render();
})();
