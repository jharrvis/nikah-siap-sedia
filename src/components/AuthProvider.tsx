
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  weddingDate?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateWeddingDate: (date: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('wedding_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulasi login - dalam aplikasi nyata akan menggunakan API
    const savedUsers = JSON.parse(localStorage.getItem('wedding_users') || '[]');
    const existingUser = savedUsers.find((u: any) => u.email === email && u.password === password);
    
    if (existingUser) {
      const userSession = {
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
        weddingDate: existingUser.weddingDate
      };
      setUser(userSession);
      localStorage.setItem('wedding_user', JSON.stringify(userSession));
      return true;
    }
    return false;
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    const savedUsers = JSON.parse(localStorage.getItem('wedding_users') || '[]');
    const existingUser = savedUsers.find((u: any) => u.email === email);
    
    if (existingUser) {
      return false; // User sudah ada
    }

    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      name,
      weddingDate: ''
    };

    savedUsers.push(newUser);
    localStorage.setItem('wedding_users', JSON.stringify(savedUsers));

    const userSession = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      weddingDate: newUser.weddingDate
    };
    
    setUser(userSession);
    localStorage.setItem('wedding_user', JSON.stringify(userSession));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('wedding_user');
  };

  const updateWeddingDate = (date: string) => {
    if (user) {
      const updatedUser = { ...user, weddingDate: date };
      setUser(updatedUser);
      localStorage.setItem('wedding_user', JSON.stringify(updatedUser));
      
      // Update di storage users juga
      const savedUsers = JSON.parse(localStorage.getItem('wedding_users') || '[]');
      const updatedUsers = savedUsers.map((u: any) => 
        u.id === user.id ? { ...u, weddingDate: date } : u
      );
      localStorage.setItem('wedding_users', JSON.stringify(updatedUsers));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateWeddingDate }}>
      {children}
    </AuthContext.Provider>
  );
};
