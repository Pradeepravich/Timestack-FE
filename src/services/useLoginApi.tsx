import { useCallback } from "react";
import axiosInstance, { DefaultAPIResponse } from "../utils/axios";
import useAsync from "../hooks/useAsync";
import { API_ENDPOINTS, MS_AUTH_REDIRECT_URI } from "../utils/constants";
import { AxiosResponse } from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface LoginRequest {
  code: string;
  redirect_uri: string;
  organization: string | null;
  project_id: string | null;
  project_name: string | null;
}

export interface LoginResponseUser {
  oid: number;
  name: string;
  email: string;
  is_admin: boolean;
}

interface LoginResponse extends DefaultAPIResponse {
  success: boolean;
  message: string;
  access_token: string;
  refresh_token: string;
  user: LoginResponseUser;
}

export const useLoginApi = (code: string) => {
  const organization = useSelector(
    (state: RootState) => state.auth.organization
  );
  const project_id = useSelector((state: RootState) => state.auth.projectId);
  const project_name = useSelector((state: RootState) => state.auth.project);
  const call = useCallback(async () => {
    const response = await axiosInstance.post<
      LoginResponse,
      AxiosResponse<LoginResponse>,
      LoginRequest
    >(API_ENDPOINTS.auth.login, {
      code,
      redirect_uri: MS_AUTH_REDIRECT_URI,
      organization,
      project_id,
      project_name,
    });
    return response.data;
  }, [code, organization, project_id, project_name]);

  const { value, isLoading, execute } = useAsync(call, false);

  return { isLoading, value, loginUser: execute };
};
