import "./App.css";
import "leaflet/dist/leaflet.css";
import NavBar from "./components/NavBar/NavBar";
import CountryContextProvider from './contexts/CountryContext'
import CasesTypeProvider from "./contexts/CasesTypeContext";
import AppRight from "./containers/AppRight/AppRight";
import AppLeft from "./containers/AppLeft/AppLeft";
import {useDarkTheme} from "./contexts/DarkThemeContext";

const App = () => {
  const {darkTheme} = useDarkTheme();
  return (
        <CasesTypeProvider>
          <CountryContextProvider>
              <div className={`app ${darkTheme ? "dark" : "light" }`}>
                <NavBar className="app__navbar" />
                  <div className="app__body">
                        <div className="app__left">
                            <AppLeft />
                          </div>    
                          <div className='app__right'>
                    <AppRight  />            
                            </div>      
                </div>
              </div>
          </CountryContextProvider>
        </CasesTypeProvider>
  );
};

export default App;
