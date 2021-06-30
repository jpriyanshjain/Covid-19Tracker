import React ,{useState, useEffect}from 'react';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import SearchIcon from '@material-ui/icons/Search';
import "./Searchbar.css";
import BackDrop from '../../containers/BackDrop/BackDrop';
import {useSelectCountry} from '../../contexts/CountryContext';


function SearchBar({countries , isDark }) {
    const { setCountry} = useSelectCountry();
    const [displayCountries , setDisplayCountries] = useState([]);
    const [showCountries , setShowCountries] = useState( false);
    const [inputCountry , setInputCountry] = useState("");

    useEffect(() => {
        setDisplayCountries(countries);
    },[countries])
    const selectInputCountryHandler=(e)=>{
        setShowCountries(true);
        const countryinput = e.target.value;
        setInputCountry(countryinput);
        if(countryinput !==  "")
       { const filterCountries = countries.filter(country =>{
            return country.name.toLowerCase().includes(countryinput)
        });
        setDisplayCountries(filterCountries);
    }
    }
    const selectCountryHandler = (index) => {
        const country =  displayCountries[index];
        setInputCountry(country.name);
        setCountry(country.name);
        setShowCountries(false);
        setDisplayCountries(displayCountries);

    }
    return (
        <div>
        <div className={`searchbar ${isDark && "searchbar__input--dark"} `}>
            <SearchIcon className="searchbar__searchIcon" />
            <input type="text"
              className={`searchbar__input ${isDark ? "searchbar__input--dark" : null }`}
               placeholder="search country"
                value={inputCountry}
                onChange={selectInputCountryHandler}
               onFocus={() => setShowCountries(true)}
               />
            { showCountries ?
            <ArrowDropUpIcon onClick={() => setShowCountries(false)} className="searchbar__dropdownIcon" /> 
            :  <ArrowDropDownIcon onClick={() => setShowCountries(true)} className="searchbar__dropdownIcon" /> }
            
        </div>
       
            { showCountries && (
              
                 <div onClick={() => setShowCountries(false)}  className={`searchbar__showCountries  ${isDark ? "searchbar__showCountries--dark " : "" }` }>
                      {/* <BackDrop />     */}
                {displayCountries.map((country,idx) => { 
                        return <p onClick={()=>selectCountryHandler(idx)} className={`searchbar__showCountries--country ${isDark ? "searchbar__showCountries--country--dark " : "" }`} value={country.value} key = {country.name}>{country.name}</p>}
                                  
                )}
            </div>)}
        </div>
    )
}

export default SearchBar
