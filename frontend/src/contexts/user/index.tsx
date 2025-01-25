"use client";

import {
  createContext,
  ReactNode,
  useState,
  FC,
  Dispatch,
  SetStateAction,
  use,
} from "react";

interface UserContextType {
  user: string;
  setUser: Dispatch<SetStateAction<string>>;
}

interface Props {
  children: ReactNode;
}

const UserContext = createContext<UserContextType | null>(null);

const UserProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState("mizan");

  return <UserContext value={{ user, setUser }}>{children}</UserContext>;
};

const useUserContext = (): UserContextType => {
  const context = use(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  } else {
    return context;
  }
};

export { UserProvider, useUserContext };
