import { useCallback, useMemo, useState } from "react";
import {
  Typography,
  Avatar,
  Box,
  Stack,
  Button,
  Link,
  LinearProgress,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import LayoutComponent from "../components/LayoutComponent";
import Card from "../components/design-system/Card";
import Aggregations from "../sections/dashboard/Aggregations";
import GridTable, { Column } from "../components/design-system/GridTable";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useUserMetrics } from "../services/useUserMetrics";
import { useUserTasks } from "../services/useUserTasks";

interface Task {
  id: number;
  task: string;
  state: string;
  actual_vs_estimated: string;
  estimated_hours: number;
  actual_hours: number;
  highlight?: boolean;
}

const columns: Column<Task>[] = [
  {
    field: "id",
    title: "ID",
    sortable: true,
    component: (r) => <Link sx={{ textDecoration: "none" }}> {r.id} </Link>,
    textAlign: "left",
  },
  {
    field: "task",
    title: "TASK",
    sortable: true,
    textAlign: "left",
  },
  {
    field: "state",
    title: "STATE",
    sortable: true,
  },
  {
    field: "actual_vs_estimated",
    title: "ACTUAL VS ESTIMATED",
    sortable: true,
  },
  {
    field: "estimated_hours",
    title: "ESTIMATED (HOURS)",
    sortable: true,
  },
  {
    field: "actual_hours",
    title: "ACTUAL (HOURS)",
    sortable: true,
  },
];

const EmployeeDashboard = () => {
  const navigate = useNavigate();

  const { selectedPeriod, selectedAreapath } = useSelector(
    (state: RootState) => state.auth
  );

  const { value: userMetrics, isLoading: isMetricsLoading } = useUserMetrics({
    iteration_id: selectedPeriod || "",
    area_path_name: selectedAreapath || "",
  });

  const statusData = useMemo(() => {
    if (!userMetrics) return [];
    return [
      {
        title1: "ACTUAL VS ESTIMATED",
        value1: userMetrics?.actual_vs_estimated,
        title2: "ESTIMATED HOURS",
        value2: userMetrics?.estimated_hours,
        measure1: "%",
        measure2: "hours",
      },
      {
        title1: "ACTUAL VS CAPACITY",
        value1: userMetrics?.actual_vs_capacity,
        title2: "ACTUAL HOURS",
        value2: userMetrics?.actual_hours,
        measure1: "%",
        measure2: "hours",
      },
      {
        title1: "TOTAL TASKS",
        value1: userMetrics?.total_tasks,
        title2: "CAPACITY",
        value2: userMetrics?.capacity_hours,
        measure1: "",
        measure2: "hours",
      },
      {
        title1: "TASKS WITHOUT ESTIMATES",
        value1: userMetrics?.tasks_without_estimates,
        title2: "% OF TASKS NOT ESTIMATED",
        value2: userMetrics?.percentage_tasks_without_estimates,
        measure1: "",
        measure2: "%",
      },
    ];
  }, [userMetrics]);

  const [pageSize, setPageSize] = useState("10");
  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState<keyof Task>("id");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const { value: userTasks, isLoading: isUsersLoading } = useUserTasks({
    iteration_id: selectedPeriod || "",
    area_path_name: selectedAreapath || "",
    page,
    page_size: +pageSize,
  });
  console.log("raj", userTasks);
  const handleSort = useCallback(
    (column: keyof Task) => {
      if (orderBy === column) {
        setOrder(order === "asc" ? "desc" : "asc");
      } else {
        setOrderBy(column);
        setOrder("asc");
      }
    },
    [order, orderBy]
  );

  const nameShortForm = userMetrics?.user.name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("");

  return (
    <LayoutComponent>
      <Button
        startIcon={<ArrowBack style={{ fontSize: 14 }} />}
        onClick={() => navigate(-1)}
        sx={{ mb: 2, backgroundColor: "grey.200", color: "common.black" }}
      >
        BACK
      </Button>

      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems="flex-start"
        gap={3}
      >
        <Stack
          spacing={3}
          sx={{
            width: { sm: undefined, md: "520px" },
            maxWidth: { sm: "520px", md: undefined },
          }}
        >
          {isMetricsLoading ? (
            <LinearProgress />
          ) : (
            <>
              <Card>
                <Stack direction="row" gap={2} alignItems="center">
                  <Avatar
                    alt="J"
                    src="/path/to/profile-picture.jpg"
                    color="black"
                    sx={{
                      width: 64,
                      height: 64,
                      backgroundColor: "grey.200",
                      color: "common.black",
                    }}
                  >
                    {nameShortForm}
                  </Avatar>
                  <Box>
                    <Typography variant="h3">
                      {userMetrics?.user.name}
                    </Typography>
                    <Typography variant="subtitle1">
                      {userMetrics?.user.email}
                    </Typography>
                  </Box>
                </Stack>
              </Card>
              <Aggregations width={"100%"} data={statusData} />
            </>
          )}
        </Stack>
        <Card
          sx={{
            width: { md: "calc(100% - 520px)", sm: undefined },
            border: isUsersLoading ? "none" : "",
          }}
        >
          {isUsersLoading ? (
            <LinearProgress />
          ) : (
            <GridTable
              page={page}
              pageSize={pageSize}
              setPage={setPage}
              setPageSize={setPageSize}
              columns={columns}
              data={userTasks?.results || ([] as any)}
              count={userTasks?.count as number}
              orderBy={orderBy}
              setOrderBy={setOrderBy}
              order={order}
              setOrder={setOrder}
              handleSort={handleSort}
            />
          )}
        </Card>
      </Stack>
    </LayoutComponent>
  );
};

export default EmployeeDashboard;
