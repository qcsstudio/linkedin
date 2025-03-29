'use client'

import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useState } from 'react'

// Icons
import { FaBold, FaItalic, FaPoll, FaImage } from "react-icons/fa";
import { MdOutlinePermMedia } from "react-icons/md";



const TextEditor = ({setPostCaption}) => {



  // state handle;
  const [highlight,setHighlight] = useState({
    italic:false,
    bold:false,
  })

  const editor = useEditor({
    extensions: [
        StarterKit,
        Bold,
        Italic,
        
    ],
    content: '',
    onUpdate:({editor })=>{
      setPostCaption(editor.getHTML());
    }
  })


  return <>
    <div className="header bg-[#ffffff] w-[100%] px-[.5rem] py-[.5rem] mt-[1.5rem] flex items-center justify-start gap-[.5rem] ">
      {/* Bold Button */}
      <button onClick={()=>editor.commands.toggleBold()} className={`px-[.5rem] py-[.3rem] rounded-[.5rem] $ bg-[#383d5b] text-[#ffffff]`}><FaBold/></button>
      {/* Italic Button */}
      <button onClick={()=>editor.commands.toggleItalic()} className='px-[.5rem] py-[.3rem] rounded-[.5rem] bg-[#383d5b] text-[#ffffff]'><FaItalic/></button>
      {/* Poll Button */}
      {/* <button className='px-[.5rem] py-[.3rem] rounded-[.5rem] bg-[#383d5b] text-[#ffffff]'><FaPoll/></button> */}
      {/* Media Button */}
      {/* <button className='px-[.5rem] py-[.3rem] rounded-[.5rem] bg-[#383d5b] text-[#ffffff]'><MdOutlinePermMedia/></button> */}
    </div>

    {/* Text Editor */}
    <EditorContent className='w-full h-[10rem] bg-white border border-gray-300 rounded-md p-2 focus:outline-none focus:border-none focus:ring-2 focus:ring-blue-500' editor={editor}   />
  </>
}

export default TextEditor
