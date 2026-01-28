import React from 'react';
import Logo from './Logo';
import NavIcon from './NavIcon';
import { UserPersona } from '../types';

interface SidebarProps {
  activePersona: UserPersona;
}

const Sidebar: React.FC<SidebarProps> = ({ activePersona }) => {
  return (
    <aside className="hidden md:flex w-20 flex-col items-center py-8 bg-white dark:bg-gray-800 border-r dark:border-gray-700 gap-8 sticky top-0 h-screen">
      <Logo />
      <nav className="flex flex-col gap-8">
        <NavIcon type="home" active={true} />
        <NavIcon type="search" />
        <NavIcon type="heart" />
        <NavIcon type="clock" />
      </nav>
      <div className="mt-auto">
        <img src={activePersona.avatar} className="w-10 h-10 rounded-full border-2 border-brand-light" alt="Profile" />
      </div>
    </aside>
  );
};

export default Sidebar;
