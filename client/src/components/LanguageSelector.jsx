import './LanguageSelector.css';

const LANGUAGES = [
  { id: 'javascript', name: 'JavaScript', icon: '🟨' },
  { id: 'typescript', name: 'TypeScript', icon: '🔷' },
  { id: 'python', name: 'Python', icon: '🐍' },
  { id: 'java', name: 'Java', icon: '☕' },
  { id: 'cpp', name: 'C++', icon: '⚙️' },
  { id: 'csharp', name: 'C#', icon: '💜' },
  { id: 'go', name: 'Go', icon: '🐹' },
  { id: 'rust', name: 'Rust', icon: '🦀' },
  { id: 'html', name: 'HTML', icon: '🌐' },
  { id: 'css', name: 'CSS', icon: '🎨' },
  { id: 'json', name: 'JSON', icon: '📋' },
  { id: 'markdown', name: 'Markdown', icon: '📝' },
];

function LanguageSelector({ currentLanguage, onLanguageChange }) {
  return (
    <div className="language-selector">
      <label htmlFor="language">Language:</label>
      <select
        id="language"
        value={currentLanguage}
        onChange={(e) => onLanguageChange(e.target.value)}
        className="language-select"
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.id} value={lang.id}>
            {lang.icon} {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LanguageSelector;
