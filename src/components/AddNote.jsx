import React, { useCallback, useState } from 'react'
import useNote from '../context/NoteContext'
import useNotes from '../context/NotesContext'
function AddNote() {
  const { notes, setNotes } = useNotes([{}])
  const { title, content, setTitle, setContent } = useNote()

  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault()
    const addNoteForm = document.querySelector("#addNoteForm")
    const input = document.querySelectorAll("#addNoteForm input")
    const textarea = document.querySelector("#addNoteForm textarea")
    const overlay = document.querySelector('#overlay') //overlay, for focus
    const p = document.querySelectorAll("#addNoteForm p") //error message
    const addIcon = document.querySelector("#addIcon")
    const existing = JSON.parse(localStorage.getItem('notes'))

    if (title == '') {
      input[0].style.outline="1px solid #f6339a"
      textarea.style.outline="none"
      p[0].style.display='inline-block'
      p[1].style.display='none'
    } else if (content == '') {
      textarea.style.outline="1px solid #f6339a"
      input[0].style.outline="none"

      p[1].style.display='inline-block'
      p[0].style.display='none'
    } else {//############## adding note here###############
      if (existing != null) {
        console.log("IN"+existing)
        existing.push({ title, content })
        localStorage.setItem('notes', JSON.stringify(existing))
      } else {
        localStorage.setItem('notes', JSON.stringify([{title,content}]))
        setNotes(JSON.parse(localStorage.getItem('notes')))
      }
      setNotes(JSON.parse(localStorage.getItem('notes')))
      setTitle('')
      setContent('')
      addNoteForm.style.scale = "0"
      addIcon.style.transform = 'rotate(0deg)'
      input[0].style.outline="none"
      textarea.style.outline="none"
      overlay.style.scale='0'
    }
  }
  return (
    <div id='addNoteForm' className='w-3/4 max-w-90 p-5 rounded-xl flex flex-col shadow-xl/30 fixed bg-white left-1/2 -translate-x-1/2 top-40 scale-0 duration-300 '>
      <input type="text" placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} className='outline-none text-2xl text-pink-500 rounded-xl px-3 py-1'/><br />
      <p className='hidden text-pink-500 text-sm ml-2'>Enter title please</p>
      <textarea placeholder='Content' value={content} onChange={e => setContent(e.target.value)} className='outline-none px-3 rounded-xl py-1 mt-2 h-40 max-h-40'></textarea> <br />
      <p className='hidden text-pink-500 text-sm ml-2'>Enter content please</p>
      <input type="submit" value="Add" onClick={handleSubmit} className='bg-black py-1 text-white rounded-xl mt-3' />
    </div>
  )
}

export default AddNote