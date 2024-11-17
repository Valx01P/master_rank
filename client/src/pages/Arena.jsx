import MarkdownViewer from '../components/MarkdownViewer'
import React, {useState} from 'react'
import CodeEditor from '../components/CodeEditor'
import WhiteboardPopup from '../components/WhiteboardPopup'
import SettingsPopup from '../components/SettingsPopup'
import { useDispatch, useSelector } from 'react-redux'
import { toggleDarkMode } from '../store/state/theme.slice'

const Arena = () => {
  const [filePath, setFilePath] = useState('/question.md')
  const [activePopup, setActivePopup] = useState('') // whiteboard, share, settings
  const darkMode = useSelector((state) => state.theme.darkMode)
  const dispatch = useDispatch()

  const handlePopup = (popupName) => {
    setActivePopup((prevPopup) => (prevPopup === popupName ? '' : popupName))
  }

  const handleFileChange = (e) => {
    setFilePath(e.target.value)
  }

  const closePopup = () => {
    setActivePopup('')
  }

  return (
    // APP CONTAINER
    <div className={`w-full h-screen flex flex-col`}>
    {/* NAVBAR */}
      <nav className='h-[50px] w-full flex items-center px-4 flex-row justify-between'>
        <div className='flex items-center flex-row w-1/3'>
          <h1 className="text-2xl mb-2">∑&nbsp;</h1>
          <h1 className="text-2xl mb-1">Script Phi</h1>
        </div>

        <div className='flex flex-row gap-10 w-1/3 justify-center'>
          {/* shuffle */}
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shuffle"><path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22"/><path d="m18 2 4 4-4 4"/><path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2"/><path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8"/><path d="m18 14 4 4-4 4"/></svg>
          </button>
          
          {/* whiteboard */}
          <button onClick={() => handlePopup("whiteboard")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-presentation"><path d="M2 3h20"/><path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"/><path d="m7 21 5-5 5 5"/></svg>        
          </button>

          {/* Dark mode switcher */}
          <button onClick={() => dispatch(toggleDarkMode())}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
          </button>

          {/* settings */}
          <button onClick={() => handlePopup("settings")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
        </div>

        <div className='w-1/3 flex justify-end'>
          <button className="py-4 flex flex-row gap-4 text-2xl font-bold items-center arena-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-swords"><polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" x2="19" y1="19" y2="13"/><line x1="16" x2="20" y1="16" y2="20"/><line x1="19" x2="21" y1="21" y2="19"/><polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5"/><line x1="5" x2="9" y1="14" y2="18"/><line x1="7" x2="4" y1="17" y2="20"/><line x1="3" x2="5" y1="19" y2="21"/></svg>
           Enter Co-op Arena
          </button>
        </div>

        {/* <label htmlFor="markdown-file" className="mr-2">Select Markdown File:</label>
        <select
          id="markdown-file"
          value={filePath}
          onChange={handleFileChange}
          className="mb-4 p-2 border text-black">
          <option value="/question.md">question.md</option>
          <option value="/question2.md">question2.md</option>
        </select> */}
      </nav>
      <main className='flex-1 flex overflow-hidden'>
        <MarkdownViewer filePath={filePath}/>
        <CodeEditor />
      </main>
      {/* Conditionally render popups */}
      {activePopup === 'whiteboard' && <WhiteboardPopup onClose={closePopup} />}
      {activePopup === 'styling' && <StylingPopup onClose={closePopup} />}
      {activePopup === 'settings' && <SettingsPopup onClose={closePopup} />}
    </div>
  )
}

export default Arena