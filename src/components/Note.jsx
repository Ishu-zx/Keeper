import React, { useEffect, useState } from 'react'
import useNote from '../context/NoteContext'
import deleteIcon from '../assets/delete.svg'
import viewIcon from '../assets/view.svg'
import editIcon from '../assets/edit.svg'
import crossIcon from '../assets/cross.svg'
import useNotes from '../context/NotesContext'
import { jsx } from 'react/jsx-runtime'
function Note({ propTitle = "", propContent = "", index }) {
  const viewNote = `#viewNote${index}`
  const editNote = `#editNote${index}`
  const inputId = `${editNote} input`
  const addIcon = document.querySelector('#addIcon')
  const pId = `${editNote} p`
  const textareaId = `${editNote} textarea`
  const { notes, setNotes } = useNotes()
  const overlay = document.querySelector('#overlay') //overlay, for focus
  const header = document.querySelector('#header')// header, for push behind the overlay
  const { title, setTitle, content, setContent } = useNote()

  //view note
  const viewHandle = () => {

    const viewBox = document.querySelector(viewNote)
    overlay.style.scale = '1'//overlay
    overlay.style.height = '110vh'
    header.style.position = 'static'//header pushed behind
    viewBox.style.scale = '1'
    addIcon.style.scale = '0'
  }

  //opening edit note
  const editHandle = () => {

    const editBox = document.querySelector(editNote)
    const viewBox = document.querySelector(viewNote)
    setTitle(propTitle)
    setContent(propContent)
    overlay.style.scale = '1'//overlay
    overlay.style.height = '110vh'
    header.style.position = 'static'//header pushed behind
    editBox.style.scale = '1'
    addIcon.style.scale = '0'
    viewBox.style.scale='0'
  }
  //edit submit
  const editSubmit = () => {
    const input = document.querySelectorAll(inputId)
    const p = document.querySelectorAll(pId)
    const textarea = document.querySelector(textareaId)
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
    } else{ 
    const updatedNotes=[]
    notes.map((note, i) => {
      if (i == index) {
        note.title = title
        note.content = content
      }
      updatedNotes.push(note)
    })
    localStorage.setItem('notes',JSON.stringify(updatedNotes))
    setNotes(JSON.parse(localStorage.getItem('notes')))

    //closing edit note
    const editBox = document.querySelector(editNote)
    editBox.style.scale = '0'
    overlay.style.scale = '0'//ovelay reset
    overlay.style.height = 'screen'
    header.style.position = 'fixed'//header reset
    addIcon.style.scale = '1'

    //for error message hidden
    input[0].style.outline='none'
    p[0].style.display='none'
    p[1].style.display='none'
    textarea.style.outline='none'
  }
  }

  //delete note
  const deleteHandle = () => {
    const newNotes = notes.filter((v, k) => { return k != index })
    localStorage.setItem('notes', JSON.stringify(newNotes))
    setNotes(JSON.parse(localStorage.getItem('notes')))
    //for closing box if any box is open
    const editBox = document.querySelector(editNote) 
    const viewBox = document.querySelector(viewNote)
    overlay.style.scale = '0'//ovelay reset
    overlay.style.height = 'screen'
    header.style.position = 'fixed'//header reset
    viewBox.style.scale = '0'
    editBox.style.scale = '0'
    addIcon.style.scale = '1'
  }

  //cross any box if open
  const crossHandle = () => {
    const input = document.querySelectorAll(inputId)
    const p = document.querySelectorAll(pId)
    const textarea = document.querySelector(textareaId)
    const viewBox = document.querySelector(viewNote)
    viewBox.style.scale = '0'
    const editBox = document.querySelector(editNote)
    editBox.style.scale = '0'
    overlay.style.scale = '0'//ovelay reset
    overlay.style.height = 'screen'
    header.style.position = 'fixed'//header reset

    //for error message hidden
    input[0].style.outline='none'
    p[0].style.display='none'
    p[1].style.display='none'
    textarea.style.outline='none'
    addIcon.style.scale = '1'
  }

  if (propTitle == "" && propContent == '') return (<></>)
  return (
    <>
      <div id={`noteBox${index}`} className='noteBoxes p-4 duration-300 w-90 m-5 bg-white shadow-2xl rounded-xl break-all h-30 overflow-y-hidden'>
        <div className='flex justify-end gap-2'>
          <img onClick={viewHandle} src={viewIcon} alt="View" title='View' className='w-4 hover:scale-110 cursor-pointer mt-1' />
          <img onClick={editHandle} src={editIcon} alt="Edit" title='Edit' className='w-4 hover:scale-110 cursor-pointer mt-1' />
          <img onClick={deleteHandle} src={deleteIcon} alt="Delete" title='Delete' className='w-4 hover:scale-110 cursor-pointer' />
        </div>
        <h1 className='text-2xl text-pink-500 border-b border-gray-300'>{propTitle}</h1>
        <p className='mt-1'>{propContent}</p>
      </div>

      {/* view box html */}
      <div id={`viewNote${index}`} className='w-3/4 max-w-90 h-[60vh] scrollbar-hide break-all overflow-y-auto p-5 rounded-xl flex flex-col shadow-xl/30 fixed bg-white left-1/2 -translate-x-1/2 top-40 scale-0 duration-300'>
        <div className='flex justify-end gap-2'>
          <img onClick={editHandle} src={editIcon} alt="Edit" title='Edit' className='w-4 hover:scale-110 cursor-pointer mt-1' />
          <img onClick={deleteHandle} src={deleteIcon} alt="Delete" title='Delete' className='w-4 hover:scale-110 cursor-pointer' />
          <img onClick={crossHandle} src={crossIcon} alt="Close" title='Close' className='w-5.5 hover:scale-110 cursor-pointer mt-1' />
        </div>
        <h1 className='text-2xl text-pink-500 border-b border-gray-300'>{propTitle}</h1>
        <p className='mt-1'>{propContent}</p>
      </div>

      {/* edit note html */}
      <div id={`editNote${index}`} className='w-3/4 max-w-90 p-5 rounded-xl flex flex-col shadow-xl/30 fixed bg-white left-1/2 -translate-x-1/2 top-40 scale-0 duration-300'>
        <div className='flex justify-end gap-2'>
          <img onClick={crossHandle} src={crossIcon} alt="Close" title='Close' className='w-5.5 hover:scale-110 cursor-pointer mt-1' />
        </div>
        <input id={`editInput${index}`} type="text" placeholder='Title' value={title} onChange={(e) => { setTitle(e.target.value) }} className='outline-none text-2xl text-pink-500 rounded-xl px-3 py-1' /><br />
        <p id={`editP${index}`} className='hidden text-pink-500 text-sm ml-2'>Enter title please</p>
        <textarea id={`editTextarea${index}`} placeholder='Content' value={content} onChange={(e) => { setContent(e.target.value) }} className='outline-none px-3 rounded-xl py-1 h-40 max-h-40'></textarea> <br />
        <p id={`editP${index}`} className='hidden text-pink-500 text-sm ml-2'>Enter content please</p>
        <input type="submit" value="Update" onClick={editSubmit} className='bg-black py-1 text-white rounded-xl mt-3 cursor-pointer hover:scale-103 duration-200' />
        <button onClick={deleteHandle} className='bg-pink-500 py-1 text-white rounded-xl mt-2 cursor-pointer hover:scale-103 duration-200'>Delete</button>
      </div>
    </>
  )
}

export default Note