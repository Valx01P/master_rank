import {SketchPicker} from 'react-color'
import {useState} from 'react'
import Draggable from 'react-draggable'
import { useDispatch, useSelector } from 'react-redux'
import { updateStyling } from '../store/state/theme.slice'

const StylingPopup = ({ onClose }) => {
  const [color, setColor] = useState('#183159')
  const dispatch = useDispatch()
  const styles = useSelector((state) => state.styling.styles)

  const handleColorChange = (color) => {
    setColor(color.hex)
  }

  return (
  <div className="popup-overlay text-black" onClick={() => onClose()}>
    <Draggable>
      <div className="popup-content w-[50%] h-[50%] relative" onClick={(e) => e.stopPropagation()}>
      <button className="popup-close" onClick={onClose}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>
      <h2>Styling Settings</h2>
      <div>
        <SketchPicker
          color={color}
          onChangeComplete={handleColorChange}
        />
        <div>
          <h3>Selected Color: {color}</h3>
        </div>
      </div>


      </div>
    </Draggable>
  </div>
  )
}

export default StylingPopup