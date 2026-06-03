export type MockItem = {
  id: string;
  title: string;
  subtitle: string;
};

export const libraryItems: MockItem[] = [
  { id: '1', title: 'Monstera deliciosa', subtitle: 'Added 2 days ago' },
  { id: '2', title: 'Snake plant', subtitle: 'Added 1 week ago' },
  { id: '3', title: 'Peace lily', subtitle: 'Added 2 weeks ago' },
];

export const historyItems: MockItem[] = [
  { id: '1', title: 'Fiddle leaf fig scan', subtitle: 'Yesterday' },
  { id: '2', title: 'Pothos scan', subtitle: '3 days ago' },
  { id: '3', title: 'Rubber plant scan', subtitle: 'Last week' },
];

export function findLibraryItem(id: string): MockItem | undefined {
  return libraryItems.find((item) => item.id === id);
}

export function findHistoryItem(id: string): MockItem | undefined {
  return historyItems.find((item) => item.id === id);
}
