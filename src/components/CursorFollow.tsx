import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CursorFollow = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dotColor, setDotColor] = useState('black');
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

  useEffect(() => {
    const updateScreenSize = () => {
      setIsDesktop(window.innerWidth > 768);
    };

    const getContrastColor = (element: Element): string => {
      const style = window.getComputedStyle(element);
      
      // Get both background and text colors
      const bgColor = style.backgroundColor;
      const textColor = style.color;
      
      // Function to parse RGB/RGBA values
      const parseColor = (color: string) => {
        const match = color.match(/\d+/g);
        if (!match) return null;
        return {
          r: parseInt(match[0]),
          g: parseInt(match[1]),
          b: parseInt(match[2]),
          a: match[3] ? parseFloat(match[3]) : 1
        };
      };

      // Function to calculate relative luminance
      const getLuminance = (r: number, g: number, b: number) => {
        const [rs, gs, bs] = [r, g, b].map(c => {
          c = c / 255;
          return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
      };

      const bg = parseColor(bgColor);
      const text = parseColor(textColor);

      if (!bg || !text) return 'black';

      // If background is transparent or has low opacity, check parent elements
      if (bg.a < 0.5) {
        const parent = element.parentElement;
        if (parent) {
          return getContrastColor(parent);
        }
        return 'black';
      }

      // Calculate contrast ratio
      const L1 = getLuminance(bg.r, bg.g, bg.b);
      const L2 = getLuminance(text.r, text.g, text.b);
      const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);

      // Return the color with better contrast
      return ratio > 4.5 ? textColor : (L1 > 0.5 ? 'black' : 'white');
    };

    const mouseMove = (e: MouseEvent) => {
      if (!isDesktop) return;

      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });

      // Get all elements under the cursor using elementsFromPoint
      const elements = document.elementsFromPoint(e.clientX, e.clientY);
      
      if (elements.length > 0) {
        // Find the first visible element with a background or text color
        for (const element of elements) {
          const style = window.getComputedStyle(element);
          if (style.display !== 'none' && style.visibility !== 'hidden') {
            const contrastColor = getContrastColor(element);
            setDotColor(contrastColor);
            break;
          }
        }
      } else {
        setDotColor('black');
      }
    };

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('resize', updateScreenSize);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('resize', updateScreenSize);
    };
  }, [isDesktop]);

  return (
    isDesktop && (
      <motion.div
        className="fixed w-6 h-6 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{ 
          backgroundColor: dotColor,
          opacity: 0.8,
          backdropFilter: 'invert(1)',
          WebkitBackdropFilter: 'invert(1)'
        }}
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: [1, 1.2, 1],
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />
    )
  );
};

export default CursorFollow;