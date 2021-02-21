import { useEffect } from 'react';
import Bracket from '../../components/Bracket';

export default function BracketPage() {
  useEffect(() => {
    document.title = 'Trivia Tournament Bracket';
  }, []);

  return (
    <div>
      <Bracket />
    </div>
  );
}
