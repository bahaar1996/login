import { mockUserLogin } from "@/mock/mockData";
import React, { createContext, useContext, useState } from "react";
import type {
  ItemVerification,
  TLoginData,
  TVerificationCode,
} from "./context.types";

export enum AuthSteps {
  identity = "identity",
  otp = "otp",
  authenticated = "authenticated",
}

type TStep = string;
type TAuthContext = {
  stepState: TStep;
  handleIdentity: (data: ItemVerification) => boolean;
  handleOTP: (data: TVerificationCode, loginData: TLoginData) => boolean;
  setStepState: (step: TStep) => void;
};

const AuthContext = createContext<TAuthContext>({
  stepState: AuthSteps.identity,
  handleIdentity: () => false,
  handleOTP: () => false,
  setStepState: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [stepState, setStepState] = useState<TStep>(AuthSteps.identity);

  function handleIdentity(data: ItemVerification): boolean {
    const user = mockUserLogin.find(
      (item) =>
        item.nationalCode === data.nationalCode && item.phone === data.phone
    );

    if (!data.nationalCode || !data.phone) return false;
    else if (user) {
      setStepState(AuthSteps.otp);
      return true;
    } else return false;
  }

  function handleOTP(data: TVerificationCode, loginData: TLoginData) {
    console.log("logindata", loginData);
    const user = mockUserLogin.find(
      (user) =>
        user.verificationCode === data.verificationCode &&
        user.nationalCode === loginData.nationalCode
    );
    if (!data.verificationCode) return false;
    else if (user) {
      setStepState(AuthSteps.authenticated);
      return true;
    } else return false;
  }

  return (
    <AuthContext.Provider
      value={{ stepState, setStepState, handleIdentity, handleOTP }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
