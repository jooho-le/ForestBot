import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="rounded-3xl bg-white p-6 text-center shadow-soft">
      <h1 className="text-2xl font-black text-forest-950">페이지를 찾을 수 없습니다</h1>
      <p className="mt-2 text-sm leading-6 text-slate-600">주소를 다시 확인하거나 홈으로 돌아가 주세요.</p>
      <Link to="/" className="mt-5 inline-flex rounded-2xl bg-forest-700 px-5 py-3 text-sm font-black text-white">
        홈으로 가기
      </Link>
    </section>
  );
}
