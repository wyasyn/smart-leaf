import classNames from '@/assets/models/class_names.json';
import {
  diseaseGuideData,
  type DiseaseGuideEntry,
} from '@/data/disease_guide_data';
import { NOT_A_LEAF_LABEL } from '@/ml/constants';

export type { DiseaseGuideEntry, DiseaseMarkdown } from '@/data/disease_guide_data';

const guide = diseaseGuideData;

export function getDiseaseGuideEntry(
  classIndex: number,
): DiseaseGuideEntry | undefined {
  return guide[String(classIndex)];
}

export type LibraryListItem = {
  index: number;
  id: string;
  title: string;
  subtitle: string;
  crop: string;
  risk_level: string;
};

export function listLibraryEntries(): LibraryListItem[] {
  const names = classNames as Record<string, string>;
  return Object.keys(names)
    .map((key) => Number(key))
    // The out-of-distribution reject class is not a browsable disease.
    .filter((index) => names[String(index)] !== NOT_A_LEAF_LABEL)
    .sort((a, b) => a - b)
    .map((index) => {
      const entry = guide[String(index)];
      const label = names[String(index)] ?? `Class ${index}`;
      const crop = entry?.crop ?? label.split('___')[0]?.replace(/_/g, ' ') ?? 'Unknown';
      const disease =
        entry?.disease_name ??
        (label.includes('healthy') ? 'Healthy' : label.split('___')[1]?.replace(/_/g, ' '));
      return {
        index,
        id: String(index),
        title: `${crop} — ${disease}`,
        subtitle: entry?.risk_level ?? '—',
        crop,
        risk_level: entry?.risk_level ?? 'Low',
      };
    });
}

export function filterLibraryEntries(
  query: string,
  riskFilter?: string,
): LibraryListItem[] {
  const q = query.trim().toLowerCase();
  return listLibraryEntries().filter((item) => {
    if (riskFilter && riskFilter !== 'All' && item.risk_level !== riskFilter) {
      return false;
    }
    if (!q) return true;
    return (
      item.title.toLowerCase().includes(q) ||
      item.crop.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q)
    );
  });
}

export const CLASS_COUNT = Object.values(
  classNames as Record<string, string>,
).filter((name) => name !== NOT_A_LEAF_LABEL).length;
