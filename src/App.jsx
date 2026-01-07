import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import Note from './components/Note'
import Footer from './components/Footer'
import useNote, { NoteProvider } from './context/NoteContext'
import { NotesProvider } from './context/NotesContext'
function App() {
  const [title,setTitle]=useState('')
  const [content,setContent]=useState('')
  const [notes,setNotes] =useState([{title:'',content:''}])

  console.log(notes)
  useEffect(()=>{
  setNotes(JSON.parse(localStorage.getItem('notes')))
  },[])
  return (
    <NotesProvider value={{notes,setNotes}}>
    <NoteProvider value={{title,setTitle,content,setContent}}>
      <div id='overlay' className='absolute w-full h-screen bg-black opacity-80 scale-0'></div>
      <Header />
      <div id='noteContainer' className='flex flex-wrap justify-evenly w-full h-screen py-[52px] overflow-y-scroll'>
        {
          Array.isArray(notes) && notes.map((item,key)=>{
            return (<Note key={key} index={key} propTitle={item.title} propContent={item.content}/>)
          })
        }
      </div>
      <Footer/>
    </NoteProvider>
    </NotesProvider>
  )
}

export default App
