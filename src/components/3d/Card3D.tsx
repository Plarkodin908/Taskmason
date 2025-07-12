
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface Card3DProps {
  children: ReactNode;
  className?: string;
  variant?: 'tilt' | 'flip' | 'hover' | 'stack';
  glowOnHover?: boolean;
}

const Card3D = ({ children, className, variant = 'tilt', glowOnHover = false }: Card3DProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'flip':
        return 'card-3d-flip';
      case 'hover':
        return 'card-3d';
      case 'stack':
        return 'card-stack-3d';
      default:
        return 'card-3d-tilt';
    }
  };

  return (
    <div className={cn(
      'transform-3d',
      getVariantClasses(),
      glowOnHover && 'glow-on-hover',
      className
    )}>
      {children}
    </div>
  );
};

export default Card3D;
