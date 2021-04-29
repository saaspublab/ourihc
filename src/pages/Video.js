import { useEffect } from 'react';

const link = '';

function Video() {
  useEffect(() => {
    document.title = 'Class of 2021: Commitment Ceremonies';
  }, []);

  return (
    <div className="page--maroon">
      <h2 className="heading">Welcome to Surf's Up!</h2>
      <p>
        The Class of 2021 Commitment Ceremonies video will be available on this
        page at 8:00 AM on Friday, April 30th. Check back then.
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
