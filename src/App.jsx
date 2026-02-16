import { useState } from 'react';
import { ChevronDown, Search, GraduationCap, Terminal, Github, Menu } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { allSections } from './data';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSection, setSelectedSection] = useState(() => {
    const saved = localStorage.getItem('lastLinuxSectionId');
    return saved ? allSections.find(s => s.id === saved) : null;
  });

  const filteredSections = allSections.filter(section => {
    const searchLower = searchTerm.toLowerCase();
    return (
      section.title.toLowerCase().includes(searchLower) ||
      section.content.toLowerCase().includes(searchLower)
    );
  });

  const handlePageChange = (section) => {
    setSelectedSection(section);
    setIsSidebarOpen(false);
    if (section) localStorage.setItem('lastLinuxSectionId', section.id);
  };

  return (
    <div className="flex h-screen w-screen bg-[#0f172a] text-white font-sans overflow-hidden">

      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-[#1e293b] border-r border-slate-800 transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex flex-col h-full p-6">
          <div className="mb-8 cursor-pointer text-center" onClick={() => handlePageChange(null)}>
            <h1 className="text-xl font-black tracking-widest uppercase">LINUX REHBERİ</h1>
            <p className="text-[10px] text-[#FF6B35] font-bold tracking-[0.3em] uppercase">YAVUZ BARIŞ ÖZGÜN</p>
          </div>

          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Ara..."
              className="w-full bg-[#0f172a] border border-slate-700 rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-[#FF6B35]"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <nav className="flex-1 overflow-y-auto space-y-1 text-white">
            {filteredSections.map((section) => (
              <button
                key={section.id}
                onClick={() => handlePageChange(section)}
                className={`w-full text-left px-4 py-2 rounded text-sm transition-colors ${selectedSection?.id === section.id ? 'bg-[#FF6B35] text-white font-bold' : 'text-slate-400 hover:bg-slate-800'}`}
              >
                {String(section.sortOrder).padStart(2, '0')} - {section.title}
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-slate-800">
            <a href="https://github.com/BozgunBer-2506" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-400 hover:text-[#FF6B35] transition-colors mb-2 group">
              <Github size={18} />
              <span className="font-black tracking-tighter text-lg italic">The_Bozgun</span>
            </a>
            <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">Copyright 2026</p>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-[#0f172a] scroll-smooth">
        {selectedSection ? (
          <article className="max-w-3xl mx-auto px-6 py-16">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                h1: ({ children }) => <h1 className="text-4xl font-black mb-12 border-b border-slate-800 pb-8">{children}</h1>,
                h2: ({ children }) => <h2 className="text-2xl font-bold mt-12 mb-6 border-b border-slate-800 pb-2 italic">{children}</h2>,
                h3: ({ children }) => <h3 className="text-xl font-bold text-[#FF6B35] mt-8 mb-4">{children}</h3>,
                p: ({ children }) => <p className="text-slate-300 mb-6 text-lg leading-relaxed">{children}</p>,
                code({ inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <SyntaxHighlighter style={atomDark} language={match[1]} PreTag="div" {...props}>
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className="bg-slate-800 text-[#FF6B35] px-1.5 py-0.5 rounded font-mono text-sm" {...props}>{children}</code>
                  );
                },
                details: ({ children }) => <details className="bg-slate-800/30 border border-slate-700 rounded-lg p-4 mb-6">{children}</details>,
                summary: ({ children }) => (
                  <summary className="font-black text-[#FF6B35] cursor-pointer text-sm flex justify-between items-center list-none">
                    <div className="flex items-center gap-2"><GraduationCap size={18} /> {children}</div>
                    <ChevronDown size={18} />
                  </summary>
                )
              }}
            >
              {selectedSection.content}
            </ReactMarkdown>
          </article>
        ) : (
          <div className="h-full flex flex-col items-center justify-center p-8 text-center">
            <Terminal size={64} className="text-[#FF6B35] mb-6" />
            <h1 className="text-7xl lg:text-8xl font-black tracking-tighter">Linux</h1>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#FF6B35] mb-8 tracking-tight">Eğitim Rehberi</h2>
            <div className="w-24 h-1.5 bg-[#FF6B35] rounded-full mb-8 mx-auto"></div>
            <p className="text-slate-400 text-xl font-medium max-w-md">
              Menüden bir konu seçerek hemen başlayabilirsin.
            </p>
          </div>
        )}
      </main>

      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 right-4 bg-[#FF6B35] text-white px-4 py-2 rounded-lg shadow-lg z-[60] flex items-center gap-2 font-bold text-sm tracking-widest"
      >
        <Menu size={18} />
        <span>MENÜ</span>
      </button>
    </div>
  );
}

export default App;