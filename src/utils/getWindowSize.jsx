import { useEffect, useState } from 'react';

export default function getWindowSize() {
  const getSize = () => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    return {
      windowWidth,
      windowHeight,
    };
  };

  const [windowSize, setWindowSize] = useState(getSize());

  useEffect(() => {
    (() => {
      const updateWindowSize = () => {
        setWindowSize(getSize());
      };
      window.addEventListener('resize', updateWindowSize);
      return () => window.removeEventListener('resize', updateWindowSize);
    })();
  }, []);

  return windowSize;
}
