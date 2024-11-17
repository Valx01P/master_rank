import ResizablePanel from "./ResizablePanel"
import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

const MarkdownViewer = ({ filePath }) => {
  const [markdownContent, setMarkdownContent] = useState('')
  const [size, setSize] = useState('medium') // Add size state

  // Define size classes for prose and code
  const sizeStyles = {
    small: {
      prose: 'prose-sm', // tailwind prose-sm
      code: '0.695rem' // 0.675rem for code font size
    },
    medium: {
      prose: 'prose-base', // tailwind default prose
      code: '0.775rem' // 0.775rem for code font size
    },
    large: {
      prose: 'prose-lg', // tailwind prose-lg
      code: '0.875rem' // 0.875rem for code font size
    }
  }

  useEffect(() => {
    fetch(filePath)
      .then((response) => response.text())
      .then((text) => setMarkdownContent(text))
      .catch((error) => console.error('Error loading markdown:', error))
    }, [filePath])

  return (
    <ResizablePanel direction="right" className="light" initialWidth={40}>

      {/* Add size controls */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-2">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Size:</span>
          {Object.keys(sizeStyles).map((sizeOption) => (
            <button
              key={sizeOption}
              onClick={() => setSize(sizeOption)}
              className={`px-3 py-1 text-sm rounded-md transition-colors
                ${size === sizeOption 
                  ? 'bg-slate-700 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
            >
              {sizeOption.charAt(0).toUpperCase() + sizeOption.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-start">
        <div className={`prose ${sizeStyles[size].prose} max-w-none p-4`}>
          <ReactMarkdown
            children={markdownContent}
            components={{
              code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match 
              ?
              (
                <SyntaxHighlighter
                  language={match[1]}
                  style={materialDark} // apply Material Dark theme
                  PreTag="div"
                  {...props}
                  customStyle={{
                    fontSize: sizeStyles[size].code, // adjust font size for readability, 0.875
                    padding: '0.5rem', // add padding for a cleaner look
                    borderRadius: '0.25rem', // rounded corners
                  }}
                >
                {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              )
              :
              (
                <code className={`${className} p-1 rounded`} {...props}>
                {children}
                </code>
              )
              },
            }}
          />
        </div>
      </div>
    </ResizablePanel>
  )
}
export default MarkdownViewer