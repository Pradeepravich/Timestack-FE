import { useCallback } from "react";
import axiosInstance from "../utils/axios";
import useAsync from "../hooks/useAsync";
import { AxiosResponse } from "axios";
import { API_ENDPOINTS } from "../utils/constants";
import { UserTasksRequestParams, GetUserTasksResponse } from "../utils/types";

export const useUserTasks = (params: UserTasksRequestParams) => {
  const call = useCallback(async () => {
    const response = await axiosInstance.get<
      GetUserTasksResponse,
      AxiosResponse<GetUserTasksResponse>
    >(API_ENDPOINTS.dashboard.user_tasks, {
      params: {
        iteration_id: params.iteration_id,
        area_path_name: params.area_path_name,
        page: params.page,
        page_size: params.page_size,
      },
    });
    return response.data.data;
  }, [
    params.area_path_name,
    params.iteration_id,
    params.page,
    params.page_size,
  ]);

  const { value, isLoading, execute } = useAsync(call, true);

  return { isLoading, value, execute };
};
