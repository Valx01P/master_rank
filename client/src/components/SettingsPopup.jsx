const SettingsPopup = ({ onClose }) => (
  <div className="popup-overlay text-black">
    <div className="popup-content">
      <button className="popup-close" onClick={onClose}>&times;</button>
      <h2>Application Settings</h2>
      {/* Add general settings here */}
      <btn onClick={() => onClose()}>Close</btn>

    </div>
  </div>
);

export default SettingsPopup;