import { LANGUAGE_VERSIONS } from "../constants"

const languages = Object.keys(LANGUAGE_VERSIONS)
const ACTIVE_COLOR = "bg-blue-500 text-white"

const LanguageSelector = ({ language, setLanguage }) => {
  return (
    <div>
      <h1></h1>
      <div>
        <select
          value={language}
          className="p-2 border text-black"
        >
          {languages.map((lang) => (
            <option
              key={lang}
              value={lang}
              className={`px-3 py-1 text-sm rounded-md transition-colors
              ${language === lang ? ACTIVE_COLOR : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
              onClick={() => setLanguage(lang)}
            >
              {lang}
              &nbsp;
              <h1>
                {LANGUAGE_VERSIONS[lang]}
              </h1>
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default LanguageSelector