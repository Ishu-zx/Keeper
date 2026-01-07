import React,{useState  } from 'react'
import addIcon from '../assets/add.svg'
import AddNote from './AddNote'
import useNote from '../context/NoteContext'

function Header() {
  const {title,content,setTitle,setContent} = useNote()

  const handleEvent =()=>{
    const addNoteForm = document.querySelector('#addNoteForm')
    const input = document.querySelectorAll('#addNoteForm input')
    const textarea = document.querySelector('#addNoteForm textarea')
    const p = document.querySelectorAll("#addNoteForm p")//error message
    const addIcon= document.querySelector('#addIcon')
    const overlay = document.querySelector('#overlay')//overlay for focus
    const addImg = document.querySelector('#addIcon img')

    if(addNoteForm.style.scale=='1'){//################### close add form #######################
      addNoteForm.style.scale='0'
      addIcon.style.transform='rotate(0deg)'
      overlay.style.scale='0'
      addImg.setAttribute('title','Add')
      setTitle('')
      setContent('')
      
      //for error message
      input[0].style.outline="none"
      textarea.style.outline="none"
      p[0].style.display='none'
      p[1].style.display='none'
    }else{// ################### open add form ######################
      addNoteForm.style.scale='1'
      addIcon.style.transform='rotate(45deg)'
      overlay.style.scale='1'
      addImg.setAttribute('title','Close')
      setTitle('')
      setContent('')
    }
    
  }
  return (
    <>
        <nav id='header'  className='py-3 fixed w-full flex justify-evenly items-center bg-black text-white shadow-2xl'>
            <h3 className='text-2xl text-pink-500'>Keeper</h3>
            <div id='addIcon' className='duration-300'>
              <img src={addIcon} alt="AddIcon" title='Add' className='w-4 cursor-pointer' onClick={handleEvent}/>
            </div>
        </nav>
        <AddNote/>
    </>
  )
}

export default Header