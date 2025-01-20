import { createContext, useContext } from "react";
import { UserModel } from "../types/UserModel";
import { LoginResData } from "../service/types";

export type AuthContextType = {
  user?: UserModel;
  onLogin: (res: LoginResData) => void;
  onLogout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: undefined,
  onLogin: function (): void {
    // placeholder
  },
  onLogout: function (): void {
    // placeholder
  },
});

export const useAuth = () => {
  try {
    const context = useContext(AuthContext);
    return context;
  } catch (err) {
    console.log("[ERROR] Auth Context initialization fail : ", err);
    throw new Error(JSON.stringify(err));
  }
};
