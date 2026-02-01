import React from 'react';

interface LogoProps {
  size?: 'small' | 'medium';
}

const Logo: React.FC<LogoProps> = ({ size = 'medium' }) => {
  const sizeClass = size === 'small' ? 'w-10 h-10' : 'w-10 h-10';

  return (
    <div className={`${sizeClass} bg-brand-dark dark:bg-brand-light rounded-xl flex items-center justify-center text-white dark:text-gray-900 font-black text-xl italic`}>
      D
    </div>
  );
};

export default Logo;
