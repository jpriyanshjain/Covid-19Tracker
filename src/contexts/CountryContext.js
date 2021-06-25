import {createContext, useState,useContext} from 'react';

const SelectedCountry  = createContext();
export const useSelectCountry = () => useContext(SelectedCountry) ;

const AllCountries =  createContext();
export const useAllCountries = () => useContext(AllCountries);

const TableData = createContext();
export const useTableData = () => useContext(TableData) ;

const MapCenter = createContext();
export const useMapCenter = () => useContext(MapCenter);

function SelectedCountryProvider ({children}) {
    const [country,setCountry] = useState("worldwide");
    const [countries, setCountries] = useState([]);
    const [tableData , setTableData] = useState([]);
    const [center , setCenter] = useState([34.80746,  -40.4796]);
   
    const mapCenterValue = {center , setCenter}
    const countryValue = {country , setCountry  };
    const countriesValue = {countries, setCountries};
    const tableValues = {tableData , setTableData}
    return (
        <AllCountries.Provider value={countriesValue}>
            <SelectedCountry.Provider value={countryValue}>
                <TableData.Provider value={tableValues}>
                    <MapCenter.Provider value={mapCenterValue}>
                        {children}
                    </MapCenter.Provider>
                </TableData.Provider>
            </SelectedCountry.Provider>
        </AllCountries.Provider>
    )

}

export default SelectedCountryProvider ;