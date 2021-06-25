import React , {useState , useEffect} from 'react';
import InfoBoxs from '../InfoBoxs/InfoBoxs';
import Map from "../../components/Map/Map";
import {useTableData ,  useMapCenter } from "../../contexts/CountryContext";
import {useCasesType} from '../../contexts/CasesTypeContext'
import {useDarkTheme} from "../../contexts/DarkThemeContext";
import "leaflet/dist/leaflet.css";



function AppLeft() {
  const {tableData} = useTableData();
  const {casesType} = useCasesType();
  const {center } = useMapCenter();
  const {darkTheme} = useDarkTheme();
  
  const [mapZoom, setMapZoom] = useState(3);
  useEffect(() => {
    setMapZoom(6);   
  }, [center])
   return (
        <div>
          <InfoBoxs className="app__infoBoxs" />
          <Map
                countries={tableData}
                casesType={casesType}
                center={center}
                zoom={mapZoom}
                isDark = {darkTheme}
              />        
        </div>
    )
}

export default AppLeft
