import { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface User {
  email: string;
  password: string;
}

interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => void;
  signup: (email: string, name: string,password: string) => void;
  logged: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  login: async () => {},
  signup: async () => {},
  logged: false,
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    const loadingStoreData = async () => {
      const storageUser = localStorage.getItem("@Auth:user");
      const storageToken = localStorage.getItem("@Auth:token");

      if (storageUser && storageToken) {
        setUser(JSON.parse(storageUser));
      }
    };
    loadingStoreData();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // URL API http:localhost:3333`/login`
      const response = await api.post("/login", { email, password });
      if (response.data.error) {
        alert("Erro durante o login: " + response.data.error);
      } else {
        setUser(response.data);
        api.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
        localStorage.setItem("@Auth:user", JSON.stringify(response.data.user));
        localStorage.setItem("@Auth:token", JSON.stringify(response.data.token));
      }
    } catch (error) {
      console.error("Erro durante o login:", error);
      alert("Erro durante o login. Tente novamente mais tarde.");
    }
  };
  
  const signup = async (email: string, name: string, password: string) => {
    try {
      // URL API http:localhost:3333`/create`
      const response = await api.post("/create", { email, name, password });

      if (response.data.error) {
        alert("Erro durante o cadastro: " + response.data.error);
      } else {
        alert("Cadastro realizado com sucesso!");
      }
    } catch (error) {
      console.error("Erro durante o cadastro:", error);
      alert("Erro durante o cadastro. Tente novamente mais tarde.");
    }
  };
  // 
  const logged = user !== null;

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logged,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};