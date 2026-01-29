import type React from "react";
import { createContext, useContext, useState } from "react";
import type { ItemVerification, TLoginData } from "./context.types";

type TAppContext = {
  loginData: ItemVerification;
  setIdentity: (data: ItemVerification) => void;
  setOTP: (code: string) => void;
};

const AppStateContext = createContext<TAppContext>({
  loginData: { phone: "", nationalCode: "" },
  setIdentity: () => {},
  setOTP: () => {},
});

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [loginData, setLoginData] = useState<TLoginData>({
    phone: "",
    nationalCode: "",
  });

  function setIdentity(item: ItemVerification) {
    setLoginData((prev) => ({ ...prev, ...item }));
  }

  console.log("loginData cnx", loginData);

  function setOTP(code: string) {
    setLoginData((prev) => ({ ...prev, verificationCode: code }));
  }

  return (
    <AppStateContext.Provider
      value={{
        loginData,
        setIdentity,
        setOTP,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export default AppProvider;

export const useContextApp = () => useContext(AppStateContext);
