import React from "react";
import { Box, LinearProgress, Stack, Typography } from "@mui/material";

interface ProgressBarProps {
  activity: string;
  actual_hours: number;
  estimated_hours: number;
  isLastItem?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  activity,
  actual_hours,
  estimated_hours,
}) => {
  const progress = (actual_hours / estimated_hours) * 100;

  return (
    <Stack gap={1.5}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h4">{activity}</Typography>
        <Typography variant="h4">
          <Box component="span" sx={{ color: "common.black" }}>
            {actual_hours}
          </Box>
          /
          <Box component="span" sx={{ color: "grey.100" }}>
            {estimated_hours}
          </Box>
        </Typography>
      </Stack>
      <LinearProgress variant="determinate" value={progress} />
    </Stack>
  );
};

export default ProgressBar;
