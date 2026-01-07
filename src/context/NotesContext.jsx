import React, { useContext } from "react";

export const NotesContext = React.createContext({
    notes:[{}],
    setNotes:()=>{}
})

export const NotesProvider = NotesContext.Provider

export default function useNotes(){
    return useContext(NotesContext)
}