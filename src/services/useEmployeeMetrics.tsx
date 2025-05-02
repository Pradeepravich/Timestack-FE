import { useCallback } from "react";
import axiosInstance from "../utils/axios";
import useAsync from "../hooks/useAsync";
import { AxiosResponse } from "axios";
import { API_ENDPOINTS } from "../utils/constants";
interface EmployeeMetricsRequestParams {
  iteration_id: string | null;
  area_path_name: string | null;
  page: number;
  page_size: number;
}

export interface TaskAllocation {
  assigned_to: string;
  estimated_hours: number;
  actual_hours: number;
  total_tasks: number;
  capacity_hours: number;
  actual_vs_estimated: number;
  actual_vs_capacity: number;
  avg_hours_per_task: number;
  id: number;
}

export interface TaskAllocationResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: TaskAllocation[];
}

export const useEmployeeMetrics = (params: EmployeeMetricsRequestParams) => {
  const call = useCallback(async () => {
    const response = await axiosInstance.get<
      TaskAllocationResponse,
      AxiosResponse<TaskAllocationResponse>
    >(API_ENDPOINTS.dashboard.employee_metrics, {
      params: {
        iteration_id: params.iteration_id,
        area_path_name: params.area_path_name,
        page: params.page,
        page_size: params.page_size,
      },
    });
    return response.data;
  }, [
    params.area_path_name,
    params.iteration_id,
    params.page,
    params.page_size,
  ]);
  const { value, isLoading, execute } = useAsync(call, true);
  return { isLoading, value, getEmployeeMetrics: execute };
};
