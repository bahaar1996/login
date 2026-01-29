import { AuthSteps, useAuth } from "@/context/AuthContext";
import Container from "@/UIComponents/container/Container";
import Tabs from "@/UIComponents/tabs/Tabs";
import { Navigate } from "react-router-dom";
const Dashboard = () => {
  const { stepState } = useAuth();
  if (stepState !== AuthSteps.authenticated) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="bg-white h-screen w-screen flex justify-center">
      <Container>
        <Tabs />
      </Container>
    </div>
  );
};

export default Dashboard;
