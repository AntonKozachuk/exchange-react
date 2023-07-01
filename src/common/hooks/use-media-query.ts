import { useEffect, useState } from 'react';

export function useMediaQuery(query: string): boolean {
  const [isMatched, setIsMatched] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mediaWatcher = window.matchMedia(query);

    function updateLayout(e: MediaQueryListEvent) {
      setIsMatched(e.matches);
    }

    mediaWatcher.addEventListener('change', updateLayout);

    return function cleanup() {
      mediaWatcher.removeEventListener('change', updateLayout);
    };
  }, [query]);

  return isMatched;
}
