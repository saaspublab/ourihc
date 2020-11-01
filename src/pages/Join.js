import styles from './nope.module.sass';

// const links = [
//   'https://saintanselms.zoom.us/j/98405501386?pwd=RHhKTkpTdFY5SEJoOWF1d0gyYk1kUT09',
//   'https://saintanselms.zoom.us/j/97672684220?pwd=VmEvTmJ1ODU0anVCRWgzQUVRWFladz09',
//   'https://saintanselms.zoom.us/j/92911504282?pwd=WlMrb1hXMnFPQVFjV3hmUU4wdEZZQT09',
//   'https://saintanselms.zoom.us/j/95266370870?pwd=Tm9MdDhZUW1jRWZrMU9haDBWTlpSdz09',
// ];

const link =
  'https://saintanselms.zoom.us/j/91060697276?pwd=NFJVNXdzS3NoeEwzSWJQSTVJQnJxdz09';

// const currentHour = new Date().getHours();
// let greetingMessage;

// if (currentHour >= 4 && currentHour < 12) {
//   // after 4:00AM and before 12:00PM
//   greetingMessage = 'Good morning';
// } else if (currentHour >= 12 && currentHour <= 17) {
//   // after 12:00PM and before 6:00pm
//   greetingMessage = 'Good afternoon';
// } else if (currentHour > 17 || currentHour < 4) {
//   // after 5:59pm or before 4:00AM (to accommodate night owls)
//   greetingMessage = 'Good evening';
// } else {
//   // if for some reason the calculation didn't work
//   greetingMessage = 'Welcome';
// }

// export const useInput = (initialValue) => {
//   const [value, setValue] = useStickyState(initialValue, 'email');

//   return {
//     value,
//     setValue,
//     bind: {
//       value,
//       onChange: (event) => {
//         setValue(event.target.value);
//       },
//     },
//   };
// };

// function getLinkByHouse(house) {
//   let linkIndex;

//   switch (house) {
//     case 'Alban':
//       linkIndex = 0;
//       break;

//     case 'Austin':
//       linkIndex = 1;
//       break;

//     case 'Main':
//       linkIndex = 2;
//       break;

//     case 'Moore':
//       linkIndex = 3;
//       break;

//     default:
//       break;
//   }

//   return links[linkIndex];
// }

function Join() {
  // const { value: email, bind: bindEmail } = useInput('@saintanselms.org');
  // const [students, setStudents] = useState({});

  // async function fetchStudents() {
  //   await fetch('/api/emails/')
  //     .then((res) => res.json())
  //     .then((res) => {
  //       setStudents(res.data);
  //     })
  //     .catch((err) => {
  //       // eslint-disable-next-line no-console
  //       console.error(err);
  //     });
  // }

  // useEffect(() => {
  //   fetchStudents();
  // }, []);

  // let house;
  // let nickname;

  // if (
  //   students.length > 1 &&
  //   email.length > 1 &&
  //   students.filter((e) => e.emailAddress === email).length > 0
  // ) {
  //   house = students.find((obj) => obj.emailAddress === email).house;
  //   nickname = students.find((obj) => obj.emailAddress === email).nickname;
  // }

  return (
    <div className={[styles.wrapper, 'page--maroon'].join(' ')}>
      {/* <h4>There are no events currently using this system.</h4>
      <p>Please check back later.</p> */}
      <h4>Friday, October 30, 2020</h4>
      <h1>Annual Costume Contest</h1>
      <p>
        <b>
          On Friday at 3:00 PM, wear your best Halloween costume and join us as
          the IHC hosts our Annual Costume Contest live from campus.
        </b>{' '}
        The top two contestants will receive a prize. Each appropriately
        costumed participant can help their House earn points!
      </p>

      <p>
        Be fun. Be creative. Be smart. <b>Be there.</b>
      </p>

      <section className="content--block bordered">
        <p>To access the Zoom meeting, click the link below.</p>

        <p>
          <a href={link} target="_blank" rel="noopener noreferrer nofollow">
            {link}
          </a>
        </p>
      </section>

      {/* {!students ||
        (!students.length && (
          <section className="content--block bordered">
            <h3 className="heading">Loading... Please wait...</h3>
            <p>
              If this message remains for more than 5-10 seconds, please message
              us as soon as possible on <Link to="/discord">Discord</Link>,{' '}
              <a
                href="//instagram.com/inter.house.council"
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                Instagram
              </a>
              , or by{' '}
              <a
                href="mailto:ihc@saintanselms.org"
                target="_blank"
                rel="noopener noreferrer nofoollow"
              >
                email (ihc@saintanselms.org)
              </a>
              .
            </p>
          </section>
        ))}

      {students.length > 1 &&
        (!email ||
          !students.filter((e) => e.emailAddress === email).length > 0) && (
          <section className="content--block bordered">
            <h3 className="heading">Your School Email Address + Zoom Link</h3>

            <p>
              <b>IMPORTANT:</b> once you type your email address, you will not
              be able to change it.
            </p>

            <br />

            <form style={{ margin: 0 }}>
              <label htmlFor="email">
                School Email Address
                <input
                  type="email"
                  name="email"
                  placeholder="lserif@saintanselms.org"
                  required
                  {...bindEmail}
                />
              </label>
            </form>

            {email.length >= '@saintanselms.org'.length + 3 && (
              <p style={{ marginTop: 0 }}>
                <b>
                  Hmmm... We weren't able to find a student with that email
                  address.
                </b>{' '}
                Check your spelling, and if the error persists, please message
                us as soon as possible on <Link to="/discord">Discord</Link>,{' '}
                <a
                  href="//instagram.com/inter.house.council"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                >
                  Instagram
                </a>
                , or by{' '}
                <a
                  href="mailto:ihc@saintanselms.org"
                  target="_blank"
                  rel="noopener noreferrer nofoollow"
                >
                  email (ihc@saintanselms.org)
                </a>
                .
              </p>
            )}
          </section>
        )}

      {students.length > 1 &&
        email.length > 1 &&
        students.filter((e) => e.emailAddress === email).length > 0 && (
          <>
            <section className="content--block bordered">
              <h3 className="heading">{`${greetingMessage}, ${nickname}!`}</h3>

              <p>
                To access <b>{house} House</b>'s meeting room, click the link
                below.
              </p>

              <p>
                <a
                  href={getLinkByHouse(house)}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                >
                  {getLinkByHouse(house)}
                </a>
              </p>
            </section>
          </>
        )} */}
    </div>
  );
}

export default Join;
