/* eslint-disable prettier/prettier */
import { useEffect } from 'react';

const link = 'https://www.youtube.com/watch?v=zpasvLESasY';

function HouseDayVideo() {
  useEffect(() => {
    document.title = 'House Day 2021 Video';
  }, []);

  return (
    <div className="page--maroon">
      <h2 className="heading">House Day is Tomorrow!</h2>
      <p>
        The House Day 2021 video will be live at 3:00 PM on
        Thursday, September 9th. Click the link below.
      </p>

      {link && (
        <p>
          <a
            href={link}
            target="_blank"
            className="button primary round has-icon"
            rel="noopener noreferrer nofollow"
          >
            Watch Premier <span>&rarr;</span>
          </a>
        </p>
      )}
    </div>
  );
}

export default HouseDayVideo;
