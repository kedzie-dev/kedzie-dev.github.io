# 기술 진화 지도: 검증 대기 인과 연결 재검토

> 대상: `site/tech-evolution-map-data.js`의 `auditedLinks` 중 `needs-review` 12건.
> 기준: 출처가 **두 노드의 관계와 메커니즘**을 직접 뒷받침할 때만 `검증됨`으로 바꾼다. 시간상 선후나 현재의 함께 쓰임은 인과 근거가 아니다. `제거`는 두 노드의 유용성을 부정하지 않고, 화살표만 삭제한다.

## 판정 요약

| 관계 | 판정 | 적용할 관계 레이블 |
|---|---|---|
| 패킷 교환 → TCP/IP | 검증 | 역사적 촉발 |
| IaaS → 컨테이너화 | 제거 | — |
| HTTP → CGI | 검증 | 설계 전제 |
| 관계형 데이터베이스 → SQL | 좁혀서 검증 | 설계 전제 |
| TCP/IP → TLS | 검증 | 설계 전제 |
| WWW → 웹 브라우저 | 좁혀서 검증 | 역사적 촉발 |
| URL → 웹 브라우저 | 검증 | 설계 전제 |
| HTTP → 웹 브라우저 | 좁혀서 검증 | 설계 전제 |
| HTML → 웹 브라우저 | 검증 | 설계 전제 |
| Linux → 컨테이너화 | 좁혀서 검증 | 설계 전제 |
| HTTP → CDN | 좁혀서 검증 | 설계 전제 |
| IaaS → 서버리스 | 제거 | — |

## 관계별 근거와 적용 문장

### 1. 패킷 교환 → TCP/IP

