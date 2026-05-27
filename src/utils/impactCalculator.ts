import type { Kit } from '../types/kit';

export type KitImpact = {
  woodAmountG: number;
  mushroomBedAmountG: number;
  bioPlaAmountG: number;
  recycledAmountG: number;
  treeEquivalent: number;
  treeDaysEquivalent: number;
};

const ONE_TREE_CO2_ABSORPTION_KG = 125;
const ONE_TREE_DAILY_ABSORPTION_KG = ONE_TREE_CO2_ABSORPTION_KG / (60 * 365);

export function calculateKitImpact(kit: Kit): KitImpact {
  const woodAmountG = kit.totalWeightG * kit.materialRatio.recycledWood;
  const mushroomBedAmountG = kit.totalWeightG * kit.materialRatio.mushroomBed;
  const bioPlaAmountG = kit.totalWeightG * kit.materialRatio.bioPla;
  const recycledAmountG = woodAmountG + mushroomBedAmountG;
  const treeEquivalent = kit.co2SavedKg / ONE_TREE_CO2_ABSORPTION_KG;
  const treeDaysEquivalent = kit.co2SavedKg / ONE_TREE_DAILY_ABSORPTION_KG;

  return {
    woodAmountG,
    mushroomBedAmountG,
    bioPlaAmountG,
    recycledAmountG,
    treeEquivalent,
    treeDaysEquivalent,
  };
}

export function calculateTotalImpact(kits: Kit[]) {
  return kits.reduce(
    (total, kit) => {
      const impact = calculateKitImpact(kit);

      return {
        recycledAmountG: total.recycledAmountG + impact.recycledAmountG,
        co2SavedKg: total.co2SavedKg + kit.co2SavedKg,
        treeDaysEquivalent: total.treeDaysEquivalent + impact.treeDaysEquivalent,
        scannedKitCount: total.scannedKitCount + 1,
      };
    },
    {
      recycledAmountG: 0,
      co2SavedKg: 0,
      treeDaysEquivalent: 0,
      scannedKitCount: 0,
    },
  );
}
