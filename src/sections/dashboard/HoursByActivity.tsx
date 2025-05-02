import { useState } from "react";
import Card from "../../components/design-system/Card";
import { Box, Button, Stack, Typography } from "@mui/material";
import ProgressBar from "../../components/design-system/ProgressBar";
import Dialog from "../../components/design-system/Dialog";
import { ACTUAL_VS_ESTIMATED_BY_ACTIVITY } from "../../services/useMetrics";

interface HoursByActivityProps{
  data: ACTUAL_VS_ESTIMATED_BY_ACTIVITY[] | undefined;
}

// const data = [
//   { activity: "DESIGN", actual_hours: 212, estimated_hours: 310 },
//   { activity: "FRONT-END DEV", actual_hours: 560, estimated_hours: 800 },
//   { activity: "BACK-END DEV", actual_hours: 270, estimated_hours: 670 },
//   { activity: "QA AUTOMATION", actual_hours: 430, estimated_hours: 650 },
//   { activity: "PROJECT MANAGEMENT", actual_hours: 146, estimated_hours: 170 },
//   { activity: "DESIGN", actual_hours: 212, estimated_hours: 310 },
//   { activity: "FRONT-END DEV", actual_hours: 560, estimated_hours: 800 },
//   { activity: "BACK-END DEV", actual_hours: 270, estimated_hours: 670 },
//   { activity: "QA AUTOMATION", actual_hours: 430, estimated_hours: 650 },
//   { activity: "PROJECT MANAGEMENT", actual_hours: 146, estimated_hours: 170 },
// ];

const HoursByActivity = ({data}:HoursByActivityProps) => {
  const [openDialogProgress, setOpenDialogProgress] = useState(false);

  return (
    <Card sx={{ width: { md: "33.333%", sm: undefined } }}>
      <Typography variant="subtitle1" mb={3}>
        ACTUAL VS ESTIMATED HOURS BY ACTIVITY
      </Typography>

      <Stack flexDirection="column" gap={5}>
        {data?.slice(0, 5).map((item, index) => (
          <ProgressBar
            key={item.activity}
            {...item}
            isLastItem={index === data?.length - 1}
          />
        ))}
      </Stack>
      <Stack alignItems="center" mt={2}>
        <Box>
          <Button onClick={() => setOpenDialogProgress(true)}>
            VIEW 5 MORE
          </Button>
        </Box>
      </Stack>
      <Dialog
        open={openDialogProgress}
        onClose={() => setOpenDialogProgress(false)}
        title="ACTUAL VS ESTIMATED HOURS BY ACTIVITY"
      >
        <Box
          display="grid"
          gridTemplateColumns="repeat(2, 1fr)"
          gap={2}
          columnGap={8}
        >
          <Stack flexDirection="column" gap={5}>
            {data
              ?.slice(0, Math.ceil(data.length / 2))
              .map((item, index) => (
                <ProgressBar
                  key={item.activity}
                  {...item}
                  isLastItem={index === data.length - 1}
                />
              ))}
          </Stack>
          <Stack flexDirection="column" gap={5}>
            {data
              ?.slice(Math.ceil(data?.length / 2), data?.length)
              .map((item, index) => (
                <ProgressBar
                  key={item.activity}
                  {...item}
                  isLastItem={index === data?.length - 1}
                />
              ))}
          </Stack>
        </Box>
      </Dialog>
    </Card>
  );
};

export default HoursByActivity;
