export function formatGram(value: number): string {
  return `${Math.round(value).toLocaleString('ko-KR')} g`;
}

export function formatKg(value: number, digits = 3): string {
  return `${value.toFixed(digits)} kg CO2e`;
}

export function formatDays(value: number): string {
  return `${Math.round(value).toLocaleString('ko-KR')}일`;
}

export function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`;
}

export function formatDate(value: string): string {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(value));
}

export function formatMinutes(value: number): string {
  const hours = Math.floor(value / 60);
  const minutes = value % 60;
  if (hours === 0) return `${minutes}분`;
  return `${hours}시간 ${minutes}분`;
}
