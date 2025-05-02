import {
  Box,
  Button,
  ButtonBase,
  Stack,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import {
  FC,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from "react";
import Dropdown from "./design-system/Dropdown";
import IconImage from "./design-system/IconImage";
import Download from "../assets/export.svg";
import ViewMoreDialog from "./design-system/Dialog";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import React from "react";
import { useSprintsApi } from "../services/useSprintsApi";
import CustomDatePicker from "./design-system/CustomDatepicker";
import { useAreaPathsApi } from "../services/useAreaPathsApi";
import { formatSprintDate } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setSelectedAreapath, setSelectedPeriod } from "../redux/authSlice";

dayjs.extend(isBetween);

export const IconButtonBase = styled(ButtonBase)(({ theme }) => ({
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
  paddingTop: theme.spacing(0.2),
  paddingBottom: theme.spacing(0.2),
  borderRadius: theme.shape.borderRadius,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const Header = styled("header")(({ theme }) => ({
  backgroundColor: "#E6F3FE",
  color: theme.palette.common.white,
  display: "flex",
  alignItems: "center",
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  paddingBottom: theme.spacing(2),
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: theme.zIndex.appBar,
  height: "90px",
}));

interface Props extends PropsWithChildren {
  pb?: boolean;
}

const LayoutComponent: FC<Props> = ({ children }) => {
  const dispatch = useDispatch();
  const selectedAreapath = useSelector((state: RootState) => state.auth.selectedAreapath);
  const selectedPeriod = useSelector((state: RootState) => state.auth.selectedPeriod);
  // const [selectedAreapath, setSelectedAreapath] = useState("");
  // const [selectedPeriod, setSelectedPeriod] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [startDate, setStartDate] = React.useState<Dayjs | null>(
    dayjs("2024-JAN-11")
  );
  const [endDate, setEndDate] = React.useState<Dayjs | null>(
    dayjs("2024-JAN-17")
  );

  const theme = useTheme();

  const { value: sprints, fetchSprints } = useSprintsApi();
  const {
    isLoading: isLoadingAreaPaths,
    value: areaPaths,
    fetchAreaPaths,
  } = useAreaPathsApi();

  useEffect(() => {
    fetchSprints();
    fetchAreaPaths();
  }, [fetchSprints, fetchAreaPaths]);

  useEffect(() => {
    if (areaPaths?.success && areaPaths.data && areaPaths.data.length > 0) {
      // setSelectedAreapath(areaPaths.data[0].area_path_id);
      dispatch(setSelectedAreapath(areaPaths.data[0].area_path_name));
    }
  }, [areaPaths, dispatch]);

  const sortedSprints = useMemo(() => {
    if (!sprints?.success || !sprints.data || sprints.data.length === 0) {
      return [];
    }

    return [...sprints.data].sort(
      (a, b) =>
        new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
    );
  }, [sprints]);

  useEffect(() => {
    if (sortedSprints.length > 0) {
      const currentDate = dayjs();

      const currentMonthSprints = sortedSprints.filter((sprint) => {
        const sprintStart = dayjs(sprint.start_date);
        return (
          sprintStart.month() === currentDate.month() &&
          sprintStart.year() === currentDate.year()
        );
      });

      if (currentMonthSprints.length > 0) {
        const closestSprint = currentMonthSprints.reduce((closest, sprint) => {
          const sprintStart = dayjs(sprint.start_date);
          const sprintEnd = dayjs(sprint.end_date);
          const daysFromCurrentToSprintStart = Math.abs(
            currentDate.diff(sprintStart)
          );
          const daysFromCurrentToClosestSprint = Math.abs(
            currentDate.diff(dayjs(closest.start_date))
          );

          if (
            currentDate.isAfter(sprintStart) &&
            currentDate.isBefore(sprintEnd)
          ) {
            return sprint;
          }

          return daysFromCurrentToSprintStart < daysFromCurrentToClosestSprint
            ? sprint
            : closest;
        }, currentMonthSprints[0]);

        // setSelectedPeriod(closestSprint.sprint_id);
        dispatch(setSelectedPeriod(closestSprint.sprint_id));
        
      } else {
        // setSelectedPeriod(sortedSprints[0].sprint_id);
        dispatch(setSelectedPeriod(sortedSprints[0].sprint_id));
      }
    }
  }, [dispatch, sortedSprints]);

  const filterSprintOptions = useMemo(() => {
    if (sortedSprints.length === 0) return [];

    const sprintOptions = sortedSprints.map((sprint) => ({
      value: sprint.sprint_id,
      label: `${sprint.sprint_name} (${formatSprintDate(
        sprint.start_date
      )} TO ${formatSprintDate(sprint.end_date)})`,
    }));

    sprintOptions.push({ value: "custom", label: "CUSTOM" });
    return sprintOptions;
  }, [sortedSprints]);

  const filterAreaPathOptions = useMemo(() => {
    if (isLoadingAreaPaths || !areaPaths) return [];

    if (!areaPaths.success || !areaPaths.data) return [];

    return [
      ...areaPaths.data.map((areaPath) => ({
        value: areaPath.area_path_name,
        label: areaPath.area_path_name,
      })),
    ];
  }, [isLoadingAreaPaths, areaPaths]);

  const handleAreapathChange = useCallback(
    (value: string) => {
      // setSelectedAreapath(value);
      dispatch(setSelectedAreapath(value));
    },
    [dispatch]
  );
  const handlePeriodChange = useCallback(
    (value: string) => {
      // setSelectedPeriod(value);
      dispatch(setSelectedPeriod(value));
      if (value === "2") {
        setOpenDialog(true);
      }
    },
    [dispatch]
  );

  const isEndDateDisabled = (date: Dayjs) => {
    return startDate ? date.isBefore(startDate, "day") : false;
  };

  const isStartDateDisabled = (date: Dayjs) => {
    return endDate ? date.isAfter(endDate, "day") : false;
  };

  return (
    <Box>
      <Header>
        <Stack
          direction="row"
          gap={2}
          justifyContent="space-between"
          alignItems="flex-end"
          width="100%"
        >
          <Stack direction="row" gap={2} alignItems="center">
            <Box>
              <Typography variant="subtitle2">PERIOD</Typography>
              <Dropdown
                options={filterSprintOptions}
                value={selectedPeriod || ""}
                onChange={handlePeriodChange}
                backgroundColor={theme.palette.common.white}
                sx={{ height: "30px", fontSize: "12px", padding: "8px 12px" }}
              />
            </Box>
            <Box>
              <Typography variant="subtitle2">AREA PATHS</Typography>
              <Dropdown
                options={filterAreaPathOptions}
                value={selectedAreapath as string}
                onChange={handleAreapathChange}
                backgroundColor={theme.palette.common.white}
                sx={{ height: "30px", fontSize: "12px", padding: "8px 12px" }}
              />
            </Box>
          </Stack>
          <Stack direction="row" gap={2} alignItems="center" flexWrap="wrap">
            <Button
              size="small"
              startIcon={<IconImage src={Download} width={12} height={12} />}
              sx={{ fontSize: "12px", fontWeight: 400, padding: "4px 12px" }}
            >
              EXPORT TO EXCEL
            </Button>
          </Stack>
        </Stack>
      </Header>
      <Box mt="80px" p={4}>
        {children}
      </Box>
      <ViewMoreDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        title="CUSTOM"
        maxWidth="xs"
      >
        <Stack spacing={2} minWidth="300px" alignSelf="flex-start">
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            alignSelf="flex-start"
          >
            <CustomDatePicker
              label="START DATE"
              value={startDate}
              onChange={(newValue: Dayjs | null) => {
                setStartDate(newValue);
                if (endDate && newValue && endDate.isBefore(newValue, "day")) {
                  setEndDate(newValue);
                }
              }}
              shouldDisableDate={isStartDateDisabled}
              format="DD-MMM-YYYY"
            />

            <CustomDatePicker
              label="END DATE"
              value={endDate}
              onChange={(newValue: Dayjs | null) => {
                setEndDate(newValue);
                if (
                  startDate &&
                  newValue &&
                  startDate.isAfter(newValue, "day")
                ) {
                  setStartDate(newValue);
                }
              }}
              shouldDisableDate={isEndDateDisabled}
              format="DD-MMM-YYYY"
            />
          </Stack>

          <Box display="flex" justifyContent="center" gap={2} mt={2}>
            <Button
              onClick={() => setOpenDialog(false)}
              variant="contained"
              sx={{
                backgroundColor: "#028AF6",
                color: "#fff",
                "&:hover": { backgroundColor: "#0275D8" },
              }}
            >
              OK
            </Button>
            <Button
              onClick={() => setOpenDialog(false)}
              variant="contained"
              sx={{
                backgroundColor: "#A3A3A3",
                color: "#fff",
                "&:hover": { backgroundColor: "#8F8F8F" },
              }}
            >
              CANCEL
            </Button>
          </Box>
        </Stack>
      </ViewMoreDialog>
    </Box>
  );
};

export default LayoutComponent;
