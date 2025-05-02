import { useCallback } from "react";
import axiosInstance from "../utils/axios";
import { AxiosResponse } from "axios";
import { API_ENDPOINTS } from "../utils/constants";
import useAsync from "../hooks/useAsync";

interface AreaPathData {
  area_path_id: string;
  area_path_name: string;
}

export interface GetAreaPathsResponse {
  success: boolean;
  message: string;
  data: AreaPathData[];
}

export const useAreaPathsApi = () => {
  const call = useCallback(async () => {
    const response = await axiosInstance.get<
      GetAreaPathsResponse,
      AxiosResponse<GetAreaPathsResponse>
    >(API_ENDPOINTS.dashboard.areaPaths);
    return response.data;
  }, []);

  const { value, isLoading, execute } = useAsync(call, false);

  return { isLoading, value, fetchAreaPaths: execute };
};
