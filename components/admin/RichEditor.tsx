'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import { useEffect } from 'react'
import { cn } from '@/lib/utils'
import { useAdminTheme } from '@/app/admin/(panel)/_components/AdminThemeProvider'
import {
  Bold, Italic, Heading2, Heading3, List, ListOrdered,
  Quote, Minus, Undo, Redo, Link2, Image as ImageIcon,
} from 'lucide-react'

interface RichEditorProps {
  value: string
  onChange: (html: string) => void
  placeholder?: string
}

export function RichEditor({ value, onChange, placeholder = 'Escreva o conteúdo do artigo...' }: RichEditorProps) {
  const { theme } = useAdminTheme()
  const dark = theme === 'dark'

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ inline: false, allowBase64: true }),
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: cn(
          'prose max-w-none min-h-[420px] px-6 py-5 outline-none focus:outline-none',
          'prose-headings:font-bold prose-headings:tracking-tight',
          dark
            ? 'prose-invert prose-p:text-white/80 prose-headings:text-white'
            : 'prose-p:text-gray-700 prose-headings:text-gray-900'
        ),
      },
    },
  })

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, { emitUpdate: false })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  if (!editor) return null

  function addImage() {
    const url = window.prompt('URL da imagem:')
    if (url) editor?.chain().focus().setImage({ src: url }).run()
  }

  function setLink() {
    const url = window.prompt('URL do link:')
    if (url) editor?.chain().focus().setLink({ href: url }).run()
    else editor?.chain().focus().unsetLink().run()
  }

  const toolbarBtn = (active: boolean) => cn(
    'flex items-center justify-center w-8 h-8 rounded-md text-sm transition-colors',
    active
      ? dark ? 'bg-white/15 text-white' : 'bg-gray-200 text-gray-900'
      : dark ? 'text-white/40 hover:text-white hover:bg-white/8' : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'
  )

  return (
    <div className={cn('rounded-xl border overflow-hidden', dark ? 'border-white/8 bg-white/3' : 'border-gray-200 bg-white')}>
      <div className={cn('flex flex-wrap items-center gap-0.5 px-3 py-2 border-b', dark ? 'border-white/8' : 'border-gray-200')}>
        <button type="button" onClick={() => editor.chain().focus().undo().run()} className={toolbarBtn(false)} title="Desfazer"><Undo className="w-3.5 h-3.5" /></button>
        <button type="button" onClick={() => editor.chain().focus().redo().run()} className={toolbarBtn(false)} title="Refazer"><Redo className="w-3.5 h-3.5" /></button>
        <div className={cn('w-px h-5 mx-1', dark ? 'bg-white/10' : 'bg-gray-200')} />
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={toolbarBtn(editor.isActive('bold'))} title="Negrito"><Bold className="w-3.5 h-3.5" /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={toolbarBtn(editor.isActive('italic'))} title="Itálico"><Italic className="w-3.5 h-3.5" /></button>
        <div className={cn('w-px h-5 mx-1', dark ? 'bg-white/10' : 'bg-gray-200')} />
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={toolbarBtn(editor.isActive('heading', { level: 2 }))} title="H2"><Heading2 className="w-3.5 h-3.5" /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={toolbarBtn(editor.isActive('heading', { level: 3 }))} title="H3"><Heading3 className="w-3.5 h-3.5" /></button>
        <div className={cn('w-px h-5 mx-1', dark ? 'bg-white/10' : 'bg-gray-200')} />
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={toolbarBtn(editor.isActive('bulletList'))} title="Lista"><List className="w-3.5 h-3.5" /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={toolbarBtn(editor.isActive('orderedList'))} title="Lista numerada"><ListOrdered className="w-3.5 h-3.5" /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={toolbarBtn(editor.isActive('blockquote'))} title="Citação"><Quote className="w-3.5 h-3.5" /></button>
        <button type="button" onClick={() => editor.chain().focus().setHorizontalRule().run()} className={toolbarBtn(false)} title="Divisor"><Minus className="w-3.5 h-3.5" /></button>
        <div className={cn('w-px h-5 mx-1', dark ? 'bg-white/10' : 'bg-gray-200')} />
        <button type="button" onClick={setLink} className={toolbarBtn(editor.isActive('link'))} title="Link"><Link2 className="w-3.5 h-3.5" /></button>
        <button type="button" onClick={addImage} className={toolbarBtn(false)} title="Imagem"><ImageIcon className="w-3.5 h-3.5" /></button>
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}
