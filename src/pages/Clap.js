// /* eslint-disable no-underscore-dangle */
// import { useEffect, useState } from 'react';
// import useSound from 'use-sound';
// import useStickyState from '../hooks/UseStickyState';
// import clapSfx from '../assets/sounds/clap.mp3';
// import disabledSfx from '../assets/sounds/disabled.mp3';
// import refreshSfx from '../assets/sounds/refresh.mp3';
// import styles from './clap.module.sass';
// import clapIcon from '../assets/images/clap.svg';

// function encode(data) {
//   return Object.keys(data)
//     .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
//     .join('&');
// }

// export const useInput = (initialValue) => {
//   const [value, setValue] = useState(initialValue);

//   return {
//     value,
//     setValue,
//     reset: () => setValue(''),
//     bind: {
//       value,
//       onChange: (event) => {
//         setValue(event.target.value);
//       },
//     },
//   };
// };

// function Star() {
//   return (
//     <svg
//       width="512"
//       height="512"
//       viewBox="0 0 512 512"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         d="M113.905 469.203L160.088 326.938C163.838 315.388 159.717 302.741 149.889 295.611L28.7767 207.753C27.9854 207.179 27.7238 206.65 27.6062 206.248C27.4616 205.754 27.4464 205.092 27.6769 204.382C27.9074 203.672 28.3092 203.143 28.7189 202.826C29.0526 202.568 29.5782 202.292 30.5579 202.291L180.213 202.225C192.352 202.22 203.113 194.404 206.862 182.854L253.045 40.5902C253.346 39.6636 253.768 39.2506 254.117 39.0129C254.545 38.7208 255.175 38.5003 255.926 38.5C256.677 38.4997 257.307 38.7195 257.736 39.0113C258.085 39.2488 258.508 39.6614 258.809 40.5877L305.118 182.811C308.878 194.357 319.646 202.164 331.784 202.158L481.439 202.092C482.419 202.092 482.945 202.367 483.279 202.625C483.689 202.942 484.091 203.47 484.322 204.18C484.553 204.89 484.539 205.552 484.395 206.046C484.277 206.448 484.016 206.978 483.225 207.553L362.19 295.518C352.369 302.656 348.26 315.306 352.02 326.854L398.329 469.077C398.63 470.003 398.531 470.583 398.39 470.978C398.216 471.463 397.838 472.009 397.232 472.45C396.626 472.89 395.987 473.083 395.467 473.099C395.043 473.112 394.456 473.025 393.664 472.451L272.552 384.593C262.726 377.465 249.426 377.471 239.607 384.608L118.572 472.573C117.781 473.148 117.194 473.234 116.77 473.222C116.25 473.206 115.611 473.014 115.004 472.574C114.398 472.134 114.019 471.588 113.845 471.103C113.704 470.709 113.604 470.129 113.905 469.203Z"
//         stroke="#501111"
//         strokeWidth="25"
//       />
//     </svg>
//   );
// }

// let isClappedHandler;
// let isWobblingHandler;
// let isRefreshingHandler;

// function Clap() {
//   const maxClaps = 5;

//   const [talent, setTalent] = useState();
//   const [currentTalent, setCurrentTalent] = useState();
//   const [isClapped, setIsClapped] = useState(false);
//   const [isWobbling, setIsWobbling] = useState(false);
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [clappedTalent, setClappedTalent] = useStickyState('', 'clappedTalent');
//   const [claps, setClaps] = useStickyState(0, 'claps');
//   const [clapPlaybackRate, setClapPlaybackRate] = useState(0.75);

//   const [formSubmitted, setFormSubmitted] = useStickyState(
//     false,
//     'submittedTSFeedback'
//   );
//   const [formError, setFormError] = useState(false);

//   const [playClap] = useSound(clapSfx, {
//     clapPlaybackRate,
//     volume: 0.5,
//   });
//   const [playDisabled] = useSound(disabledSfx, {
//     volume: 0.5,
//   });
//   const [playRefresh] = useSound(refreshSfx, {
//     volume: 0.5,
//   });

//   const {
//     value: feedback,
//     bind: bindFeedback,
//     reset: resetFeedback,
//   } = useInput('');
//   const { value: email, bind: bindEmail, reset: resetEmail } = useInput('');

//   async function fetchTalent() {
//     await fetch('/api/talent/')
//       .then((res) => res.json())
//       .then((res) => {
//         setTalent(res.talent);
//         setCurrentTalent(res.talent.find((el) => el.isCurrent === true));
//         if (
//           res.talent.find((el) => el.isCurrent === true)._id !== clappedTalent
//         ) {
//           setClaps(0);
//         }
//       })
//       .catch((err) => {
//         // eslint-disable-next-line no-console
//         console.error(err);
//       });
//   }

//   useEffect(() => {
//     document.title = 'CLAP! Show Your Enthusiasm';
//     fetchTalent();

//     setIsRefreshing(true);
//     isRefreshingHandler = setTimeout(() => {
//       setIsRefreshing(false);
//     }, 15000);

//     // Clear timeouts
//     return () => {
//       if (isClappedHandler) {
//         clearTimeout(isClappedHandler);
//         isClappedHandler = 0;
//       }
//       if (isWobblingHandler) {
//         clearTimeout(isWobblingHandler);
//         isWobblingHandler = 0;
//       }
//       if (isRefreshingHandler) {
//         clearTimeout(isRefreshingHandler);
//         isRefreshingHandler = 0;
//       }
//     };
//   }, []);

