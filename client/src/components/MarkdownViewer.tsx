// MarkdownViewer.tsx
import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

type MarkdownViewerProps = {
  filePath: string
}

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ filePath }) => {
  const [markdownContent, setMarkdownContent] = useState<string>('')
  const [width, setWidth] = useState(500) // Set initial width in pixels
  const [isResizing, setIsResizing] = useState(false)
  const [startWidth, setStartWidth] = useState(width)
  const [startX, setStartX] = useState(0)

  useEffect(() => {
    fetch(filePath)
      .then((response) => response.text())
      .then((text) => setMarkdownContent(text))
      .catch((error) => console.error('Error loading markdown:', error))
  }, [filePath])

  // Handle mouse down on the resizable handle
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true)
    setStartWidth(width)
    setStartX(e.clientX) // Record the starting mouse position
  }

  // Handle mouse move to resize only horizontally
  const handleMouseMove = (e: MouseEvent) => {
    if (isResizing) {
      const newWidth = startWidth + (e.clientX - startX) // Calculate new width
      setWidth(Math.max(200, newWidth)) // Optional: Set a minimum width of 200px
    }
  }

  // Handle mouse up to stop resizing
  const handleMouseUp = () => {
    setIsResizing(false)
  }

  // Attach and detach event listeners for resizing
  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    } else {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isResizing])

  return (
    <div className="flex items-start">
      <div
        className="prose prose-lg max-w-none"
        style={{ width: `${width}px` }}
      >
        <ReactMarkdown
          children={markdownContent}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <SyntaxHighlighter
                  style={materialDark} // Apply Material Dark theme
                  language={match[1]}
                  PreTag="div"
                  {...props}
                  customStyle={{
                    fontSize: '0.875rem', // Adjust font size for readability
                    padding: '0.5rem', // Add padding for a cleaner look
                    borderRadius: '0.25rem', // Rounded corners
                  }}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={`${className} p-1 bg-gray-100 rounded`} {...props}>
                  {children}
                </code>
              )
            },
          }}
        />
      </div>
      {/* Resizable handle */}
      <div
        onMouseDown={handleMouseDown}
        style={{
          width: '10px',
          cursor: 'ew-resize',
          backgroundColor: 'transparent',
          height: '100%',
          position: 'relative',
          right: '5px',
        }}
      />
    </div>
  )
}

export default MarkdownViewer
