import ResizablePanel from "./ResizablePanel"

const EditorOutput = () => {
  return (
    <ResizablePanel direction="top" className="bg-slate-600 z-50" initialHeight={30}>
      <div className="p-4">
        <h1>Editor Output</h1>
      </div>
    </ResizablePanel>
  )
}

export default EditorOutput