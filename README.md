# FOMO 소재 에이전트

라라스윗 내부용 FOMO 광고 소재 아이데이션 툴

## 파일 구조

```
fomo-agent/
├── public/
│   └── index.html      # 메인 UI
├── api/
│   └── ideate.js       # Anthropic API 프록시
├── vercel.json         # Vercel 설정
└── README.md
```

## 배포 방법

### 1. GitHub 레포 만들기
- GitHub에서 새 레포 생성 (예: `lala-fomo-agent`)
- 이 폴더 전체 업로드

### 2. Vercel 연결
- vercel.com → Add New Project
- GitHub 레포 선택
- **Environment Variables** 추가:
  - `ANTHROPIC_API_KEY` = 기존 API 키

### 3. 배포 완료
- 자동 배포 후 URL 공유하면 팀원 누구나 사용 가능
