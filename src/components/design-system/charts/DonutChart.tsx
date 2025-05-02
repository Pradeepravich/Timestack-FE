import { FC, useCallback, useState } from "react";
import Chart from "react-apexcharts";
import { DonutChartOnClickFunc, donutChartOptions } from "./chartProps";
import { Box, Stack, Typography } from "@mui/material";
import { convertTo2Digits } from "../../../utils/format";
import { StyledChartWrapper } from "../../design-system/ChartWrapper";
import { TASKS_BY_CATEGORY } from "../../../utils/constants";

interface Props {
  data: number[];
  legendPosition?: "row" | "column";
  isAverage?: boolean;
  chartSize?: string | number;
  limit?: number;
  minHeight?: string | number;
}

const DonutChart: FC<Props> = ({
  data,
  isAverage = true,
  chartSize,
  minHeight,
  limit,
}) => {
  const [, setInfo] = useState<{
    label: string;
    index: number;
  }>({
    label: TASKS_BY_CATEGORY[0].value,
    index: 0,
  });

  const handleDonutChartClick: DonutChartOnClickFunc = useCallback(
    (label: string, index: number) => {
      setInfo({ label, index });
    },
    []
  );

  const totalTasks = data?.reduce((acc, count) => acc + count, 0);
  const limitedTasks = limit
    ? TASKS_BY_CATEGORY.slice(0, limit)
    : TASKS_BY_CATEGORY;

  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box position="relative" top="10px">
          <StyledChartWrapper sx={{ p: 0 }}>
            <Chart
              type="donut"
              options={{
                ...donutChartOptions(handleDonutChartClick),
                chart: {
                  width: chartSize || "60%",
                  // height: chartSize || 350,
                },
              }}
              series={data}
              width={chartSize || "60%"}
              minHeight={minHeight || "40%"}
              // height={chartSize || 350}
            />
          </StyledChartWrapper>
          <Box
            position="absolute"
            top="50%"
            left="50%"
            textAlign="center"
            sx={{ transform: "translate(-50%, -50%)" }}
          >
            <Typography variant="h2" fontSize="48px">
              {/* {convertTo2Digits(data[info.index])} */}
              {convertTo2Digits(totalTasks)}
            </Typography>
            {isAverage && (
              <Typography
                variant="h4"
                color="var(--Skyline, #193A50)"
                fontWeight="400"
              >
                Total Tasks
              </Typography>
            )}
          </Box>
        </Box>
        <Box
          display="flex"
          // mt={2}
          justifyContent="space-between"
          flexWrap="wrap"
          width="100%"
          mt="0.5rem"
          mb="0.75rem"
        >
          {[0, 1].map((col) => (
            <Stack key={col} spacing={1}>
              {limitedTasks
                .filter((_, i) => i % 2 === col)
                .map((stat) => {
                  const correctIndex = TASKS_BY_CATEGORY.findIndex(
                    (item) => item.key === stat.key
                  );
                  return (
                    <Stack
                      key={stat.key}
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      justifyContent="space-between"
                      sx={{ width: "100%", gap: 1 }}
                    >
                      <Box
                        width={8}
                        height={8}
                        borderRadius="50%"
                        bgcolor={stat.color}
                      />

                      <Typography
                        variant="h4"
                        color="#6B7280"
                        fontWeight="500"
                        sx={{ textAlign: "left", flex: 1 }}
                      >
                        {stat.value}
                      </Typography>

                      <Typography
                        variant="h4"
                        color="#111827"
                        sx={{ textAlign: "right" }}
                      >
                        {convertTo2Digits(data?.[correctIndex])}
                      </Typography>
                    </Stack>
                  );
                })}
            </Stack>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default DonutChart;
