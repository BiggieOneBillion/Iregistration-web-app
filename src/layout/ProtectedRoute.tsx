import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { authStore, authType } from "../store/GlobalStore";

type PropsType = {
  children: ReactNode;
};

const ProtectedRoute = (props: PropsType) => {
  const isAllowed = authStore(
    (state: unknown) => (state as authType).isAllowed
  );

  const allow = true;

  return isAllowed ? props.children : <Navigate to={"/"} />;
};

export default ProtectedRoute;
