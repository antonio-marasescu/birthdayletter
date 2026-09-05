import { Suspense, useState } from 'react';
import Scene from './components/Scene';
import Seal from './components/Seal';
import Letter from './components/Letter';

function App() {
  const [opened, setOpened] = useState(false);

  return (
    <div className="saga">
      <div className="saga__backdrop">
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
        <div className="saga__vignette" />
      </div>

      <main className="saga__stage">
        {!opened ? (
          <section className="saga__intro">
            <p className="saga__intro-kicker">A message awaits, carried across the fjord</p>
            <h1 className="saga__intro-title">For Your Birthday</h1>
            <Seal opened={opened} onOpen={() => setOpened(true)} />
          </section>
        ) : (
          <section className="saga__letter-wrap">
            <Letter opened={opened} />
            <button type="button" className="saga__reseal" onClick={() => setOpened(false)}>
              Seal the letter again
            </button>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
