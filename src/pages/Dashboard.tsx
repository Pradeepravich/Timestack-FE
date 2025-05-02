import { Button, Stack } from "@mui/material";
import LayoutComponent from "../components/LayoutComponent";
import GridTable, { Column } from "../components/design-system/GridTable";
import { useCallback, useMemo, useState } from "react";
import Card from "../components/design-system/Card";
import Aggregations from "../sections/dashboard/Aggregations";
import HoursByActivity from "../sections/dashboard/HoursByActivity";
import TasksByCategory from "../sections/dashboard/TasksByCategory";
import { useNavigate } from "react-router-dom";
import { APP_PATHS } from "../utils/constants";
import {
  MetricsRequestParams,
  TASKS_BY_CATEGORY,
  useMetrics,
} from "../services/useMetrics";
import {
  TaskAllocation,
  useEmployeeMetrics,
} from "../services/useEmployeeMetrics";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Dashboard = () => {
  const [pageSize, setPageSize] = useState("10");
  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState<keyof TaskAllocation>("assigned_to");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const navigate = useNavigate();
  const period = useSelector((state: RootState) => state.auth.selectedPeriod);
  const areaPath = useSelector(
    (state: RootState) => state.auth.selectedAreapath
  );

  const columns: Column<TaskAllocation>[] = [
    {
      field: "assigned_to",
      title: "Employee",
      sortable: true,
      truncate: true,
    },
    {
      field: "actual_vs_estimated",
      title: "Actual vs Estimated",
      sortable: true,
    },
    {
      field: "actual_vs_capacity",
      title: "Actual vs Capacity",
      sortable: true,
    },
    {
      field: "capacity_hours",
      title: "Capacity in hours",
      sortable: true,
    },
    {
      field: "estimated_hours",
      title: "Estimated in hours",
      sortable: true,
    },
    {
      field: "actual_hours",
      title: "Actual in hours",
      sortable: true,
    },
    {
      field: "total_tasks",
      title: "Total Tasks Assigned",
      sortable: true,
    },
    {
      field: "avg_hours_per_task",
      title: "Average Hours per Task",
      sortable: true,
    },
    {
      field: "actual_hours",
      title: "",
      sortable: true,
      component: (item) => (
        <Button
          color="primary"
          onClick={() => navigate(APP_PATHS.employeeDashboard(item.id))}
        >
          VIEW
        </Button>
      ),
    },
  ];

  const handleSort = useCallback(
    (column: keyof TaskAllocation) => {
      if (orderBy === column) {
        setOrder(order === "asc" ? "desc" : "asc");
      } else {
        setOrderBy(column);
        setOrder("asc");
      }
    },
    [order, orderBy]
  );

  const metricParams: MetricsRequestParams = useMemo(
    () => ({
      iteration_id: period,
      area_path_name: areaPath,
    }),
    [areaPath, period]
  );

  const { value: metrics } = useMetrics(metricParams);

  const { value: employeeMetrics } = useEmployeeMetrics({
    iteration_id: period,
    area_path_name: areaPath,
    page: 1,
    page_size: 10,
  });

  const statusData = useMemo(() => {
    if (!metrics) return [];
    return [
      {
        title1: "ACTUAL VS ESTIMATED",
        value1: metrics?.actual_vs_estimated,
        title2: "ESTIMATED HOURS",
        value2: metrics?.estimated_hours,
        measure1: "%",
        measure2: "hours",
      },
      {
        title1: "ACTUAL VS CAPACITY",
        value1: metrics?.actual_vs_capacity,
        title2: "ACTUAL HOURS",
        value2: metrics?.actual_hours,
        measure1: "%",
        measure2: "hours",
      },
      {
        title1: "TEAM SIZE",
        value1: metrics?.team_size,
        title2: "TEAM CAPACITY",
        value2: metrics?.total_capacity_hours,
        measure1: "",
        measure2: "hours",
      },
      {
        title1: "TASKS WITHOUT ESTIMATES",
        value1: metrics?.tasks_without_estimates,
        title2: "% OF TASKS NOT ESTIMATED",
        value2: metrics?.percentage_tasks_without_estimates,
        measure1: "",
        measure2: "%",
      },
    ];
  }, [metrics]);

  return (
    <LayoutComponent>
      <Stack gap={2.5}>
        <Stack direction={{ md: "row", sm: "column" }} gap={2.5}>
          <Aggregations data={statusData} />
          <HoursByActivity data={metrics?.actual_vs_estimated_by_activity} />
          <TasksByCategory
            data={metrics?.tasks_by_category as TASKS_BY_CATEGORY}
          />
        </Stack>
        <Card>
          <GridTable
            page={page}
            pageSize={pageSize}
            setPage={setPage}
            setPageSize={setPageSize}
            columns={columns}
            data={employeeMetrics?.results || []}
            count={employeeMetrics?.count as number}
            orderBy={orderBy}
            setOrderBy={setOrderBy}
            order={order}
            setOrder={setOrder}
            handleSort={handleSort}
          />
        </Card>
      </Stack>
    </LayoutComponent>
  );
};

export default Dashboard;
