import { useCallback } from "react";
import axiosInstance from "../utils/axios";
import useAsync from "../hooks/useAsync";
import { AxiosResponse } from "axios";
import { API_ENDPOINTS } from "../utils/constants";
import {
  UserMetricsRequestParams,
  GetUserMetricsResponse,
} from "../utils/types";

export const useUserMetrics = (params: UserMetricsRequestParams) => {
  const call = useCallback(async () => {
    const response = await axiosInstance.get<
      GetUserMetricsResponse,
      AxiosResponse<GetUserMetricsResponse>
    >(API_ENDPOINTS.dashboard.user_metrics, {
      params: {
        iteration_id: params.iteration_id,
        area_path_name: params.area_path_name,
      },
    });
    return response.data.data;
  }, [params.area_path_name, params.iteration_id]);

  const { value, isLoading, execute } = useAsync(call, true);

  return { isLoading, value, execute };
};
