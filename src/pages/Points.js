import { useEffect } from 'react';
import PointsEmbed from '../components/Points';

function PointsPage() {
  useEffect(() => {
    document.title = 'Current House Points';
  }, []);

  return (
    <section>
      <PointsEmbed />
    </section>
  );
}

export default PointsPage;
