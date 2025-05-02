import { Box, TextField, TextFieldProps, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";

interface CustomDatePickerProps {
  label: string;
  value: Dayjs | null;
  onChange: (newValue: Dayjs | null) => void;
  shouldDisableDate?: (date: Dayjs) => boolean;
  format?: string;
  sx?: React.CSSProperties;
}

const CustomDatePicker = ({
  label,
  value,
  onChange,
  shouldDisableDate,
  format = "DD-MMM-YYYY",
  sx,
}: CustomDatePickerProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box textAlign="left" sx={sx}>
        <Typography fontSize="12px" marginBottom={0.5}>
          {label}
        </Typography>
        <DatePicker
          value={value}
          onChange={onChange}
          shouldDisableDate={shouldDisableDate}
          format={format}
          slots={{
            textField: (params: TextFieldProps) => (
              <TextField
                {...params}
                variant="outlined"
                sx={{
                  backgroundColor: "#f6f6f6",
                  "& .MuiOutlinedInput-root": {
                    height: "32px",
                    minHeight: "32px",
                    "& .MuiInputBase-input": {
                      padding: "6px 8px",
                      fontSize: "14px",
                      color: "#191919",
                    },
                  },
                }}
              />
            ),
          }}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
