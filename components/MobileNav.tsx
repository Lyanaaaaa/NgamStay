import React from 'react';
import NavIcon from './NavIcon';
import { UserPersona } from '../types';

interface MobileNavProps {
  activePersona: UserPersona;
}

const MobileNav: React.FC<MobileNavProps> = ({ activePersona }) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-t dark:border-gray-700 flex justify-around p-4 z-40">
      <NavIcon type="home" active={true} />
      <NavIcon type="search" />
      <NavIcon type="heart" />
      <img src={activePersona.avatar} className="w-6 h-6 rounded-full" alt="Me" />
    </nav>
  );
};

export default MobileNav;
