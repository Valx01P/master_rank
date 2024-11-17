import { Editor } from "@monaco-editor/react"
import LanguageSelector from "./LanguageSelector"
import { useRef, useState } from "react"
import { CODE_SNIPPETS } from "../constants"
import { executeCode } from "../api/pistonApi"
import ResizablePanel from "./ResizablePanel"

const CodeEditor = () => {
  const editorRef = useRef()
  const [value, setValue] = useState("")
  const [language, setLanguage] = useState("python")
  const [output, setOutput] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const onMount = (editor) => {
    editorRef.current = editor
    editor.focus()
  }

  const onSelect = (language) => {
    setLanguage(language)
    setValue(CODE_SNIPPETS[language])
  }

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue()
    if (!sourceCode) return
    try {
      setLoading(true)
      const { run: result } = await executeCode(language, sourceCode)
      setOutput(result.output.split("\n"))
      result.stderr ? setError(true) : setError(false)
    } catch (error) {
      console.log(error)
      setError(true)
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="flex-1 flex flex-col">
      <main className="bg-slate-800 flex-1 h-[75%] relative">
      <nav className="h-[50px] flex flex-row align-middle p-[5px]">
        <LanguageSelector language={language} onSelect={onSelect}/>
        <button
              onClick={runCode}
              className="px-4 py-2 bg-slate-800 text-white rounded-md hover:bg-slate-700"
            >
              Run Code
            </button>
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
      <ResizablePanel direction="top" className="bg-slate-600 z-50" initialHeight={30}>
        <div className="p-4">
          <h1>Editor Output</h1>
          <div className="flex flex-col space-y-2">
            <div className="flex flex-col space-y-2">
              {loading && <p>Running code...</p>}
              {error && <p className="text-red-500">An error occurred. Please check your code.</p>}
              {output && output.map((line, index) => (
                <p key={index} className="text-gray-200">{line}</p>
              ))}
            </div>
          </div>
        </div>
      </ResizablePanel>
    </div>
  )
}

export default CodeEditor