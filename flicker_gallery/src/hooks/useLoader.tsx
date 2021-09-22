import { useEffect, useCallback, useRef } from "react";

function useFetch(setPage: React.Dispatch<React.SetStateAction<number>>) {
  const loader = useRef(null);
  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        setPage((prev) => prev + 1);
      }
    },
    [setPage]
  );
  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);
  return { loader };
}

export default useFetch;
