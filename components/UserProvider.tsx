"use client";

import { auth } from "@/lib/firebase/firebase";
import { User } from "firebase/auth";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface IUserContext {
  user: null | User;
  initializing: boolean;
}

const UserContext = createContext<IUserContext>({
  user: null,
  initializing: true,
});

export const useUser = () => useContext(UserContext);

interface UserProviderProps {
  children: ReactNode;
}
const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setInitializing(false);
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, initializing }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
