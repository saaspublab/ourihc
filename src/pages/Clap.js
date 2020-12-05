import { useEffect, useState } from 'react';
import useSound from 'use-sound';
import clapSfx from '../assets/sounds/clap.mp3';
import styles from './clap.module.sass';
import clapIcon from '../assets/images/clap.svg';

function Star() {
  return (
    <svg
      width="512"
      height="512"
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M113.905 469.203L160.088 326.938C163.838 315.388 159.717 302.741 149.889 295.611L28.7767 207.753C27.9854 207.179 27.7238 206.65 27.6062 206.248C27.4616 205.754 27.4464 205.092 27.6769 204.382C27.9074 203.672 28.3092 203.143 28.7189 202.826C29.0526 202.568 29.5782 202.292 30.5579 202.291L180.213 202.225C192.352 202.22 203.113 194.404 206.862 182.854L253.045 40.5902C253.346 39.6636 253.768 39.2506 254.117 39.0129C254.545 38.7208 255.175 38.5003 255.926 38.5C256.677 38.4997 257.307 38.7195 257.736 39.0113C258.085 39.2488 258.508 39.6614 258.809 40.5877L305.118 182.811C308.878 194.357 319.646 202.164 331.784 202.158L481.439 202.092C482.419 202.092 482.945 202.367 483.279 202.625C483.689 202.942 484.091 203.47 484.322 204.18C484.553 204.89 484.539 205.552 484.395 206.046C484.277 206.448 484.016 206.978 483.225 207.553L362.19 295.518C352.369 302.656 348.26 315.306 352.02 326.854L398.329 469.077C398.63 470.003 398.531 470.583 398.39 470.978C398.216 471.463 397.838 472.009 397.232 472.45C396.626 472.89 395.987 473.083 395.467 473.099C395.043 473.112 394.456 473.025 393.664 472.451L272.552 384.593C262.726 377.465 249.426 377.471 239.607 384.608L118.572 472.573C117.781 473.148 117.194 473.234 116.77 473.222C116.25 473.206 115.611 473.014 115.004 472.574C114.398 472.134 114.019 471.588 113.845 471.103C113.704 470.709 113.604 470.129 113.905 469.203Z"
        stroke="#501111"
        strokeWidth="25"
      />
    </svg>
  );
}

function Clap() {
  const maxClaps = 5;

  const [talent, setTalent] = useState();
  const [currentTalent, setCurrentTalent] = useState();
  const [isWobbling, setIsWobbling] = useState(false);
  const [isClapped, setIsClapped] = useState(false);
  const [claps, setClaps] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(0.75);

  const [play] = useSound(clapSfx, {
    playbackRate,
    volume: 0.5,
  });

  useEffect(() => {
    document.title = 'CLAP! Show Your Enthusiasm';
  }, []);

  async function fetchTalent() {
    await fetch('/api/talent/')
      .then((res) => res.json())
      .then((res) => {
        setTalent(res.talent);
        setCurrentTalent(res.talent.find((el) => el.isCurrent === true));
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
      });
  }

  useEffect(() => {
    fetchTalent();
  }, []);

  const clap = () => {
    if (claps < maxClaps) {
      setPlaybackRate(playbackRate + 0.1);
      play();

      setIsClapped(true);
      setClaps(claps + 1);

      setTimeout(() => {
        setIsClapped(false);
      }, 825);
    } else {
      setIsWobbling(true);

      setTimeout(() => {
        setIsWobbling(false);
      }, 825);
    }
  };

  function reload() {
    setTalent();
    fetchTalent();
  }

  return (
    <div className={styles.page}>
      <div className={styles.sidebar}>
        <button
          type="button"
          className={['link xtra-small', styles.refresh].join(' ')}
          onClick={() => reload()}
        >
          [ Refresh ↻ ]
        </button>
        <h3>Today's Talent:</h3>
        <ul>
          {talent ? (
            talent.map((act) => {
              return (
                <li
                  // eslint-disable-next-line no-underscore-dangle
                  key={act._id}
                  className={[
                    styles.act,
                    act.isFinished ? styles.finished : '',
                    act.isCurrent ? styles.current : '',
                  ].join(' ')}
                >
                  {act.isCurrent && <span />}
                  {act.student[0].firstName} {act.student[0].lastName}
                </li>
              );
            })
          ) : (
            <p>Loading…</p>
          )}
        </ul>
      </div>

      {/* <h2 style={{ color: '#501111' }}>CLAP! Show Your Enthusiasm</h2>
      <p>
        The premise is simple: click the button below to clap for our Talent
        Show performers. Your participation helps you shape the event's course
        and who gets crowned winner!
      </p> */}

      <div className={styles.clapContainer}>
        <span className={styles.counter}>
          {currentTalent && currentTalent.student[0].firstName}
          {console.log(talent)}
          <br />
          {claps} / {maxClaps}
        </span>

        <button
          type="button"
          className={[
            'link',
            styles.clapper,
            claps === maxClaps ? styles.maxedOut : '',
            isClapped ? styles.isClapped : '',
            isWobbling ? styles.isWobbling : '',
          ].join(' ')}
          onClick={clap}
          disabled={isClapped}
        >
          {isClapped ? <Star /> : <img src={clapIcon} alt="Clap!" />}
          {/* {!isClapped ? <Star /> : <img src={clapIcon} alt="Clap!" />} */}
        </button>
      </div>
    </div>
  );
}

export default Clap;
