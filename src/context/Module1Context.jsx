import { createContext, useState } from "react";

const Module1Context = createContext()

export function Module1ContextProvider({ children }) {
    const [objetoModule1, setObjetoModule1] = useState({
        a:"",
        b:""
    })
    return (
        <Module1Context.Provider value={{ objetoModule1, setObjetoModule1 }}>
            {children}
        </Module1Context.Provider>
    )
}
export default Module1Context