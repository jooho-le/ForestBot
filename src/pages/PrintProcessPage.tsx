import { Link, useParams } from 'react-router-dom';
import ProcessTimeline, { type ProcessStep } from '../components/ProcessTimeline';

const processSteps: ProcessStep[] = [
  {
    id: 'wood',
    title: 'Step 1: 폐목 수거',
    imageLabel: '폐목 수거 이미지',
    description: '지역에서 버려질 수 있는 폐목과 산림 부산물을 모아 소재의 첫 재료로 준비합니다.',
  },
  {
    id: 'mushroom',
    title: 'Step 2: 폐배지 수거',
    imageLabel: '버섯 폐배지 이미지',
    description: '버섯 재배 후 남은 배지를 수거해 자원으로 다시 활용할 수 있게 분류합니다.',
  },
  {
    id: 'dry-crush',
    title: 'Step 3: 건조 및 분쇄',
    imageLabel: '건조 및 분쇄 이미지',
    description: '수분을 낮추고 고르게 분쇄해 Bio-PLA와 잘 섞이는 입자 상태로 만듭니다.',
  },
  {
    id: 'mix',
    title: 'Step 4: Bio-PLA와 혼합',
    imageLabel: '혼합 공정 이미지',
    description: '폐목 분말, 폐배지 분말, Bio-PLA를 정해진 비율로 섞어 WPC 소재를 만듭니다.',
  },
  {
    id: 'filament',
    title: 'Step 5: WPC 펠렛/필라멘트 제작',
    imageLabel: '필라멘트 제작 이미지',
    description: '혼합 소재를 3D프린터가 사용할 수 있는 펠렛 또는 필라멘트 형태로 가공합니다.',
  },
  {
    id: 'print',
    title: 'Step 6: FDM 3D프린팅 출력',
    imageLabel: 'FDM 출력 이미지',
    description: '층층이 쌓는 FDM 방식으로 로봇 몸체와 부품을 출력합니다.',
  },
  {
    id: 'assembly',
    title: 'Step 7: 로봇 키트 조립',
    imageLabel: '로봇 조립 이미지',
    description: '출력된 부품을 나사 또는 스냅핏 구조로 조립해 교육용 로봇 키트로 완성합니다.',
  },
];

export default function PrintProcessPage() {
  const { kitId = '' } = useParams();

  return (
    <div className="space-y-5">
      <section className="rounded-[2rem] bg-forest-800 p-5 text-white shadow-soft">
        <p className="text-sm font-bold text-forest-100">{kitId}</p>
        <h1 className="mt-2 text-3xl font-black leading-tight">3D프린팅 제작 과정</h1>
        <p className="mt-3 text-sm leading-6 text-forest-50">폐자원이 WPC 소재가 되고 로봇 부품으로 출력되는 과정을 단계별로 확인합니다.</p>
      </section>

      <ProcessTimeline steps={processSteps} />

      <Link to={`/kit/${kitId}`} className="block rounded-2xl bg-white px-4 py-4 text-center text-sm font-black text-forest-800 shadow-soft">
        키트 상세로 돌아가기
      </Link>
    </div>
  );
}
