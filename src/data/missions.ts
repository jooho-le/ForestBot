import type { Mission } from '../types/mission';

export const missions: Mission[] = [
  {
    id: 'reduce-cup',
    title: '오늘 플라스틱 컵 사용 줄이기',
    description: '텀블러나 다회용 컵을 사용하고 기록해 보세요.',
    points: 10,
  },
  {
    id: 'recycle-sort',
    title: '분리배출 실천하기',
    description: '종이, 플라스틱, 캔을 올바른 곳에 나누어 버려요.',
    points: 10,
  },
  {
    id: 'explain-cycle',
    title: '주변 사람에게 자원순환 설명하기',
    description: '폐목과 폐배지가 새 제품이 되는 과정을 알려 주세요.',
    points: 15,
  },
  {
    id: 'check-material',
    title: '사용한 제품의 소재 확인하기',
    description: '제품 뒷면의 소재 표시를 보고 재활용 가능성을 생각해요.',
    points: 15,
  },
];
