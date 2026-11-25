import { useEffect } from 'react';

/**
 * Custom hook to set document title dynamically.
 * @param {string} title
 */
export function useDocumentTitle(title) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title ? `${title} | AITaskPlanner` : 'AITaskPlanner';
    return () => {
      document.title = prevTitle;
    };
  }, [title]);
}

export default useDocumentTitle;
