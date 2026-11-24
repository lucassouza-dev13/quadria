
const PROGRESS_KEY = "quadria:reading-progress";

export type ReadingProgress = {
  storySlug: string;
  chapterId: number;
  currentPage: number;
  totalPages: number;
  readingMode: "vertical" | "page";
  updatedAt: string;
};

export function getAllProgress(): ReadingProgress[] {
  try {
    const stored = localStorage.getItem(PROGRESS_KEY);

    if (!stored) return [];

    const parsed = JSON.parse(stored);

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function getReadingProgress(
  storySlug: string
): ReadingProgress | undefined {
  return getAllProgress().find(
    (item) => item.storySlug === storySlug
  );
}

export function saveReadingProgress(
  progress: Omit<ReadingProgress, "updatedAt">
): void {
  const allProgress = getAllProgress();

  const updatedProgress: ReadingProgress = {
    ...progress,
    updatedAt: new Date().toISOString(),
  };

  const filteredProgress = allProgress.filter(
    (item) => item.storySlug !== progress.storySlug
  );

  localStorage.setItem(
    PROGRESS_KEY,
    JSON.stringify([
      updatedProgress,
      ...filteredProgress,
    ])
  );
}

export function removeReadingProgress(
  storySlug: string
): void {
  const updatedProgress = getAllProgress().filter(
    (item) => item.storySlug !== storySlug
  );

  localStorage.setItem(
    PROGRESS_KEY,
    JSON.stringify(updatedProgress)
  );
}
