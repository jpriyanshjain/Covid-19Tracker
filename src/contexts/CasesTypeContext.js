import {createContext, useState,useContext} from 'react';


const CasesTypeContext = createContext();
export const useCasesType = () => useContext(CasesTypeContext);

export default function CasesTypeProvider({children}) {
    const [casesType, setCasesType] = useState("cases");
    const value= {casesType, setCasesType};
    return (
        <CasesTypeContext.Provider value={value} >
            {children}
        </CasesTypeContext.Provider>
    )
}