
import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = 'w-16 h-16' }) => {
  return (
    <svg 
      viewBox="0 0 100 60" 
      className={className} 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label="Logo de Rafael Donado"
    >
      <path d="M65 5 C80 5 95 20 95 35 S80 65 65 65" transform="translate(0, -5)"/>
      <path d="M45 5 C25 5 5 25 5 45 C5 55 10 60 20 60 L35 52" transform="translate(0, -5)"/>
    </svg>
  );
};

export default Logo;
