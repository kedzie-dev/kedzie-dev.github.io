window.techEvolutionMap = (() => {
  const eras = [
    { id: 'foundations', years: '1960s–1994', from: 1960, to: 1994, title: '컴퓨팅·네트워크·웹의 기반', question: '서로 다른 컴퓨터가 어떻게 믿을 수 있게 연결되고 상태를 저장할까?' },
    { id: 'web', years: '1995–2005', from: 1995, to: 2005, title: '웹 애플리케이션과 초기 분산 시스템', question: '문서를 서비스로 바꾸고, 한 대의 한계를 넘으려면?' },
    { id: 'distributed', years: '2006–2012', from: 2006, to: 2012, title: '대규모 분산 시스템과 초기 클라우드', question: '대규모 데이터·메시지·가상 서버를 어떻게 다룰까?' },
    { id: 'cloud', years: '2013–2017', from: 2013, to: 2017, title: '클라우드 네이티브·DevOps·SRE', question: '인프라와 변경을 어떻게 반복 가능하고 안전하게 만들까?' },
    { id: 'cloud-native', years: '2018–2022', from: 2018, to: 2022, title: '운영 표준화와 AI 전환', question: '복잡한 시스템의 동작을 어떻게 측정하고 새로운 자동화를 준비할까?' },
    { id: 'ai', years: '2023–현재', from: 2023, to: 9999, title: '플랫폼 엔지니어링과 AI 에이전트', question: '개발·운영의 판단과 실행을 어떻게 증폭·통제할까?' }
  ];

  const references = [
    ['packet', 'Baran, On Distributed Communications (1964)', 'https://www.rand.org/pubs/research_memoranda/RM3420.html'], ['tcp', 'RFC 9293: TCP', 'https://www.rfc-editor.org/rfc/rfc9293.html'], ['dns', 'RFC 1034: Domain Names', 'https://www.rfc-editor.org/rfc/rfc1034.html'], ['http', 'RFC 9110: HTTP Semantics', 'https://www.rfc-editor.org/rfc/rfc9110.html'], ['www', 'CERN: Information Management: A Proposal (1989)', 'https://www.w3.org/History/1989/proposal.html'], ['html', 'RFC 1866: HTML 2.0', 'https://www.rfc-editor.org/rfc/rfc1866.html'],
    ['relational', 'Codd, A Relational Model of Data (1970)', 'https://dl.acm.org/doi/10.1145/362384.362685'], ['cgi', 'RFC 3875: CGI/1.1', 'https://www.rfc-editor.org/rfc/rfc3875.html'], ['js', 'ECMA-262', 'https://ecma-international.org/publications-and-standards/standards/ecma-262/'], ['css', 'W3C CSS1 Recommendation', 'https://www.w3.org/TR/REC-CSS1/'], ['rest', 'Fielding, Architectural Styles (2000)', 'https://www.ics.uci.edu/~fielding/pubs/dissertation/fielding_dissertation.pdf'], ['ajax', 'W3C XMLHttpRequest', 'https://www.w3.org/TR/XMLHttpRequest/'], ['monolith', 'Microsoft Learn: Common web application architectures', 'https://learn.microsoft.com/en-us/dotnet/architecture/modern-web-apps-azure/common-web-application-architectures'], ['n-tier', 'Microsoft Learn: N-tier architecture style', 'https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/n-tier'],
    ['gfs', 'Google File System', 'https://research.google/pubs/the-google-file-system/'], ['mapreduce', 'Google MapReduce', 'https://research.google/pubs/mapreduce-simplified-data-processing-on-large-clusters/'], ['bigtable', 'Google Bigtable', 'https://research.google/pubs/bigtable-a-distributed-storage-system-for-structured-data/'], ['paxos', 'Paxos Made Simple', 'https://lamport.azurewebsites.net/pubs/paxos-simple.pdf'], ['kafka', 'Kafka: a Distributed Messaging System', 'https://notes.stephenholiday.com/Kafka.pdf'], ['xen', 'Xen and the Art of Virtualization', 'https://www.cl.cam.ac.uk/research/srg/netos/papers/2003-xensosp.pdf'],
    ['ec2', 'AWS EC2', 'https://aws.amazon.com/ec2/'], ['puppet', 'Puppet Declarative Language', 'https://www.puppet.com/docs/puppet/8/lang_summary.html'], ['terraform', 'Terraform: Infrastructure as Code', 'https://developer.hashicorp.com/terraform/intro'], ['oci', 'OCI Image Specification', 'https://github.com/opencontainers/image-spec/blob/main/spec.md'], ['cicd', 'Continuous Delivery', 'https://martinfowler.com/bliki/ContinuousDelivery.html'], ['microservices', 'Microservices', 'https://martinfowler.com/articles/microservices.html'],
    ['kubernetes', 'Kubernetes Overview', 'https://kubernetes.io/docs/concepts/overview/'], ['gitops', 'OpenGitOps Principles', 'https://opengitops.dev/'], ['mesh', 'Istio: What is Istio?', 'https://istio.io/latest/about/service-mesh/'], ['otel', 'OpenTelemetry Specification', 'https://opentelemetry.io/docs/specs/otel/'], ['slo', 'Google SRE Book: SLOs', 'https://sre.google/sre-book/service-level-objectives/'], ['budget', 'Google SRE Book: Embracing Risk', 'https://sre.google/sre-book/embracing-risk/'],
    ['idp', 'CNCF Platforms White Paper', 'https://tag-app-delivery.cncf.io/whitepapers/platforms/'], ['slsa', 'SLSA specification', 'https://slsa.dev/spec/v1.1/'], ['opa', 'Open Policy Agent: Policy Language', 'https://www.openpolicyagent.org/docs/latest/policy-language/'], ['react', 'ReAct', 'https://arxiv.org/abs/2210.03629'], ['function', 'OpenAI: Function calling', 'https://platform.openai.com/docs/guides/function-calling'], ['evals', 'OpenAI: Agent evals', 'https://platform.openai.com/docs/guides/agent-evals']
  ].map(([id, title, url]) => ({ id, title, url }));

  // Link references are deliberately separate from node references: they justify a relationship claim.
  const causalReferences = [
    ['causal-tcp-dns', 'RFC 1034 §1: Domain Names', 'https://www.rfc-editor.org/rfc/rfc1034.html#section-1'],
    ['causal-dns-www', 'RFC 1738 §3.1: URL host syntax', 'https://www.rfc-editor.org/rfc/rfc1738'],
    ['causal-www-http', 'W3C: HTTP as implemented', 'https://www.w3.org/Protocols/HTTP/AsImplemented.html'],
    ['causal-http-html', 'RFC 1866: HTML 2.0', 'https://www.rfc-editor.org/rfc/rfc1866.html'],
    ['causal-monolith-ntier', 'Microsoft Learn: N-tier architecture style', 'https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/n-tier'],
    ['causal-gfs-mapreduce', 'Google: MapReduce', 'https://research.google/pubs/mapreduce-simplified-data-processing-on-large-clusters/'],
    ['causal-virtualization-iaas', 'Amazon EC2', 'https://aws.amazon.com/ec2/'],
    ['causal-containers-kubernetes', 'Kubernetes Overview', 'https://kubernetes.io/docs/concepts/overview/'],
    ['causal-cicd-gitops', 'OpenGitOps Principles', 'https://opengitops.dev/'],
    ['causal-microservices-mesh', 'Istio: What is Istio?', 'https://istio.io/latest/about/service-mesh/'],
    ['causal-slo-budget', 'Google SRE Book: Embracing Risk', 'https://sre.google/sre-book/embracing-risk/']
  ].map(([id, title, url]) => ({ id, title, url }));

  causalReferences.push(
    { id: 'causal-packet-tcp', title: 'RFC 1120 §1: Internet Design History', url: 'https://www.rfc-editor.org/rfc/rfc1120.html#section-1' },
    { id: 'causal-http-cgi', title: 'RFC 3875: CGI and HTTP request/response mapping', url: 'https://www.rfc-editor.org/rfc/rfc3875.html#section-6' },
    { id: 'causal-relational-sql', title: 'ANSI X3.135-1986 (SQL-86), Foreword', url: 'https://www.govinfo.gov/content/pkg/GOVPUB-C13-34d692548be2e76a4af31ba0cf22c936/pdf/GOVPUB-C13-34d692548be2e76a4af31ba0cf22c936.pdf' },
    { id: 'causal-tcp-tls', title: 'RFC 2246 §1: TLS over reliable transport', url: 'https://www.rfc-editor.org/rfc/rfc2246.html#section-1' },
    { id: 'causal-www-browser', title: 'CERN: Information Management proposal', url: 'https://www.w3.org/History/1989/proposal.html' },
    { id: 'causal-url-browser', title: 'RFC 1866 §2.1, §7: User agents and URIs', url: 'https://www.rfc-editor.org/rfc/rfc1866.html#section-7' },
    { id: 'causal-http-browser', title: 'RFC 1866 §8.2.2: HTML forms and HTTP', url: 'https://www.rfc-editor.org/rfc/rfc1866.html#section-8.2.2' },
    { id: 'causal-html-browser', title: 'RFC 1866 §2.1, §7.2: HTML user agents', url: 'https://www.rfc-editor.org/rfc/rfc1866.html#section-7.2' },
    { id: 'causal-linux-containers', title: 'Docker: Kernel namespaces and control groups', url: 'https://docs.docker.com/engine/security/' },
    { id: 'causal-http-cdn', title: 'RFC 9111 §1 / RFC 3040: HTTP caching and surrogates', url: 'https://www.rfc-editor.org/rfc/rfc3040.html#section-2' }
  );

  // mapYear is the representative practical-adoption year used for timeline placement.
  const N = (id, era, mapYear, title, english, domain, why, solved, enabled, sourceId) => ({ id, era, mapYear: Number(mapYear), title, english, domain, why, solved, enabled, sourceId });
  const nodes = [
    N('packet-switching','foundations','1964','패킷 교환','Packet switching','network','전용 회선은 비싸고 단일 장애에 취약했다.','메시지를 작은 패킷으로 나눠 여러 경로로 전달했다.','공유 네트워크 위의 인터넷 프로토콜을 위한 토대가 됐다.','packet'),
    N('tcp-ip','foundations','1974','인터넷워크','TCP/IP','network','서로 다른 네트워크가 공통 규칙 없이 고립돼 있었다.','IP 위에 신뢰성 있는 바이트 스트림과 흐름 제어를 정의했다.','인터넷 전체에서 동작하는 이름·웹 계층을 만들었다.','tcp'),
    N('dns','foundations','1983','도메인 이름 시스템','DNS','network','사람이 IP 주소를 기억·배포하기 어렵고 중앙 목록은 확장되지 않았다.','분산 이름 공간으로 이름을 주소와 연결했다.','사람이 읽는 URL과 글로벌 서비스 발견을 가능하게 했다.','dns'),
    N('www','foundations','1989','월드와이드웹','World Wide Web','frontend','분산된 문서와 연구 지식이 서로 연결되지 않았다.','하이퍼텍스트와 링크로 정보 탐색 모델을 제안했다.','브라우저, URL, HTTP가 결합하는 웹 플랫폼이 됐다.','www'),
    N('http','foundations','1991','HTTP','Hypertext Transfer Protocol','network','웹의 클라이언트와 서버가 공통 요청 의미를 필요로 했다.','리소스·메서드·상태 코드 중심의 확장 가능한 의미론을 정의했다.','API, 캐시, 프록시, 관측 가능한 경계가 생겼다.','http'),
    N('html','web','1995','HTML과 URL','HTML / URL','frontend','웹 문서를 서로 다른 시스템에서 같은 방식으로 교환할 형식이 필요했다.','문서 구조와 주소 체계를 표준화했다.','브라우저 기반의 보편적 클라이언트가 확산됐다.','html'),
    N('relational-data','foundations','1970','관계형 데이터 모델','Relational data model','database','애플리케이션이 저장 형식에 직접 묶이면 변경 비용이 커졌다.','관계와 연산으로 데이터 독립성을 추구했다.','트랜잭션 기반 웹 애플리케이션의 신뢰 가능한 상태 저장소가 됐다.','relational'),
    N('cgi','foundations','1993','동적 서버 처리','CGI','backend','정적 문서만으로는 사용자별 계산과 데이터 조회를 제공할 수 없었다.','웹 서버가 외부 프로그램을 호출해 동적 응답을 생성하게 했다.','애플리케이션 서버와 백엔드 계층으로 이어졌다.','cgi'),
    N('javascript','web','1995','브라우저 실행','JavaScript / ECMAScript','frontend','작은 상호작용마다 서버 왕복과 전체 페이지 갱신이 필요했다.','브라우저에서 실행되는 표준 스크립트 언어를 제공했다.','풍부한 클라이언트와 API 중심 설계를 확산시켰다.','js'),
    N('css','web','1996','표현의 분리','CSS','frontend','문서 구조와 시각 표현이 섞여 변경과 재사용이 어려웠다.','스타일을 문서 구조에서 분리했다.','디자인 시스템과 반응형 UI의 기반이 됐다.','css'),
    N('rest','web','2000','웹 API 제약','REST','backend','브라우저와 서버가 늘며 상태와 인터페이스 결합이 커졌다.','리소스·표현·무상태성 제약으로 웹 규모 상호작용을 설명했다.','독립 배포 가능한 API와 서비스 경계를 만들었다.','rest'),
    N('ajax','web','2005','비동기 웹','AJAX / XMLHttpRequest','frontend','전체 페이지를 다시 받아야 하는 UI는 느리고 상호작용이 단절됐다.','페이지 이동 없이 HTTP 요청을 수행하게 했다.','SPA와 백엔드 API 트래픽 증가를 이끌었다.','ajax'),
    N('monolith','web','1995','모놀리스','Monolithic architecture','application','초기 웹 애플리케이션은 작은 팀이 한 제품을 빠르게 만들고 배포할 단순한 단위가 필요했다.','핵심 동작을 하나의 프로세스와 대체로 하나의 배포 단위에 모아 전달 경로를 단순화했다.','계층 분리와 이후 독립 배포 서비스의 비교 기준이 됐다.','monolith'),
    N('n-tier','web','1995','계층형 애플리케이션','N-tier / 3-tier','application','UI·업무 로직·데이터 접근이 한곳에 섞이면 변경 영향과 보안 경계가 흐려졌다.','표현·업무·데이터 책임을 논리 계층으로 나누고 필요하면 물리 티어로 분리했다.','역할별 확장과 서비스 분해를 위한 경계 언어를 제공했다.','n-tier'),
    N('gfs','web','2003','분산 파일 시스템','Google File System','database','대량 데이터와 저가 서버의 빈번한 장애를 단일 파일 시스템이 감당하기 어려웠다.','장애가 흔한 클러스터를 전제로 대용량 파일을 분산 저장했다.','분산 데이터 처리와 객체 스토리지의 설계 기준을 제시했다.','gfs'),
    N('mapreduce','web','2004','병렬 데이터 처리','MapReduce','database','대규모 데이터를 병렬 처리하려면 분할·스케줄링·장애 처리를 매번 구현해야 했다.','런타임이 그 반복 작업을 맡도록 추상화했다.','배치 분석과 데이터 플랫폼을 대중화했다.','mapreduce'),
    N('bigtable','distributed','2006','분산 구조화 저장','Bigtable / NoSQL','database','관계형 단일 노드는 페타바이트 데이터와 수천 서버 규모에 맞지 않았다.','대규모 분산 구조화 데이터를 위한 저장 모델을 제시했다.','키 기반 접근과 수평 확장 데이터베이스를 확산시켰다.','bigtable'),
    N('paxos','web','1998','분산 합의','Paxos','network','장애와 지연이 있는 여러 노드가 하나의 순서에 동의해야 했다.','비동기 분산 시스템의 합의 알고리즘을 설명했다.','리더 선출과 강한 정합성 제어 평면의 기반이 됐다.','paxos'),
    N('kafka','distributed','2011','메시지 스트리밍','Kafka','backend','시스템 간 데이터 전달을 동기 호출에만 의존하면 결합과 병목이 커졌다.','지속 로그 기반의 고처리량 메시지 스트림을 제공했다.','이벤트 기반 통합과 실시간 데이터 파이프라인을 가능하게 했다.','kafka'),
    N('virtualization','web','2003','가상화','Virtualization','infrastructure','물리 서버 한 대를 한 워크로드가 독점하면 자원 활용과 격리가 모두 나빴다.','VMM으로 여러 OS가 물리 자원을 공유하게 했다.','탄력적 IaaS와 격리된 실행 환경을 가능하게 했다.','xen'),
    N('iaas','distributed','2006','탄력적 클라우드','IaaS / EC2','infrastructure','서버 조달과 용량 확보는 느리고 초기 비용이 컸다.','필요할 때 가상 서버를 확보하고 사용량 기반으로 지불하게 했다.','자동 확장과 API 기반 인프라 운영의 전제가 됐다.','ec2'),
    N('config-management','web','2005','구성 관리','Configuration management','infrastructure','서버를 수동으로 맞추면 환경 간 차이와 재현 불가능성이 누적됐다.','원하는 상태를 선언해 반복 적용하는 모델을 제공했다.','불변 인프라와 IaC의 운영 습관을 만들었다.','puppet'),
    N('iac','cloud','2014','인프라 코드화','Infrastructure as Code','infrastructure','클라우드 리소스를 콘솔에서 바꾸면 검토·재현·감사가 어려웠다.','구성 파일로 생성·변경·버전 관리를 지원했다.','인프라 변경을 소프트웨어 전달 체계에 넣었다.','terraform'),
    N('containers','cloud','2013','컨테이너 이미지','Containers / OCI','infrastructure','개발·테스트·운영 환경 차이가 배포 실패로 이어졌다.','이미지 형식과 실행 구성을 표준화해 애플리케이션을 패키징했다.','일관된 배포 단위와 오케스트레이션을 가능하게 했다.','oci'),
    N('cicd','distributed','2010','지속적 전달','CI/CD','devops','릴리스가 드물고 수동이면 변경 위험이 한 번에 쌓였다.','언제든 배포 가능한 상태를 유지하는 자동 검증·전달 규율을 만들었다.','작은 변경, 빠른 피드백, 배포 자동화를 가능하게 했다.','cicd'),
    N('microservices','cloud','2014','독립 배포 서비스','Microservices','application','큰 애플리케이션은 팀·배포·확장 단위가 서로 발목을 잡았다.','독립 배포 가능한 서비스 집합으로 시스템을 구성했다.','서비스별 배포와 플랫폼 요구를 키웠다.','microservices'),
    N('kubernetes','cloud','2014','컨테이너 오케스트레이션','Kubernetes','infrastructure','컨테이너 수가 늘자 배치·복구·네트워킹을 사람이 관리할 수 없었다.','선언적으로 컨테이너 워크로드와 서비스를 조정하는 플랫폼을 제공했다.','클라우드 네이티브 운영과 플랫폼 엔지니어링의 기반이 됐다.','kubernetes'),
    N('gitops','cloud','2017','선언형 배포','GitOps','devops','배포 변경의 승인·추적·실제 상태가 분리돼 운영 판단이 어려웠다.','Git의 버전·불변성과 자동 적용·지속 조정을 결합했다.','감사 가능한 배포와 drift 복구를 가능하게 했다.','gitops'),
    N('service-mesh','cloud','2017','서비스 메시','Service mesh','network','마이크로서비스마다 보안·재시도·관측을 구현하면 정책이 흩어진다.','서비스 간 통신 계층에 보안·관측·트래픽 제어를 제공했다.','일관된 통신 정책과 세밀한 트래픽 전환이 가능해졌다.','mesh'),
    N('observability','cloud-native','2019','관측성 표준','OpenTelemetry','devops','분산 서비스의 실패 경로가 로그·지표·추적에 흩어져 원인을 찾기 어려웠다.','trace·metric·log 생성과 수집·내보내기 규약을 제공했다.','공통 신호로 서비스 동작을 연결해 볼 수 있게 됐다.','otel'),
    N('slo','cloud','2016','서비스 수준 목표','SLO','devops','인프라 지표만으로는 사용자가 느끼는 품질과 투자 우선순위를 정하기 어려웠다.','사용자 관점 SLI에 목표값을 둬 신뢰성을 측정 가능하게 했다.','운영과 제품이 공통 품질 언어로 협의할 수 있게 했다.','slo'),
    N('error-budget','cloud','2016','오류 예산','Error budget','devops','안정성과 기능 출시가 감정적 우선순위 싸움이 되기 쉬웠다.','허용 가능한 비신뢰성의 예산으로 출시 속도와 위험을 함께 판단했다.','변경 관리에 객관적 중단·투자 기준을 제공했다.','budget'),
    N('idp','ai','2023','내부 개발자 플랫폼','Internal Developer Platform','platform','팀마다 배포·보안·관측 기반을 반복 조립하면 인지 부하와 편차가 커졌다.','개발팀에 필요한 역량을 자가 서비스 내부 제품으로 제공했다.','가드레일을 지닌 빠른 소프트웨어 전달 경로가 생겼다.','idp'),
    N('supply-chain','ai','2023','소프트웨어 공급망 보안','SLSA','security','빌드 산출물의 출처와 변조 여부를 전달 과정에서 보장하기 어려웠다.','무결성과 provenance를 단계적으로 보장하는 요구사항을 정의했다.','배포 전 검증 가능한 신뢰 사슬을 강화했다.','slsa'),
    N('policy','ai','2023','정책 기반 운영','Policy as Code','security','규칙이 스크립트·문서·사람의 기억에 흩어져 일관되게 집행되지 않았다.','정책 결정과 실행을 분리해 코드로 검토·평가하게 했다.','배포·접근·비용 가드레일을 자동화할 수 있게 했다.','opa'),
    N('llm-agents','cloud-native','2022','LLM 기반 에이전트','LLM agents / ReAct','ai','복잡한 목표를 정해진 워크플로만으로 처리하면 예외와 탐색에 약했다.','추론 흔적과 행동을 번갈아 생성해 외부 환경과 상호작용하는 방식을 제시했다.','도구를 조합해 작업을 수행하는 에이전트 설계가 확산됐다.','react'),
    N('tool-calling','ai','2023','도구 호출','Tool calling','ai','언어 모델의 텍스트 출력만으로는 외부 시스템을 안전하게 변경할 수 없었다.','모델의 도구 선택과 구조화된 인자를 외부 기능에 연결했다.','에이전트가 검색·조회·실행을 분리해 수행할 수 있게 됐다.','function'),
    N('agent-evals','ai','2024','에이전트 평가·운영','Agent evals','ai','모델·프롬프트·도구 변경이 워크플로 품질을 어떻게 바꾸는지 눈으로만 확인하기 어렵다.','워크플로와 도구 사용을 테스트해 회귀를 찾는 방법을 제공한다.','에이전트 변경을 일반 소프트웨어처럼 측정·배포·개선할 수 있게 했다.','evals')
  ];

  const causalClaims = {
    'packet-switching->tcp-ip': '패킷 단위의 공유·전달 모델이 이기종 네트워크를 잇는 프로토콜 계층의 전제가 됐다.',
    'tcp-ip->dns': '공통 인터넷 주소 체계 위에서 사람이 읽는 이름을 분산 관리할 필요가 생겼다.',
    'dns->www': '분산 문서의 안정적인 발견과 URL 해석에 이름-주소 변환이 필요했다.',
    'www->http': '링크된 분산 문서를 교환할 클라이언트·서버 간 요청 의미론이 필요했다.',
    'http->html': 'HTTP로 교환할 상호운용 가능한 하이퍼텍스트 문서 형식이 필요했다.',
    'html->cgi': '정적 문서의 한계가 요청별 계산과 데이터 조회를 위한 서버 실행 모델을 요구했다.',
    'relational-data->cgi': '동적 요청 처리와 영속 데이터 조회가 결합해 데이터 기반 웹 애플리케이션을 구성했다.',
    'cgi->monolith': '초기 동적 웹 처리는 단일 애플리케이션 배포 단위에 요청 처리와 업무 로직을 모으는 방식을 확산시켰다.',
    'monolith->n-tier': '단일 배포 단위 안의 책임 결합을 줄이기 위해 표현·업무·데이터 책임을 분리했다.',
    'n-tier->microservices': '계층별 책임·경계의 언어가 독립 배포 가능한 서비스 분해를 논의할 기반을 제공했다.',
    'monolith->microservices': '전체 배포·확장·팀 변경의 결합 문제가 독립 배포 서비스로 해결하려는 대상이 됐다.',
    'cgi->rest': '동적 서버 엔드포인트가 늘면서 상호작용을 일관된 리소스·표현 제약으로 다룰 필요가 커졌다.',
    'javascript->ajax': '브라우저 내 스크립트 실행이 페이지 이동 없이 요청을 만드는 클라이언트 동작의 기반이 됐다.',
    'css->ajax': '구조·표현 분리와 부분 갱신이 결합해 더 풍부한 웹 UI를 가능하게 했다.',
    'http->rest': 'HTTP의 리소스·메서드·캐시 의미론이 REST 제약을 설명하는 주요 기반이다.',
    'rest->microservices': '명시적인 API 경계가 독립 배포 서비스 간 통신 계약의 기반이 됐다.',
    'ajax->microservices': '비동기 클라이언트가 늘린 API 중심 상호작용이 서버 기능의 분리를 촉진했다.',
    'gfs->mapreduce': '대용량 데이터를 분산 저장하는 클러스터 위에서 병렬 처리 작업을 배치할 수 있었다.',
    'mapreduce->bigtable': '대규모 클러스터에서 데이터 처리·분할·장애 처리를 다룬 경험이 분산 저장 설계와 함께 발전했다.',
    'paxos->bigtable': '분산 저장 시스템의 메타데이터·리더 선출 등에서 합의 문제가 설계 제약으로 등장한다.',
    'bigtable->kafka': '수평 확장 데이터 처리 환경에서 지속 로그 기반의 고처리량 데이터 전달 요구가 커졌다.',
    'virtualization->iaas': '물리 자원을 격리된 가상 실행 단위로 나누는 능력이 탄력적 가상 서버 제공의 기반이 됐다.',
    'iaas->containers': 'API로 확보한 탄력적 실행 환경 위에서 애플리케이션 패키징·이식성 문제가 두드러졌다.',
    'config-management->iac': '원하는 상태를 선언·반복 적용하는 습관이 인프라 전체를 코드로 관리하는 방식으로 확장됐다.',
    'iac->kubernetes': '선언한 desired state를 코드로 검토·적용하는 모델이 Kubernetes 리소스 운영과 맞물린다.',
    'containers->kubernetes': '표준화된 컨테이너 배포 단위가 대규모 배치·복구·네트워킹 조정 문제를 만들었다.',
    'cicd->gitops': '자동 검증·전달 흐름이 Git의 선언 상태와 지속 조정을 결합하는 운영 방식으로 확장됐다.',
    'microservices->kubernetes': '독립 배포 서비스가 늘며 서비스별 배치·복구·확장을 자동 조정할 필요가 커졌다.',
    'kubernetes->gitops': '선언형 Kubernetes 리소스가 Git 기반 desired state와 자동 reconciliation의 적용 대상이 됐다.',
    'kubernetes->service-mesh': '동적 서비스 집합에서 통신 정책·보안·관측을 일관되게 적용할 플랫폼 계층이 필요해졌다.',
    'microservices->service-mesh': '서비스 간 호출이 늘며 인증·재시도·트래픽 제어를 각 애플리케이션에 중복 구현하는 한계가 생겼다.',
    'service-mesh->observability': '서비스 간 통신 계층이 trace·metric 같은 공통 신호를 수집할 지점을 제공한다.',
    'kubernetes->observability': '동적으로 생성·교체되는 워크로드를 운영하려면 공통 라벨과 수집 경로가 필요하다.',
    'observability->slo': '사용자 경험을 측정할 신호가 있어야 서비스 수준 목표를 지속적으로 계산할 수 있다.',
    'slo->error-budget': '측정 가능한 신뢰성 목표가 있어야 허용 가능한 실패량을 예산으로 계산할 수 있다.',
    'gitops->idp': '표준화된 선언형 배포 경로가 개발자에게 self-service golden path로 제공될 수 있다.',
    'cicd->supply-chain': '자동 빌드·전달 과정에서 산출물의 출처와 무결성을 검증할 전달 계약이 필요해졌다.',
    'iac->policy': '코드화된 인프라 변경이 정책을 기계적으로 평가·차단할 입력을 제공한다.',
    'idp->policy': '자가 서비스 플랫폼은 팀 자율성을 유지하면서 일관된 가드레일을 제공해야 한다.',
    'supply-chain->tool-calling': '자동화된 실행에 신뢰·권한·출처 경계를 두는 공급망 원칙이 도구 실행의 통제에도 적용된다.',
    'policy->tool-calling': '외부 시스템을 호출하는 에이전트에는 권한·입력·실행을 정책으로 제한할 필요가 있다.',
    'tool-calling->agent-evals': '도구 선택과 인자 생성이 워크플로 품질을 좌우하므로 이를 포함한 평가가 필요하다.',
    'llm-agents->tool-calling': '외부 환경에서 행동하는 에이전트는 텍스트 출력만이 아닌 구조화된 도구 실행을 필요로 한다.',
    'observability->agent-evals': '에이전트의 실행 흔적과 지연·비용 신호가 평가·회귀 분석의 관측 데이터가 된다.'
  };

  const verifiedCausalEvidence = {
    'tcp-ip->dns': ['causal-tcp-dns'],
    'dns->www': ['causal-dns-www'],
    'www->http': ['causal-www-http'],
    'http->html': ['causal-http-html'],
    'monolith->n-tier': ['causal-monolith-ntier'],
    'gfs->mapreduce': ['causal-gfs-mapreduce'],
    'virtualization->iaas': ['causal-virtualization-iaas'],
    'containers->kubernetes': ['causal-containers-kubernetes'],
    'cicd->gitops': ['causal-cicd-gitops'],
    'microservices->service-mesh': ['causal-microservices-mesh'],
    'slo->error-budget': ['causal-slo-budget'],
    'packet-switching->tcp-ip': ['causal-packet-tcp'],
    'http->cgi': ['causal-http-cgi'],
    'relational-data->sql': ['causal-relational-sql'],
    'tcp-ip->tls': ['causal-tcp-tls'],
    'www->browser': ['causal-www-browser'],
    'url->browser': ['causal-url-browser'],
    'http->browser': ['causal-http-browser'],
    'html->browser': ['causal-html-browser'],
    'linux->containers': ['causal-linux-containers'],
    'http->cdn': ['causal-http-cdn']
  };

  const L = (from, to, type, core = false) => {
    const id = `${from}->${to}`;
    const evidenceIds = verifiedCausalEvidence[id] || [];
    return {
      id, from, to, type, core,
      verification: {
        status: evidenceIds.length ? 'verified' : 'needs-review',
        mechanism: causalClaims[id],
        temporalBasis: '두 기술의 대표 실용화 시점과 실제 채택 순서를 별도로 검토해야 함.',
        evidenceIds
      }
    };
  };
  const links = [
    L('packet-switching','tcp-ip','enables',true), L('tcp-ip','dns','enables',true), L('dns','www','enables',true), L('www','http','enables',true), L('http','html','enables',true), L('html','cgi','enables',true), L('relational-data','cgi','enables'), L('cgi','monolith','enables'), L('monolith','n-tier','transforms',true), L('n-tier','microservices','enables',true), L('monolith','microservices','solves'), L('cgi','rest','enables',true), L('javascript','ajax','enables',true), L('css','ajax','enables'), L('http','rest','enables'), L('rest','microservices','enables',true), L('ajax','microservices','enables'),
    L('gfs','mapreduce','enables',true), L('mapreduce','bigtable','enables',true), L('paxos','bigtable','solves'), L('bigtable','kafka','enables',true), L('virtualization','iaas','enables',true), L('iaas','containers','enables',true), L('config-management','iac','enables',true), L('iac','kubernetes','enables',true), L('containers','kubernetes','enables',true), L('cicd','gitops','transforms',true), L('microservices','kubernetes','enables'),
    L('kubernetes','gitops','enables',true), L('kubernetes','service-mesh','enables'), L('microservices','service-mesh','solves'), L('service-mesh','observability','enables'), L('kubernetes','observability','enables',true), L('observability','slo','enables',true), L('slo','error-budget','enables',true), L('gitops','idp','enables',true), L('cicd','supply-chain','transforms'), L('iac','policy','enables'), L('idp','policy','enables'), L('supply-chain','tool-calling','enables'), L('policy','tool-calling','solves'), L('tool-calling','agent-evals','enables',true), L('llm-agents','tool-calling','enables',true), L('observability','agent-evals','enables')
  ];
  // The first public map keeps only independently auditable technologies.
  // Practices, architecture styles, and governance frameworks live in node extensions.
  const auditedNodeIds = new Set([
    'packet-switching', 'tcp-ip', 'dns', 'www', 'http', 'html', 'relational-data',
    'cgi', 'javascript', 'virtualization', 'iaas', 'kafka', 'containers', 'kubernetes'
  ]);
  const auditedNodes = nodes.filter((node) => auditedNodeIds.has(node.id));
  const nodeById = Object.fromEntries(auditedNodes.map((node) => [node.id, node]));
  const extensions = [
    {
      id: 'transactions-and-schema',
      mainNodeId: 'relational-data',
      title: '트랜잭션·스키마 설계',
      description: '동시 변경과 스키마 변화 속에서도 데이터 정합성을 지키기 위해 무엇을 격리하고 언제 변경할지 읽는다.',
      url: '/tech-map/extensions/transactions-and-schema/'
    },
    {
      id: 'web-presentation-layer',
      mainNodeId: 'html',
      title: '웹 표현 계층',
      description: '문서 구조와 표현을 나눈 선택이 접근성·재사용·성능 검증에 주는 영향을 읽는다.',
      url: '/tech-map/extensions/web-presentation-layer/'
    },
    {
      id: 'web-api-design',
      mainNodeId: 'http',
      title: '웹 API 설계',
      description: 'HTTP의 리소스·무상태성·캐시 제약을 API 계약과 운영 비용의 관점에서 읽는다.',
      url: '/tech-map/extensions/web-api-design/'
    },
    {
      id: 'browser-interactions',
      mainNodeId: 'javascript',
      title: '브라우저 상호작용',
      description: '비동기 요청과 부분 갱신이 만든 사용자 경험·클라이언트 상태·API 부하의 균형을 읽는다.',
      url: '/tech-map/extensions/browser-interactions/'
    },
    {
      id: 'application-architecture',
      mainNodeId: 'cgi',
      title: '애플리케이션 아키텍처',
      description: '모놀리스·계층형·마이크로서비스를 배포·통신·책임 경계의 선택으로 비교한다.',
      url: '/tech-map/extensions/application-architecture/'
    },
    {
      id: 'load-balancing',
      mainNodeId: 'cdn',
      title: '로드 밸런싱',
      description: '트래픽 분산과 장애 격리가 세션·상태·헬스 체크라는 운영 책임을 어떻게 만드는지 읽는다.',
      url: '/tech-map/extensions/load-balancing/'
    },
    {
      id: 'configuration-management-and-iac',
      mainNodeId: 'iaas',
      title: '구성 관리 자동화·IaC',
      description: '원하는 상태를 선언·검토·재현하면서 드리프트와 변경 위험을 다루는 방식을 읽는다.',
      url: '/tech-map/extensions/configuration-management-and-iac/'
    },
    {
      id: 'ci-cd',
      mainNodeId: 'dvcs',
      title: 'CI/CD',
      description: '변경을 자주 통합하고 언제든 배포 가능한 상태를 유지하기 위한 검증·복구 흐름을 읽는다.',
      url: '/tech-map/extensions/ci-cd/'
    },
    {
      id: 'slo-and-error-budget',
      mainNodeId: 'kubernetes',
      title: 'SLO·오류 예산',
      description: '사용자 관점 신뢰성 목표와 허용 실패량으로 안정성·변경 속도를 함께 판단하는 방식을 읽는다.',
      url: '/tech-map/extensions/slo-and-error-budget/'
    },
    {
      id: 'workload-execution-scaling',
      mainNodeId: 'kubernetes',
      title: '워크로드 실행·확장',
      description: 'controller·resource request·metric이 장애와 부하 변화 속의 실행 수를 어떻게 조정하는지 읽는다.',
      url: '/tech-map/extensions/workload-execution-scaling/'
    }
  ];

  Object.assign(nodeById.html, {
    title: 'HTML', english: 'HyperText Markup Language',
    why: '웹 문서를 서로 다른 시스템에서 같은 방식으로 교환할 구조 형식이 필요했다.',
    solved: '하이퍼텍스트 문서의 구조를 표준화했다.',
    enabled: '브라우저 기반의 보편적 문서 표현이 가능해졌다.'
  });
  Object.assign(nodeById['relational-data'], {
    mapYear: 1986, title: '관계형 데이터베이스', english: 'Relational Database',
    why: '애플리케이션이 저장 형식에 직접 묶이면 변경 비용이 커졌다.',
    solved: '관계 모델과 표준 질의 언어로 데이터 독립성을 높였다.',
    enabled: '표준화된 데이터 접근과 신뢰 가능한 상태 저장의 기반이 됐다.'
  });
  Object.assign(nodeById.virtualization, {
    mapYear: 1999, title: '서버 가상화', english: 'Server Virtualization',
    why: '물리 서버 한 대를 한 워크로드가 독점하면 자원 활용과 격리가 모두 나빴다.',
    enabled: '탄력적 IaaS와 격리된 실행 환경의 기반이 됐다.'
  });
  Object.assign(nodeById.kafka, {
    title: '이벤트 스트리밍', english: 'Event Streaming',
    why: '시스템 간 데이터 전달을 동기 호출에만 의존하면 결합과 병목이 커졌다.',
    solved: '지속 로그 기반으로 이벤트를 기록·전달·재처리하는 방식을 제공했다.',
    enabled: '비동기 통합과 실시간 데이터 파이프라인을 가능하게 했다.'
  });
  Object.assign(nodeById.containers, {
    title: '컨테이너화', english: 'Containerization',
    solved: '이미지와 실행 구성을 표준화해 애플리케이션을 이식 가능한 단위로 패키징했다.'
  });
  Object.assign(nodeById.kubernetes, {
    title: '컨테이너 오케스트레이션', english: 'Container Orchestration',
    solved: '선언적으로 컨테이너 워크로드의 배치·복구·확장을 조정하는 플랫폼을 제공했다.'
  });

  references.push(
    { id: 'url', title: 'RFC 1738: Uniform Resource Locators', url: 'https://www.rfc-editor.org/rfc/rfc1738' },
    { id: 'sql', title: 'ANSI SQL-86 history', url: 'https://www.iso.org/standard/76583.html' },
    { id: 'tls', title: 'RFC 2246: The TLS Protocol 1.0', url: 'https://www.rfc-editor.org/rfc/rfc2246.html' },
    { id: 'browser', title: 'CERN: A Short History of the Web', url: 'https://home.cern/science/computing/birth-web/short-history-web' },
    { id: 'linux', title: 'Linux kernel archives', url: 'https://www.kernel.org/' },
    { id: 'cdn', title: 'Akamai: Content Delivery Network', url: 'https://www.akamai.com/glossary/what-is-a-cdn' },
    { id: 'git', title: 'Git documentation', url: 'https://git-scm.com/doc' },
    { id: 'serverless', title: 'AWS Lambda', url: 'https://aws.amazon.com/lambda/' }
  );
  auditedNodes.push(
    N('url', 'web', 1995, 'URL', 'Uniform Resource Locator', 'network', '웹 자원의 위치와 식별자를 일관되게 표현할 규칙이 필요했다.', '리소스 주소의 공통 문법을 제공했다.', '브라우저가 링크를 해석하고 HTTP 요청을 보낼 수 있게 했다.', 'url'),
    N('sql', 'foundations', 1986, 'SQL', 'Structured Query Language', 'database', '관계형 데이터를 구현마다 다른 방식으로 다루면 이식성과 질의가 어려웠다.', '관계형 데이터를 정의·질의하는 표준 언어를 제공했다.', '애플리케이션이 저장 구현과 분리된 데이터 접근을 할 수 있게 했다.', 'sql'),
    N('tls', 'web', 1999, 'TLS', 'Transport Layer Security', 'security', '인터넷 통신은 도청·변조·상대 인증 문제를 해결할 공통 보안 계층이 필요했다.', 'TCP 위에서 암호화·무결성·상대 인증을 제공했다.', 'HTTPS 기반 웹 서비스의 신뢰 경계가 됐다.', 'tls'),
    N('browser', 'foundations', 1993, '웹 브라우저', 'Web Browser Runtime', 'frontend', '하이퍼텍스트 문서를 사람이 탐색하고 실행할 보편적 클라이언트가 필요했다.', 'URL을 해석하고 HTTP·HTML·스크립트를 사용자 환경에서 결합했다.', '웹이 연구 문서 시스템을 넘어 보편적 애플리케이션 플랫폼이 됐다.', 'browser'),
    N('linux', 'foundations', 1991, 'Linux', 'Linux', 'infrastructure', '범용 하드웨어에서 확장 가능하고 수정 가능한 서버 운영체제가 필요했다.', '개방된 범용 운영체제와 프로세스·네트워크·파일 시스템 기반을 제공했다.', '클라우드 서버와 컨테이너의 실행 기반이 됐다.', 'linux'),
    N('cdn', 'web', 1999, '콘텐츠 전송 네트워크', 'Content Delivery Network', 'infrastructure', '원본 서버 하나에서 전 세계 사용자에게 콘텐츠를 보내면 지연과 부하가 커졌다.', '가까운 엣지에서 콘텐츠를 캐시·전달하는 분산 계층을 제공했다.', '글로벌 웹 전달의 성능·가용성·보안 경계를 넓혔다.', 'cdn'),
    N('dvcs', 'web', 2005, '분산 버전 관리', 'Distributed Version Control', 'devops', '변경 이력과 협업이 중앙 저장소·네트워크 연결에 과도하게 묶여 있었다.', '복제 가능한 전체 이력과 분산 병합 모델을 제공했다.', '변경을 검토·추적·자동화 입력으로 다루는 기술 기반이 됐다.', 'git'),
    N('serverless', 'cloud', 2014, '서버리스 실행 환경', 'Serverless / FaaS', 'infrastructure', '작은 기능까지 서버 용량·운영체제·확장을 직접 관리하면 운영 부담이 컸다.', '요청·이벤트 단위로 코드를 실행하고 자동 확장하는 관리형 실행 환경을 제공했다.', '클라우드 실행 책임 경계와 이벤트 기반 설계를 바꿨다.', 'serverless')
  );

  causalClaims['packet-switching->tcp-ip'] = '패킷 라디오·패킷 위성의 성공으로 이종 패킷망을 상호접속해야 한다는 문제가 제기됐고, 그 해법이 TCP/IP로 발전했다.';
  causalClaims['http->cgi'] = 'CGI는 HTTP 서버가 클라이언트 요청에 동적으로 응답하도록 서버와 스크립트의 책임을 나눈 인터페이스다.';
  causalClaims['relational-data->sql'] = 'SQL-86은 관계형 데이터베이스를 정의·질의·변경하는 인터페이스의 기능과 의미를 표준화했다.';
  causalClaims['tcp-ip->tls'] = 'TLS 1.0의 Record Protocol은 TCP 같은 신뢰성 있는 전송 프로토콜 위에 계층화되도록 정의됐다.';
  causalClaims['www->browser'] = '월드와이드웹 프로젝트는 하이퍼텍스트 정보를 탐색·표시하는 클라이언트 프로그램의 구현을 요구했다.';
  causalClaims['url->browser'] = '웹 브라우저는 URL로 식별된 자원을 해석·탐색한다.';
  causalClaims['http->browser'] = '웹 브라우저의 HTML 폼 제출은 HTTP 요청·응답 상호작용으로 정의됐다.';
  causalClaims['html->browser'] = '웹 브라우저는 HTML 문서를 파싱하고, 링크를 따라 자원을 탐색하며, 문서 구조를 사용자에게 표현한다.';
  causalClaims['linux->containers'] = 'Linux 컨테이너는 커널 namespace와 cgroup으로 프로세스를 격리하고 자원을 제어한다.';
  causalClaims['http->cdn'] = 'HTTP의 캐시·프록시 의미론은 HTTP 콘텐츠를 원본 밖의 공유 중간 계층에서 전달하는 CDN 구성의 기반이다.';

  const auditedLinks = [
    ...links.filter((link) => ['packet-switching->tcp-ip', 'tcp-ip->dns', 'dns->www', 'www->http', 'http->html', 'virtualization->iaas', 'iaas->containers', 'containers->kubernetes'].includes(link.id)),
    L('http', 'cgi', 'enables', true), L('relational-data', 'sql', 'enables', true),
    L('tcp-ip', 'tls', 'enables', true), L('www', 'browser', 'enables', true),
    L('url', 'browser', 'enables', true), L('http', 'browser', 'enables', true), L('html', 'browser', 'enables', true),
    L('linux', 'containers', 'enables', true), L('http', 'cdn', 'enables', true)
  ];
  const relationshipLabels = {
    'packet-switching->tcp-ip': 'historical-trigger', 'tcp-ip->dns': 'design-prerequisite',
    'dns->www': 'design-prerequisite', 'www->http': 'historical-trigger',
    'http->html': 'design-prerequisite', 'virtualization->iaas': 'design-prerequisite',
    'containers->kubernetes': 'design-prerequisite', 'http->cgi': 'design-prerequisite',
    'relational-data->sql': 'design-prerequisite', 'tcp-ip->tls': 'design-prerequisite',
    'www->browser': 'historical-trigger', 'url->browser': 'design-prerequisite',
    'http->browser': 'design-prerequisite', 'html->browser': 'design-prerequisite',
    'linux->containers': 'design-prerequisite', 'http->cdn': 'design-prerequisite'
  };
  const reviewedLinks = auditedLinks
    .filter((link) => link.id !== 'iaas->containers')
    .map((link) => ({ ...link, type: relationshipLabels[link.id], verification: {
      ...link.verification,
      mechanism: causalClaims[link.id],
      temporalBasis: '관계별 1차·공식 출처가 지지하는 좁은 구현 또는 역사적 범위로 검증함.'
    } }));
  return { eras, nodes: auditedNodes, links: reviewedLinks, references, causalReferences, extensions };
})();
