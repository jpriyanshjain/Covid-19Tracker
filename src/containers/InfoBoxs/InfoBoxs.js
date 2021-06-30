import React,{useEffect  , useState} from 'react';
import InfoBox from '../../components/InfoBox/InfoBox';
import {useSelectCountry , useMapCenter } from '../../contexts/CountryContext';
import numeral from 'numeral';
import {useCasesType} from '../../contexts/CasesTypeContext';
import './InfoBoxs.css';

import { prettyPrintStat } from "../../util";

function InfoBoxs() {
  const {country} = useSelectCountry();
  const [countryInfo,setCountryInfo] = useState({});
  const {casesType, setCasesType} = useCasesType();
  const {setCenter} = useMapCenter();
  useEffect(  ()=>  {
    const url = 
     country === "worldwide"
          ? "https://disease.sh/v3/covid-19/all"
          : `https://disease.sh/v3/covid-19/countries/${country}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setCountryInfo(data);
          if(country !== "worldwide")
          setCenter([data.countryInfo.lat, data.countryInfo.long]);
        });
  } , [country])
  const setCases = (type) => {
    setCasesType(type);
  }

    return (
    <div className="app__stats">
          <InfoBox
            onClick={()=> setCases("cases")}
            title="Coronavirus Cases"
            isRed
            active={casesType === "cases"}
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={numeral(countryInfo.cases).format("0.0a")}
          />
          <InfoBox
            onClick={()=> setCases("recovered")}
            title="Recovered"
            active={casesType === "recovered"}
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={numeral(countryInfo.recovered).format("0.0a")}
          />
          <InfoBox
            onClick={()=> setCases("deaths")}
            title="Deaths"
            isRed
            active={casesType === "deaths"}
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={numeral(countryInfo.deaths).format("0.0a")}
          />
        </div>
    )
}

export default InfoBoxs
