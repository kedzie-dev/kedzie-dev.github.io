(() => {
  const root = document.getElementById('incident-simulator-root');
  const scenario = window.incidentScenarios?.[root?.dataset.scenario];
  if (!root || !scenario) return;

  let state = createInitialState();
  const $ = (selector) => root.querySelector(selector);

  function createInitialState() {
    return { checked: new Set(), action: null };
  }

  function metricCard(metric) {
    return `<article class="signal-card"><span>${metric.label}</span><strong data-metric-value="${metric.id}">${metric.value}</strong><small data-metric-note="${metric.id}">${metric.note}</small></article>`;
  }

  function outcomeCard(outcome) {
    return `<article class="outcome-card"><span>${outcome.label}</span><strong data-outcome-value="${outcome.id}">${outcome.value}</strong><small data-outcome-note="${outcome.id}">${outcome.note}</small></article>`;
  }

  function render() {
    root.innerHTML = `
      <blockquote><p><strong>${scenario.prototypeLabel}</strong> — ${scenario.prototypeNotice}</p></blockquote>
      <p>${scenario.intro}</p>
      <section class="incident-simulator" aria-labelledby="incident-title">
        <header class="simulator-header">
          <div><p class="simulator-eyebrow">${scenario.incident.code}</p><h2 id="incident-title">${scenario.incident.title}</h2><p class="simulator-subtitle">${scenario.incident.subtitle}</p></div>
          <span id="incident-status" class="incident-badge ${scenario.initial.status.className}">${scenario.initial.status.label}</span>
        </header>
        <div class="simulator-progress" aria-label="시나리오 진행 상태">
          <p id="simulator-instruction" class="simulator-instruction" role="status" aria-live="polite"></p>
          <ol class="simulator-steps">${scenario.steps.map((step, index) => `<li class="simulator-step" data-step="${step.id}"><span class="step-number">${index + 1}</span><span><strong>${step.label}</strong><small>${step.note}</small></span></li>`).join('')}</ol>
        </div>
        <div class="simulator-summary" aria-label="현재 운영 상태">${scenario.initial.metrics.map(metricCard).join('')}</div>
        <div class="simulator-workspace">
          <div class="simulator-panel" aria-labelledby="evidence-title">
            <div class="panel-heading"><p class="simulator-eyebrow">EVIDENCE</p><h3 id="evidence-title">확인 가능한 신호</h3></div>
            <div class="evidence-actions">${scenario.evidence.map((item) => `<button type="button" class="simulator-button" data-action="${item.id}">${item.label}</button>`).join('')}</div>
            <div id="evidence-output" class="evidence-output" role="status" aria-live="polite">${scenario.copy.initialEvidence}</div>
          </div>
          <div class="simulator-panel" aria-labelledby="decision-title">
            <div class="panel-heading"><p class="simulator-eyebrow">DECISION</p><h3 id="decision-title">대응 선택</h3></div>
            <p id="decision-guidance" class="decision-guidance"></p>
            <div class="decision-list">${scenario.decisions.map((item) => `<button type="button" class="decision-button${item.primary ? ' is-primary' : ''}" data-action="${item.id}"><span>${item.label}</span><small>${item.hint}</small></button>`).join('')}</div>
          </div>
        </div>
        <div id="debrief" class="simulator-debrief" hidden aria-labelledby="debrief-title" tabindex="-1">
          <p class="simulator-eyebrow">DEBRIEF</p><h3 id="debrief-title">판단 결과</h3>
          <div class="outcome-summary" aria-label="대응 결과 요약" aria-live="polite">${scenario.initial.outcomes.map(outcomeCard).join('')}</div>
          <div id="debrief-output"></div>
        </div>
        <footer class="simulator-footer"><p id="timeline">${scenario.initial.timeline}</p><button type="button" class="simulator-reset" data-action="reset">시나리오 다시 시작</button></footer>
      </section>`;
    reset();
    root.addEventListener('click', handleClick);
  }

  function setStep(current) {
    const currentIndex = scenario.steps.findIndex((step) => step.id === current);
    root.querySelectorAll('.simulator-step').forEach((step, index) => {
      step.classList.toggle('is-complete', index < currentIndex);
      step.classList.toggle('is-current', index === currentIndex);
      if (index === currentIndex) step.setAttribute('aria-current', 'step');
      else step.removeAttribute('aria-current');
    });
  }

  function updateGuidance() {
    const checkedCount = state.checked.size;
    const evidenceProgress = $('[data-step="evidence"] small');
    evidenceProgress.textContent = `${checkedCount}/${scenario.evidence.length}개 확인`;
    if (state.action) {
      setStep('debrief');
      $('#simulator-instruction').textContent = scenario.copy.debriefInstruction;
      $('#decision-guidance').textContent = scenario.copy.afterDecisionGuidance;
    } else if (checkedCount > 0) {
      setStep('decision');
      $('#simulator-instruction').textContent = scenario.copy.decisionInstruction(checkedCount, scenario.evidence.length);
      $('#decision-guidance').textContent = scenario.copy.decisionGuidance(checkedCount, scenario.evidence.length);
    } else {
      setStep('evidence');
      $('#simulator-instruction').textContent = scenario.copy.initialInstruction;
      $('#decision-guidance').textContent = scenario.copy.initialDecisionGuidance;
    }
  }

  function setStatus(status) {
    const element = $('#incident-status');
    element.textContent = status.label;
    element.className = `incident-badge ${status.className}`;
  }

  function setMetrics(metrics) {
    metrics.forEach((metric) => {
      $(`[data-metric-value="${metric.id}"]`).textContent = metric.value;
      $(`[data-metric-note="${metric.id}"]`).textContent = metric.note;
    });
  }

  function setOutcomes(outcomes) {
    outcomes.forEach((outcome) => {
      $(`[data-outcome-value="${outcome.id}"]`).textContent = outcome.value;
      $(`[data-outcome-note="${outcome.id}"]`).textContent = outcome.note;
    });
  }

  function getDebrief(decision) {
    const conditional = decision.result.debrief.whenEvidence;
    if (conditional && conditional.required.every((id) => state.checked.has(id))) return conditional.complete;
    return decision.result.debrief.default;
  }

  function showDebrief(decision) {
    const result = decision.result;
    const debrief = getDebrief(decision);
    $('#debrief').hidden = false;
    $('#debrief').classList.toggle('is-success', debrief.success);
    $('#debrief-output').innerHTML = `<h4>${debrief.title}</h4><p>${debrief.body}</p>`;
    setStatus(result.status);
    setMetrics(result.metrics);
    setOutcomes(result.outcomes);
    $('#timeline').textContent = result.timeline;
    updateGuidance();
    $('#debrief').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    $('#debrief').focus({ preventScroll: true });
  }

  function showEvidence(evidence) {
    state.checked.add(evidence.id);
    $('#evidence-output').innerHTML = evidence.contentHtml;
    $(`[data-action="${evidence.id}"]`).classList.add('is-checked');
    updateGuidance();
  }

  function respond(decision) {
    state.action = decision.id;
    showDebrief(decision);
  }

  function reset() {
    state = createInitialState();
    setStatus(scenario.initial.status);
    setMetrics(scenario.initial.metrics);
    setOutcomes(scenario.initial.outcomes);
    $('#evidence-output').textContent = scenario.copy.initialEvidence;
    $('#timeline').textContent = scenario.initial.timeline;
    $('#debrief').hidden = true;
    $('#debrief').classList.remove('is-success');
    root.querySelectorAll('.is-checked').forEach((item) => item.classList.remove('is-checked'));
    updateGuidance();
  }

  function handleClick(event) {
    const button = event.target.closest('[data-action]');
    if (!button || !root.contains(button)) return;
    const action = button.dataset.action;
    const evidence = scenario.evidence.find((item) => item.id === action);
    const decision = scenario.decisions.find((item) => item.id === action);
    if (evidence) showEvidence(evidence);
    else if (decision) respond(decision);
    else if (action === 'reset') reset();
  }

  render();
})();
