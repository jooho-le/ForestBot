const RECENT_SCANS_KEY = 'forestbot.recentScans';
const COMPLETED_MISSIONS_KEY = 'forestbot.completedMissions';
const ASSEMBLY_PROGRESS_KEY = 'forestbot.assemblyProgress';

function readStringArray(key: string): string[] {
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as string[]) : [];
  } catch {
    return [];
  }
}

function writeStringArray(key: string, value: string[]): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getRecentScans(): string[] {
  return readStringArray(RECENT_SCANS_KEY);
}

export function addRecentScan(kitId: string): string[] {
  const normalizedKitId = kitId.trim().toUpperCase();
  const nextScans = [normalizedKitId, ...getRecentScans().filter((id) => id !== normalizedKitId)].slice(0, 20);
  writeStringArray(RECENT_SCANS_KEY, nextScans);
  return nextScans;
}

export function getCompletedMissionIds(): string[] {
  return readStringArray(COMPLETED_MISSIONS_KEY);
}

export function toggleMission(missionId: string): string[] {
  const completedMissionIds = getCompletedMissionIds();
  const nextMissionIds = completedMissionIds.includes(missionId)
    ? completedMissionIds.filter((id) => id !== missionId)
    : [...completedMissionIds, missionId];
  writeStringArray(COMPLETED_MISSIONS_KEY, nextMissionIds);
  return nextMissionIds;
}

export function getAssemblyProgress(kitId: string): string[] {
  try {
    const value = localStorage.getItem(ASSEMBLY_PROGRESS_KEY);
    const progress = value ? (JSON.parse(value) as Record<string, string[]>) : {};
    return progress[kitId] ?? [];
  } catch {
    return [];
  }
}

export function toggleAssemblyStep(kitId: string, stepId: string): string[] {
  const value = localStorage.getItem(ASSEMBLY_PROGRESS_KEY);
  const progress = value ? (JSON.parse(value) as Record<string, string[]>) : {};
  const currentSteps = progress[kitId] ?? [];
  const nextSteps = currentSteps.includes(stepId)
    ? currentSteps.filter((id) => id !== stepId)
    : [...currentSteps, stepId];

  localStorage.setItem(
    ASSEMBLY_PROGRESS_KEY,
    JSON.stringify({
      ...progress,
      [kitId]: nextSteps,
    }),
  );

  return nextSteps;
}
