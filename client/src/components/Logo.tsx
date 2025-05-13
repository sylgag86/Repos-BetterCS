import React from 'react';
import { Link } from 'wouter';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <Link href="/" className={`logo-container ${className}`}>
      <img
        src="/assets/exact-logo.png"
        alt="Better Capital Solutions"
        className="logo"
      />
    </Link>
  );
};

export default Logo;