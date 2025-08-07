import React from 'react';
import './Shimmer.scss';

interface ShimmerProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
}

const Shimmer: React.FC<ShimmerProps> = ({
  width = '100%',
  height = '20px',
  borderRadius = '4px',
  className = '',
}) => {
  return (
    <div
      className={`shimmer-loading ${className}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
      }}
    />
  );
};

export default Shimmer;
