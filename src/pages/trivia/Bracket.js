import { useState, useEffect } from 'react';
import Bracket from '../../components/Bracket';

export default function BracketPage() {
  const [fullScreen, setFullScreen] = useState(false);

  useEffect(() => {
    document.title = 'Trivia Tournament Bracket';
  }, []);

  /* Get the documentElement (<html>) to display the page in fullscreen */
  const elem = document.documentElement;

  /* View in fullscreen */
  function openFullScreen() {
    setFullScreen(true);

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
  }

  function closeFullScreen() {
    setFullScreen(false);

    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE11 */
      document.msExitFullscreen();
    }
  }

  return (
    <div>
      {fullScreen ? (
        <button
          onClick={() => closeFullScreen()}
          type="button"
          className="button primary"
        >
          Close Full Screen &rarr;
        </button>
      ) : (
        <button
          onClick={() => openFullScreen()}
          type="button"
          className="button primary"
        >
          Full Screen &rarr;
        </button>
      )}
      <br />
      <br />
      <Bracket fullPage />
    </div>
  );
}
