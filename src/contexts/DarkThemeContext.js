import {createContext , useContext , useState } from "react"

const DarkTheme = createContext();
export const useDarkTheme = () =>  useContext(DarkTheme);

function DarkThemeProvider({children}){
    const [darkTheme, setDarkTheme] = useState(false);
    const DarkThemeValue = {darkTheme, setDarkTheme};
    return (
        <DarkTheme.Provider value={DarkThemeValue}>
            {children}
        </DarkTheme.Provider>
    );
}

export default DarkThemeProvider ;
