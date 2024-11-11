// App.tsx
import React, { useState } from 'react'
import MarkdownViewer from './components/MarkdownViewer'

const App: React.FC = () => {
  const [filePath, setFilePath] = useState<string>('/question.md') // Default file

  const handleFileChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilePath(event.target.value)
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Markdown Viewer</h1>
      
      <label htmlFor="markdown-file" className="mr-2">Select Markdown File:</label>
      <select id="markdown-file" value={filePath} onChange={handleFileChange} className="mb-4 p-2 border">
        <option value="/question.md">question.md</option>
        <option value="/question2.md">question2.md</option>
      </select>

      <MarkdownViewer filePath={filePath} />
    </div>
  )
}

export default App
