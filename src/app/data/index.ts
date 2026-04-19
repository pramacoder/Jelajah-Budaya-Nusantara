import { jawaProvinces } from './jawa';
import { sumateraProvinces } from './sumatera';
import { kalimantanProvinces } from './kalimantan';
import { sulawesiProvinces } from './sulawesi';
import { malukuProvinces, nusaTenggaraProvinces } from './maluku-nusatenggara';
import { papuaProvinces } from './papua';
import { ProvinceData } from './province-types';

export const allProvinces: ProvinceData[] = [
  ...sumateraProvinces,
  ...jawaProvinces,
  ...kalimantanProvinces,
  ...sulawesiProvinces,
  ...nusaTenggaraProvinces,
  ...malukuProvinces,
  ...papuaProvinces,
];

// Helper to find a province by its name or ID
export const getProvinceById = (id: string): ProvinceData | undefined => {
  return allProvinces.find(p => p.id.toLowerCase() === id.toLowerCase() || p.name.toLowerCase() === id.toLowerCase());
};

// Map of legacy island IDs to new provinces (for backward compatibility if needed)
export const islandToProvinces: Record<string, ProvinceData[]> = {
  sumatra: sumateraProvinces,
  jawa: jawaProvinces,
  kalimantan: kalimantanProvinces,
  sulawesi: sulawesiProvinces,
  bali: nusaTenggaraProvinces, // Includes NTB, NTT
  papua: [...malukuProvinces, ...papuaProvinces], // Group Maluku & Papua
};
