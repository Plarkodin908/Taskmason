
import { useEffect, useRef, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right';
  threshold?: number;
}

const ScrollReveal = ({ 
  children, 
  className = '', 
  delay = 0,
  direction = 'up',
  threshold = 0.1
}: ScrollRevealProps) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    
    if (!element) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              element.classList.add('revealed');
            }, delay);
            observer.unobserve(element);
          }
        });
      },
      { threshold }
    );
    
    observer.observe(element);
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [delay, threshold]);
  
  let revealClass = 'reveal-on-scroll';
  
  if (direction === 'left') {
    revealClass = 'reveal-left';
  } else if (direction === 'right') {
    revealClass = 'reveal-right';
  }
  
  const delayClass = delay > 0 ? `reveal-delay-${delay}` : '';
  
  return (
    <div ref={elementRef} className={`${revealClass} ${delayClass} ${className}`}>
      {children}
    </div>
  );
};

export default ScrollReveal;
