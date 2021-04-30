import { useEffect } from 'react';

const link = 'https://www.youtube.com/watch?v=KIuHHlSkAWU';

function Video() {
  useEffect(() => {
    document.title = 'Class of 2021: Commitment Ceremonies';
  }, []);

  return (
    <div className="page--maroon">
      <h2 className="heading">Welcome to Surf's Up!</h2>
      <p>
        The Class of 2021 Commitment Ceremonies video will be live at 8:00 AM on
        Friday, April 30th. Click the link below.
      </p>

      {link && (
        <p>
          <a
            href={link}
            target="_blank"
            className="button primary round has-icon"
            rel="noopener noreferrer nofollow"
          >
            Watch Live <span>&rarr;</span>
          </a>
        </p>
      )}
    </div>
  );
}

export default Video;
