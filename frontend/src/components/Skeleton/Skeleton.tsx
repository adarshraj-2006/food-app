import React from 'react';
import './Skeleton.css';

interface SkeletonProps {
    className?: string;
    width?: string | number;
    height?: string | number;
    variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
}

const Skeleton: React.FC<SkeletonProps> = ({ 
    className = "", 
    width, 
    height, 
    variant = 'rectangular' 
}) => {
    const style = {
        width: width,
        height: height,
    };

    return (
        <div 
            className={`skeleton skeleton-${variant} ${className}`}
            style={style}
        />
    );
};

export default Skeleton;
