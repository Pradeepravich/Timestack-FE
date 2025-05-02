import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect } from "react";
import { OAUTH_CONFIG } from "../utils/constants";
import { useSearchParams } from "react-router-dom";

const Login = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [params] = useSearchParams();
  const organization = params.get("organization");
  const projectId = params.get("projectId");
  const project = params.get("project");

  useEffect(() => {
    if (organization && projectId && project) {
      if (isLoggedIn) {
        localStorage.setItem("organization", organization);
        localStorage.setItem("projectId", projectId);
        localStorage.setItem("project", project);
      } else if (!isLoggedIn) {
        localStorage.setItem("organization", organization);
        localStorage.setItem("projectId", projectId);
        localStorage.setItem("project", project);
        window.location.href = OAUTH_CONFIG.login;
      }
    }
  }, [isLoggedIn, organization, project, projectId]);

  return (
    <Typography variant="h3" sx={{ p: 5, textAlign: "center" }}>
      {!organization
        ? "Please provide Organization in Url Params"
        : !projectId
        ? "Please provide Project ID in Url Params"
        : !project
        ? "Please provide Project in Url Params"
        : "Please wait while we redirect you..."}
    </Typography>
  );
};

export default Login;
