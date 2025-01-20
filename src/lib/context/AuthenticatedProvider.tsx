import { useEffect, useState } from "react";
import { UserModel } from "../types/UserModel";
import { decodeToken } from "../jwt/decodeToken";
import SessionStorage from "../storage/sessionStorage";
import { AuthContext } from "./AuthenticatedContext";
import { LoginResData } from "../service/types";

export const AuthenticatedProvider = (props: { children: React.ReactNode }) => {
  // Hooks
  const [user, setUser] = useState<UserModel>();

  // Functions
  const decodeTokenAndSetUser = (token: string) => {
    const decodedToken = decodeToken(token) as UserModel;
    setUser(decodedToken);
  };

  const onAppOpen = async () => {
    const session = SessionStorage.getSession();
    const token = session?.token;
    decodeTokenAndSetUser(token as string);
  };

  useEffect(() => {
    onAppOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onLogin = (res: LoginResData) => {
    SessionStorage.setSession(res);
    decodeTokenAndSetUser(res.token);
  };

  const onLogout = () => {
    SessionStorage.removeSession();
    setUser(undefined);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        onLogin,
        onLogout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
