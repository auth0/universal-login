import React, { useEffect, Suspense } from "react";
import { getCurrentScreen } from "@auth0/auth0-acul-js";

const Login = React.lazy(() => import("./screens/login"));
const LoginId = React.lazy(() => import("./screens/login-id"));
const LoginPassword = React.lazy(() => import("./screens/login-password"));

const App: React.FC = () => {
  const [screen, setScreen] = React.useState("login");
  useEffect(() => {
    const current = getCurrentScreen();
    setScreen(current!);
  }, []);

  const renderScreen = () => {
    switch (screen) {
      case "login":
        return <Login />;
      case "login-id":
        return <LoginId />;
      case "login-password":
        return <LoginPassword />;
      default:
        return <>No screen rendered</>;
    }
  };

  return <Suspense fallback={<div>Loading...</div>}>{renderScreen()}</Suspense>;
};

export default App;
