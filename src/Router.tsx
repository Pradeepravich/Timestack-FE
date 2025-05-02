import { useRoutes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import PageNotFound from "./pages/PageNotFound";
import { APP_PATHS } from "./utils/constants";
import useScrollToTop from "./hooks/useScrollToTop";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import Login from "./pages/Login";
import Redirect from "./pages/Redirect";
import GuestGuard from "./pages/guards/GuestGuard";
import AuthGuard from "./pages/guards/AuthGuard";

const Router = () => {
  useScrollToTop();

  const routes = useRoutes([
    {
      path: APP_PATHS.login,
      element: <GuestGuard />,
      children: [{ path: "", element: <Login /> }],
    },
    {
      path: APP_PATHS.redirect,
      element: <GuestGuard />,
      children: [{ path: "", element: <Redirect /> }],
    },
    {
      path: APP_PATHS.dashboard,
      element: <AuthGuard />,
      children: [{ path: "", element: <Dashboard /> }],
    },
    {
      path: APP_PATHS.employeeDashboard(":userId"),
      element: <AuthGuard />,
      children: [{ path: "", element: <EmployeeDashboard /> }],
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);

  return routes;
};
export default Router;
