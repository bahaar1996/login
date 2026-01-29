import { useAuth } from "@/context/AuthContext";
import LoginStepOne from "../../UIComponents/loginStepOne/LoginStepOne";
import LoginStepTwo from "../../UIComponents/loginStepTwo/LoginStepTwo";

const Login = () => {
  const { stepState } = useAuth();

  return (
    <div className="flex justify-center items-center h-screen bg-[#a1c6c4]">
      {stepState === "identity" && <LoginStepOne />}
      {stepState === "otp" && <LoginStepTwo />}
    </div>
  );
};

export default Login;
