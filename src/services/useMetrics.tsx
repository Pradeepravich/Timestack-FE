import { useCallback } from "react";
import axiosInstance from "../utils/axios";
import useAsync from "../hooks/useAsync";
import { AxiosResponse } from "axios";
import { API_ENDPOINTS } from "../utils/constants";
export interface MetricsRequestParams {
  iteration_id: string | null;
  area_path_name: string | null;
}
export interface ACTUAL_VS_ESTIMATED_BY_ACTIVITY {
  activity: string;
  actual_hours: number;
  estimated_hours: number;
}
export interface TASKS_BY_CATEGORY {
  total_tasks: number;
  category_counts: {
    additionalProp1: number;
    additionalProp2: number;
    additionalProp3: number;
  };
}
export interface GetMetricsResponseObject {
  actual_vs_estimated: number;
  actual_vs_capacity: number;
  team_size: number;
  total_capacity_hours: number;
  estimated_hours: number;
  actual_hours: number;
  tasks_without_estimates: number;
  percentage_tasks_without_estimates: number;
  actual_vs_estimated_by_activity: ACTUAL_VS_ESTIMATED_BY_ACTIVITY[];
  tasks_by_category: TASKS_BY_CATEGORY;
}

export interface GetMetricsResponse {
  data: GetMetricsResponseObject;
  success: boolean;
  message: string;
}

export const useMetrics = (params: MetricsRequestParams) => {
  const call = useCallback(async () => {
    const response = await axiosInstance.get<
      GetMetricsResponse,
      AxiosResponse<GetMetricsResponse>
    >(API_ENDPOINTS.dashboard.metrics, {
      params: {
        iteration_id: params.iteration_id,
        area_path_name: params.area_path_name,
      },
    });
    return response.data.data;
  }, [params.area_path_name, params.iteration_id]);
  const { value, isLoading, execute } = useAsync(call, true);
  return { isLoading, value, fetchMetrics: execute };
};
