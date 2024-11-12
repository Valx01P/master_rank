import EditorOutput from "./EditorOutput"
import { Editor } from "@monaco-editor/react"
import LanguageSelector from "./LanguageSelector"
import { useRef, useState } from "react"
import { CODE_SNIPPETS } from "../constants"

const CodeEditor = () => {
  const editorRef = useRef()
  const [value, setValue] = useState("")
  const [language, setLanguage] = useState("python")

  const onMount = (editor) => {
    editorRef.current = editor
    editor.focus()
  }

  const onSelect = (language) => {
    setLanguage(language)
    setValue(CODE_SNIPPETS[language])
  }


  return (
    <div className="flex-1 flex flex-col">
      <main className="bg-slate-800 flex-1 h-[75%] relative">
      <nav className="h-[50px] flex flex-row align-middle p-[5px]">
        <LanguageSelector language={language} setLanguage={setLanguage}/>
        <btn className="p-[20px] bg-slate-800 flex items-center">Run Code</btn>
      </nav>
      <div className="absolute inset-0 top-[50px] w-full h-full">
        <Editor
            options={{
              automaticLayout: true,
              minimap: {
                enabled: false,
              },
              scrollbar: {
                vertical: "visible",
                horizontal: "visible",
                verticalScrollbarSize: 16,
                horizontalScrollbarSize: 16,
                arrowSize: 12,
                useShadows: false,
              },
              wordWrap: "on",
              tabSize: 4,
              smoothScrolling: true,
              scrollBeyondLastLine: true,
              autoClosingBrackets: "always",
              autoClosingQuotes: "always",
              autoIndent: "full",
              formatOnType: true,
              formatOnPaste: true,
              lineNumbers: "on",
              fontSize: 16,
              fontFamily: "JetBrains Mono",
              fontLigatures: true,
              quickSuggestions: { other: true, comments: false, strings: false },
            }}
            className="monaco-editor"
            height="100%"
            width="100%"
            theme="vs-dark"
            language={language}
            defaultValue={CODE_SNIPPETS[language]}
            onMount={onMount}
            value={value}
            onChange={(value) => setValue(value)}
          />
        </div>
      </main>
      <EditorOutput/>
    </div>
  )
}

export default CodeEditor