import { kits } from '../data/kits';
import type { Kit } from '../types/kit';

function normalizeKitId(kitId: string): string {
  return kitId.trim().toUpperCase();
}

export async function getAllKits(): Promise<Kit[]> {
  return kits;
}

export async function getKitById(kitId: string): Promise<Kit | null> {
  const normalizedKitId = normalizeKitId(kitId);
  return kits.find((kit) => kit.kitId === normalizedKitId) ?? null;
}

export async function getKitsByIds(kitIds: string[]): Promise<Kit[]> {
  const uniqueIds = Array.from(new Set(kitIds.map(normalizeKitId)));
  return kits.filter((kit) => uniqueIds.includes(kit.kitId));
}
