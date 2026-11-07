# 기술 진화 지도: 인과 연결 근거 감사

> 감사 대상: `site/tech-evolution-map-data.js`의 44개 `links` (2026-07-26).
> 판정 원칙: **검증됨**은 아래 1차·공식 자료가 A와 B 사이의 제시된 관계(또는 그 메커니즘)를 직접 뒷받침할 때만 사용한다. 단순한 시간 선후, 두 기술의 공존, 또는 이 문서의 추론만으로는 검증하지 않는다. **검토 필요**는 연결을 삭제하라는 뜻이 아니라, 더 직접적인 1차 근거나 관계 표현의 축소가 필요하다는 뜻이다.

## 관계 유형

- `enables` — A가 B의 구현·채택 조건을 제공했다.
- `solves` — B가 A 또는 A가 만든 운영 문제를 완화했다.
- `transforms` — A의 원리를 B가 운영 방식으로 재구성했다.

## 감사 결과

| 관계 | 보수적 메커니즘 | 근거 | 상태 |
|---|---|---|---|
| 패킷 교환 → TCP/IP (`enables`) | 패킷망의 store-and-forward 모델 위에서 인터넷워크 프로토콜을 설계할 수 있었다. | [Baran, 1964](https://www.rand.org/pubs/research_memoranda/RM3420.html), [Cerf & Kahn, 1974](https://www.cs.princeton.edu/courses/archive/fall06/cos561/papers/cerf74.pdf) | 검토 필요 — 두 원문은 모델과 프로토콜을 제시하지만, 전자를 후자의 직접 조건으로 명시한 자료를 추가 확인해야 한다. |
| TCP/IP → DNS (`enables`) | DNS는 인터넷 호스트 이름을 TCP/IP 주소와 연결한다. | [RFC 1034 §1](https://www.rfc-editor.org/rfc/rfc1034.html#section-1) | **검증됨** |
| DNS → WWW (`enables`) | URL의 호스트 부분은 도메인 이름일 수 있고 DNS가 이를 주소로 해석해 이름 기반 접근을 지원한다. | [RFC 1034](https://www.rfc-editor.org/rfc/rfc1034.html), [RFC 1738 §3.1](https://www.rfc-editor.org/rfc/rfc1738) | **검증됨** — “WWW를 탄생시킴”이 아니라 이 좁은 메커니즘으로만 유지한다. |
| WWW → HTTP (`enables`) | HTTP는 World Wide Web initiative의 정보 교환 프로토콜로 구현됐다. | [W3C HTTP implementation note](https://www.w3.org/Protocols/HTTP/AsImplemented.html) | **검증됨** |
| HTTP → HTML/URL (`enables`) | HTML 문서는 HTTP로 전송되고 URL로 식별될 수 있다. | [RFC 1866](https://www.rfc-editor.org/rfc/rfc1866.html), [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html) | **검증됨** |
| HTML/URL → CGI (`enables`) | CGI는 서버가 HTTP 요청을 외부 프로그램에 전달하는 인터페이스다. HTML이 CGI의 조건이라는 직접 근거는 부족하다. | [RFC 3875](https://www.rfc-editor.org/rfc/rfc3875.html) | 검토 필요 |
| 관계형 데이터 모델 → CGI (`enables`) | 동적 웹 앱에서 함께 쓰일 수 있지만, 관계형 모델이 CGI를 가능하게 했다는 인과는 확인되지 않았다. | [Codd, 1970](https://dl.acm.org/doi/10.1145/362384.362685), [RFC 3875](https://www.rfc-editor.org/rfc/rfc3875.html) | 검토 필요 |
| CGI → 모놀리스 (`enables`) | CGI 구현은 단일 배포 애플리케이션일 수 있으나, CGI가 모놀리스의 등장 조건이라는 자료는 없다. | [RFC 3875](https://www.rfc-editor.org/rfc/rfc3875.html) | 검토 필요 |
| 모놀리스 → N-tier (`transforms`) | 단일 배포 구조 안에서도 계층은 가능하며, N-tier는 책임/배치 분리 방식이다. | [Microsoft: common web architectures](https://learn.microsoft.com/en-us/dotnet/architecture/modern-web-apps-azure/common-web-application-architectures), [Microsoft: N-tier](https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/n-tier) | **검증됨** — 역사적 필연이 아니라 ‘분해 방식’이라는 좁은 뜻으로만 유지한다. |
| N-tier → 마이크로서비스 (`enables`) | 계층의 책임 경계는 서비스 경계 설계에 참고될 수 있지만, 마이크로서비스의 직접 조건이라는 자료는 없다. | [Microsoft: N-tier](https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/n-tier), [Microservices](https://martinfowler.com/articles/microservices.html) | 검토 필요 |
| 모놀리스 → 마이크로서비스 (`solves`) | 마이크로서비스는 독립 배포 가능한 서비스로 구성되어, 단일 애플리케이션의 배포·변경 결합을 완화하려는 선택이다. | [Microservices](https://martinfowler.com/articles/microservices.html) | 검토 필요 — 현재 출처는 설계 맥락을 설명하지만 ‘해결’이라는 강한 역사적 인과를 직접 입증하진 않는다. |
| CGI → REST (`enables`) | 둘 다 웹 서버 측 기술이지만 REST 제약은 CGI에서 도출되지 않는다. | [RFC 3875](https://www.rfc-editor.org/rfc/rfc3875.html), [Fielding 논문](https://www.ics.uci.edu/~fielding/pubs/dissertation/fielding_dissertation.pdf) | 검토 필요 |
| JavaScript → AJAX (`enables`) | XMLHttpRequest는 브라우저 스크립트에서 사용할 수 있으나, JavaScript가 AJAX의 역사적 등장 조건이라는 직접 진술은 확인되지 않았다. | [XMLHttpRequest 표준](https://www.w3.org/TR/XMLHttpRequest/), [ECMA-262](https://ecma-international.org/publications-and-standards/standards/ecma-262/) | 검토 필요 |
| CSS → AJAX (`enables`) | 표현 분리와 비동기 요청 사이의 직접적인 구현·채택 조건은 확인되지 않았다. | [CSS1](https://www.w3.org/TR/REC-CSS1/), [XMLHttpRequest](https://www.w3.org/TR/XMLHttpRequest/) | 검토 필요 |
| HTTP → REST (`enables`) | REST는 HTTP가 단순히 가능하게 한 후속 기술이라기보다, 웹의 아키텍처 스타일을 설명하는 제약 집합이다. | [Fielding 논문 5장](https://www.ics.uci.edu/~fielding/pubs/dissertation/fielding_dissertation.pdf), [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html) | 검토 필요 — 관계 방향과 유형을 재검토한다. |
| REST → 마이크로서비스 (`enables`) | HTTP API는 서비스 통신에 쓰일 수 있지만 REST가 마이크로서비스의 등장 조건이라는 직접 근거는 없다. | [Fielding 논문](https://www.ics.uci.edu/~fielding/pubs/dissertation/fielding_dissertation.pdf), [Microservices](https://martinfowler.com/articles/microservices.html) | 검토 필요 |
| AJAX → 마이크로서비스 (`enables`) | 클라이언트 API 수요와 서비스 분해는 함께 나타날 수 있으나 직접 인과는 확인되지 않았다. | [XMLHttpRequest](https://www.w3.org/TR/XMLHttpRequest/) | 검토 필요 |
| GFS → MapReduce (`enables`) | MapReduce 구현은 입력·중간 데이터를 GFS에 저장하도록 설계됐다. | [MapReduce 논문 §2](https://research.google/pubs/mapreduce-simplified-data-processing-on-large-clusters/), [GFS 논문](https://research.google/pubs/the-google-file-system/) | **검증됨** |
| MapReduce → Bigtable (`enables`) | Bigtable은 MapReduce를 이용할 수 있으나, Bigtable의 등장·구현 조건으로 MapReduce가 직접 제시됐는지 추가 확인이 필요하다. | [Bigtable 논문](https://research.google/pubs/bigtable-a-distributed-storage-system-for-structured-data/), [MapReduce 논문](https://research.google/pubs/mapreduce-simplified-data-processing-on-large-clusters/) | 검토 필요 |
| Paxos → Bigtable (`solves`) | Bigtable이 의존하는 Chubby는 Paxos 합의를 사용한다는 연결을 원 논문 수준에서 재확인해야 한다. | [Bigtable 논문](https://research.google/pubs/bigtable-a-distributed-storage-system-for-structured-data/), [Paxos Made Simple](https://lamport.azurewebsites.net/pubs/paxos-simple.pdf) | 검토 필요 |
| Bigtable → Kafka (`enables`) | 둘은 대규모 데이터 시스템이지만 Bigtable이 Kafka를 가능하게 했다는 직접 근거는 없다. | [Bigtable 논문](https://research.google/pubs/bigtable-a-distributed-storage-system-for-structured-data/), [Kafka 논문](https://notes.stephenholiday.com/Kafka.pdf) | 검토 필요 |
| 가상화 → IaaS (`enables`) | EC2는 API로 제공되는 가상 서버이고, 하이퍼바이저 가상화가 그 실행 격리를 제공한다. | [Xen 논문](https://www.cl.cam.ac.uk/research/srg/netos/papers/2003-xensosp.pdf), [Amazon EC2](https://aws.amazon.com/ec2/) | **검증됨** |
| IaaS → 컨테이너 (`enables`) | 컨테이너는 IaaS 이전에도 존재했고 OCI도 IaaS를 전제로 하지 않는다. 클라우드 채택 촉진이라면 별도 근거가 필요하다. | [OCI Image Spec](https://github.com/opencontainers/image-spec/blob/main/spec.md) | 검토 필요 |
| 구성 관리 → IaC (`enables`) | 선언적 구성 관리는 IaC와 유사한 운영 원리지만, Terraform/IaC의 직접 계보는 추가 자료가 필요하다. | [Puppet 언어 개요](https://www.puppet.com/docs/puppet/8/lang_summary.html), [Terraform 소개](https://developer.hashicorp.com/terraform/intro) | 검토 필요 |
| IaC → Kubernetes (`enables`) | Kubernetes 선언형 리소스 관리는 IaC와 결합 가능하지만, IaC가 Kubernetes의 등장 조건이라는 직접 근거는 없다. | [Kubernetes declarative management](https://kubernetes.io/docs/tasks/manage-kubernetes-objects/declarative-config/), [Terraform 소개](https://developer.hashicorp.com/terraform/intro) | 검토 필요 |
| 컨테이너 → Kubernetes (`enables`) | Kubernetes는 컨테이너화된 워크로드의 배포·확장·관리를 자동화한다. | [Kubernetes 개요](https://kubernetes.io/docs/concepts/overview/) | **검증됨** |
| CI/CD → GitOps (`transforms`) | GitOps는 Git을 선언 상태의 신뢰 원천으로 삼고 자동 적용·지속 조정을 요구해 전달 방식을 확장한다. | [OpenGitOps 원칙](https://opengitops.dev/) | **검증됨** — ‘CI/CD를 Git 기반 reconciliation으로 확장’이라는 좁은 표현으로만 유지한다. |
| 마이크로서비스 → Kubernetes (`enables`) | Kubernetes는 마이크로서비스에 적합할 수 있으나, 마이크로서비스가 Kubernetes의 구현·등장 조건이었다는 직접 근거는 없다. | [Kubernetes 개요](https://kubernetes.io/docs/concepts/overview/), [Microservices](https://martinfowler.com/articles/microservices.html) | 검토 필요 |
| Kubernetes → GitOps (`enables`) | GitOps는 Kubernetes에 한정되지 않으며, Kubernetes가 GitOps의 필수 조건이라는 근거는 없다. | [OpenGitOps 원칙](https://opengitops.dev/) | 검토 필요 |
| Kubernetes → 서비스 메시 (`enables`) | 서비스 메시를 Kubernetes에 배포할 수 있으나, 메시가 Kubernetes를 전제로 하지는 않는다. | [Istio 소개](https://istio.io/latest/about/service-mesh/), [Kubernetes 개요](https://kubernetes.io/docs/concepts/overview/) | 검토 필요 |
| 마이크로서비스 → 서비스 메시 (`solves`) | 서비스 메시는 마이크로서비스 간 통신의 관측·보안·제어 문제를 애플리케이션 밖에서 다룬다. | [Istio 소개](https://istio.io/latest/about/service-mesh/) | **검증됨** |
| 서비스 메시 → 관측성 (`enables`) | 서비스 메시가 텔레메트리를 제공할 수 있지만 OpenTelemetry 표준의 등장 조건이라는 직접 근거는 없다. | [Istio observability](https://istio.io/latest/docs/tasks/observability/), [OpenTelemetry 사양](https://opentelemetry.io/docs/specs/otel/) | 검토 필요 |
| Kubernetes → 관측성 (`enables`) | Kubernetes 운영은 관측을 요구하지만 OpenTelemetry 표준의 직접 조건이라는 근거는 없다. | [Kubernetes monitoring](https://kubernetes.io/docs/tasks/debug/debug-cluster/resource-usage-monitoring/), [OpenTelemetry 사양](https://opentelemetry.io/docs/specs/otel/) | 검토 필요 |
| 관측성 → SLO (`enables`) | SLO는 신뢰성 측정 신호를 요구하지만 OpenTelemetry가 SLO의 등장 조건이었다는 근거는 없다. | [Google SRE: SLO](https://sre.google/sre-book/service-level-objectives/), [OpenTelemetry 사양](https://opentelemetry.io/docs/specs/otel/) | 검토 필요 |
| SLO → 오류 예산 (`enables`) | 오류 예산은 SLO에 대한 허용 실패량으로 정의된다. | [Google SRE: SLO](https://sre.google/sre-book/service-level-objectives/), [Google SRE: Embracing Risk](https://sre.google/sre-book/embracing-risk/) | **검증됨** |
| GitOps → 내부 개발자 플랫폼 (`enables`) | GitOps는 플랫폼의 전달 경로에 쓰일 수 있으나 IDP의 등장 조건이라는 공식 근거는 확인되지 않았다. | [OpenGitOps 원칙](https://opengitops.dev/), [CNCF Platforms 백서](https://tag-app-delivery.cncf.io/whitepapers/platforms/) | 검토 필요 |
| CI/CD → SLSA (`transforms`) | SLSA는 빌드·배포 공급망의 무결성을 다루지만 CI/CD의 직접 변형이라는 관계는 더 직접적인 자료가 필요하다. | [SLSA v1.1](https://slsa.dev/spec/v1.1/) | 검토 필요 |
| IaC → Policy as Code (`enables`) | 정책 엔진은 IaC 계획을 평가할 수 있지만, IaC가 정책 코드화의 등장 조건이라는 자료는 없다. | [OPA 문서](https://www.openpolicyagent.org/docs/latest/), [Terraform 소개](https://developer.hashicorp.com/terraform/intro) | 검토 필요 |
| 내부 개발자 플랫폼 → Policy as Code (`enables`) | 플랫폼이 가드레일을 제공할 수 있지만 정책 코드화의 직접 조건이라는 근거는 확인되지 않았다. | [CNCF Platforms 백서](https://tag-app-delivery.cncf.io/whitepapers/platforms/), [OPA 문서](https://www.openpolicyagent.org/docs/latest/) | 검토 필요 |
| SLSA → Tool calling (`enables`) | SLSA 공급망 요구사항과 모델 도구 호출은 독립 주제다. 직접 인과 근거가 없다. | [SLSA v1.1](https://slsa.dev/spec/v1.1/), [OpenAI function calling](https://platform.openai.com/docs/guides/function-calling) | 검토 필요 |
| Policy as Code → Tool calling (`solves`) | 정책 검증은 도구 호출의 위험을 완화할 수 있지만, OPA가 모델 도구 호출을 직접 해결한다는 1차 근거는 없다. | [OPA 문서](https://www.openpolicyagent.org/docs/latest/), [OpenAI function calling](https://platform.openai.com/docs/guides/function-calling) | 검토 필요 |
| Tool calling → Agent evals (`enables`) | 에이전트 평가는 도구 사용을 포함할 수 있지만, 도구 호출이 평가의 등장 조건이라는 직접 근거는 없다. | [OpenAI agent evals](https://platform.openai.com/docs/guides/agent-evals) | 검토 필요 |
| LLM agents/ReAct → Tool calling (`enables`) | ReAct는 추론과 행동을 번갈아 수행하며, 도구 호출은 모델을 외부 기능에 연결한다. 특정 OpenAI 도구 호출의 직접 계보는 아니다. | [ReAct 논문](https://arxiv.org/abs/2210.03629), [OpenAI function calling](https://platform.openai.com/docs/guides/function-calling) | 검토 필요 |
| 관측성 → Agent evals (`enables`) | 추적은 평가에 유용할 수 있지만, OpenTelemetry가 에이전트 평가의 등장 조건이라는 직접 근거는 없다. | [OpenTelemetry 사양](https://opentelemetry.io/docs/specs/otel/), [OpenAI agent evals](https://platform.openai.com/docs/guides/agent-evals) | 검토 필요 |

## 후속 적용 규칙

1. 지도 데이터의 각 링크에 `mechanism`, `evidence[]`, `verificationStatus`를 둔다.
2. `verificationStatus: "verified"`는 이 문서의 **검증됨** 관계에만 부여한다. 나머지는 `needs-review`로 공개 표시하거나, 초기 공개 지도에서는 숨긴다.
3. 근거가 단지 “A와 B가 함께 쓰인다”이면 `enables`를 만들지 않는다. 관계를 유지하려면 `related` 같은 비인과 유형을 별도로 도입한다.
4. 증거 URL은 노드 참고문헌과 별도로 링크 자체에 보관한다. 노드 출처는 기술 존재를, 링크 출처는 **관계 주장**을 검증한다.
