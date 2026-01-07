import React, { useContext } from "react";

export const NoteContext = React.createContext({
    title:'',
    setTitle:()=>{},
    content:'',
    setContent:()=>{}
})

export const NoteProvider = NoteContext.Provider

export default function useNote() {
    return useContext(NoteContext)
}

