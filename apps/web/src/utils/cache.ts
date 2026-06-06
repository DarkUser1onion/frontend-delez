interface EntryItem {
  id: string;
  title?: string | null;
  description: string;
  event_date: string;
  created_at: string;
}

const MAX_CACHED_ENTRIES = 50;
let cachedEntries: EntryItem[] = [];

export const entriesCache = {
  get(): EntryItem[] {
    return cachedEntries;
  },
  set(entries: EntryItem[]): void {
    cachedEntries = entries.slice(0, MAX_CACHED_ENTRIES);
  },
  clear(): void {
    cachedEntries = [];
  },
};
