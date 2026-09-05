export default function Seal({ opened, onOpen }) {
  return (
    <button
      type="button"
      className={`rune-seal ${opened ? 'rune-seal--opened' : ''}`}
      onClick={onOpen}
      aria-expanded={opened}
      aria-label="Break the wax seal to reveal the saga"
    >
      <svg viewBox="0 0 120 120" className="rune-seal__svg">
        <circle cx="60" cy="60" r="54" className="rune-seal__ring" />
        <circle cx="60" cy="60" r="42" className="rune-seal__inner" />
        <path
          d="M60 22 L74 50 L60 44 L46 50 Z M60 98 L74 70 L60 76 L46 70 Z M22 60 L50 46 L44 60 L50 74 Z M98 60 L70 46 L76 60 L70 74 Z"
          className="rune-seal__mark"
        />
      </svg>
      <span className="rune-seal__label">{opened ? 'Sealed once more' : 'Break the seal'}</span>
    </button>
  );
}
