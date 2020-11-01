import { LazyLoadImage } from 'react-lazy-load-image-component';
import PropTypes from 'prop-types';
import 'react-lazy-load-image-component/src/effects/blur.css';

function ProgressiveImage(props) {
  const { src, lowResSrc, alt, className } = props;
  return (
    <span>
      <LazyLoadImage
        width="100%"
        height="100%"
        useIntersectionObserver="true"
        effect="blur"
        src={src}
        placeholderSrc={lowResSrc}
        alt={alt}
        className={className}
      />
    </span>
  );
}

ProgressiveImage.propTypes = {
  src: PropTypes.string.isRequired,
  lowResSrc: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
};

ProgressiveImage.defaultProps = {
  className: '',
};

export default ProgressiveImage;