- **판정:** 검증
- **관계 레이블:** `역사적 촉발`
- **독자용 연결 주장:** `패킷 라디오·패킷 위성의 성공으로 서로 다른 패킷망을 상호접속해야 한다는 문제가 제기됐고, 그 해법이 TCP/IP로 발전했다.`
- **검증 메모:** Vint Cerf의 RFC 1120은 패킷 라디오·위성 기술의 성공이 ARPANET과 다른 패킷망의 상호접속 문제를 제기했고, Cerf와 Kahn의 인터넷워크 프로토콜·게이트웨이 해법이 TCP/IP 프로토콜 모음으로 발전했다고 기록한다.
- **출처:** [RFC 1120 §1](https://www.rfc-editor.org/rfc/rfc1120.html#section-1)
- **표현 제한:** `패킷 교환이 TCP/IP를 직접 가능하게 했다`라고 일반화하지 않는다. 근거가 지지하는 것은 **이종 패킷망 상호접속 요구**와 TCP/IP 설계의 역사적 관계다.

### 2. IaaS → 컨테이너화

- **판정:** 제거
- **사유:** 컨테이너는 IaaS의 구현·채택 전제가 아니며, IaaS보다 앞선 Linux 컨테이너 기술 계보가 있다. IaaS 위에서 컨테이너를 실행할 수 있다는 사실은 호스팅 선택이지 인과가 아니다.
- **출처:** [OCI Image Specification](https://github.com/opencontainers/image-spec/blob/main/spec.md), [Docker security architecture](https://docs.docker.com/engine/security/)
- **후속:** 두 노드는 독립적으로 유지한다. IaaS에서 컨테이너를 운영하는 방법은 각각의 확장 콘텐츠에서 설명한다.

### 3. HTTP → CGI

- **판정:** 검증
- **관계 레이블:** `설계 전제`
- **독자용 연결 주장:** `CGI는 HTTP 서버가 클라이언트 요청에 동적으로 응답하도록 서버와 스크립트의 책임을 나눈 인터페이스다.`
- **검증 메모:** CGI/1.1은 HTTP 요청 헤더를 CGI 메타변수로 전달하고, CGI 스크립트의 응답 헤더를 HTTP 응답 형식으로 변환하는 규칙을 정의한다. POST는 스크립트가 요청 본문을 처리해 문서를 생성하도록 정의한다.
- **출처:** [RFC 3875 §4.1.18](https://www.rfc-editor.org/rfc/rfc3875.html#section-4.1.18), [RFC 3875 §4.3.2](https://www.rfc-editor.org/rfc/rfc3875.html#section-4.3.2), [RFC 3875 §6](https://www.rfc-editor.org/rfc/rfc3875.html#section-6)
- **표현 제한:** `HTTP가 CGI를 탄생시켰다`가 아니라, HTTP 요청·응답 의미론에 맞물리는 CGI의 **인터페이스 전제**만 말한다.

### 4. 관계형 데이터베이스 → SQL

- **판정:** 좁혀서 검증
- **관계 레이블:** `설계 전제`
- **독자용 연결 주장:** `SQL-86은 관계형 데이터베이스를 정의·질의·변경하는 인터페이스의 기능과 의미를 표준화했다.`
- **검증 메모:** ANSI X3.135-1986은 관계형 DBMS의 관계형 데이터베이스를 정의·질의·변경하는 인터페이스의 기능과 의미를 규정한다. 따라서 관계형 DB의 표준 인터페이스라는 관계는 검증되며, `관계형 모델이 SQL을 필연적으로 낳았다`는 역사적 주장까지는 하지 않는다.
- **출처:** [ANSI X3.135-1986 (SQL-86), Foreword](https://www.govinfo.gov/content/pkg/GOVPUB-C13-34d692548be2e76a4af31ba0cf22c936/pdf/GOVPUB-C13-34d692548be2e76a4af31ba0cf22c936.pdf)
- **연도:** SQL 노드의 지도 연도 `1986`은 이 표준의 발행 연도로 방어 가능하다.

### 5. TCP/IP → TLS

- **판정:** 검증
- **관계 레이블:** `설계 전제`
- **독자용 연결 주장:** `TLS 1.0의 Record Protocol은 TCP 같은 신뢰성 있는 전송 프로토콜 위에 계층화되도록 정의됐다.`
- **검증 메모:** TLS 1.0은 최하위 Record Protocol을 TCP 등을 예로 든 신뢰성 있는 전송 프로토콜 위에 둔다고 명시한다.
- **출처:** [RFC 2246 §1](https://www.rfc-editor.org/rfc/rfc2246.html#section-1)
- **표현 제한:** 이는 TLS 1.0 노드의 계층 관계다. 현대 TLS가 항상 TCP를 요구한다고 쓰지 않는다.

### 6. WWW → 웹 브라우저

- **판정:** 좁혀서 검증
- **관계 레이블:** `역사적 촉발`
- **독자용 연결 주장:** `월드와이드웹 프로젝트는 하이퍼텍스트 정보를 탐색·표시하는 클라이언트 프로그램의 구현을 요구했다.`
- **검증 메모:** 1989 제안은 저장 소프트웨어와 표시 소프트웨어를 분리하고, 네트워크 접근을 위해 사용자와 원격 데이터베이스 사이의 인터페이스를 두는 클라이언트/서버 구조를 제시한다. 문서의 도식은 명시적으로 browser를 포함한다.
- **출처:** [Berners-Lee, *Information Management: A Proposal* — “What will the system look like?”](https://www.w3.org/History/1989/proposal.html)
- **표현 제한:** `그래픽 브라우저의 확산으로 이어졌다`는 채택·확산 근거가 없으므로 삭제한다.

### 7. URL → 웹 브라우저

- **판정:** 검증
- **관계 레이블:** `설계 전제`
- **독자용 연결 주장:** `웹 브라우저는 URL로 식별된 자원을 해석·탐색한다.`
- **검증 메모:** HTML 2.0은 user agent를 WWW browser의 예로 정의하고, user agent가 URI를 사용해 자원에 접근하며 링크의 주소가 가리키는 자원을 얻는다고 명시한다.
- **출처:** [RFC 1866 §2.1](https://www.rfc-editor.org/rfc/rfc1866.html#section-2.1), [RFC 1866 §7.1–7.2](https://www.rfc-editor.org/rfc/rfc1866.html#section-7)
- **표현 제한:** URL은 브라우저만의 기술이 아니므로, `URL이 브라우저를 가능하게 했다` 대신 브라우저의 자원 탐색 **설계 전제**로 한정한다.

### 8. HTTP → 웹 브라우저

- **판정:** 좁혀서 검증
- **관계 레이블:** `설계 전제`
- **독자용 연결 주장:** `웹 브라우저의 HTML 폼 제출은 HTTP 요청·응답 상호작용으로 정의됐다.`
- **검증 메모:** HTML 2.0은 HTML user agent가 HTTP URL을 대상으로 GET을 수행하고, POST에서는 HTTP POST transaction을 수행해 응답을 표시하도록 정의한다.
- **출처:** [RFC 1866 §8.2.2](https://www.rfc-editor.org/rfc/rfc1866.html#section-8.2.2)
- **표현 제한:** 모든 브라우저 기능이 HTTP에 의존한다는 넓은 주장이 아니라, 웹 브라우저의 표준 웹 상호작용이라는 범위로 제한한다.

### 9. HTML → 웹 브라우저

- **판정:** 검증
- **관계 레이블:** `설계 전제`
- **독자용 연결 주장:** `웹 브라우저는 HTML 문서를 파싱하고, 링크를 따라 자원을 탐색하며, 문서 구조를 사용자에게 표현한다.`
- **검증 메모:** HTML 2.0은 HTML user agent의 문서 파싱 의무를 정의하고, user agent가 링크를 활성화해 대상 자원을 얻는다고 규정한다. 같은 문서는 user agent의 예로 WWW browser를 든다.
- **출처:** [RFC 1866 §2.1](https://www.rfc-editor.org/rfc/rfc1866.html#section-2.1), [RFC 1866 §7.2](https://www.rfc-editor.org/rfc/rfc1866.html#section-7.2)

### 10. Linux → 컨테이너화

- **판정:** 좁혀서 검증
- **관계 레이블:** `설계 전제`
- **독자용 연결 주장:** `Linux 컨테이너는 커널 namespace와 cgroup으로 프로세스를 격리하고 자원을 제어한다.`
- **검증 메모:** Docker의 공식 보안 아키텍처 문서는 컨테이너 실행 시 namespace와 control group을 만들며, namespace가 프로세스·네트워크 격리를, cgroup이 자원 계량·제한을 제공한다고 설명한다.
- **출처:** [Docker Engine security — Kernel namespaces and control groups](https://docs.docker.com/engine/security/)
- **표현 제한:** 모든 컨테이너가 Linux를 요구한다고 쓰지 않는다. 이 연결은 **Linux 컨테이너**의 구현 전제다.

### 11. HTTP → CDN

- **판정:** 좁혀서 검증
- **관계 레이블:** `설계 전제`
- **독자용 연결 주장:** `HTTP의 캐시·프록시 의미론은 HTTP 콘텐츠를 원본 밖의 공유 중간 계층에서 전달하는 CDN 구성의 기반이다.`
- **검증 메모:** HTTP 캐시 표준은 캐시가 응답을 재사용해 응답 시간과 대역폭 소비를 줄인다고 정의한다. 웹 복제·캐싱 분류 RFC는 HTTP를 해당 환경에서 쓰이는 프로토콜로 열거하고, origin을 대신하는 surrogate가 내부 캐시에서 응답을 제공한다고 정의한다. 이는 HTTP 기반 CDN의 캐싱·전달 메커니즘을 지지한다.
- **출처:** [RFC 9111 §1](https://www.rfc-editor.org/rfc/rfc9111.html#section-1), [RFC 3040 §2–3](https://www.rfc-editor.org/rfc/rfc3040.html#section-2)
- **표현 제한:** CDN 전체가 HTTP만으로 성립한다고 말하지 않는다. DNS 기반 라우팅·복제 등 다른 메커니즘은 CDN 노드 확장에서 설명한다.

### 12. IaaS → 서버리스

- **판정:** 제거
- **사유:** IaaS와 서버리스는 모두 클라우드 실행 모델이지만, 현재 확보한 1차·공식 자료는 서버리스가 인프라 관리를 숨긴다는 점만 설명한다. IaaS가 서버리스의 역사적 등장 조건 또는 구현 전제였다는 직접 근거는 없다.
- **출처:** [AWS Lambda](https://aws.amazon.com/lambda/), [AWS EC2](https://aws.amazon.com/ec2/)
- **후속:** 서버리스 노드 설명에는 `서버·용량 관리 부담을 관리형 실행 환경으로 옮긴다`를 유지할 수 있다. 다만 이를 IaaS에서 향하는 인과 화살표로 표현하지 않는다.

## 데이터 적용 규칙

1. `검증`·`좁혀서 검증` 10건은 위의 **독자용 연결 주장**, 레이블, 관계별 URL을 `causalReferences`와 검증 메모에 반영한다.
2. `IaaS → 컨테이너화`, `IaaS → 서버리스` 두 링크는 `auditedLinks`에서 삭제한다. 숨김 처리로 남기지 않는다.
3. 기존 `enables` 같은 구현용 유형은 UI에 노출하는 네 레이블과 혼동하지 않는다. 위 판정의 레이블을 독자용 의미로 사용한다.
4. 검증 상태는 출처가 지지하는 좁은 문장에 대해서만 `verified`로 바꾼다. 노드별 출처와 링크별 출처는 분리한다.
