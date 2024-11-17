const WhiteboardPopup = ({ onClose }) => (
  <div className="popup-overlay text-black">
    <div className="popup-content">
      <button className="popup-close" onClick={onClose}>&times;</button>
      <h2>Whiteboard Settings</h2>
      {/* Add whiteboard-specific settings here */}
      <btn onClick={() => onClose()}>Close</btn>
    </div>
  </div>
);


export default WhiteboardPopup;