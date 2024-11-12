import MarkdownViewer from '../components/MarkdownViewer';
import React, {useState} from 'react'
import Editor from '../components/Editor';

const Arena = () => {
  const [filePath, setFilePath] = useState('/question.md')

  const handleFileChange = (e) => {
    setFilePath(e.target.value)
  }

  return (
    <div className='w-full h-screen flex flex-col text-white bg-slate-950'>
      <nav className='h-[80px] flex items-center px-4'>
        <h1 className="text-2xl mb-4">Markdown Viewer</h1>

        <label htmlFor="markdown-file" className="mr-2">Select Markdown File:</label>
        <select
          id="markdown-file"
          value={filePath}
          onChange={handleFileChange}
          className="mb-4 p-2 border text-black">
          <option value="/question.md">question.md</option>
          <option value="/question2.md">question2.md</option>
        </select>
      </nav>
      <main className='flex-1 flex overflow-hidden'>
        <MarkdownViewer filePath={filePath}/>
        <Editor/>
      </main>
    </div>
  )
}

export default Arena