import { createContext, useContext, useState } from "react";
import { User } from "../types/user.type";

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType | null>(null);

type UserContextProvider = {
  children: React.ReactNode;
};

export const UserContextProvider = ({ children }: UserContextProvider) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("use user must be used within an user provider");
  }

  return context;
};
