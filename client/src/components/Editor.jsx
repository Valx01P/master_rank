import EditorInput from "./EditorInput"
import EditorOutput from "./EditorOutput"

const Editor = () => {
  return (
    <div className="flex-1 flex flex-col">
      <EditorInput/>
      <EditorOutput/>
    </div>
  )
}

export default Editor