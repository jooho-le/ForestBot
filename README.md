# ForestBot

폐목과 버섯 폐배지를 Bio-PLA와 혼합한 친환경 WPC 로봇 키트의 제작 정보와 환경 효과를 확인하는 React + Capacitor 앱웹 MVP입니다.

## 주요 기능

- QR/바코드의 `kit_id` 기반 키트 조회
- 웹 직접 입력 fallback
- 키트별 폐목, 폐배지, Bio-PLA 사용량 표시
- CO2 절감량과 나무 흡수량 환산 표시
- 3D프린팅 제작 과정 타임라인
- 로봇 키트 조립 단계 체크
- 환경 실천 미션 완료 기록
- localStorage 기반 최근 스캔, 미션, 조립 진행률 저장

## 기술 스택

- React
- TypeScript
- Vite
- Capacitor
- Tailwind CSS
- React Router
- Zustand
- @capacitor-mlkit/barcode-scanning
- html5-qrcode

## 설치 방법

```bash
npm install
```

## 웹 실행 방법

```bash
npm run dev
```

브라우저에서 `http://localhost:5173`으로 접속합니다.

## 웹 빌드

```bash
npm run build
```

## Vercel 웹 배포 후 카메라 스캔

이 프로젝트는 웹 배포 환경에서 `html5-qrcode`로 휴대폰 브라우저 카메라를 열어 QR/바코드를 스캔합니다.

```bash
npm run build
```

Vercel에 배포한 뒤 휴대폰에서 `https://...vercel.app/scan` 주소로 접속하고 `카메라로 스캔하기`를 누르면 브라우저 카메라 권한 요청이 표시됩니다.

웹 카메라 스캔 조건:

- Vercel처럼 HTTPS로 접속해야 합니다.
- iPhone/Android 실제 기기 브라우저에서 테스트해야 합니다.
- QR/바코드 안의 값은 앱에 등록된 `kit_id`여야 합니다.
- 카메라 권한을 거부한 경우 브라우저 설정에서 권한을 다시 허용해야 합니다.

## Capacitor 초기화 및 앱 빌드 방법

이 프로젝트는 `capacitor.config.ts`가 포함되어 있습니다. 웹 빌드 후 네이티브 프로젝트와 동기화합니다.

```bash
npm run build
npx cap sync
```

QR/바코드 스캔 플러그인은 다음 패키지를 사용합니다.

```bash
npm install @capacitor-mlkit/barcode-scanning
npx cap sync
```

## Android 실행 방법

```bash
npx cap add android
npm run build
npx cap sync android
npx cap open android
```

Android Studio에서 실행 기기를 선택하고 Run을 누릅니다.

## iOS 실행 방법

```bash
npx cap add ios
npm run build
npx cap sync ios
npx cap open ios
```

Xcode에서 Signing 설정 후 실행합니다.

## QR 테스트용 kit_id 목록

- `KIT-2026-JB-MUJU-0001`
- `KIT-2026-JB-JINAN-0002`
- `KIT-2026-JB-JANGSU-0003`

## 향후 백엔드 API 연동 방법

현재 데이터 조회는 `src/services/kitService.ts`에서 `src/data/kits.ts` mock DB를 참조합니다. 백엔드가 준비되면 `getKitById`, `getKitsByIds`, `getAllKits` 함수 내부만 `fetch` 또는 API client 호출로 교체하면 됩니다. 화면과 계산 로직은 `Kit` 타입과 service layer에 의존하므로 라우팅과 UI를 크게 바꾸지 않고 연동할 수 있습니다.
