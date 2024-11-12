import ResizablePanel from "./ResizablePanel"
import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

const MarkdownViewer = ({ filePath }) => {
  const [markdownContent, setMarkdownContent] = useState('')

  useEffect(() => {
    fetch(filePath)
      .then((response) => response.text())
      .then((text) => setMarkdownContent(text))
      .catch((error) => console.error('Error loading markdown:', error))
    }, [filePath])

  return (
    <ResizablePanel direction="right" className="bg-white" initialWidth={40}>
      <div className="flex items-start">
        <div className="prose prose-lg max-w-none p-4">
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
                    fontSize: '0.875rem', // adjust font size for readability
                    padding: '0.5rem', // add padding for a cleaner look
                    borderRadius: '0.25rem', // rounded corners
                  }}
                >
                {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              )
              :
              (
                <code className={`${className} p-1 bg-gray-100 rounded`} {...props}>
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