
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface Text3DProps {
  children: ReactNode;
  className?: string;
  variant?: 'shadow' | 'glow';
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
}

const Text3D = ({ 
  children, 
  className, 
  variant = 'shadow',
  as: Component = 'span'
}: Text3DProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'glow':
        return 'text-3d-glow';
      default:
        return 'text-3d';
    }
  };

  return (
    <Component className={cn(
      getVariantClasses(),
      'font-bold transform transition-all duration-300',
      className
    )}>
      {children}
    </Component>
  );
};

export default Text3D;