//   async function pushClap(id) {
//     await fetch(`/api/clap/${id}`)
//       .then(() => {
//         // eslint-disable-next-line no-console
//         console.log('Clap successfully pushed!');
//       })
//       .catch((err) => {
//         // eslint-disable-next-line no-console
//         console.error(err);
//       });
//   }

//   const clap = () => {
//     if (currentTalent._id !== clappedTalent) {
//       setClaps(0);
//     }

//     if (claps < maxClaps) {
//       setClapPlaybackRate(clapPlaybackRate + 0.1);
//       playClap();

//       setIsClapped(true);
//       setClappedTalent(currentTalent._id);
//       setClaps(claps + 1);
//       pushClap(currentTalent._id, 1);

//       isClappedHandler = setTimeout(() => {
//         setIsClapped(false);
//       }, 1500);
//     } else {
//       setIsWobbling(true);
//       playDisabled();

//       isWobblingHandler = setTimeout(() => {
//         setIsWobbling(false);
//       }, 825);
//     }
//   };

//   function reload() {
//     setIsRefreshing(true);
//     isRefreshingHandler = setTimeout(() => {
//       setIsRefreshing(false);
//     }, 15000);
//     setTalent();
//     fetchTalent();
//     playRefresh();
//   }

//   const handleSubmit = (evt) => {
//     const form = evt.target;

//     if (!(feedback && email)) {
//       setFormError('All fields are required.');
//     } else if (feedback.length <= 5) {
//       setFormError('Your feedback seems a bit short.');
//     } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
//       setFormError('This email address seems invalid.');
//     } else {
//       fetch('/', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//         body: encode({
//           'form-name': form.getAttribute('name'),
//           feedback: `${feedback}`,
//           email: `${email}`,
//         }),
//       })
//         .then((response) => {
//           if (!response.ok) {
//             setFormError('The server responded with a non-2xx code.');
//             setFormSubmitted(false);
//           } else {
//             // Reset form fields
//             resetFeedback();
//             resetEmail();

//             // Show message saying the form was submitted
//             // and hide the form
//             setFormSubmitted(true);
//           }
//         })
//         .catch((err) => {
//           setFormError(err);
//           setFormSubmitted(false);
//         });
//     }

//     evt.preventDefault();
//   };

//   return (
//     <div className={styles.page}>
//       <aside className={styles.sidebar}>
//         <button
//           type="button"
//           className={['link xtra-small', styles.refresh].join(' ')}
//           onClick={() => reload()}
//           disabled={isRefreshing}
//         >
//           {isRefreshing ? '[ Refreshing ]' : '[ Refresh ↻ ]'}
//         </button>
//         <h3>Today's Talent:</h3>
//         <ul>
//           {talent ? (
//             talent.map((t) => {
//               return (
//                 <li
//                   key={t._id}
//                   className={[
//                     styles.talent,
//                     t.isFinished ? styles.finished : '',
//                     t.isCurrent ? styles.current : '',
//                   ].join(' ')}
//                 >
//                   <>
//                     <div className={styles.line1}>
//                       {t.isCurrent && <span className={styles.pulse} />}
//                       <span className={styles.name}>
//                         {t.student[0].nickname} {t.student[0].lastName}
//                       </span>
//                     </div>
//                     {t.isCurrent && (
//                       <div className={styles.line2}>
//                         <span className={styles.act}>{t.act}</span>
//                       </div>
//                     )}
//                   </>
//                 </li>
//               );
//             })
//           ) : (
//             <p>Loading…</p>
//           )}
//         </ul>
//       </aside>

//       {talent && currentTalent && (
//         <section>
//           {currentTalent.student[0].nickname === 'Finale' && (
//             <div className={styles.feedback}>
//               {formSubmitted ? (
//                 <p>Thanks for your feedback!</p>
//               ) : (
//                 <>
//                   <form
//                     method="post"
//                     name="talent-show-feedback"
//                     onSubmit={handleSubmit}
//                   >
//                     <input type="hidden" name="bot-field" />
//                     <label htmlFor="feedback">
//                       What did you think?
//                       <input
//                         type="text"
//                         name="feedback"
//                         id="feedback"
//                         placeholder="Let Us Know..."
//                         required
//                         {...bindFeedback}
//                       />
//                     </label>

//                     {feedback.length > 5 && (
//                       <label htmlFor="email">
//                         What's your email?
//                         <input
//                           type="email"
//                           name="email"
//                           id="email"
//                           placeholder="example@saintanselms.org"
//                           required
//                           {...bindEmail}
//                         />
//                       </label>
//                     )}

//                     {formError && (
//                       <p className={styles.error}>
//                         ⚠️ {formError} Please try again.
//                       </p>
//                     )}

//                     {feedback.length > 5 && email.length > 10 && (
//                       <button
//                         type="submit"
//                         className="button primary round has-icon"
//                         disabled={!feedback || !email}
//                       >
//                         Submit! <span>&rarr;</span>
//                       </button>
//                     )}
//                   </form>
//                 </>
//               )}
//             </div>
//           )}

//           <span className={styles.counter}>
//             {currentTalent && currentTalent.student[0].nickname}
//             <br />
//             {claps} / {maxClaps}
//           </span>

//           <button
//             type="button"
//             className={[
//               'link',
//               styles.clapper,
//               claps === maxClaps ? styles.maxedOut : '',
//               isClapped ? styles.isClapped : '',
//               isWobbling ? styles.isWobbling : '',
//             ].join(' ')}
//             onClick={clap}
//             disabled={isClapped || isWobbling}
//           >
//             {isClapped ? <Star /> : <img src={clapIcon} alt="Clap!" />}
//           </button>
//         </section>
//       )}
//     </div>
//   );
// }

// export default Clap;
