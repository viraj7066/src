import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface User {
  id: string;
  email: string;
  fullName: string;
}

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  adminLogin: (username: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_CREDENTIALS = [
  { username: "Viraj", password: "viraj7066" },
  { username: "Jayesh", password: "jayesh2025" },
  { username: "Harsh", password: "harsh2025" }
];

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedIsAdmin = localStorage.getItem('isAdmin');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedIsAdmin) {
      setIsAdmin(JSON.parse(storedIsAdmin));
    }
  }, []);

  const register = async (email: string, password: string, fullName: string) => {
    try {
      // In a real app, you'd hash the password before storing
      const newUser = { id: Date.now().toString(), email, fullName };
      
      // Store user in localStorage (in a real app, this would be in a database)
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      users.push({ ...newUser, password });
      localStorage.setItem('users', JSON.stringify(users));
      
      toast.success('Registration successful! Please login.');
      navigate('/login');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // In a real app, you'd verify against a database
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((u: any) => u.email === email && u.password === password);
      
      if (user) {
        const { password: _, ...userWithoutPassword } = user;
        setUser(userWithoutPassword);
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        
        // Log login activity
        const loginActivity = JSON.parse(localStorage.getItem('loginActivity') || '[]');
        loginActivity.push({
          userId: user.id,
          email: user.email,
          timestamp: new Date().toISOString(),
          success: true
        });
        localStorage.setItem('loginActivity', JSON.stringify(loginActivity));
        
        toast.success('Login successful!');
        navigate('/');
      } else {
        // Log failed login attempt
        const loginActivity = JSON.parse(localStorage.getItem('loginActivity') || '[]');
        loginActivity.push({
          email,
          timestamp: new Date().toISOString(),
          success: false
        });
        localStorage.setItem('loginActivity', JSON.stringify(loginActivity));
        
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast.error('Invalid email or password');
    }
  };

  const adminLogin = async (username: string, password: string) => {
    const admin = ADMIN_CREDENTIALS.find(
      cred => cred.username === username && cred.password === password
    );

    if (admin) {
      setIsAdmin(true);
      localStorage.setItem('isAdmin', 'true');
      toast.success('Admin login successful!');
      navigate('/admin');
    } else {
      toast.error('Invalid admin credentials');
    }
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('user');
    localStorage.removeItem('isAdmin');
    navigate('/');
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, adminLogin, register, logout }}>
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