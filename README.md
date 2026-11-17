# kedzie.dev

HTML·CSS를 직접 편집하는 GitHub Pages 블로그입니다. 사이트 생성기, 패키지 설치, 빌드 과정이 없습니다. JavaScript는 본문 다이어그램과 이전 주소 이동에만 사용합니다.

## 파일 위치

- `site/index.html`: 홈
- `site/notes/`, `site/cases/`: 글·사례 컬렉션과 개별 페이지
- `site/css/`: 공통 스타일
- `site/js/redirect.js`: 이전 주소의 쿼리·앵커를 유지한 이동
- `site/lib/mermaid/mermaid.min.js`: 로컬 Mermaid 라이브러리
- `site/posts/`, `site/portfolio/`: 이전 URL의 이동 페이지

`site/`의 모든 파일은 공개됩니다. 초안이나 비공개 자료는 이 디렉터리에 두지 않습니다.

## 로컬 확인

저장소 루트에서 실행합니다.

```sh
python3 -m http.server 8000 --directory site
```

브라우저에서 <http://localhost:8000>을 엽니다.

## 글 편집

기존 글의 `site/<컬렉션>/<slug>/index.html`을 직접 수정합니다. 코드 예시 안의 `<`, `>`, `&`는 HTML 엔티티로 이스케이프합니다.

새 글은 같은 컬렉션의 HTML을 복사해 작성합니다.

1. 제목, 설명, canonical URL, 날짜, 본문, 목차의 제목과 앵커를 수정합니다.
2. 해당 컬렉션의 `index.html`에 링크를 추가합니다. 최근 글이면 홈의 목록도 갱신합니다.
별도 검색 데이터, RSS 피드, 사이트맵은 관리하지 않습니다.

공통 헤더·푸터도 각 HTML에 들어 있습니다. 공통 문구 변경 시 여러 파일을 함께 수정합니다. HTML에는 서버나 브라우저의 템플릿 처리가 없습니다.

Mermaid를 쓰는 글은 기존 Mermaid 글의 `<pre class="mermaid">`와 라이브러리 로드·초기화 구문을 함께 복사합니다. 기존 URL을 바꾸면 이전 경로에 정적 이동 페이지를 남깁니다.

## 검증과 배포

Python 3.10 이상으로 실행합니다.

```sh
python3 scripts/security-check.py
python3 scripts/check-site.py
```

GitHub Pages의 배포 소스는 **GitHub Actions**를 사용합니다. `main`에 push하면 `.github/workflows/pages.yml`이 보안·링크 검증 후 `site/`만 업로드하고 배포합니다. 저장소 루트의 문서나 작업 파일은 배포되지 않습니다. [공식 워크플로우 문서](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
