"use client";

import api from "@/lib/api/axiosClient";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type AuthContextType = {
  userId: string | null;
  setUserId: (id: string | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await api.get("/auth/me")
  
        console.log("Profile recebido:", res.data);
        setUserId(res.data.id);
  
      } catch (error) {
        console.error("Erro ao buscar profile:", error);
        setUserId(null);
      }
    }
  
    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth precisa estar dentro de um AuthProvider");
  }
  return context;
}
