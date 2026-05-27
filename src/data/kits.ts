import type { Kit } from '../types/kit';

export const kits: Kit[] = [
  {
    kitId: 'KIT-2026-JB-MUJU-0001',
    name: '무주 숲순환 로봇 키트',
    region: '전북 무주',
    producedAt: '2026-04-12',
    totalWeightG: 300,
    materialRatio: {
      recycledWood: 0.25,
      mushroomBed: 0.15,
      bioPla: 0.6,
    },
    co2SavedKg: 0.278,
    printInfo: {
      printerType: 'FDM 3D Printer',
      printTimeMin: 210,
      layerHeightMm: 0.2,
      nozzleTempC: 205,
      bedTempC: 55,
      filamentUsedG: 286,
    },
    parts: [
      { id: 'body', name: '몸체 프레임', weightG: 92, description: '모터와 보드를 고정하는 중심 부품입니다.' },
      { id: 'head', name: '헤드 커버', weightG: 48, description: '센서와 전면 장식을 보호합니다.' },
      { id: 'arms', name: '좌우 팔 부품', weightG: 66, description: '스냅핏으로 몸체에 연결됩니다.' },
      { id: 'legs', name: '다리 받침', weightG: 80, description: '로봇이 안정적으로 서도록 받쳐줍니다.' },
    ],
    sourceInfo: {
      woodSource: '무주 산림조합 폐목',
      mushroomBedSource: '무주 표고버섯 농가 폐배지',
    },
  },
  {
    kitId: 'KIT-2026-JB-JINAN-0002',
    name: '진안 자원순환 로봇 키트',
    region: '전북 진안',
    producedAt: '2026-04-18',
    totalWeightG: 280,
    materialRatio: {
      recycledWood: 0.22,
      mushroomBed: 0.18,
      bioPla: 0.6,
    },
    co2SavedKg: 0.26,
    printInfo: {
      printerType: 'FDM 3D Printer',
      printTimeMin: 195,
      layerHeightMm: 0.2,
      nozzleTempC: 204,
      bedTempC: 55,
      filamentUsedG: 270,
    },
    parts: [
      { id: 'body', name: '몸체 프레임', weightG: 88, description: '전원 부품과 보드를 담는 중심 구조입니다.' },
      { id: 'head', name: '센서 헤드', weightG: 45, description: '전면 센서를 끼우기 쉬운 형태입니다.' },
      { id: 'arms', name: '팔 연결 부품', weightG: 60, description: '좌우 방향을 확인하며 끼웁니다.' },
      { id: 'legs', name: '균형 다리', weightG: 72, description: '책상 위에서 흔들림을 줄입니다.' },
    ],
    sourceInfo: {
      woodSource: '진안 지역 폐목',
      mushroomBedSource: '진안 버섯 농가 폐배지',
    },
  },
  {
    kitId: 'KIT-2026-JB-JANGSU-0003',
    name: '장수 바이오매스 로봇 키트',
    region: '전북 장수',
    producedAt: '2026-04-22',
    totalWeightG: 320,
    materialRatio: {
      recycledWood: 0.3,
      mushroomBed: 0.1,
      bioPla: 0.6,
    },
    co2SavedKg: 0.295,
    printInfo: {
      printerType: 'FDM 3D Printer',
      printTimeMin: 230,
      layerHeightMm: 0.22,
      nozzleTempC: 206,
      bedTempC: 56,
      filamentUsedG: 305,
    },
    parts: [
      { id: 'body', name: '강화 몸체', weightG: 104, description: '조립 후 내부 부품을 단단히 보호합니다.' },
      { id: 'head', name: '상단 커버', weightG: 52, description: '머리 부품을 몸체 위에 고정합니다.' },
      { id: 'arms', name: '움직임 팔', weightG: 70, description: '간단한 움직임 실험에 사용할 수 있습니다.' },
      { id: 'legs', name: '받침 다리', weightG: 86, description: '넓은 바닥면으로 균형을 잡습니다.' },
    ],
    sourceInfo: {
      woodSource: '장수 산림 부산물',
      mushroomBedSource: '장수 버섯 폐배지',
    },
  },
];
