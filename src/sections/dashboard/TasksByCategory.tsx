import { Box, Button, Stack, Typography } from "@mui/material";
import Card from "../../components/design-system/Card";
import DonutChart from "../../components/design-system/charts/DonutChart";
// import { TASKS_BY_CATEGORY } from "../../utils/constants";
import { useState } from "react";
import Dialog from "../../components/design-system/Dialog";
import { TASKS_BY_CATEGORY } from "../../services/useMetrics";

interface TasksByCategoryProps{
  data: TASKS_BY_CATEGORY;
}

const TasksByCategory = ({data}:TasksByCategoryProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const tasksCount = Object?.values(data?.category_counts ?? {});

  return (
    <Card sx={{ width: { md: "33.333%", sm: undefined } }}>
      <Typography variant="subtitle1">TASKS BY CATEGORY</Typography>
      <DonutChart data={tasksCount} chartSize={"90%"} limit={10} />
      <Stack alignItems="center" mt={2}>
        <Box>
          <Button onClick={() => setOpenDialog(true)}>VIEW 5 MORE</Button>
        </Box>
      </Stack>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        title="TASKS BY CATEGORY"
        maxWidth="sm"
      >
        <DonutChart data={tasksCount} chartSize={"95%"} />
      </Dialog>
    </Card>
  );
};

export default TasksByCategory;
