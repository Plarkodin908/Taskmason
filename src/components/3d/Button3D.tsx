
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface Button3DProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  disabled?: boolean;
}

const Button3D = ({ 
  children, 
  className, 
  onClick, 
  variant = 'default',
  size = 'default',
  disabled = false
}: Button3DProps) => {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      size={size}
      disabled={disabled}
      className={cn(
        'btn-3d relative overflow-hidden',
        'transform transition-all duration-300',
        'hover:shadow-lg active:scale-95',
        className
      )}
    >
      {children}
    </Button>
  );
};

export default Button3D;
