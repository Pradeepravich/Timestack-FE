import { DefaultAPIResponse } from "./axios";

export type SetState<M> = React.Dispatch<React.SetStateAction<M>>;

export interface UserMetricsRequestParams {
  iteration_id: string;
  area_path_name: string;
}

interface User {
  oid: string;
  name: string;
  email: string;
  is_admin: boolean;
}

export interface GetUserMetricsResponse extends DefaultAPIResponse {
  data: {
    user: User;
    actual_vs_estimated: number;
    actual_vs_capacity: number;
    estimated_hours: number;
    actual_hours: number;
    total_tasks: number;
    tasks_without_estimates: number;
    percentage_tasks_without_estimates: number;
    capacity_hours: number;
  };
}

export interface UserTasksRequestParams {
  iteration_id: string;
  area_path_name: string;
  page: number;
  page_size: number;
}

interface RESULTS {
  id: number;
  task: string;
  state: string;
  actual_vs_estimated: number;
  estimated_hours: number;
  actual_hours: number;
  url: string;
}

export interface GetUserTasksResponse extends DefaultAPIResponse {
  data: {
    count: number;
    next: string;
    previous: string;
    results: RESULTS[];
  };
}
