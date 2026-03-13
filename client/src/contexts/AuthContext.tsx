import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";

interface User {
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hardcoded credentials (untuk demo)
const VALID_CREDENTIALS = {
  email: "sangruhdev@gmail.com",
  password: "Firedra08!!",
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("stevia_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem("stevia_user");
      }
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (email === VALID_CREDENTIALS.email && password === VALID_CREDENTIALS.password) {
      const userData: User = {
        email,
        name: email.split("@")[0],
        role: "admin",
      };
      setUser(userData);
      localStorage.setItem("stevia_user", JSON.stringify(userData));
      return { success: true };
    }

    return { success: false, error: "Email atau password salah" };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("stevia_user");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
