import { useCallback } from "react";
import axiosInstance from "../utils/axios";
import { AxiosResponse } from "axios";
import { API_ENDPOINTS } from "../utils/constants";
import useAsync from "../hooks/useAsync";

interface SprintData {
  sprint_id: string;
  sprint_name: string;
  start_date: string;
  end_date: string;
}

export interface GetSprintsResponse {
  success: boolean;
  message: string;
  data: SprintData[];
}

export const useSprintsApi = () => {
  const call = useCallback(async () => {
    const response = await axiosInstance.get<
      GetSprintsResponse,
      AxiosResponse<GetSprintsResponse>
    >(API_ENDPOINTS.dashboard.sprints);
    return response.data;
  }, []);

  const { value, isLoading, execute } = useAsync(call, false);

  return { isLoading, value, fetchSprints: execute };
};
