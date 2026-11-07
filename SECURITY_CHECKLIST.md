# 보안 점검 체크리스트

## 자동 검증
- GitHub Actions의 `security` job이 아래의 `[자동]` 항목을 검증하고, 실패하면 업로드와 배포를 차단한다.
- 로컬 실행: `python3 scripts/security-check.py`

## 1. 비밀정보 커밋
- [자동] push 시 Gitleaks로 전체 Git 이력 검사
- 로컬 방어: `.git/hooks/pre-commit`에서 `gitleaks` 자동 스캔 (커밋 차단)
- 추가: push 시 GitHub Secret Scanning + Push Protection 이미 활성화 (public repo 기본)
- 새 클론 시 훅은 로컬 전용이라 재적용 필요: `cp .git/hooks/pre-commit.sample` 대신 위 스캔 명령 재설정
- [자동] `.env`, `*.csv` 추적 금지 및 `.gitignore` 등록 확인

## 2. 개인정보/사내정보 노출
- [수동] 문맥에 따른 민감성 판단은 자동화하지 않는다.
- 글 작성 후 push 전 셀프체크: 실명, 사내 IP/도메인, 고객사명, 미공개 아키텍처 다이어그램 유무 확인
- 원칙: 회사명/고객명은 익명화("A사", "핀테크 스타트업") 또는 삭제

## 3. GitHub 계정
- [수동] 계정 설정과 PAT scope는 저장소 CI에서 검증하지 않는다.
- 2FA 필수 (미설정 시 `gh api user --jq .two_factor_authentication` 로 확인)
- PAT는 필요 scope만 (`workflow` 등), 만료기한 설정

## 4. Actions 워크플로우
- [자동] action은 허용된 공식 배포자와 메이저 버전 태그 또는 커밋 SHA만 허용
- [자동] `permissions`는 허용 목록(`contents: read`, `pages: write`, `id-token: write`)만 허용
- [자동] `pull_request_target` 사용 금지

## 5. 서브모듈
- [자동] 향후 gitlink가 추가되면 `.gitmodules` 존재 여부 확인
- [수동] 외부 라이브러리 업데이트 시 upstream 커밋 diff 확인 후 반영

## 6. 공개 디렉터리
- `site/`의 파일은 모두 공개된다. 초안과 비공개 자료는 그 밖에서 관리한다.
- [자동] `site/` 안의 숨김 파일(`.nojekyll` 제외), 초안 디렉터리, 심볼릭 링크, 허용하지 않은 파일 확장자를 차단한다.
- [자동] HTML 링크·앵커, 검색 레코드, RSS·sitemap XML은 `python3 scripts/check-site.py`로 검증한다.
