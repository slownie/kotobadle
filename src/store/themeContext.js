import React, {createContext,useState} from "react";

const ThemeContext = createContext();

const ThemeProvider = ({children}) => {
    // 0 = Light, 1 = Dark
    const [theme,setTheme] = useState(0);

    return (
        <ThemeContext.Provider value={{theme,setTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}
export {ThemeContext,ThemeProvider};