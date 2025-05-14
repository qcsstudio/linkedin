'use client';
import React, { useState, useEffect, useRef } from 'react';
import { FONT_FAMILIES } from '@/libs/fontFamilies';
import { RxCopy } from "react-icons/rx";
import { CiEraser } from "react-icons/ci";
import {
  Bold as IconBold,
  Italic as IconItalic,
  Underline as IconUnderline,
  Strikethrough as IconStrike,
  Code as IconCode,
  List as IconBullet,
  ListOrdered as IconNumbered,
  Link as IconLink,
  ArrowUp as IconSuperscript,
  ArrowDown as IconSubscript,
  Smartphone as IconMobile,
  Tablet as IconTablet,
  Monitor as IconDesktop,
  ThumbsUp as IconLike,
  MessageCircle as IconComment,
  Repeat as IconShare,
  Send as IconSend
} from 'lucide-react';
import Navbar from '@/components/HomeComponent/NavbarHome/NavbarHome';
import Footer from '@/components/HomeComponent/Footer/Footer';
import logo from '../../../public/images/qcs.png';
// import './globals.css';
const TOOL_STYLES = [
  'bold','italic','underline','strikethrough','bolditalic',
  'script','monospace','smallcaps','doublestruck','fraktur',
  'squared','subscript','superscript','bullet','numbered','link'
];
const ICON_MAP = {
  bold: <IconBold size={15}/>,
  italic: <IconItalic size={15}/>,
  underline: <IconUnderline size={15}/>,
  strikethrough: <IconStrike size={15}/>,
  bolditalic: <><IconBold size={16}/> <IconItalic size={16}/></>,
  script: <span className="icon-script">𝓐</span>,
  monospace: <IconCode size={15}/>,
  smallcaps: <span className="icon-smallcaps">ᴅ</span>,
  doublestruck: <span className="icon-ds">𝔸</span>,
  fraktur: <span className="icon-fraktur">𝔉</span>,
  squared: <span className="icon-sq">🄰</span>,
  subscript: <IconSubscript size={15}/>,
  superscript: <IconSuperscript size={15}/>,
  bullet: <IconBullet size={15}/>,
  numbered: <IconNumbered size={15}/>,
  link: <IconLink size={15}/>
};
const TRUNCATE_LIMIT = 200;
export default function FacebookFormatter() {
  // ── Editor State & Hooks (same as LinkedIn formatter) ──
  const [text, setText] = useState('');
  const [history, setHistory] = useState({ past: [], present: '', future: [] });
  const [font, setFont] = useState(FONT_FAMILIES[0]);
  const [view, setView] = useState('desktop');
  const [readRec, setReadRec] = useState('');
  const [readScore, setReadScore] = useState(0);
  const [readTime, setReadTime] = useState(1);
  const [expanded, setExpanded] = useState(false);
  const editorRef = useRef(null);
  const previewRef = useRef(null);
  // History (undo/redo)
  useEffect(() => setHistory(h => ({ ...h, present: text })), []);
  const push = newText => setHistory(({ past, present }) => ({
    past: [...past, present],
    present: newText,
    future: []
  }));
  const undo = () => setHistory(({ past, present, future }) => {
    if (!past.length) return { past, present, future };
    const prev = past[past.length - 1];
    return { past: past.slice(0, -1), present: prev, future: [present, ...future] };
  });
  const redo = () => setHistory(({ past, present, future }) => {
    if (!future.length) return { past, present, future };
    const nxt = future[0];
    return { past: [...past, present], present: nxt, future: future.slice(1) };
  });
  useEffect(() => setText(history.present), [history.present]);
  // Readability & Read Time
  useEffect(() => {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const sentences = text.split(/[.!?]+/).filter(Boolean).length || 1;
    const syllables = text.split(/\s+/)
      .reduce((a, w) => a + (w.match(/[aeiouy]{1,2}/g)||[]).length, 0);
    const raw = 206.835 - 1.015*(words/sentences) - 84.6*(syllables/words);
    const score = Math.max(0, Math.min(100, Math.round(raw)));
    setReadScore(score);
    setReadRec(score >= 80 ? 'Super Easy' :
               score >= 60 ? 'Perfect' :
               score >= 40 ? 'Getting Harder' : 'Super Hard');
    setReadTime(Math.max(1, Math.ceil(words/200)));
  }, [text]);
  // Keyboard Shortcuts
  useEffect(() => {
    const onKey = e => {
      if ((e.ctrlKey||e.metaKey) && !e.altKey) {
        switch (e.key.toLowerCase()) {
          case 'b': apply('bold'); e.preventDefault(); break;
          case 'i': apply('italic'); e.preventDefault(); break;
          case 'u': apply('underline'); e.preventDefault(); break;
          case 's': if (e.shiftKey) apply('strikethrough'); e.preventDefault(); break;
          case 'z': e.shiftKey?redo():undo(); e.preventDefault(); break;
          case 'e': copyText(); e.preventDefault(); break;
        }
      }
      if (e.key === 'Tab') {
        e.preventDefault();
        const ta = editorRef.current, s = ta.selectionStart;
        setText(t => t.slice(0,s)+'    '+t.slice(ta.selectionEnd));
        setTimeout(()=>ta.setSelectionRange(s+4,s+4),0);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [text, history]);
  // Scroll Sync
  const handleScroll = e => previewRef.current && (previewRef.current.scrollTop = e.target.scrollTop);
  // Apply formatting / lists / links
  const apply = async style => {
    const ta = editorRef.current, start = ta.selectionStart, end = ta.selectionEnd;
    if (start === end) return;
    let sel = text.slice(start, end);
    if (style === 'bullet') {
      sel = sel.split('\n').map(l => '• '+l).join('\n');
    } else if (style === 'numbered') {
      sel = sel.split('\n').map((l,i)=>`${i+1}. ${l}`).join('\n');
    } else if (style === 'link') {
      const url = prompt('Enter URL:');
      if (!url) return;
      sel = `[${sel}](${url})`;
    } else {
      try {
        const res = await fetch('/api/format',{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({ text:sel, style })
        });
        sel = (await res.json()).styled;
      } catch {
        alert('Formatting failed');
        return;
      }
    }
    const updated = text.slice(0,start) + sel + text.slice(end);
    push(updated);
    setTimeout(() => {
      ta.setSelectionRange(start, start+sel.length);
      ta.focus();
    }, 0);
  };
  const clearAll = () => push('');
  const copyText = () => {
    if (!text) return alert('Nothing to copy!');
    navigator.clipboard.writeText(text).then(()=>alert('Copied!'));
  };
  // ─── Render ───
  return (
    <main className="pt-[140px] bg-[#5E788F]/85 rounded-none">
      <Navbar/>
           <h2 className='text-center text-[#3c4e5e] text-[50px] mb-6 font-bold'>Facebook Text Fomatter</h2>
      <div className="editor-preview max-w-[85%] mx-auto py-[16px]">
        {/** Editor Pane **/}
        <section className="editor-card ">
                 <textarea
                  rows="9" cols="30"
                   ref={editorRef}
                   className="editor-text"
                   style={{ fontFamily: font }}
                   placeholder="Write your post..."
                   value={text}
                   onChange={e => { push(e.target.value); handleScroll(e); }}
                   onScroll={handleScroll}
                 />
                 <div className="toolbar-bottom modern-toolbar">
                   {/* <div className="font-picker-wrapper">
                     <select
                       value={font}
                       onChange={e => setFont(e.target.value)}
                       className="font-picker"
                     >
                       {FONT_FAMILIES.map(f => <option key={f} value={f}>{f.split(',')[0]}</option>)}
                     </select>
                   </div> */}
                   {TOOL_STYLES.map(s => (
                     <button key={s} onClick={() => apply(s)} className="tool-btn">
                       {ICON_MAP[s]}
                     </button>
                   ))}
       
                   <button onClick={undo} className="tool-btn">↺</button>
                   <button onClick={redo} className="tool-btn">↻</button>
                   <button onClick={clearAll} className='cursor-pointer transition-transform duration-200 transform bg-blue-500 rounded-lg my-2 p-1 w-[115px] h-8 flex justify-center items-center gap-2'><CiEraser className='text-xl'/><span>Clear</span></button>
                   <button onClick={copyText} className='cursor-pointer transition-transform duration-200 transform bg-[#F1813B] rounded-lg my-2 p-1 w-[115px] flex justify-center items-center gap-2'><RxCopy/><span>Copy</span></button>
                 </div>
                 <div className='grid grid-cols-2 justify-evenly gap-3'>
                   
       
                 </div>
               </section>
        {/** Facebook‐style Preview Pane **/}
        <section className="preview-card">
          <div className="device-toggle">
            <button onClick={()=>{setView('mobile');setExpanded(false);}} className={view==='mobile'?'active':''}>
              <IconMobile size={15}/>
            </button>
            <button onClick={()=>{setView('tablet');setExpanded(false);}} className={view==='tablet'?'active':''}>
              <IconTablet size={15}/>
            </button>
            <button onClick={()=>{setView('desktop');setExpanded(false);}} className={view==='desktop'?'active':''}>
              <IconDesktop size={15}/>
            </button>
          </div>
          <div
            ref={previewRef}
            className={`preview-container device-${view}`}
            style={{ fontFamily: font }}
          >
            <div className="facebook-post">
              <div className="fb-header">
                <img src={logo.src} alt="QCS Logo" className="avatar-img"/>
                <div>
                  <strong>QuantumCrafters Studio</strong>
                  <span>Just now · Public</span>
                </div>
              </div>
              <div className="fb-content">
                {!expanded && text.length>TRUNCATE_LIMIT
                  ? <>
                      {text.slice(0,TRUNCATE_LIMIT)}…{' '}
                      <button className="read-more" onClick={()=>setExpanded(true)}>
                        See more
                      </button>
                    </>
                  : text
                }
              </div>
              <div className="fb-stats">
                <span>👍 100</span>
                <span>· 20 Comments</span>
                <span>· 5 Shares</span>
              </div>
              <div className="fb-actions">
                <button><IconLike size={16}/> Like</button>
                <button><IconComment size={16}/> Comment</button>
                <button><IconShare size={16}/> Share</button>
                <button><IconSend size={16}/> Send</button>
              </div>
              <div className="post-footer">
                <span>{readRec} ({readScore}) • {readTime} min read</span>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="mainContainer font-syne relative bg-[url(/images/homeImages/grain.png)] bg-cover bg-no-repeat w-full min-h-[60vh] overflow-hidden mt-20">
        <div className="bg-[#5E788F]/85 py-10"><Footer/></div>
      </div>
    </main>
  );
}
