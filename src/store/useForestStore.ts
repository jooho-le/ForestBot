import { create } from 'zustand';
import {
  addRecentScan,
  getCompletedMissionIds,
  getRecentScans,
  toggleMission,
} from '../services/storageService';

type ForestStore = {
  recentScans: string[];
  completedMissionIds: string[];
  loadSavedState: () => void;
  recordScan: (kitId: string) => void;
  toggleMissionComplete: (missionId: string) => void;
};

export const useForestStore = create<ForestStore>((set) => ({
  recentScans: [],
  completedMissionIds: [],
  loadSavedState: () =>
    set({
      recentScans: getRecentScans(),
      completedMissionIds: getCompletedMissionIds(),
    }),
  recordScan: (kitId) =>
    set({
      recentScans: addRecentScan(kitId),
    }),
  toggleMissionComplete: (missionId) =>
    set({
      completedMissionIds: toggleMission(missionId),
    }),
}));
