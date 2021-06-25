import React,{ useState, useEffect } from 'react'
import "./NavBar.css";
import {
  MenuItem,
  FormControl,
  Select
} from "@material-ui/core";
import { useAllCountries,useSelectCountry  , useTableData} from '../../contexts/CountryContext';
import {sortData} from '../../util'
import {useDarkTheme} from '../../contexts/DarkThemeContext'
import WbSunnyTwoToneIcon from '@material-ui/icons/WbSunnyTwoTone';
import Brightness4TwoToneIcon from '@material-ui/icons/Brightness4TwoTone';

function NavBar() {
  const {darkTheme, setDarkTheme} = useDarkTheme();
  const {country, setCountry} = useSelectCountry();
  const {countries , setCountries } = useAllCountries();
  const {setTableData} = useTableData();
  const [hoverDarkButton , setHoverDarkButton] = useState(false);


  useEffect(() => {
    const getCountriesData = async () => {
    await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => { 
           let sortedData = sortData(data);
          setTableData(sortedData);
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);
  

  const onCountryChange = (e) => {
    const country = e.target.value;
    setCountry(country);

  }
  const changeTheme = () => {
    setDarkTheme(pervState => !pervState);
  }
  console.log(darkTheme);
    return (
        <div className={`navbar ${darkTheme ? "navbar__dark " : "navbar__light" }`}>
          <h1 className="navbar__title">COVID-19 Tracker</h1>         
          <FormControl className={`navbar__dropdown ${darkTheme && "navbar__dropdown--dark"} `}>
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem  style={{color: "black"}} key="worldwide" value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem key ={country.country} value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <div 
          className={`${darkTheme ? "navbar__darktheme--button--dark " 
                                  : "navbar__darktheme--button--light"}  "`}
          onMouseEnter={() => setHoverDarkButton(true)} 
          onMouseLeave={() => setHoverDarkButton(false)}                     
          onMouseUpCapture ={() => setHoverDarkButton(false)}                        >
         {darkTheme ? <WbSunnyTwoToneIcon className ="nav__darkTheme--lightButton" onClick ={changeTheme} /> 
                     :<Brightness4TwoToneIcon  className ="nav__darkTheme--DarkButton"  onClick={changeTheme} />}
          </div>
          {hoverDarkButton && <p className = "nav__darkTheme--info">SWITCH TO {darkTheme? "LIGHT" : "DARK"} MODE </p> }
        </div>
    )
}

export default NavBar
