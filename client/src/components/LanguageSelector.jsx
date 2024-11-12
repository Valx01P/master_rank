import { LANGUAGE_VERSIONS } from "../constants"

const languages = Object.keys(LANGUAGE_VERSIONS)
const ACTIVE_COLOR = "bg-blue-500 text-white"

const LanguageSelector = ({ language, onSelect }) => {
  return (
    <div>
      <h1></h1>
      <div>
      <select
        value={language}
        onChange={(e) => onSelect(e.target.value)}
        className="p-2 border text-black rounded-md"
      >
        {languages.map((lang) => (
          <option
            key={lang}
            value={lang}
          >
            {lang} {LANGUAGE_VERSIONS[lang]}
          </option>
        ))}
      </select>
      </div>
    </div>
  )
}

export default LanguageSelector