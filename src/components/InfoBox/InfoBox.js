import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";
import {useDarkTheme} from "../../contexts/DarkThemeContext"

function InfoBox({ title, cases, total, active, isRed, ...props }) {
  const {darkTheme} = useDarkTheme();
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${darkTheme && "infoBox-dark"} ${active && "infoBox--selected"} ${
        isRed && "infoBox--red"
      }`}
    >
      <CardContent>
        <Typography className={` ${darkTheme ? "cardContent-dark" : ""}`} color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>
          {cases}
        </h2>

        <Typography className={` "infoBox__total" ${darkTheme ? "cardContent-dark" : ""}`} color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
