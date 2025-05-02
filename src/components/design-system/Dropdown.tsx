import React from "react";
import {
  MenuItem,
  Select,
  Typography,
  SelectChangeEvent,
  Stack,
  styled,
  SxProps,
} from "@mui/material";
import BlueCheckCircleIcon from "../../assets/bluecheckicon.svg";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useBgColor from "../../hooks/useBgColor";

const Image = styled("img")(() => ({
  marginLeft: "6px",
}));

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  renderValue?: ((value: string) => React.ReactNode) | undefined;
  backgroundColor?: string;
  sx?: SxProps;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  renderValue,
  backgroundColor,
  sx,
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };

  const { bgColor } = useBgColor(backgroundColor);

  return (
    <Select
      value={value}
      onChange={handleChange}
      renderValue={
        renderValue ||
        ((value) => options?.find((option) => option.value === value)?.label)
      }
      size="small"
      sx={{
        "& fieldset": { display: "none" },
        backgroundColor: bgColor,
        ...sx,
      }}
      IconComponent={ExpandMoreIcon}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          <Stack direction="row" alignItems="center">
            <Typography variant="caption">{option.label}</Typography>
            {value === option.value && (
              <Image src={BlueCheckCircleIcon} alt="Selected" />
            )}
          </Stack>
        </MenuItem>
      ))}
    </Select>
  );
};

export default Dropdown;
