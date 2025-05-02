import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  styled,
  TableSortLabel,
  Box,
  TableContainer,
  SxProps,
  Typography,
} from "@mui/material";
import { Dispatch, ReactNode, SetStateAction } from "react";
import Pagination from "./Pagination";
import Tooltip from "./Tooltip";

export interface Column<T> {
  field: keyof T;
  title: string;
  sortable: boolean;
  width?: number;
  component?: (row: T) => ReactNode;
  textAlign?: "left" | "right" | "center";
  truncate?: boolean;
}

interface GridTableProps<T extends { id: string | number }> {
  page: number;
  pageSize: string;
  setPage: Dispatch<SetStateAction<number>>;
  setPageSize: Dispatch<SetStateAction<string>>;
  columns: Column<T>[];
  data: T[];
  count: number;
  width?: number;
  orderBy: keyof T;
  setOrderBy: Dispatch<SetStateAction<keyof T>>;
  order: "asc" | "desc";
  setOrder: Dispatch<SetStateAction<"asc" | "desc">>;
  handleSort: (column: keyof T) => void;
  isLoading?: boolean;
  sx?: SxProps;
}

const StyledTableHead = styled(TableHead)(() => ({
  "& .MuiTableRow-root": {
    borderBottom: "none",
  },
  borderRadius: "4px",
  "& .MuiTableCell-root": {
    fontWeight: 400,
    fontSize: "12px",
    color: "#193A50",
    textTransform: "uppercase",
  },
}));

const StyledTableBody = styled(TableBody)({
  "& .MuiTableRow-root": {
    borderTop: "1px solid #EAEAEA",
    "&:first-of-type": {
      borderTop: "none",
    },
    "&:last-of-type": {
      borderBottom: "none",
    },
  },
  "& .MuiTableCell-root": {
    fontWeight: 600,
    fontSize: "14px",
    lineHeight: "18px",
    paddingRight: "24px",
  },
});

const GridTable = <T extends { id: string | number; highlight?: boolean }>({
  page,
  pageSize,
  setPage,
  setPageSize,
  columns,
  data,
  count,
  orderBy,
  order,
  handleSort,
  sx,
}: GridTableProps<T>) => {
  return (
    <Box>
      <TableContainer sx={{ ...sx }}>
        <Table>
          <StyledTableHead>
            <TableRow>
              {columns.map(({ field, title, sortable, width, textAlign }) => (
                <TableCell
                  key={String(field)}
                  sx={{
                    width: width || "auto",
                    textAlign: textAlign || "right",
                  }}
                >
                  <Tooltip title={title} placement="bottom">
                    <Box component="span">
                      {sortable ? (
                        <TableSortLabel
                          active={orderBy === field}
                          direction={orderBy === field ? order : "asc"}
                          onClick={() => handleSort(field)}
                        >
                          {title}
                        </TableSortLabel>
                      ) : (
                        title
                      )}
                    </Box>
                  </Tooltip>
                </TableCell>
              ))}
            </TableRow>
          </StyledTableHead>
          <StyledTableBody>
            {data.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  backgroundColor: row.highlight ? "#FF00000D" : undefined,
                }}
              >
                {columns.map((column, colIndex) => (
                  <TableCell
                    sx={{ textAlign: column.textAlign || "right" }}
                    key={colIndex}
                  >
                    <Tooltip
                      title={column.truncate ? String(row[column.field]) : ""}
                      placement="bottom"
                    >
                      <Box component="span">
                        {column.component
                          ? column.component(row)
                          : String(row[column.field])}
                      </Box>
                    </Tooltip>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </StyledTableBody>
        </Table>
      </TableContainer>
      {data.length === 0 && (
        <Typography mt={1} textAlign="center">
          No data Found
        </Typography>
      )}
      {data.length > 0 && (
        <Pagination
          page={page}
          pageSize={pageSize}
          setPage={setPage}
          setPageSize={setPageSize}
          count={count}
        />
      )}
    </Box>
  );
};

export default GridTable;
