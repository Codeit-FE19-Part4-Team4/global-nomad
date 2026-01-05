'use client';

import { createContext, useContext } from 'react';

type MenuContextType = {
  openMenu: () => void;
  closeMenu: () => void;
};

const MenuContext = createContext<MenuContextType | null>(null);

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within MenuProvider');
  }
  return context;
};

export const MenuProvider = MenuContext.Provider;
