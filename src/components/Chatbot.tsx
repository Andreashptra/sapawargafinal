'use client'

import { useState, useRef, useEffect } from 'react'

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<{ from: string; text: string; time: string }[]>([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const chatRef = useRef<HTMLDivElement>(null)

  const now = () => new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })

  const scrollBottom = () => {
    setTimeout(() => { if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight }, 50)
  }

  const formatMsg = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>')

  const sendMessage = async (text?: string) => {
    const msg = (text || input).trim()
    if (!msg) return
    setMessages(prev => [...prev, { from: 'user', text: msg, time: now() }])
    setInput('')
    setTyping(true)
    scrollBottom()

    try {
      const res = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg }),
      })
      const data = await res.json()
      await new Promise(r => setTimeout(r, 600))
      setTyping(false)
      setMessages(prev => [...prev, { from: 'bot', text: data.reply, time: now() }])
    } catch {
      setTyping(false)
      setMessages(prev => [...prev, { from: 'bot', text: '⚠️ Maaf, terjadi kesalahan. Silakan coba lagi.', time: now() }])
    }
    scrollBottom()
  }

  return (
    <>
      {/* 3D-style Trigger */}
      <button
        onClick={() => setOpen(!open)}
        title="Tanya SI KUYUNG"
        className="fixed bottom-5 left-5 z-[99998] w-[72px] h-[72px] rounded-full bg-gradient-to-br from-primary to-primary-dark shadow-xl hover:shadow-2xl transition-all hover:scale-110 flex items-center justify-center group"
      >
        <div className="relative">
          {/* Helmet */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-10 h-5 bg-yellow-400 rounded-t-full border-b-2 border-yellow-500" />
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-red-500 rounded-full shadow-sm" />
          {/* Head */}
          <div className="w-9 h-9 bg-amber-200 rounded-full relative mt-2">
            {/* Eyes */}
            <div className="absolute top-3 left-2 w-2 h-2.5 bg-white rounded-full flex items-center justify-center">
              <div className="w-1 h-1 bg-gray-800 rounded-full group-hover:animate-bounce" />
            </div>
            <div className="absolute top-3 right-2 w-2 h-2.5 bg-white rounded-full flex items-center justify-center">
              <div className="w-1 h-1 bg-gray-800 rounded-full group-hover:animate-bounce" />
            </div>
            {/* Smile */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-3 h-1.5 border-b-2 border-red-400 rounded-b-full" />
          </div>
        </div>
        {/* Pulse */}
        <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 border-2 border-white rounded-full animate-pulse" />
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 left-5 w-[380px] max-w-[calc(100vw-40px)] z-[99999] rounded-2xl overflow-hidden shadow-2xl flex flex-col bg-white font-sans"
             style={{ height: 'min(520px, calc(100vh - 120px))' }}>
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary-dark p-4 flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <svg width="20" height="20" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
            </div>
            <div className="flex-1">
              <div className="text-white font-bold text-sm">SI KUYUNG</div>
              <div className="text-white/60 text-[10px]">Sistem Informasi Kunjungan & Layanan Warga • Online</div>
            </div>
            <button onClick={() => setOpen(false)} className="w-8 h-8 rounded-full bg-white/15 text-white flex items-center justify-center hover:bg-white/30 transition">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12" /></svg>
            </button>
          </div>

          {/* Messages */}
          <div ref={chatRef} className="flex-1 min-h-0 overflow-y-auto p-4 flex flex-col gap-3 bg-surface">
            {messages.length === 0 && (
              <div className="text-center py-6 px-3">
                <div className="text-4xl mb-2">🛡️</div>
                <div className="font-semibold text-dark text-sm">Halo! Saya SI KUYUNG</div>
                <div className="text-gray-400 text-xs mt-1 leading-relaxed">Sistem Informasi Kunjungan dan Layanan Warga Terpadu<br />Kecamatan Kebonagung. Ada yang bisa saya bantu?</div>
                <div className="flex flex-wrap gap-2 justify-center mt-4">
                  <button onClick={() => sendMessage('Cara membuat pengaduan')} className="bg-primary/5 text-primary border border-primary/20 rounded-full px-3 py-1.5 text-xs hover:bg-primary/10 transition">📝 Cara melapor</button>
                  <button onClick={() => sendMessage('Cara melacak pengaduan')} className="bg-primary/5 text-primary border border-primary/20 rounded-full px-3 py-1.5 text-xs hover:bg-primary/10 transition">🔍 Lacak aduan</button>
                  <button onClick={() => sendMessage('Cara mendaftar')} className="bg-primary/5 text-primary border border-primary/20 rounded-full px-3 py-1.5 text-xs hover:bg-primary/10 transition">📋 Cara daftar</button>
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={msg.from === 'user' ? 'self-end max-w-[80%]' : 'self-start max-w-[85%]'}>
                <div
                  className={msg.from === 'user'
                    ? 'bg-primary text-white px-4 py-2.5 rounded-2xl rounded-br-sm text-[13px] leading-relaxed'
                    : 'bg-white text-gray-700 px-4 py-2.5 rounded-2xl rounded-bl-sm text-[13px] leading-relaxed shadow-sm'
                  }
                  dangerouslySetInnerHTML={{ __html: formatMsg(msg.text) }}
                />
                <div className={`text-[10px] text-gray-400 mt-1 px-1 ${msg.from === 'user' ? 'text-right' : 'text-left'}`}>{msg.time}</div>
              </div>
            ))}

            {typing && (
              <div className="self-start">
                <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm flex gap-1.5">
                  <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-gray-100 flex gap-2 items-center flex-shrink-0">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Ketik pesan..."
              className="flex-1 border border-gray-200 rounded-full px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition"
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim()}
              className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 disabled:opacity-40 hover:bg-primary-dark transition"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
