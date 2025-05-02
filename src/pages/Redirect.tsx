import { Typography } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { APP_PATHS } from "../utils/constants";
import { useLoginApi } from "../services/useLoginApi";
import { login } from "../redux/authSlice";

const AuthRedirect = () => {
  const [params] = useSearchParams();
  const code = useMemo(() => params.get("code") as string, [params]);

  const { loginUser } = useLoginApi(code);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (code) {
      loginUser()
        .then((data) => {
          console.log(data);
          dispatch(
            login({
              token: data.access_token,
              refreshToken: data.refresh_token,
              user: data.user,
            })
          );
        })
        .catch(() => {
          navigate(APP_PATHS.login);
        });
    }
  }, [code, dispatch, loginUser, navigate]);

  return (
    <Typography variant="h3" sx={{ p: 5, textAlign: "center" }}>
      Hang on while we Log you in...
    </Typography>
  );
};

export default AuthRedirect;
