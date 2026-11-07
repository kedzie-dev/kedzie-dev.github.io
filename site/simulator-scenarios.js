/*
 * Add a new Incident Lab by adding one scenario object below, then create a
 * HTML page whose #incident-simulator-root data-scenario matches its key.
 * Keep stable ids for metrics, evidence, decisions, and outcomes so the common
 * renderer can update the scenario without scenario-specific HTML or logic.
 */
window.incidentScenarios = {
  'deployment-timeout': {
    prototypeLabel: '프로토타입',
    prototypeNotice: '한 번의 장애 상황에서 관측·가설·대응 흐름이 자연스러운지 확인하기 위한 브라우저 내 시뮬레이터입니다. 실제 서비스나 클라우드 리소스에는 연결되지 않습니다.',
    intro: '<code>checkout-api</code>의 배포 직후 5xx 오류가 증가했습니다. 먼저 신호를 확인하고, 가장 적절한 대응을 선택해 보세요. 모든 상태는 선택할 때마다 이 화면에서 갱신됩니다.',
    incident: {
      code: 'INC-2026-0725 · SEV-2',
      title: 'checkout-api 오류율 증가',
      subtitle: '14:02에 새 버전 배포 후 결제 요청 일부가 실패하고 있습니다.'
    },
    steps: [
      { id: 'evidence', label: '신호 확인', note: '0/3개 확인' },
      { id: 'decision', label: '대응 선택', note: '근거를 바탕으로 선택' },
      { id: 'debrief', label: '판단 결과', note: '대응의 영향을 확인' }
    ],
    copy: {
      initialInstruction: '1단계: 확인 가능한 신호를 먼저 살펴보세요. 최소 두 가지를 비교하면 대응 판단이 쉬워집니다.',
      initialDecisionGuidance: '신호를 확인한 뒤, 가장 적절한 대응을 선택하세요.',
      decisionInstruction: (checked, total) => `2단계: 신호 ${checked}/${total}개를 확인했습니다. 이제 근거를 바탕으로 대응을 선택하세요.`,
      decisionGuidance: (checked, total) => `확인한 신호 ${checked}/${total}개. 대응을 선택하면 판단 결과를 볼 수 있습니다.`,
      debriefInstruction: '3단계: 판단 결과를 확인하세요. 시나리오를 다시 시작해 다른 대응도 비교할 수 있습니다.',
      afterDecisionGuidance: '대응을 선택했습니다. 아래 판단 결과에서 영향과 다음 확인 항목을 살펴보세요.',
      initialEvidence: '아직 확인한 신호가 없습니다. 증상만으로 대응하지 말고, 근거부터 좁혀 보세요.'
    },
    initial: {
      status: { label: '조사 필요', className: 'is-critical' },
      metrics: [
        { id: 'error-rate', label: '5xx 오류율', value: '12.8%', note: 'SLO 1% 초과' },
        { id: 'latency', label: 'p95 응답 시간', value: '1.9s', note: '평소 240ms' },
        { id: 'impact', label: '영향 요청', value: '1,284', note: '최근 10분' },
        { id: 'version', label: '실행 버전', value: '2026.07.25-2', note: '14:02 배포' }
      ],
      outcomes: [
        { id: 'elapsed', label: '경과 시간', value: '—', note: '대응 후 결과' },
        { id: 'outcome-impact', label: '최종 영향 요청', value: '—', note: '대응 후 누적' },
        { id: 'cost', label: '운영 비용·낭비', value: '—', note: '대응에 따른 추가 부담' }
      ],
      timeline: '14:02 · checkout-api 2026.07.25-2 배포 완료'
    },
    evidence: [
      { id: 'deploy', label: '최근 배포 확인', contentHtml: '<strong>배포 이벤트</strong><br>14:02 · <code>2026.07.25-2</code>가 배포됐습니다. 직전 버전은 <code>2026.07.18-1</code>입니다. 오류율 증가는 배포 90초 뒤부터 시작했습니다.' },
      { id: 'logs', label: '오류 로그 확인', contentHtml: '<strong>오류 로그</strong><br><code>PaymentClient: connect ETIMEDOUT payment-gateway</code><br>새 버전에서 결제 게이트웨이 연결 timeout 값이 3초에서 500ms로 변경됐습니다.' },
      { id: 'metrics', label: '의존성 지표 확인', contentHtml: '<strong>의존성 지표</strong><br>CPU 41%, 메모리 58%, pod 재시작 0회입니다. 반면 payment-gateway 호출 timeout은 분당 186건입니다. 용량 포화 신호는 보이지 않습니다.' }
    ],
    decisions: [
      {
        id: 'restart', label: '서비스 재시작', hint: '증상을 일시적으로 완화할 수 있음',
        result: {
          status: { label: '미복구', className: 'is-critical' },
          metrics: [
            { id: 'error-rate', value: '14.1%', note: '재시작 후 다시 증가' }, { id: 'latency', value: '2.2s', note: '의존성 timeout 지속' }, { id: 'impact', value: '2,438', note: '18분 누적' }, { id: 'version', value: '2026.07.25-2', note: '문제 버전 계속 실행' }
          ],
          outcomes: [
            { id: 'elapsed', value: '18분', note: '14:02 배포 → 14:20 미복구' }, { id: 'outcome-impact', value: '2,438건', note: '복구하지 못해 1,097건 추가' }, { id: 'cost', value: '재시작 1회', note: '18분 지연 · 운영자 대응 낭비' }
          ],
          timeline: '14:20 · 재시작 후 오류율 재증가, 원인 미해결',
          debrief: { default: { success: false, title: '재시작은 원인을 해결하지 못했습니다.', body: '프로세스는 다시 뜨지만 새 버전의 500ms timeout 설정도 그대로입니다. 18분이 지나도 복구되지 않아 영향 요청이 2,438건으로 늘었습니다. 변경·로그를 확인한 뒤 롤백 여부를 판단하세요.' } }
        }
      },
      {
        id: 'scale', label: '인스턴스 확장', hint: '용량 부족일 때만 효과적',
        result: {
          status: { label: '미복구', className: 'is-critical' },
          metrics: [
            { id: 'error-rate', value: '13.6%', note: '용량 증설에도 SLO 초과' }, { id: 'latency', value: '2.0s', note: '의존성 timeout 지속' }, { id: 'impact', value: '3,012', note: '20분 누적' }, { id: 'version', value: '2026.07.25-2', note: '문제 버전 계속 실행' }
          ],
          outcomes: [
            { id: 'elapsed', value: '20분', note: '14:02 배포 → 14:22 미복구' }, { id: 'outcome-impact', value: '3,012건', note: '복구하지 못해 1,671건 추가' }, { id: 'cost', value: '인스턴스 2개 증설', note: '10분 추가 사용 · 불필요한 인프라 비용' }
          ],
          timeline: '14:22 · 인스턴스 2개 추가, timeout 지속으로 미복구',
          debrief: { default: { success: false, title: '용량을 늘렸지만 병목 신호가 아닙니다.', body: 'CPU·메모리 여유가 있는데도 20분 동안 복구되지 않아 영향 요청이 3,012건까지 늘었습니다. 인스턴스 2개를 더 썼지만 timeout 원인은 그대로입니다. 의존성 오류와 최근 변경을 먼저 비교해 보세요.' } }
        }
      },
      {
        id: 'rollback', label: '이전 버전으로 롤백', hint: '변경과 증상의 상관관계를 빠르게 차단', primary: true,
        result: {
          status: { label: '복구됨', className: 'is-healthy' },
          metrics: [
            { id: 'error-rate', value: '0.3%', note: 'SLO 범위 내' }, { id: 'latency', value: '260ms', note: '정상 범위' }, { id: 'impact', value: '1,341', note: '복구 전 누적' }, { id: 'version', value: '2026.07.18-1', note: '14:15 롤백 완료' }
          ],
          outcomes: [
            { id: 'elapsed', value: '13분', note: '14:02 배포 → 14:15 복구' }, { id: 'outcome-impact', value: '1,341건', note: '복구 전 최종 누적' }, { id: 'cost', value: '추가 인프라 비용 없음', note: '이전 검증 버전으로 복귀' }
          ],
          timeline: '14:15 · 이전 검증 버전으로 롤백, 오류율 정상화',
          debrief: {
            default: { success: true, title: '복구는 됐지만, 근거를 남기세요.', body: '13분 안에 영향을 줄였지만 원인을 확인하지 않은 대응입니다. 다음에는 배포 이벤트와 오류 로그를 함께 확인해 변경과 증상의 관계를 남겨 보세요.' },
            whenEvidence: {
              required: ['deploy', 'logs'],
              complete: { success: true, title: '근거 있는 롤백입니다.', body: '13분 안에 영향을 차단했습니다. 배포 직후 시작된 timeout 변경과 오류 로그를 연결해 변경을 되돌렸습니다. 후속 조치로 timeout 변경의 검증, 의존성 호출 SLI, 배포 후 오류율 알림 기준을 점검할 수 있습니다.' }
            }
          }
        }
      }
    ]
  },
  'db-connection-pool': {
    prototypeLabel: '프로토타입',
    prototypeNotice: '한 번의 장애 상황에서 관측·가설·대응 흐름이 자연스러운지 확인하기 위한 브라우저 내 시뮬레이터입니다. 실제 서비스나 클라우드 리소스에는 연결되지 않습니다.',
    intro: '<code>orders-api</code>의 요청 지연과 5xx 오류가 증가했습니다. DB가 느리다는 가정부터 확인하지 말고, 연결을 누가 오래 점유하는지 먼저 좁혀 보세요.',
    incident: {
      code: 'INC-2026-0727 · SEV-2',
      title: 'orders-api DB connection pool 고갈',
      subtitle: '10:12 이후 주문 조회 요청이 대기하고 있으며, 일부 요청이 connection timeout으로 실패합니다.'
    },
    steps: [
      { id: 'evidence', label: '신호 확인', note: '0/3개 확인' },
      { id: 'decision', label: '대응 선택', note: '근거를 바탕으로 선택' },
      { id: 'debrief', label: '판단 결과', note: '대응의 영향을 확인' }
    ],
    copy: {
      initialInstruction: '1단계: 요청량, 연결 대기열, worker 동시성을 비교해 포화 지점을 찾으세요.',
      initialDecisionGuidance: '증상만 완화하는 대응보다, 연결을 점유하는 원인을 먼저 확인하세요.',
      decisionInstruction: (checked, total) => `2단계: 신호 ${checked}/${total}개를 확인했습니다. 이제 포화 원인을 줄일 대응을 선택하세요.`,
      decisionGuidance: (checked, total) => `확인한 신호 ${checked}/${total}개. 대응을 선택하면 연결 대기열과 영향 변화를 볼 수 있습니다.`,
      debriefInstruction: '3단계: 판단 결과를 확인하세요. 시나리오를 다시 시작해 다른 대응의 비용도 비교할 수 있습니다.',
      afterDecisionGuidance: '대응을 선택했습니다. 아래 결과에서 연결 점유와 사용자 영향이 어떻게 바뀌었는지 살펴보세요.',
      initialEvidence: '아직 확인한 신호가 없습니다. 요청량, connection pool, worker 동시성을 순서대로 비교해 보세요.'
    },
    initial: {
      status: { label: '조사 필요', className: 'is-critical' },
      metrics: [
        { id: 'db-connections', label: 'DB 연결 점유', value: '100/120', note: '대기 37건' },
        { id: 'latency', label: 'p95 응답 시간', value: '4.8s', note: '평소 420ms' },
        { id: 'error-rate', label: '5xx 오류율', value: '6.4%', note: 'SLO 1% 초과' },
        { id: 'db-cpu', label: 'DB CPU', value: '46%', note: '포화 신호 없음' }
      ],
      outcomes: [
        { id: 'elapsed', label: '경과 시간', value: '—', note: '대응 후 결과' },
        { id: 'outcome-impact', label: '최종 영향 요청', value: '—', note: '대응 후 누적' },
        { id: 'cost', label: '운영 비용·낭비', value: '—', note: '대응에 따른 추가 부담' }
      ],
      timeline: '10:12 · bulk-export worker 동시성 증가, orders-api 대기열 상승'
    },
    evidence: [
      { id: 'traffic', label: '요청량 확인', contentHtml: '<strong>요청 추이</strong><br>주문 조회 요청량은 평소와 비슷합니다. 다만 10:12에 <code>bulk-export</code> worker 동시성이 4에서 32로 증가했습니다.' },
      { id: 'pool', label: 'connection pool 확인', contentHtml: '<strong>연결 대기열</strong><br><code>active=100, idle=0, pending=37</code><br>DB CPU 46%, 디스크 대기 2ms입니다. DB 자체 포화보다 애플리케이션의 연결 대기가 핵심 신호입니다.' },
      { id: 'worker', label: 'worker 로그 확인', contentHtml: '<strong>worker 로그</strong><br><code>bulk-export: transaction held 28s · concurrency=32</code><br>대량 export가 트랜잭션을 오래 유지해 API와 같은 DB 연결 예산을 점유하고 있습니다.' }
    ],
    decisions: [
      {
        id: 'restart-api', label: 'orders-api 재시작', hint: '일시적으로 연결을 비울 수 있음',
        result: {
          status: { label: '미복구', className: 'is-critical' },
          metrics: [
            { id: 'db-connections', value: '106/120', note: '대기 44건으로 재증가' }, { id: 'latency', value: '5.2s', note: 'worker 점유 지속' }, { id: 'error-rate', value: '7.1%', note: 'SLO 초과 지속' }, { id: 'db-cpu', value: '47%', note: '여전히 포화 아님' }
          ],
          outcomes: [
            { id: 'elapsed', value: '18분', note: '10:12 → 10:30 미복구' }, { id: 'outcome-impact', value: '2,246건', note: '복구하지 못해 1,184건 추가' }, { id: 'cost', value: '재시작 1회', note: '18분 지연 · worker 원인 미해결' }
          ],
          timeline: '10:30 · orders-api 재시작 뒤 대기열 재증가, worker 연결 점유 지속',
          debrief: { default: { success: false, title: '재시작은 연결을 잠시 비울 뿐입니다.', body: 'API 프로세스가 다시 시작해도 bulk-export worker는 트랜잭션을 계속 잡고 있습니다. DB CPU가 낮다는 신호와 connection 대기열을 함께 확인했다면, 연결을 점유하는 작업부터 격리해야 합니다.' } }
        }
      },
      {
        id: 'scale-api', label: 'orders-api 인스턴스 확장', hint: '연결 수를 더 늘릴 수 있음',
        result: {
          status: { label: '악화됨', className: 'is-critical' },
          metrics: [
            { id: 'db-connections', value: '120/120', note: 'DB 최대 연결 수 도달' }, { id: 'latency', value: '6.1s', note: '새 인스턴스도 대기' }, { id: 'error-rate', value: '9.3%', note: 'connection timeout 증가' }, { id: 'db-cpu', value: '49%', note: 'CPU가 원인이 아님' }
          ],
          outcomes: [
            { id: 'elapsed', value: '21분', note: '10:12 → 10:33 미복구' }, { id: 'outcome-impact', value: '3,108건', note: '복구하지 못해 2,046건 추가' }, { id: 'cost', value: '인스턴스 2개 증설', note: 'DB 연결 경쟁과 인프라 비용 증가' }
          ],
          timeline: '10:33 · orders-api 2개 증설, DB 최대 연결 수 도달',
          debrief: { default: { success: false, title: '확장은 연결 경쟁을 키웠습니다.', body: '요청 처리 인스턴스를 늘리면 DB 연결을 더 요구합니다. 이미 worker가 연결 예산을 점유한 상태에서는 새 인스턴스도 대기열에 합류할 뿐입니다. DB CPU가 낮고 pending 연결이 늘었다면, 먼저 점유 작업을 줄여야 합니다.' } }
        }
      },
      {
        id: 'isolate-worker', label: 'bulk-export worker 격리', hint: '긴 트랜잭션의 연결 점유를 먼저 차단', primary: true,
        result: {
          status: { label: '복구됨', className: 'is-healthy' },
          metrics: [
            { id: 'db-connections', value: '54/120', note: '대기 0건으로 정상화' }, { id: 'latency', value: '420ms', note: '정상 범위' }, { id: 'error-rate', value: '0.4%', note: 'SLO 범위 내' }, { id: 'db-cpu', value: '42%', note: '정상 범위' }
          ],
          outcomes: [
            { id: 'elapsed', value: '12분', note: '10:12 → 10:24 복구' }, { id: 'outcome-impact', value: '1,426건', note: '복구 전 최종 누적' }, { id: 'cost', value: 'worker 1개 격리', note: 'export 지연 · API 영향 차단' }
          ],
          timeline: '10:24 · bulk-export worker 격리, connection 대기열 정상화',
          debrief: {
            default: { success: true, title: '영향은 줄였지만, 근거를 남기세요.', body: 'worker를 격리해 12분 안에 API 영향을 차단했습니다. 다음에는 connection 대기열, 트랜잭션 보유 시간, worker 동시성을 함께 기록해 격리 기준을 명확히 하세요.' },
            whenEvidence: {
              required: ['pool', 'worker'],
              complete: { success: true, title: '연결 점유를 근거로 격리했습니다.', body: 'DB CPU가 낮은데 pending 연결이 늘고, bulk-export가 긴 트랜잭션을 유지한다는 근거를 연결했습니다. worker를 격리해 12분 안에 대기열과 API 오류를 정상화했습니다. 후속 조치로 worker 전용 연결 예산, 동시성 상한, 장기 트랜잭션 알림을 검토하세요.' }
            }
          }
        }
      }
    ]
  },
  'hpa-wrong-signal': {
    prototypeLabel: '프로토타입',
    prototypeNotice: '한 번의 장애 상황에서 관측·가설·대응 흐름이 자연스러운지 확인하기 위한 브라우저 내 시뮬레이터입니다. 실제 서비스나 클라우드 리소스에는 연결되지 않습니다.',
    intro: '<code>catalog-api</code>의 요청 지연이 증가했지만 HPA는 메모리 사용률만 보고 있습니다. 실제 수요와 비례하는 신호를 비교해, 영향과 낭비를 함께 줄일 대응을 선택해 보세요.',
    incident: {
      code: 'INC-2026-0727 · SEV-2',
      title: 'catalog-api HPA 스케일링 신호 불일치',
      subtitle: '15:04 이후 요청 대기열과 지연이 늘었지만, HPA replica 수는 3개에 머물러 있습니다.'
    },
    steps: [
      { id: 'evidence', label: '신호 확인', note: '0/3개 확인' },
      { id: 'decision', label: '대응 선택', note: '근거를 바탕으로 선택' },
      { id: 'debrief', label: '판단 결과', note: '대응의 영향을 확인' }
    ],
    copy: {
      initialInstruction: '1단계: HPA 지표와 요청률·CPU·동시성을 비교해 실제 수요 신호를 찾으세요.',
      initialDecisionGuidance: 'replica 수나 목표값부터 바꾸기 전에, 어떤 신호가 포화를 설명하는지 확인하세요.',
      decisionInstruction: (checked, total) => `2단계: 신호 ${checked}/${total}개를 확인했습니다. 이제 수요에 맞는 스케일링 대응을 선택하세요.`,
      decisionGuidance: (checked, total) => `확인한 신호 ${checked}/${total}개. 대응을 선택하면 사용자 영향과 운영 낭비를 비교할 수 있습니다.`,
      debriefInstruction: '3단계: 판단 결과를 확인하세요. 시나리오를 다시 시작해 세 대응의 시간·영향·비용을 비교할 수 있습니다.',
      afterDecisionGuidance: '대응을 선택했습니다. 아래 결과에서 HPA 신호와 실제 수요의 차이를 확인하세요.',
      initialEvidence: '아직 확인한 신호가 없습니다. 메모리 사용률만 보지 말고 요청률, CPU, 동시성을 비교해 보세요.'
    },
    initial: {
      status: { label: '조사 필요', className: 'is-critical' },
      metrics: [
        { id: 'memory', label: 'HPA 메모리 사용률', value: '42%', note: '목표 70% · 3 replicas 유지' },
        { id: 'request-rate', label: '요청률', value: '1,860 rpm', note: '평소 720 rpm' },
        { id: 'cpu', label: 'CPU 사용률', value: '83%', note: '처리 포화 신호' },
        { id: 'concurrency', label: 'in-flight 요청', value: '74/pod', note: '안정 범위 25/pod' }
      ],
      outcomes: [
        { id: 'elapsed', label: '경과 시간', value: '—', note: '대응 후 결과' },
        { id: 'outcome-impact', label: '최종 영향 요청', value: '—', note: '대응 후 누적' },
        { id: 'cost', label: '운영 비용·낭비', value: '—', note: '대응에 따른 추가 부담' }
      ],
      timeline: '15:04 · 캠페인 유입 시작, 요청률 상승에도 HPA는 메모리 42%만 평가'
    },
    evidence: [
      { id: 'hpa', label: 'HPA 설정·메모리 확인', contentHtml: '<strong>HPA 상태</strong><br><code>averageUtilization: memory 70%</code> · 현재 42% · <code>3 replicas</code><br>응답 본문은 작고 캐시가 자주 비워져 메모리 사용률은 요청량과 비례하지 않습니다. HPA가 확장 조건을 충족하지 못합니다.' },
      { id: 'demand', label: '요청률·CPU 확인', contentHtml: '<strong>수요와 처리량</strong><br>요청률은 <code>720 → 1,860 rpm</code>, CPU는 <code>38% → 83%</code>로 함께 증가했습니다. pod당 처리량은 약 620 rpm 부근에서 포화되어, CPU와 요청률은 실제 수요를 설명합니다.' },
      { id: 'concurrency', label: '동시성·대기열 확인', contentHtml: '<strong>포화 지표</strong><br><code>in_flight_requests=74/pod</code>, 대기열 318건, p95 3.6s입니다. 안정 범위는 pod당 동시성 25 이하입니다. 메모리는 42%로 평평하지만 요청 대기는 계속 쌓입니다.' }
    ],
    decisions: [
      {
        id: 'scale-out', label: 'replica를 8개로 즉시 고정 확장', hint: '현재 증상은 완화하지만 자동 기준은 그대로',
        result: {
          status: { label: '부분 복구', className: 'is-critical' },
          metrics: [
            { id: 'memory', value: '31%', note: '낮아져도 HPA 기준은 그대로' }, { id: 'request-rate', value: '1,860 rpm', note: '수요 신호는 미연결' }, { id: 'cpu', value: '46%', note: '8개로 분산' }, { id: 'concurrency', value: '28/pod', note: '다음 변동에 다시 포화 가능' }
          ],
          outcomes: [
            { id: 'elapsed', value: '17분', note: '15:04 → 15:21 부분 안정화' }, { id: 'outcome-impact', value: '2,184건', note: '수동 판단·확장 전 누적' }, { id: 'cost', value: '8 replicas 고정', note: '저부하에도 5개 과잉 운영 · 신호 미수정' }
          ],
          timeline: '15:21 · 수동 8 replicas 확장, 지연 완화되나 HPA는 메모리만 평가',
          debrief: { default: { success: false, title: '확장은 증상을 덮었지만 기준은 틀린 채입니다.', body: '8개 pod로 현재 대기열은 줄었지만, 다음 트래픽 변동에도 운영자가 다시 개입해야 합니다. 저부하에서 5개 pod가 과잉으로 남아 비용을 낭비합니다. HPA 지표가 실제 수요를 따르도록 바꿔야 합니다.' } }
        }
      },
      {
        id: 'tune-memory', label: '메모리 목표값을 40%로 낮춤', hint: '같은 비례하지 않는 지표를 더 민감하게 만듦',
        result: {
          status: { label: '불안정', className: 'is-critical' },
          metrics: [
            { id: 'memory', value: '39%', note: '캐시 변동에 따라 6→3 replicas' }, { id: 'request-rate', value: '1,860 rpm', note: '수요 변화와 무관' }, { id: 'cpu', value: '71%', note: '축소 뒤 다시 상승' }, { id: 'concurrency', value: '49/pod', note: '대기열 재증가' }
          ],
          outcomes: [
            { id: 'elapsed', value: '24분', note: '15:04 → 15:28 불안정 지속' }, { id: 'outcome-impact', value: '3,416건', note: 'flapping 동안 추가 영향' }, { id: 'cost', value: '6→3 replicas 반복', note: '스케일 변동 · 캐시 재가열 · 운영자 대응 낭비' }
          ],
          timeline: '15:28 · 메모리 캐시 변동으로 HPA 반복 확장·축소, 대기열 재증가',
          debrief: { default: { success: false, title: '목표값을 낮춰도 잘못된 신호는 수요를 설명하지 못합니다.', body: '40%라는 값은 메모리를 더 민감하게 할 뿐, 요청률과 관계없는 캐시 변동에 반응합니다. 그 결과 replica가 반복 변동하고 영향 요청은 3,416건으로 늘었습니다. 임계값보다 지표의 인과성을 먼저 검증하세요.' } }
        }
      },
      {
        id: 'change-signal', label: '요청 동시성 기준으로 HPA 신호 변경', hint: '실제 처리 수요에 비례하는 지표를 사용', primary: true,
        result: {
          status: { label: '복구됨', className: 'is-healthy' },
          metrics: [
            { id: 'memory', value: '36%', note: '참고 지표로 유지' }, { id: 'request-rate', value: '1,860 rpm', note: '수요와 함께 관측' }, { id: 'cpu', value: '54%', note: '6 replicas로 분산' }, { id: 'concurrency', value: '23/pod', note: '목표 25 이하로 정상화' }
          ],
          outcomes: [
            { id: 'elapsed', value: '11분', note: '15:04 → 15:15 복구' }, { id: 'outcome-impact', value: '1,062건', note: '복구 전 최종 누적' }, { id: 'cost', value: '6 replicas 자동 조정', note: '수요 하락 시 축소 · 불필요한 pod 없음' }
          ],
          timeline: '15:15 · in-flight 요청 목표 25/pod로 HPA 변경, 6 replicas에서 대기열 정상화',
          debrief: {
            default: { success: true, title: '올바른 방향이지만, 수요 근거를 확인하세요.', body: '동시성 기준으로 바꿔 11분 안에 대기열을 정상화했습니다. 다음에는 요청률·CPU·동시성의 상관관계와 목표값 25/pod의 용량 검증을 기록해, 다음 트래픽에서도 안전하게 조정하세요.' },
            whenEvidence: {
              required: ['demand', 'concurrency'],
              complete: { success: true, title: '실제 수요를 근거로 스케일링 신호를 바로잡았습니다.', body: '요청률·CPU 상승과 pod당 동시성 74를 함께 확인해, 메모리가 아닌 처리 수요가 병목임을 입증했습니다. 동시성 목표 25/pod로 HPA를 바꿔 11분 안에 복구했고, 수요가 내려가면 자동 축소해 과잉 pod 비용도 피합니다. 후속으로 목표 동시성의 부하 시험, 최대 replica 여유, 요청률·대기열 알림을 점검하세요.' }
            }
          }
        }
      }
    ]
  },
  'argo-cd-drift-sync': {
    prototypeLabel: '프로토타입',
    prototypeNotice: '한 번의 장애 상황에서 관측·가설·대응 흐름이 자연스러운지 확인하기 위한 브라우저 내 시뮬레이터입니다. 실제 서비스나 클라우드 리소스에는 연결되지 않습니다.',
    intro: '<code>orders-api</code>의 선언 상태는 정상 버전을 가리키지만, 클러스터에는 사람이 수정한 live state와 실패한 sync가 남아 있습니다. Argo CD 상태·sync 이력·workload 상태를 비교하고, 복구 범위를 판단해 보세요.',
    incident: {
      code: 'INC-2026-0727 · SEV-2',
      title: 'orders-api Argo CD drift와 sync 실패',
      subtitle: '11:06부터 일부 주문 요청이 5xx입니다. Application은 OutOfSync이고, live Deployment는 desired state와 다릅니다.'
    },
    steps: [
      { id: 'evidence', label: '상태 비교', note: '0/3개 확인' },
      { id: 'decision', label: '복구 선택', note: '근거를 바탕으로 선택' },
      { id: 'debrief', label: '판단 결과', note: '대응의 영향을 확인' }
    ],
    copy: {
      initialInstruction: '1단계: Git의 desired state, Argo CD sync 이력, live workload 상태를 서로 비교하세요.',
      initialDecisionGuidance: 'OutOfSync만 보고 즉시 강제 sync하지 말고, 어떤 변경이 왜 실패했는지 먼저 좁히세요.',
      decisionInstruction: (checked, total) => `2단계: 근거 ${checked}/${total}개를 확인했습니다. 복구 범위와 sync 방법을 선택하세요.`,
      decisionGuidance: (checked, total) => `확인한 근거 ${checked}/${total}개. 대응을 선택하면 시간·영향·운영 낭비를 비교할 수 있습니다.`,
      debriefInstruction: '3단계: 판단 결과를 확인하세요. 다시 시작해 강제 sync, live 수정, 안전한 복구의 차이를 비교할 수 있습니다.',
      afterDecisionGuidance: '대응을 선택했습니다. 아래 결과에서 선언 상태와 live state를 어떻게 다뤘는지 확인하세요.',
      initialEvidence: '아직 확인한 근거가 없습니다. Application 상태 하나로 원인을 단정하지 말고 desired·sync·workload를 비교하세요.'
    },
    initial: {
      status: { label: '조사 필요', className: 'is-critical' },
      metrics: [
        { id: 'application', label: 'Argo CD Application', value: 'OutOfSync', note: 'Sync 실패 후 drift 감지' },
        { id: 'sync', label: '마지막 sync', value: 'Failed', note: '11:04 · PreSync hook 실패' },
        { id: 'workload', label: 'orders-api ready', value: '2/4 pods', note: 'live replicas=2 · desired=4' },
        { id: 'errors', label: '주문 5xx', value: '8.7%', note: 'SLO 1% 초과' }
      ],
      outcomes: [
        { id: 'elapsed', label: '경과 시간', value: '—', note: '대응 후 결과' },
        { id: 'outcome-impact', label: '최종 영향 요청', value: '—', note: '대응 후 누적' },
        { id: 'cost', label: '운영 비용·낭비', value: '—', note: '대응에 따른 추가 부담' }
      ],
      timeline: '11:04 · Git revision 4f91c2a sync 시작, PreSync migration hook 실패 후 live Deployment가 2 replicas로 남음'
    },
    evidence: [
      { id: 'desired', label: 'Git desired state 확인', contentHtml: '<strong>선언한 상태</strong><br><code>main@4f91c2a</code>의 <code>orders-api</code> Deployment는 <code>replicas: 4</code>, image <code>registry/orders-api@sha256:8ad…</code>를 선언합니다.<br>같은 revision의 migration Job은 <code>DATABASE_URL</code> Secret 참조를 새 이름 <code>orders-db-v2</code>로 바꿨습니다.' },
      { id: 'sync-history', label: 'Argo CD sync 이력·오류 확인', contentHtml: '<strong>Application sync 이력</strong><br><code>11:04 Sync Failed</code> · PreSync <code>migrate-orders-4f91c2a</code> Job: <code>secret &quot;orders-db-v2&quot; not found</code><br>자동 sync는 실패한 hook 뒤 중단됐고 Application은 <code>OutOfSync / Degraded</code>입니다. 실패 revision과 오류가 남아 있습니다.' },
      { id: 'live', label: 'Kubernetes live workload 확인', contentHtml: '<strong>클러스터 실제 상태</strong><br>live Deployment는 image <code>sha256:71e…</code>, <code>replicas: 2</code>입니다. audit log에는 <code>10:58 kubectl scale deployment/orders-api --replicas=2</code>가 있습니다.<br>2/4 pod만 Ready이며 CPU 91%, 주문 5xx 8.7%입니다. 이 live 수정은 Git에 없습니다.' }
    ],
    decisions: [
      {
        id: 'force-sync', label: '원인 확인 없이 force sync 실행', hint: '실패한 hook과 drift를 한 번에 덮으려 함',
        result: {
          status: { label: '미복구', className: 'is-critical' },
          metrics: [
            { id: 'application', value: 'OutOfSync', note: 'hook 실패로 sync 중단' }, { id: 'sync', value: 'Failed', note: '누락 Secret 오류 반복' }, { id: 'workload', value: '2/4 pods', note: 'live scale과 구버전 유지' }, { id: 'errors', value: '10.2%', note: '재시도 동안 오류 증가' }
          ],
          outcomes: [
            { id: 'elapsed', value: '21분', note: '11:04 → 11:25 미복구' }, { id: 'outcome-impact', value: '2,746건', note: '실패한 재시도 중 영향 누적' }, { id: 'cost', value: 'force sync 2회', note: '실패 반복 · 운영자 조사 지연' }
          ],
          timeline: '11:25 · force sync 재시도도 누락 Secret에서 실패, desired와 live 차이 지속',
          debrief: { default: { success: false, title: '강제 sync는 실패 원인을 제거하지 못했습니다.', body: 'PreSync migration이 존재하지 않는 Secret을 참조하므로 force sync를 반복해도 적용이 중단됩니다. live 2 replicas도 그대로여서 21분 동안 영향 요청이 2,746건으로 늘었습니다. 먼저 sync 오류와 적용 범위를 확인하세요.' } }
        }
      },
      {
        id: 'live-edit', label: '클러스터에서 live 상태만 직접 수정', hint: '즉시 4 replicas로 늘리고 Job을 수동 우회',
        result: {
          status: { label: '일시 안정', className: 'is-critical' },
          metrics: [
            { id: 'application', value: 'OutOfSync', note: 'Git과 live 불일치 확대' }, { id: 'sync', value: 'Failed', note: '실패 revision 기록은 그대로' }, { id: 'workload', value: '4/4 pods', note: '수동 scale · 다음 sync에 덮일 수 있음' }, { id: 'errors', value: '0.9%', note: '용량 확장으로 일시 완화' }
          ],
          outcomes: [
            { id: 'elapsed', value: '16분', note: '11:04 → 11:20 일시 안정' }, { id: 'outcome-impact', value: '1,884건', note: '수동 조치 전 누적' }, { id: 'cost', value: '숨은 drift 2건', note: '다음 sync 재발 위험 · 인수인계 비용' }
          ],
          timeline: '11:20 · live Deployment 수동 scale, 오류율은 낮아졌지만 Application OutOfSync 유지',
          debrief: { default: { success: false, title: 'live 수정은 현재 증상만 가렸습니다.', body: '4 replicas로 5xx는 낮아졌지만 Git에는 2 replicas 변경도 Secret 누락도 기록되지 않습니다. 다음 Argo CD sync가 수동 상태를 덮거나 다시 실패할 수 있어 drift가 더 깊어졌습니다. 복구는 선언 상태와 함께 남겨야 합니다.' } }
        }
      },
      {
        id: 'safe-recovery', label: 'Secret 참조를 검증·수정 후 안전하게 sync', hint: '실패 원인을 Git에서 고치고 diff 확인 뒤 적용', primary: true,
        result: {
          status: { label: '복구됨', className: 'is-healthy' },
          metrics: [
            { id: 'application', value: 'Synced · Healthy', note: 'Git revision 6be2d10 적용' }, { id: 'sync', value: 'Succeeded', note: '11:16 · migration hook 완료' }, { id: 'workload', value: '4/4 pods', note: 'desired image·replicas 일치' }, { id: 'errors', value: '0.4%', note: 'SLO 범위 내' }
          ],
          outcomes: [
            { id: 'elapsed', value: '12분', note: '11:04 → 11:16 복구' }, { id: 'outcome-impact', value: '1,126건', note: '복구 전 최종 누적' }, { id: 'cost', value: '추가 인프라 낭비 없음', note: '선언 복구 · drift 재발 방지' }
          ],
          timeline: '11:16 · Secret 참조를 기존 이름으로 수정한 revision 6be2d10 sync 성공, desired와 live 일치',
          debrief: {
            default: { success: true, title: '안전한 복구 방향입니다. 근거도 남기세요.', body: '실패 원인을 Git에서 수정하고 sync해 desired와 live를 다시 맞췄습니다. 다음에는 sync 오류, 실제 workload, Git diff를 함께 남겨 어떤 drift를 복구했는지 추적 가능하게 하세요.' },
            whenEvidence: {
              required: ['desired', 'sync-history', 'live'],
              complete: { success: true, title: '세 경계를 비교한 근거 있는 GitOps 복구입니다.', body: 'Git의 4 replicas·새 Secret 참조, Argo CD의 PreSync Secret 오류, live의 수동 2 replicas·구버전을 함께 확인했습니다. 원인은 Git의 잘못된 Secret 참조와 Git 밖 live 수정이 겹친 것이었습니다. Secret 참조를 Git에서 바로잡고 diff를 검토한 뒤 sync해 12분 만에 복구했고, 1,126건에서 영향과 재발성 drift를 멈췄습니다. 후속으로 Secret 이름 검증, sync hook 실패 알림, kubectl 직접 변경 감사를 점검하세요.' }
            }
          }
        }
      }
    ]
  }
};
