
const LIBRARY_KEY = "quadria:library";

export function getLibrary(): string[] {
  try {
    const stored = localStorage.getItem(LIBRARY_KEY);

    if (!stored) return [];

    const parsed: unknown = JSON.parse(stored);

    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (item): item is string => typeof item === "string"
    );
  } catch {
    return [];
  }
}

export function isInLibrary(slug: string): boolean {
  return getLibrary().includes(slug);
}

export function addToLibrary(slug: string): void {
  const library = getLibrary();

  if (library.includes(slug)) return;

  localStorage.setItem(
    LIBRARY_KEY,
    JSON.stringify([...library, slug])
  );
}

export function removeFromLibrary(slug: string): void {
  const library = getLibrary();

  const updatedLibrary = library.filter(
    (item) => item !== slug
  );

  localStorage.setItem(
    LIBRARY_KEY,
    JSON.stringify(updatedLibrary)
  );
}

export function toggleLibrary(slug: string): boolean {
  if (isInLibrary(slug)) {
    removeFromLibrary(slug);
    return false;
  }

  addToLibrary(slug);
  return true;
}
