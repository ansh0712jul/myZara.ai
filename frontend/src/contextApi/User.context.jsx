import React , { createContext , useContext , useState} from "react";

// creaitng userContext
const userContext = createContext();

// creatig userprovider --> warehouse
const UserProvider = ({ children }) => {
    const [user , setUser] = useState(null);

    return (
        <userContext.Provider value={{user , setUser}}>
            {children}
        </userContext.Provider>
    )
    
}



export { UserProvider,
        userContext }