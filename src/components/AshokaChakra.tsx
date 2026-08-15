import React from 'react';

interface AshokaChakraProps {
  className?: string;
  size?: number;
  animate?: boolean;
  opacity?: number;
  strokeColor?: string;
}

export const AshokaChakra: React.FC<AshokaChakraProps> = ({
  className = '',
  size = 120,
  animate = false,
  opacity = 1,
  strokeColor = '#000080',
}) => {
  // 24 Spokes spaced exactly at 15 degrees (360 / 24 = 15 deg)
  const spokes = Array.from({ length: 24 }, (_, i) => i * 15);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`${animate ? 'animate-spin-slow' : ''} ${className}`}
      style={{ opacity }}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Ashoka Chakra motif"
      role="img"
    >
      {/* Outer Ring */}
      <circle cx="50" cy="50" r="46" fill="none" stroke={strokeColor} strokeWidth="2.5" />
      {/* Inner Outer Track */}
      <circle cx="50" cy="50" r="43.5" fill="none" stroke={strokeColor} strokeWidth="1" />
      
      {/* 24 Outer Dots/Rounds */}
      {spokes.map((angle, index) => {
        const rad = (angle * Math.PI) / 180;
        const cx = 50 + 44.8 * Math.cos(rad);
        const cy = 50 + 44.8 * Math.sin(rad);
        return (
          <circle
            key={`dot-${index}`}
            cx={cx}
            cy={cy}
            r="0.8"
            fill={strokeColor}
          />
        );
      })}

      {/* Central Ring & Hub */}
      <circle cx="50" cy="50" r="10" fill="none" stroke={strokeColor} strokeWidth="1.5" />
      <circle cx="50" cy="50" r="6" fill={strokeColor} />
      <circle cx="50" cy="50" r="2.5" fill="#FFFFFF" />

      {/* 24 Spokes with tapered triangular spokes */}
      <g>
        {spokes.map((angle, index) => (
          <g key={`spoke-${index}`} transform={`rotate(${angle} 50 50)`}>
            {/* Spoke line */}
            <line
              x1="50"
              y1="40"
              x2="50"
              y2="6.5"
              stroke={strokeColor}
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            {/* Triangular base wedge near hub */}
            <polygon
              points="49,38 51,38 50.4,18 49.6,18"
              fill={strokeColor}
            />
          </g>
        ))}
      </g>
    </svg>
  );
};
