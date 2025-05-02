import dayjs from "dayjs";

export const APP_PATHS = {
  dashboard: "/dashboard",
  employeeDashboard: (id: string | number) => `/dashboard/${id}`,
  login: "/",
  redirect: "/redirect",
};

export const TASKS_BY_CATEGORY = [
  { key: "closed", value: "Closed", count: 12, color: "#0078D4" },
  { key: "uat_complete", value: "UAT Complete", count: 2, color: "#1F5736" },
  { key: "uat", value: "UAT", count: 2, color: "#5A4B9B" },
  { key: "qa_complete", value: "QA Complete", count: 6, color: "#3B3B3B" },
  { key: "qa", value: "QA", count: 2, color: "#DB3E41" },
  { key: "dev_complete", value: "Dev Complete", count: 12, color: "#DA6B31" },
  { key: "dev", value: "Dev", count: 6, color: "#F4B54B" },
  { key: "approved", value: "Approved", count: 2, color: "#815A93" },
  { key: "design", value: "Design", count: 2, color: "#8AB651" },
  { key: "new", value: "New", count: 2, color: "#DE4295" },
  { key: "Lorem", value: "Lorem", count: 6, color: "#64A14C" },
  { key: "Lorem", value: "Lorem", count: 2, color: "#5B5B5B" },
  { key: "Lorem", value: "Lorem", count: 2, color: "#E367AE" },
  { key: "Lorem", value: "Lorem", count: 2, color: "#9F2321" },
  { key: "Lorem", value: "Lorem", count: 2, color: "#99C9EE" },
] as const;

export const API_ENDPOINTS = {
  auth: {
    login: "/auth/login/",
    register: "/auth/register/",
    refresh: "/auth/refresh/",
  },
  dashboard: {
    employee_metrics: "/dashboard/employee-metrics",
    metrics: "/dashboard/metrics",
    sprints: "/dashboard/sprints",
    areaPaths: "/dashboard/area-paths",
    user_metrics: "/dashboard/user-metrics",
    user_tasks: "/dashboard/user-tasks",
  },
};
export const API_URL = import.meta.env.VITE_API_URL;

const MS_AUTH_URL =
  "https://login.microsoftonline.com/ce31b577-8093-4aa6-87ba-60d4899d56ff/oauth2/v2.0/authorize";
const MS_AUTH_CLIENT_ID = import.meta.env.VITE_MS_AUTH_CLIENT_ID;
export const MS_AUTH_REDIRECT_URI = import.meta.env.VITE_MS_AUTH_REDIRECT_URI;
const MS_AUTH_LOGIN_SCOPE =
  "openid profile email offline_access 499b84ac-1321-427f-aa17-267ca6975798/user_impersonation";

export const OAUTH_CONFIG = {
  login: `${MS_AUTH_URL}?client_id=${MS_AUTH_CLIENT_ID}&response_type=code&redirect_uri=${MS_AUTH_REDIRECT_URI}&response_mode=query&scope=${MS_AUTH_LOGIN_SCOPE}&state=login`,
};

export const formatSprintDate = (date: string) => {
  return dayjs(date).format("DD-MMM YY").toUpperCase();
};
