import { useEffect, useState } from "react";

/**
 * A React hook that uses the IntersectionObserver API to track
 * when an element is visible in the viewport
 * 
 * @param {Object} props - Props for the useIntersectionObserver hook
 * @param {React.RefObject} props.ref - Reference to the element to observe
 * @param {Object} props.options - IntersectionObserver options
 * @param {Element|null} props.options.root - Viewport element to use as reference
 * @param {string} props.options.rootMargin - Margin around the root
 * @param {number|number[]} props.options.threshold - Visibility threshold(s)
 * @returns {boolean} - Whether the observed element is intersecting
 */
export function useIntersectionObserver({ 
  ref, 
  options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  }
}) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return isIntersecting;
}

export default useIntersectionObserver;