import React, { useState, MouseEvent } from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

export interface RippleButtonProps extends HTMLMotionProps<'button'> {
  children: React.ReactNode;
  className?: string;
  rippleColor?: string;
  variant?: 'primary' | 'secondary' | 'dark' | 'outline' | 'custom';
}

export const RippleButton = React.forwardRef<HTMLButtonElement, RippleButtonProps>(
  (
    {
      children,
      className = '',
      rippleColor = 'rgba(255, 255, 255, 0.45)',
      variant = 'custom',
      onClick,
      ...props
    },
    ref
  ) => {
    const [ripples, setRipples] = useState<Ripple[]>([]);

    const handlePointerDown = (e: MouseEvent<HTMLButtonElement>) => {
      const button = e.currentTarget;
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      const newRipple: Ripple = {
        id: Date.now() + Math.random(),
        x,
        y,
        size,
      };

      setRipples((prev) => [...prev.slice(-4), newRipple]);
    };

    const handleRippleAnimationEnd = (id: number) => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.025, y: -1 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 450, damping: 20 }}
        onPointerDown={handlePointerDown}
        onClick={onClick}
        className={`relative overflow-hidden cursor-pointer select-none ${className}`}
        {...props}
      >
        {/* Expanding Ripple Circles */}
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            onAnimationEnd={() => handleRippleAnimationEnd(ripple.id)}
            style={{
              top: ripple.y,
              left: ripple.x,
              width: ripple.size,
              height: ripple.size,
              backgroundColor: rippleColor,
            }}
            className="pointer-events-none absolute rounded-full animate-ripple"
          />
        ))}

        {/* Content with position relative to stay above ripples */}
        <span className="relative z-10 flex items-center justify-center space-x-2 w-full h-full">
          {children}
        </span>
      </motion.button>
    );
  }
);

RippleButton.displayName = 'RippleButton';

export interface RippleLinkProps extends HTMLMotionProps<'a'> {
  children: React.ReactNode;
  className?: string;
  rippleColor?: string;
}

export const RippleLink = React.forwardRef<HTMLAnchorElement, RippleLinkProps>(
  (
    {
      children,
      className = '',
      rippleColor = 'rgba(0, 0, 128, 0.15)',
      onClick,
      ...props
    },
    ref
  ) => {
    const [ripples, setRipples] = useState<Ripple[]>([]);

    const handlePointerDown = (e: MouseEvent<HTMLAnchorElement>) => {
      const link = e.currentTarget;
      const rect = link.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      const newRipple: Ripple = {
        id: Date.now() + Math.random(),
        x,
        y,
        size,
      };

      setRipples((prev) => [...prev.slice(-4), newRipple]);
    };

    const handleRippleAnimationEnd = (id: number) => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    };

    return (
      <motion.a
        ref={ref}
        whileHover={{ scale: 1.025, y: -1 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 450, damping: 20 }}
        onPointerDown={handlePointerDown}
        onClick={onClick}
        className={`relative overflow-hidden cursor-pointer select-none ${className}`}
        {...props}
      >
        {/* Expanding Ripple Circles */}
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            onAnimationEnd={() => handleRippleAnimationEnd(ripple.id)}
            style={{
              top: ripple.y,
              left: ripple.x,
              width: ripple.size,
              height: ripple.size,
              backgroundColor: rippleColor,
            }}
            className="pointer-events-none absolute rounded-full animate-ripple"
          />
        ))}

        <span className="relative z-10 flex items-center justify-center space-x-2 w-full h-full">
          {children}
        </span>
      </motion.a>
    );
  }
);

RippleLink.displayName = 'RippleLink';
