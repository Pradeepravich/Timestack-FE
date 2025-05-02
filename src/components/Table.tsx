import React, { useState } from "react";
import {
  CardContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableSortLabel,
  Tooltip,
  Box,
  Stack,
} from "@mui/material";
import Card from "./design-system/Card";

interface Task {
  id: number;
  task: string;
  state: string;
  eatimateactual: number;
  estimated: number;
  actual: number;
}

interface TaskTableProps {
  tasks: Task[];
  headers: string[];
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks, headers }) => {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof Task>("id");

  const handleRequestSort = (property: keyof Task) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a[orderBy] < b[orderBy]) return order === "asc" ? -1 : 1;
    if (a[orderBy] > b[orderBy]) return order === "asc" ? 1 : -1;
    return 0;
  });

  const headerToPropertyMap: { [key: string]: keyof Task } = {
    ID: "id",
    Task: "task",
    State: "state",
    "Estimated Vs Actual": "eatimateactual",
    "Estimated (Hours)": "estimated",
    "Actual (Hours)": "actual",
  };

  return (
    <Card>
      <CardContent>
        <Box>
          <Table>
            <TableHead>
              <TableRow>
                {headers.map((header, index) => {
                  const isNumeric = [
                    "ID",
                    "ACTUAL VS ESTIMATED",
                    "Estimated (Hours)",
                    "Actual (Hours)",
                  ].includes(header);
                  return (
                    <TableCell
                      key={index}
                      sx={{
                        padding: "16px",
                        fontFamily: "IBM Plex Sans",
                        fontWeight: 400,
                        fontSize: "14px",
                        lineHeight: "20px",
                        letterSpacing: "4%",
                        textAlign: isNumeric ? "right" : "left",
                      }}
                    >
                      <Stack direction="row" alignItems="center" spacing={1}>
                        {header}
                        <TableSortLabel
                          active={orderBy === headerToPropertyMap[header]}
                          direction={
                            orderBy === headerToPropertyMap[header]
                              ? order
                              : "asc"
                          }
                          onClick={() =>
                            handleRequestSort(headerToPropertyMap[header])
                          }
                        />
                      </Stack>
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedTasks.map((task) => (
                <TableRow
                  key={task.id}
                  sx={{
                    backgroundColor:
                      task.estimated === 0 ? "#fdecea" : "inherit",
                  }}
                >
                  <TableCell
                    sx={{
                      padding: "16px",
                      color: "#0078D4",
                      cursor: "pointer",
                      textAlign: "left",
                      fontSize: "16px",
                    }}
                  >
                    {task.id}
                  </TableCell>
                  <Tooltip title={task.task} arrow>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        fontSize: "16px",
                        lineHeight: "18px",
                        letterSpacing: "4%",
                        padding: "16px",
                        width: "40%",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {task.task}
                    </TableCell>
                  </Tooltip>
                  <TableCell
                    sx={{
                      padding: "16px",
                      fontSize: "16px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {task.state}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      fontSize: "16px",
                      padding: "16px",
                      textAlign: "right",
                    }}
                  >
                    {task.eatimateactual}%
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      fontSize: "16px",
                      padding: "16px",
                      textAlign: "right",
                    }}
                  >
                    {task.estimated}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      fontSize: "16px",
                      padding: "16px",
                      textAlign: "right",
                    }}
                  >
                    {task.actual}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskTable;
