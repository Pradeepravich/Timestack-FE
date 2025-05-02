import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { APP_PATHS } from "../../utils/constants";

const AuthGuard = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(APP_PATHS.login);
    } else {
      if (!user?.is_admin) {
        navigate(APP_PATHS.employeeDashboard(user?.id || 0));
      }
    }
  }, [isLoggedIn, navigate, user]);
  return <Outlet />;
};

export default AuthGuard;
