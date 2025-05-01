'use client';

import Footer from '@/components/HomeComponent/Footer/Footer';
import Navbar from '@/components/HomeComponent/NavbarHome/NavbarHome';
import { useState, useRef } from 'react';

export default function LinkedInFormatter() {
    const [text, setText] = useState('');
    const editorRef = useRef(null);

    const showToast = (msg) => alert(msg);

    const applyStyle = async (style) => {
        const textarea = editorRef.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        if (start === end) return showToast('⚠️ Please select some text first');

        try {
            const selectedText = text.slice(start, end);

            const response = await fetch('/api/editor', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: selectedText, style }),
            });

            if (!response.ok) throw new Error('❌ Style application failed');

            const data = await response.json();
            const newText = text.slice(0, start) + data.styled + text.slice(end);

            setText(newText);

            setTimeout(() => {
                textarea.setSelectionRange(start, start + data.styled.length);
                textarea.focus();
            }, 0);
        } catch (error) {
            showToast(error.message || 'An error occurred');
        }
    };

    return (
        <>
            <div className="bg-[#5E788F]/85">
                <Navbar />

                <div className='pt-[160px]'>
                    <div className="max-w-5xl mx-auto px-6 py-12   backdrop-blur-xl bg-white/60 border border-white/20 shadow-2xl rounded-3xl relative z-10">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-[#19263D] drop-shadow-sm">
                            LinkedIn Text Formatter
                        </h1>
                        <p className="text-center text-gray-600 mt-2 mb-8 text-lg">
                            ✨ Format your LinkedIn posts beautifully and effortlessly
                        </p>

                        <div className="flex flex-col lg:flex-row gap-6">
                            <textarea
                                ref={editorRef}
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className="w-full lg:w-1/2 h-64 resize-none rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none p-4 font-medium shadow-md bg-white/80"
                                placeholder="✍️ Write your LinkedIn post here..."
                            />
                            <div className="w-full lg:w-1/2 h-64 overflow-y-auto rounded-xl border border-gray-300 bg-gray-100/70 p-4 shadow-inner font-medium whitespace-pre-wrap text-gray-800">
                                <pre>{text}</pre>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-center gap-4 mt-10">
                            {[
                                { style: 'bold', label: '𝗕𝗼𝗹𝗱' },
                                { style: 'italic', label: '𝘐𝘵𝘢𝘭𝘪𝘤' },
                                { style: 'script', label: '𝓢𝓬𝓻𝓲𝓹𝓽' },
                                { style: 'monospace', label: '𝙼𝚘𝚗𝚘𝚜𝚙𝚊𝚌𝚎' },
                                { style: 'smallcaps', label: 'ꜱᴍᴀʟʟ ᴄᴀᴘꜱ' },
                            ].map(({ style, label }) => (
                                <button
                                    key={style}
                                    onClick={() => applyStyle(style)}
                                    className="px-5 py-2 rounded-full text-sm font-semibold bg-white border border-blue-300 text-blue-700 hover:bg-blue-50 hover:shadow transition-all"
                                >
                                    {label}
                                </button>
                            ))}

                            <button
                                onClick={() => setText('')}
                                className="px-5 py-2 rounded-full text-sm font-semibold bg-red-100 text-red-700 border border-red-300 hover:bg-red-200 hover:shadow transition"
                            >
                                Clear
                            </button>
                            <button
                                onClick={() => navigator.clipboard.writeText(text)}
                                className="px-5 py-2 rounded-full text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg transition"
                            >
                                Copy to Clipboard
                            </button>
                        </div>
                    </div>
                </div>

                {/* Background Grain and Footer */}
                <div className="mainContainer font-syne relative bg-[url(/images/homeImages/grain.png)] bg-cover bg-no-repeat w-full min-h-[60vh] overflow-hidden mt-20">
                    <div className="bg-[#5E788F]/85 py-10">
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    );
}
