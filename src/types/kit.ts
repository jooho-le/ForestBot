export type Kit = {
  kitId: string;
  name: string;
  region: string;
  producedAt: string;
  totalWeightG: number;
  materialRatio: {
    recycledWood: number;
    mushroomBed: number;
    bioPla: number;
  };
  co2SavedKg: number;
  printInfo: {
    printerType: string;
    printTimeMin: number;
    layerHeightMm: number;
    nozzleTempC: number;
    bedTempC: number;
    filamentUsedG: number;
  };
  parts: {
    id: string;
    name: string;
    weightG: number;
    description: string;
  }[];
  sourceInfo: {
    woodSource: string;
    mushroomBedSource: string;
  };
};
