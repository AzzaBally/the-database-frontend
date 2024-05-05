import { Navigate } from "react-router-dom";

interface AuthenticationCheckProps {
  isAuthenticated: boolean;
  isLoginPage: boolean | undefined;
  children: React.ReactNode;
}

export default function AuthenticationCheck({
  isAuthenticated,
  isLoginPage,
  children,
}: AuthenticationCheckProps) {
  if (!isAuthenticated && !isLoginPage) {
    return <Navigate to="/login" />;
  } else {
    return <>{children}</>;
  }
}
