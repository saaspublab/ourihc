import Points from './Points';
import Greeting from '../components/Greeting';

function Home() {
  return (
    <div>
      <h1>
        <Greeting />!
      </h1>
      <p>Where does your house stand?</p>

      <Points />
    </div>
  );
}
export default Home;
