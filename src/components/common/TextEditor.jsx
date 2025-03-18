'use client'

import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'



const TextEditor = () => {
  const editor = useEditor({
    extensions: [
        StarterKit,
        Bold,
        Document,
        Text,
        Italic,
        
    ],
    content: '<p>Hello World! 🌎️</p>',
  })

  return <>
    <button onClick={()=>editor.commands.toggleBold()} className='m-[1rem]'>Bold</button>
    <br />
    <button onClick={()=>editor.commands.toggleItalic()} className='m-[1rem]'>Italic</button>

    <EditorContent className='w-[100%] h-[10rem] bg-[#ffffff] ' editor={editor}  />
  </>
}

export default TextEditor
