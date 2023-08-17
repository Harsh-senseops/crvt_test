import React from "react";
import Card from "@mui/material/Card";
import "./index.css";
import { ExpandMore } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useRef } from "react";
export default function MDCard({ children, onTap, ...rest }) {
  const parentRef = useRef(null);

  return (
    <>
      <Card className="md-card" onClick={onTap} {...rest}>
        {children}
      </Card>
    </>
  );
}
