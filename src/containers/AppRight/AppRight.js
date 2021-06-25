import React from 'react'
import Table from "../../components/Table/Table";
import LineGraph from '../../components/LineGraph/LineGraph';
import {useTableData } from '../../contexts/CountryContext';
import {useCasesType} from '../../contexts/CasesTypeContext';
import "./AppRight.css";
import {useDarkTheme} from '../../contexts/DarkThemeContext'

function AppRight() {
    const {casesType} = useCasesType();   
    const { tableData } = useTableData();    
    const {darkTheme} = useDarkTheme();
    return (
        <div className={`appright ${darkTheme ?"appright__dark" : "appright__light"}`}>
            <h2 className={`appright__heading ${darkTheme? "appright__heading-dark" : "appright__heading-light"}`}>Live Cases by Country</h2>
          <Table tableData = {tableData} />
      <h3 className={`appright_linegraph-title ${darkTheme ?" appright_linegraph-title-dark" : "appright_linegraph-title-light"}`}>Worldwide new {casesType}</h3>
          <LineGraph  isDark={darkTheme} casesType= {casesType} />
        </div>
    )
}


export default AppRight
