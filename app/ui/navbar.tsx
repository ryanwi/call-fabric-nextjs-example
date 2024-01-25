import React, { ReactNode } from 'react';

interface NavBarProps {
 children: ReactNode;
}

export default function NavBar({ children }: NavBarProps) {
  return (
     <div className="navbar bg-neutral text-neutral-content">
       {children}
     </div>
  );
 }
 