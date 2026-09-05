const VERSES = [
  `Another sun has swung its axe through the long winter of the year, and you, traveler, have felled it — carrying your kin, your kills, and your kindness through every raid and every quiet harbor between them.`,
  `The Allfather is said to watch the worthy from Valhalla's rafters, but tonight the mead-horns of Midgard are raised for you alone. May your fires never gutter, your shieldwall never break, and your table always groan under the weight of good company.`,
  `So sharpen the axe, stoke the longhouse hearth, and let the horns sound — for another year of your saga has been carved into the stone, and it is a damn fine one to read.`
];

export default function Letter({ opened }) {
  return (
    <article
      className={`letter-parchment ${opened ? 'letter-parchment--open' : ''}`}
      aria-hidden={!opened}
    >
      <header className="letter-parchment__header">
        <p className="letter-parchment__kicker">A Saga Recorded on this Day</p>
        <h1 className="letter-parchment__title">Happy Birthday, Traveler</h1>
        <div className="letter-parchment__divider" aria-hidden="true">
          ᛝ ᛟ ᛝ
        </div>
      </header>

      <div className="letter-parchment__body">
        {VERSES.map((verse, i) => (
          <p key={i} className="letter-parchment__verse">
            {verse}
          </p>
        ))}
      </div>

      <footer className="letter-parchment__footer">
        <p className="letter-parchment__sign">
          — Written in ash and firelight, by those who raise their horns to you
        </p>
      </footer>
    </article>
  );
}
