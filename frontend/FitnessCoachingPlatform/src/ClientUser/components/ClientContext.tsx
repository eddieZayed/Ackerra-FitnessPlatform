import React, { createContext, useState, useEffect, ReactNode } from "react";

// Define the user profile interface
interface Profile {
  firstName: string;
  lastName: string;
  bio?: string;
  dateOfBirth?: string;
  location?: string;
  image?: string | null;
}

// Define the user data interface
interface UserData {
  username: string;
  email: string;
  phone?: string;
  createdAt?: string;
  updatedAt?: string;
  roles?: string[];
  profile: Profile;
}

// Define the context type
interface ClientContextType {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  userData: UserData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
}

// Initialize the context with default values
const ClientContext = createContext<ClientContextType>({
  isLogin: false,
  setIsLogin: () => {},
  userData: null,
  setUserData: () => {},
});

// Props for the provider
interface ClientContextProviderProps {
  children: ReactNode;
}

// Context provider component
const ClientContextProvider: React.FC<ClientContextProviderProps> = ({ children }) => {
  const [isLogin, setIsLogin] = useState<boolean>(() => {
    const savedUser = localStorage.getItem("clientUser");
    return !!savedUser;
  });

  const [userData, setUserData] = useState<UserData | null>(() => {
    const savedUser = localStorage.getItem("clientUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (userData) {
      localStorage.setItem("clientUser", JSON.stringify(userData));
    } else {
      localStorage.removeItem("clientUser");
    }
  }, [userData]);

  return (
    <ClientContext.Provider value={{ isLogin, setIsLogin, userData, setUserData }}>
      {children}
    </ClientContext.Provider>
  );
};

export { ClientContext, ClientContextProvider };
