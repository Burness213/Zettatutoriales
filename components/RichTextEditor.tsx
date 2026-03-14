"use client";

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Color from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import { Bold, Italic, Strikethrough, Code, Heading1, Heading2, List, ListOrdered, Quote, Undo, Redo, Palette } from 'lucide-react'

const colors = ['#ffffff', '#ff3333', '#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899', '#94a3b8'];

export function RichTextEditor({ content, onChange }: { content: string, onChange: (content: string) => void }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
    ],
    content,
    editorProps: {
      attributes: {
        class: 'prose prose-invert prose-p:text-white/60 prose-p:leading-relaxed prose-sm sm:prose-base m-5 focus:outline-none min-h-[200px]',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  })

  if (!editor) {
    return null
  }

  const MenuBar = () => {
    return (
      <div className="flex flex-wrap gap-2 p-3 bg-[#0a0a0f] border-b border-white/10 rounded-t-xl items-center sticky top-0 z-10">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`p-2 rounded-lg transition-colors ${editor.isActive('bold') ? 'bg-primary/20 text-primary' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
        >
          <Bold size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`p-2 rounded-lg transition-colors ${editor.isActive('italic') ? 'bg-primary/20 text-primary' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
        >
          <Italic size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={`p-2 rounded-lg transition-colors ${editor.isActive('strike') ? 'bg-primary/20 text-primary' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
        >
          <Strikethrough size={16} />
        </button>
        
        <div className="w-px h-6 bg-white/10 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded-lg transition-colors font-bold text-sm ${editor.isActive('heading', { level: 1 }) ? 'bg-primary/20 text-primary' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
        >
          H1
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded-lg transition-colors font-bold text-sm ${editor.isActive('heading', { level: 2 }) ? 'bg-primary/20 text-primary' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
        >
          H2
        </button>
        
        <div className="w-px h-6 bg-white/10 mx-1" />
        
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded-lg transition-colors ${editor.isActive('bulletList') ? 'bg-primary/20 text-primary' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
        >
          <List size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded-lg transition-colors ${editor.isActive('orderedList') ? 'bg-primary/20 text-primary' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
        >
          <ListOrdered size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded-lg transition-colors ${editor.isActive('blockquote') ? 'bg-primary/20 text-primary' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
        >
          <Quote size={16} />
        </button>

        <div className="w-px h-6 bg-white/10 mx-1" />

        <div className="flex gap-1 items-center px-2">
          <Palette size={16} className="text-slate-400 mr-1" />
          {colors.map(color => (
            <button
              key={color}
              type="button"
              onClick={() => editor.chain().focus().setColor(color).run()}
              className={`w-5 h-5 rounded-full border border-white/10 transition-transform ${editor.isActive('textStyle', { color }) ? 'scale-125 border-white' : 'hover:scale-110'}`}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
          <button
            type="button"
            onClick={() => editor.chain().focus().unsetColor().run()}
            className="text-xs ml-1 text-slate-400 hover:text-white px-1"
          >
            Clear
          </button>
        </div>

        <div className="flex-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 disabled:opacity-50"
        >
          <Undo size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 disabled:opacity-50"
        >
          <Redo size={16} />
        </button>
      </div>
    )
  }

  return (
    <div className="border border-white/10 rounded-xl bg-[#1A1A2E] overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition-all">
      <MenuBar />
      <EditorContent editor={editor} />
    </div>
  )
}
