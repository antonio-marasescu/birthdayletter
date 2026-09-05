const VERSES = [
  `Ines, another year of your saga has been carved into the stone, marked by laughter, courage, and all the moments that made the journey worthwhile.`,
  `On this day, may every hearth burn warmly in your honor. May the paths ahead lead to good adventures, kind surprises, and halls always filled with the friends who value you most.`,
  `Here is to many more quests, and memories worth retelling. Wherever the road leads next, may we continue to walk part of it together.`
];

export default function Letter({ opened }) {
  return (
    <article
      className={`letter-parchment ${opened ? 'letter-parchment--open' : ''}`}
      aria-hidden={!opened}
    >
      <header className="letter-parchment__header">
        <p className="letter-parchment__kicker">A Saga Recorded on this Day</p>
        <h1 className="letter-parchment__title">Happy Birthday, Ines</h1>
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
          — From the MIPS clan, your companions on every quest
        </p>
      </footer>
    </article>
  );
}
