import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@mui/material/Icon";

const useStyles = makeStyles((theme) => ({
  box: {
    position: "relative",
  },
  input: {
    position: "relative",
    padding: 8,
    width: 50,
    height: 40,
    background: "#202940",
    border: `1px solid #202940`,
    borderRadius: "10px",
    boxSizing: "border-box",
    fontSize: 16,
    color: "#202940",
    outline: "none",
    transition: ".5s",
    width: "40%",
    border:"1px solid grey",
    color:"white"
    // "&:hover": {
    //   // width: 350,
    //   background: "none",
    //   borderRadius: 8,
    //   zIndex: 1,
    //   color: "white",
    // },
  },
  icon: {
    position: "relative",
    top: 20,
    right: 25,
    transform: "translate(-50%, -50%)",
    fontSize: 26,
    color: "red",
    transition: ".2s",
    "&:hover": {
      opacity: 0,
      zIndex: -1,
    },
  },
}));

export default function MDHoverSearch({ onInputChange }) {
  const classes = useStyles();

  const [inputValue, setInputValue] = React.useState("");

  const handleChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
    onInputChange(value);
  };

  return (
    <div className={classes.box}>
      <input
        type="text"
        className={classes.input}
        value={inputValue}
        // onBlur={handleChange}
        onChange={handleChange}
        placeholder="Search"
      /> 
      <Icon className={classes.icon} fontSize="medium" color="red">
        search
      </Icon>
    </div>
  );
}
