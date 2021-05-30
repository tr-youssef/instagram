import Proptypes from "prop-types";

const Image = ({ imageSrc, caption }) => {
  return (
    <div>
      <img className="" src={imageSrc} alt={caption} />
    </div>
  );
};

export default Image;

Image.propTypes = {
  imageSrc: Proptypes.string.isRequired,
  caption: Proptypes.string.isRequired,
};
