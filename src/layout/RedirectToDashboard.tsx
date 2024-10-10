import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { authStore, authType } from "../store/GlobalStore";
import { dashboardRoute } from "../utils/constants";

type PropsType = {
  children: ReactNode;
};

const RedirectToDashboard = (props: PropsType) => {
  const isAllowed = authStore(
    (state: unknown) => (state as authType).isAllowed
  );

  return isAllowed ? <Navigate to={dashboardRoute} /> : props.children;
};

export default RedirectToDashboard;
