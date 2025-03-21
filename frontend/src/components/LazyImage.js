import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const LazyImage = ({ children }) => {
    function useOnScreen(ref, rootMargin = '0px') {
        const [isIntersecting, setIntersecting] = useState(false);
      
        useEffect(() => {
          const observer = new IntersectionObserver(
            ([entry]) => {
              setIntersecting(entry.isIntersecting);
            },
            {
              rootMargin
            }
          );
          if (ref.current) {
            observer.observe(ref.current);
          }
          return () => {
            if(ref.current) observer.unobserve(ref.current);
          };
        }, []);
      
        return isIntersecting;
      }

    const controls = useAnimation();
  const rootRef = useRef();
  const onScreen = useOnScreen(rootRef);
  useEffect(() => {
    if (onScreen) {
      controls.start({
        x: 0,
        opacity: 1,
        transition: {
          duration: 0.9,
          ease: "easeOut"
        }
      });
    }
  }, [onScreen, controls]);
  return (
    <motion.div
      className="lazy-div"
      ref={rootRef}
      initial={{ opacity: 0, x: -10 }}
      animate={controls}
    >
      {children}
    </motion.div>
  );
}

export default LazyImage;
