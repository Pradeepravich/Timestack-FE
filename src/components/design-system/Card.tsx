import { Card as MuiCard, CardProps, styled } from "@mui/material";
import React, { ReactNode } from "react";

interface ChildrenProps extends CardProps {
  children: ReactNode;
}

const StyledCard = styled(MuiCard)(({ theme }) => ({
  borderRadius: "15px",
  boxShadow: "none",
  padding: theme.spacing(3),
  border: "4px solid #EAEAEA",
  maxWidth: "100%",
}));

const Card: React.FC<ChildrenProps> = ({ children, ...other }) => {
  return <StyledCard {...other}>{children}</StyledCard>;
};

export default Card;
