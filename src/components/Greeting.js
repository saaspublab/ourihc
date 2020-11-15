function Greeting(props) {
  const currentHour = new Date().getHours();
  let greetingMessage;

  if (currentHour >= 4 && currentHour < 12) {
    // after 4:00AM and before 12:00PM
    greetingMessage = 'good morning';
  } else if (currentHour >= 12 && currentHour <= 17) {
    // after 12:00PM and before 6:00pm
    greetingMessage = 'good afternoon';
  } else if (currentHour > 17 || currentHour < 4) {
    // after 5:59pm or before 4:00AM (to accommodate night owls)
    greetingMessage = 'good evening';
  } else {
    // if for some reason the calculation didn't work
    greetingMessage = 'welcome';
  }

  switch (props.case) {
    case 'sentence':
      greetingMessage =
        greetingMessage.charAt(0).toUpperCase() +
        greetingMessage.substr(1, greetingMessage.length);
      break;

    case 'eachWord':
      greetingMessage = greetingMessage.replace(
        /\w\S*/g,
        function capitalizeEachWord(text) {
          return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
        }
      );
      break;

    default:
      break;
  }

  return greetingMessage;
}

export default Greeting;
