import { FC } from "react";
import Card from "../../components/design-system/Card";
import { Box, Typography } from "@mui/material";

interface TaskEstimationStats {
  title1: string;
  value1: number;
  title2: string;
  value2: number;
  measure1: string;
  measure2: string;
}

export interface AggregationsProps {
  width?: string;
  data: TaskEstimationStats[];
}

const Aggregations: FC<AggregationsProps> = ({ width, data }) => {
  return (
    <Box
      display="grid"
      gap={2.5}
      gridTemplateColumns="repeat(2, 1fr)"
      sx={{ width: { md: width || "33.333%", sm: undefined } }}
    >
      {data.map((item) => (
        <Card>
          <Typography variant="subtitle1">{item.title1}</Typography>
          <Typography variant="h1">
            {item.value1}
            {item.measure1 && (
              <Typography component="span" fontSize="24px">
                {item.measure1}
              </Typography>
            )}
          </Typography>
          <Typography variant="subtitle2" mt="24px">
            {item.title2}
          </Typography>
          <Typography variant="h3" pt={1}>
            {item.value2} {item.measure2}
          </Typography>
        </Card>
      ))}
    </Box>
  );
};

export default Aggregations;
