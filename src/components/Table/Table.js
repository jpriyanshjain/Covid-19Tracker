import React from "react";
import "./Table.css";
import numeral from "numeral";
import {useDarkTheme} from "../../contexts/DarkThemeContext"

function Table({tableData}) {
const {darkTheme} = useDarkTheme();
  return (
    <div className={`table ${darkTheme ? "table__dark" : "table__light"}`}>
      {tableData && tableData.map((country) => (
        <tr key = {country.country}>
          <td>{country.country}</td>
          <td>
            <strong>{numeral(country.cases).format("0,0")}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
