'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function MarkdownEditor({ value, onChange, placeholder }: MarkdownEditorProps) {
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');

  const insertText = (before: string, after: string = '') => {
    const textarea = document.getElementById('markdown-input') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);
    onChange(newText);
    
    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  const insertImage = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      insertText(`![Image description](${url})`);
    }
  };

  const toolbar = [
    { label: 'Bold', action: () => insertText('**', '**'), icon: 'B', className: 'font-bold' },
    { label: 'Italic', action: () => insertText('*', '*'), icon: 'I', className: 'italic' },
    { label: 'Code', action: () => insertText('`', '`'), icon: '</>', className: 'font-mono text-sm' },
    { label: 'Quote', action: () => insertText('> '), icon: '"', className: 'text-lg' },
    { label: 'List', action: () => insertText('- '), icon: '•', className: 'text-lg' },
    { label: 'Heading', action: () => insertText('## '), icon: 'H', className: 'font-bold text-lg' },
    { label: 'Image', action: insertImage, icon: '🖼️', className: 'text-sm' },
  ];

  return (
    <div className="w-full h-full border border-gray-200 rounded-lg overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="border-b border-gray-200 p-3 bg-gray-50">
        <div className="flex flex-wrap gap-1">
          {toolbar.map((tool) => (
            <button
              key={tool.label}
              onClick={tool.action}
              title={tool.label}
              className={`px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-100 transition-colors ${tool.className}`}
            >
              {tool.icon}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile tabs */}
      <div className="md:hidden border-b border-gray-200">
        <div className="flex">
          <button
            className={`flex-1 py-2 px-4 text-sm font-medium ${
              activeTab === 'write'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
            onClick={() => setActiveTab('write')}
          >
            Write
          </button>
          <button
            className={`flex-1 py-2 px-4 text-sm font-medium ${
              activeTab === 'preview'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
            onClick={() => setActiveTab('preview')}
          >
            Preview
          </button>
        </div>
      </div>

      {/* Editor content */}
      <div className="flex h-96 md:h-[500px]">
        {/* Write pane */}
        <div className={`w-full md:w-1/2 ${activeTab === 'preview' ? 'hidden md:block' : ''}`}>
          <textarea
            id="markdown-input"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder || 'Write your markdown here...'}
            className="w-full h-full p-4 border-none outline-none resize-none font-mono text-sm leading-relaxed"
          />
        </div>

        {/* Divider (desktop only) */}
        <div className="hidden md:block w-px bg-gray-200" />

        {/* Preview pane */}
        <div className={`w-full md:w-1/2 overflow-y-auto ${activeTab === 'write' ? 'hidden md:block' : ''}`}>
          <div className="p-4">
            {value ? (
              <div className="prose prose-sm md:prose-base max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                  components={{
                    h1: ({ children, ...props }) => (
                      <h1 className="text-3xl font-bold text-gray-900 mb-4 mt-6 leading-tight border-b border-gray-200 pb-2" {...props}>
                        {children}
                      </h1>
                    ),
                    h2: ({ children, ...props }) => (
                      <h2 className="text-2xl font-semibold text-gray-800 mb-3 mt-6 leading-tight" {...props}>
                        {children}
                      </h2>
                    ),
                    h3: ({ children, ...props }) => (
                      <h3 className="text-xl font-medium text-gray-800 mb-2 mt-5 leading-tight" {...props}>
                        {children}
                      </h3>
                    ),
                    h4: ({ children, ...props }) => (
                      <h4 className="text-lg font-medium text-gray-700 mb-2 mt-4 leading-tight" {...props}>
                        {children}
                      </h4>
                    ),
                    h5: ({ children, ...props }) => (
                      <h5 className="text-base font-medium text-gray-700 mb-1 mt-3 leading-tight" {...props}>
                        {children}
                      </h5>
                    ),
                    h6: ({ children, ...props }) => (
                      <h6 className="text-sm font-medium text-gray-600 mb-1 mt-3 leading-tight uppercase tracking-wide" {...props}>
                        {children}
                      </h6>
                    ),
                    p: ({ children, ...props }) => (
                      <p className="text-gray-700 leading-relaxed mb-4" {...props}>
                        {children}
                      </p>
                    ),
                    img: ({ src, alt, ...props }) => (
                      <img
                        src={src}
                        alt={alt}
                        {...props}
                        className="max-w-full h-auto rounded-lg shadow-sm my-4"
                        loading="lazy"
                      />
                    ),
                    a: ({ href, children, ...props }) => (
                      <a
                        href={href}
                        {...props}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline font-medium"
                      >
                        {children}
                      </a>
                    ),
                    blockquote: ({ children, ...props }) => (
                      <blockquote
                        {...props}
                        className="border-l-4 border-blue-200 pl-4 py-2 my-4 bg-blue-50 italic text-gray-700"
                      >
                        {children}
                      </blockquote>
                    ),
                    code: ({ className, children, ...props }) => {
                      const match = /language-(\w+)/.exec(className || '');
                      return match ? (
                        <code className={`${className} text-sm`} {...props}>
                          {children}
                        </code>
                      ) : (
                        <code
                          className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono border"
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    },
                    pre: ({ children, ...props }) => (
                      <pre
                        className="bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-x-auto my-4 text-sm"
                        {...props}
                      >
                        {children}
                      </pre>
                    ),
                    ul: ({ children, ...props }) => (
                      <ul className="list-disc list-inside space-y-1 mb-4 text-gray-700" {...props}>
                        {children}
                      </ul>
                    ),
                    ol: ({ children, ...props }) => (
                      <ol className="list-decimal list-inside space-y-1 mb-4 text-gray-700" {...props}>
                        {children}
                      </ol>
                    ),
                    li: ({ children, ...props }) => (
                      <li className="leading-relaxed" {...props}>
                        {children}
                      </li>
                    ),
                    strong: ({ children, ...props }) => (
                      <strong className="font-semibold text-gray-900" {...props}>
                        {children}
                      </strong>
                    ),
                    em: ({ children, ...props }) => (
                      <em className="italic text-gray-800" {...props}>
                        {children}
                      </em>
                    ),
                    table: ({ children, ...props }) => (
                      <div className="overflow-x-auto my-4">
                        <table className="min-w-full border border-gray-200 rounded-lg" {...props}>
                          {children}
                        </table>
                      </div>
                    ),
                    th: ({ children, ...props }) => (
                      <th className="border border-gray-200 px-4 py-2 bg-gray-50 font-semibold text-left" {...props}>
                        {children}
                      </th>
                    ),
                    td: ({ children, ...props }) => (
                      <td className="border border-gray-200 px-4 py-2" {...props}>
                        {children}
                      </td>
                    ),
                  }}
                >
                  {value}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="text-gray-400 italic p-4">
                Preview will appear here as you type...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 