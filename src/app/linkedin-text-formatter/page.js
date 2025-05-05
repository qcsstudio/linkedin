"use client"
import React, { useState, useEffect, useRef } from 'react';        // ← include React & hooks
import { FONT_FAMILIES } from '@/libs/fontFamilies';
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
  ThumbsUp as IconLike,           // LinkedIn “Like” icon
  MessageCircle as IconComment,   // LinkedIn “Comment” icon
  Repeat as IconRepost,           // LinkedIn “Repost” icon
  Send as IconSend                // LinkedIn “Send” icon
} from 'lucide-react';
import Navbar from '@/components/HomeComponent/NavbarHome/NavbarHome';
import Footer from '@/components/HomeComponent/Footer/Footer';
import logo from "../../../public/images/qcs.png"

const TOOL_STYLES = [
  'bold', 'italic', 'underline', 'strikethrough', 'bolditalic',
  'script', 'monospace', 'smallcaps', 'doublestruck', 'fraktur',
  'squared', 'subscript', 'superscript', 'link', 'bullet', 'numbered'
];
const ICON_MAP = {
  bold: <IconBold size={20} />,
  italic: <IconItalic size={20} />,
  underline: <IconUnderline size={20} />,
  strikethrough: <IconStrike size={20} />,
  bolditalic: <><IconBold size={16} /> <IconItalic size={16} /></>,
  script: <span className="icon-script">𝓐</span>,
  monospace: <IconCode size={20} />,
  smallcaps: <span className="icon-smallcaps">ᴅ</span>,
  doublestruck: <span className="icon-ds">𝔸</span>,
  fraktur: <span className="icon-fraktur">𝔉</span>,
  squared: <span className="icon-sq">🄰</span>,
  subscript: <IconSubscript size={20} />,
  superscript: <IconSuperscript size={20} />,
  link: <IconLink size={20} />,
  bullet: <IconBullet size={20} />,
  numbered: <IconNumbered size={20} />
};
const TRUNCATE_LIMIT = 200;
export default function Home() {
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
      .reduce((a, w) => a + (w.match(/[aeiouy]{1,2}/g) || []).length, 0);
    const raw = 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words);
    const score = Math.max(0, Math.min(100, Math.round(raw)));
    setReadScore(score);
    setReadRec(
      score >= 80 ? 'Super Easy' :
        score >= 60 ? 'Perfect' :
          score >= 40 ? 'Getting Harder' : 'Super Hard'
    );
    setReadTime(Math.max(1, Math.ceil(words / 200)));
  }, [text]);
  // Keyboard Shortcuts
  useEffect(() => {
    const onKey = e => {
      if ((e.ctrlKey || e.metaKey) && !e.altKey) {
        switch (e.key.toLowerCase()) {
          case 'b': apply('bold'); e.preventDefault(); break;
          case 'i': apply('italic'); e.preventDefault(); break;
          case 'u': apply('underline'); e.preventDefault(); break;
          case 's': if (e.shiftKey) apply('strikethrough'); e.preventDefault(); break;
          case 'z': e.shiftKey ? redo() : undo(); e.preventDefault(); break;
          case 'e': copyText(); e.preventDefault(); break;
        }
      }
      if (e.key === 'Tab') {
        e.preventDefault();
        const ta = editorRef.current, s = ta.selectionStart;
        setText(t => t.slice(0, s) + '    ' + t.slice(ta.selectionEnd));
        setTimeout(() => ta.setSelectionRange(s + 4, s + 4), 0);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [text, history]);
  // Scroll Sync
  const handleScroll = e => {
    if (previewRef.current) previewRef.current.scrollTop = e.target.scrollTop;
  };
  // Apply formatting or lists
  const apply = async style => {
    const ta = editorRef.current, start = ta.selectionStart, end = ta.selectionEnd;
    if (start === end) return;
    let sel = text.slice(start, end);
    // Lists
    if (style === 'bullet') {
      sel = sel.split('\n').map(l => '• ' + l).join('\n');
    } else if (style === 'numbered') {
      sel = sel.split('\n').map((l, i) => `${i + 1}. ${l}`).join('\n');
    } else {
      try {
        const res = await fetch('/api/format', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: sel, style })
        });
        sel = (await res.json()).styled;
      } catch {
        alert('Formatting failed');
        return;
      }
    }
    const updated = text.slice(0, start) + sel + text.slice(end);
    push(updated);
    setTimeout(() => {
      ta.setSelectionRange(start, start + sel.length);
      ta.focus();
    }, 0);
  };
  const clearAll = () => push('');
  const copyText = () => {
    if (!text) return alert('Nothing to copy!');
    navigator.clipboard.writeText(text).then(() => alert('Copied!'));
  };
  return (
    <main className=" pt-[200px] bg-[#5E788F]/85">
      <Navbar />
      <header className="header max-w-[85%] mx-auto">
        <h1>LinkedIn Text Formatter</h1>
      
      </header>
      <div className="editor-preview max-w-[85%] mx-auto py-[20px]">
        <section className="editor-card">
          <textarea
            ref={editorRef}
            className="editor-text"
            style={{ fontFamily: font }}
            placeholder="Write your post..."
            value={text}
            onChange={e => { push(e.target.value); handleScroll(e); }}
            onScroll={handleScroll}
          />
          <div className="toolbar-bottom modern-toolbar">
            <div className="font-picker-wrapper">
              <select
                value={font}
                onChange={e => setFont(e.target.value)}
                className="font-picker"
              >
                {FONT_FAMILIES.map(f => <option key={f} value={f}>{f.split(',')[0]}</option>)}
              </select>
            </div>
            {TOOL_STYLES.map(s => (
              <button key={s} onClick={() => apply(s)} className="tool-btn">
                {ICON_MAP[s]}
              </button>
            ))}
            <button onClick={undo} className="tool-btn">↺</button>
            <button onClick={redo} className="tool-btn">↻</button>
            <button onClick={clearAll} className="tool-btn clear-btn">Clear</button>
            <button onClick={copyText} className="tool-btn copy-btn">Copy</button>
          </div>
        </section>
        <section className="preview-card">
          <div className="device-toggle">
            <button onClick={() => { setView('mobile'); setExpanded(false); }} className={view === 'mobile' ? 'active' : ''}>
              <IconMobile />
            </button>
            <button onClick={() => { setView('tablet'); setExpanded(false); }} className={view === 'tablet' ? 'active' : ''}>
              <IconTablet />
            </button>
            <button onClick={() => { setView('desktop'); setExpanded(false); }} className={view === 'desktop' ? 'active' : ''}>
              <IconDesktop />
            </button>
          </div>
          <div
            ref={previewRef}
            className={`preview-container device-${view}`}
            style={{ fontFamily: font }}
          >
            <div className="linkedin-post">
              <div className="post-header">
                <img src={logo.src} alt="QCS Logo" className="avatar-img" />
                <div>
                  <strong>QuantumCrafters Studio</strong>
                  <span>Elevate with QCS · 12h</span>
                </div>
              </div>
              <div className="post-content">
                {!expanded && text.length > TRUNCATE_LIMIT
                  ? <> {text.slice(0, TRUNCATE_LIMIT)}... <button className="read-more" onClick={() => setExpanded(true)}>Read more</button> </>
                  : <>{text}</>
                }
              </div>
              <div className="post-stats">
                <span className="reactions">👍 ❤️ 🏅 253</span>
                <span className="comments-reposts">28 comments · 56 reposts</span>
              </div>
              <div className="post-actions">
                <button className="action-btn"><IconLike size={16} /> <span>Like</span></button>
                <button className="action-btn"><IconComment size={16} /> <span>Comment</span></button>
                <button className="action-btn"><IconRepost size={16} /> <span>Repost</span></button>
                <button className="action-btn"><IconSend size={16} /> <span>Send</span></button>
              </div>
              <div className="post-footer">
                <span>{readRec} ({readScore}) • {readTime} min read</span>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="mainContainer font-syne relative bg-[url(/images/homeImages/grain.png)] bg-cover bg-no-repeat w-full min-h-[60vh] overflow-hidden mt-20">
        <div className="bg-[#5E788F]/85 py-10">
          <Footer />
        </div>
      </div>
    </main>
  );
}
