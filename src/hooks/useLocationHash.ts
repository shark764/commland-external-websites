import { useCallback, useEffect, useState } from 'react';

const useLocationHash = () => {
  const [hash, setHash] = useState(() => window.location.hash);

  const onLocationHashChange = useCallback(() => {
    setHash(window.location.hash);
  }, []);

  useEffect(() => {
    window.addEventListener('popstate', onLocationHashChange);

    return () => {
      window.removeEventListener('popstate', onLocationHashChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateHash = useCallback(
    (newHash: string) => {
      if (newHash !== hash) {
        window.location.hash = newHash;
      }
    },
    [hash]
  );

  return [hash, updateHash] as const;
};

export default useLocationHash;
