'use client';

import { useRouter, usePathname } from 'next/navigation';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'vehicle-owner' | 'service-center' | 'oem';

interface User {
  role: UserRole;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
  selectedRole: UserRole;
  setSelectedRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const roleDetails: Record<UserRole, { name: string; home: string }> = {
  'vehicle-owner': { name: 'Vehicle Owner', home: '/' },
  'service-center': { name: 'Service Center Staff', home: '/service-center/calendar' },
  'oem': { name: 'OEM Engineer', home: '/oem/failures' },
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<UserRole>('vehicle-owner');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      if(pathname === '/login'){
        router.replace(roleDetails[parsedUser.role].home);
      }
    } else if (pathname !== '/login') {
       router.replace('/login');
    }
  }, [pathname, router]);

  const login = (role: UserRole) => {
    const newUser: User = { role, name: roleDetails[role].name };
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
    router.push(roleDetails[role].home);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, selectedRole, setSelectedRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
