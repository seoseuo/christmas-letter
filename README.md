# 🧦 크리스마스 양말에 편지를 담아요

소중한 사람에게 따뜻한 마음을 전하는 작은 크리스마스 선물이에요. 🎄
나만의 양말을 꾸며 공유하고, 친구들이 남겨준 편지를 크리스마스에 만나보세요. 💌

## ✨ 이렇게 즐겨요

1. 나만의 양말을 꾸미고 닉네임을 정해요.
2. 양말 링크를 친구들에게 공유해요.
3. 친구들이 편지지와 함께 따뜻한 메시지를 남겨요.
4. 크리스마스에 도착한 마음을 열어봐요. 🎁

양말 만들기와 편지 쓰기는 무료이며, 편지 열람은 유료로 기획되어 있어요. 가격은 아직 정해지지 않았습니다.

## 🗓️ 기억해 주세요

모든 시간은 한국 시간(KST) 기준이에요.

- 편지 접수 마감: **2026년 12월 24일 23:00**
- 크리스마스 정식 열람 시작: **2026년 12월 25일 00:00**
- 편지 열람 종료: **2027년 1월 15일 23:59:59**

## 🚧 지금은 화면 시연 중이에요

현재는 개발 중인 프로토타입입니다. 카카오와 Supabase를 설정하면 양말과 편지를 DB에 저장하고 양말별 링크를 공유할 수 있도록 준비되어 있습니다. 설정 전에는 실제 로그인이 동작하지 않습니다.

카카오 로그인과 양말·편지 저장은 Supabase 및 카카오 설정이 필요하며 실제 환경에서 검증해야 합니다. 이미지 저장, 결제, 편지 열람과 신고 처리는 아직 준비 중이에요. 🔨

## 🚀 시작하기

Node.js 환경에서 프로젝트 폴더에 들어간 뒤 실행해 주세요.

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열면 됩니다. 프로덕션 빌드는 `npm run build`로 확인할 수 있어요.

## 🗂️ 프로젝트 구조

```text
app/                 Next.js App Router 화면과 API
  [screen]/          서비스 화면 라우트
  stockings/[id]/    공유 양말 화면
  api/service/       공개 서비스 정보 API
components/          화면과 재사용 UI
lib/                 화면 경로와 서비스 설정
```

Next.js Route Handler를 통해 같은 프로젝트에서 API를 만들 수 있어요. 실제 서비스에서는 인증, 소유권·열람권 검증, 편지 중복 작성 방지와 시간 제한을 서버에서 처리해야 합니다. 비밀키는 환경 변수로 관리하고 저장소에 올리지 않아요. 🔐

---

Made with 💛 by **andflow studio** · [@andflow.studio](https://instagram.com/andflow.studio)

## 🔐 Supabase와 카카오 설정

1. Supabase 프로젝트의 **SQL Editor**에서 `db/schema.sql`을 실행해 테이블을 만듭니다. 기존 운영 데이터가 있는 프로젝트라면 먼저 SQL을 검토하세요.
2. Supabase의 **Connect → Session pooler**에서 연결 문자열을 복사하고 DB 비밀번호를 채웁니다. 이 문자열은 비밀정보이므로 채팅이나 저장소에 올리지 마세요.
3. 프로젝트 루트에 `.env.local` 파일을 만들고 `.env.example`의 항목을 채웁니다. `DATABASE_URL`에는 위 연결 문자열을 넣습니다.
4. 카카오 개발자 설정에서 REST API 키와 (활성화한 경우) Client Secret을 각각 `KAKAO_REST_API_KEY`, `KAKAO_CLIENT_SECRET`에 입력합니다. `KAKAO_REDIRECT_URI`는 카카오에 등록한 콜백 주소와 정확히 일치해야 합니다. 로컬 예시는 `http://localhost:3000/api/auth/kakao/callback`입니다.
5. Render 서비스의 **Environment**에도 같은 변수들을 직접 추가합니다. 배포 환경의 `KAKAO_REDIRECT_URI`는 `https://배포도메인/api/auth/kakao/callback`으로 설정하고, 카카오 개발자 설정에도 등록하세요.

`.env.local`은 Git에서 제외됩니다. 아직 DB 스키마와 외부 계정을 연결하지 않은 환경에서는 실제 로그인 및 저장을 검증할 수 없습니다.
