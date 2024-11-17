import ResizablePanel from "./ResizablePanel"
import { useState } from "react"
import { executeCode } from "../api/pistonApi"

const EditorOutput = ({ editorRef, language }) => {
  const [output, setOutput] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)


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
    <ResizablePanel direction="top" className="bg-slate-600 z-50" initialHeight={30}>
      <div className="p-4">
        <h1>Editor Output</h1>
        <div className="flex flex-col space-y-2">
          <button
            onClick={runCode}
            className="px-4 py-2 bg-slate-800 text-white rounded-md hover:bg-slate-700"
          >
            Run Code
          </button>
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
  )
}

export default EditorOutput