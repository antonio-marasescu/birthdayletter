export default function Seal({ opened, onOpen }) {
  return (
    <button
      type="button"
      className={`rune-seal ${opened ? 'rune-seal--opened' : ''}`}
      onClick={onOpen}
      aria-expanded={opened}
      aria-label="Break the wax seal to reveal the saga"
    >
      <img
        src={`${import.meta.env.BASE_URL}assets/rune-seal.png`}
        className="rune-seal__image"
        alt=""
        aria-hidden="true"
        draggable="false"
      />
      <span className="rune-seal__label">{opened ? 'Sealed once more' : 'Break the seal'}</span>
    </button>
  );
}
