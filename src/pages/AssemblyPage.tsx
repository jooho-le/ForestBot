import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AssemblyStepCard from '../components/AssemblyStepCard';
import ProgressBar from '../components/ProgressBar';
import { getKitById } from '../services/kitService';
import { getAssemblyProgress, toggleAssemblyStep } from '../services/storageService';
import type { Kit } from '../types/kit';
import { formatGram } from '../utils/format';

const assemblySteps = [
  {
    id: 'check-parts',
    title: '부품 확인하기',
    description: '몸체, 헤드, 팔, 다리 부품과 나사 또는 스냅핏 연결부가 모두 있는지 확인합니다.',
  },
  {
    id: 'body-board',
    title: '몸체에 보드 고정하기',
    description: '보드를 몸체 안쪽 홈에 맞추고 나사를 너무 세게 조이지 않도록 고정합니다.',
  },
  {
    id: 'connect-head',
    title: '헤드 부품 연결하기',
    description: '센서 방향이 앞을 보도록 맞춘 뒤 스냅핏 구조를 눌러 끼웁니다.',
  },
  {
    id: 'arms-legs',
    title: '팔과 다리 조립하기',
    description: '좌우 방향 표시를 확인하고 팔과 다리를 차례대로 연결합니다.',
  },
  {
    id: 'final-check',
    title: '마지막 점검하기',
    description: '흔들리는 부품이 없는지 확인하고 책상 위에서 로봇이 안정적으로 서는지 확인합니다.',
  },
];

export default function AssemblyPage() {
  const { kitId = '' } = useParams();
  const [kit, setKit] = useState<Kit | null>(null);
  const [completedStepIds, setCompletedStepIds] = useState<string[]>([]);

  useEffect(() => {
    getKitById(kitId).then(setKit);
    setCompletedStepIds(getAssemblyProgress(kitId));
  }, [kitId]);

  const progress = useMemo(() => (completedStepIds.length / assemblySteps.length) * 100, [completedStepIds.length]);

  function handleToggle(stepId: string) {
    setCompletedStepIds(toggleAssemblyStep(kitId, stepId));
  }

  return (
    <div className="space-y-5">
      <section className="rounded-[2rem] bg-white p-5 shadow-soft">
        <p className="text-sm font-bold text-slate-500">{kit?.name ?? kitId}</p>
        <h1 className="mt-2 text-3xl font-black text-forest-950">조립 단계 안내</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          나사 체결은 천천히, 스냅핏 구조는 연결 방향을 맞춘 뒤 눌러 주세요.
        </p>
        <div className="mt-5">
          <ProgressBar value={progress} label="전체 조립 진행률" />
        </div>
      </section>

      {kit ? (
        <section className="rounded-3xl border border-forest-100 bg-white p-4 shadow-soft">
          <h2 className="text-lg font-black text-forest-950">부품 목록</h2>
          <div className="mt-3 space-y-2">
            {kit.parts.map((part) => (
              <div key={part.id} className="rounded-2xl bg-forest-50 p-3">
                <div className="flex justify-between gap-3">
                  <strong className="text-sm text-forest-950">{part.name}</strong>
                  <span className="text-sm font-black text-forest-700">{formatGram(part.weightG)}</span>
                </div>
                <p className="mt-1 text-sm leading-6 text-slate-600">{part.description}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="space-y-3">
        {assemblySteps.map((step) => (
          <AssemblyStepCard
            key={step.id}
            title={step.title}
            description={step.description}
            completed={completedStepIds.includes(step.id)}
            onToggle={() => handleToggle(step.id)}
          />
        ))}
      </section>

      <Link to={`/kit/${kitId}`} className="block rounded-2xl bg-white px-4 py-4 text-center text-sm font-black text-forest-800 shadow-soft">
        키트 상세로 돌아가기
      </Link>
    </div>
  );
}
