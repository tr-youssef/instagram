import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Header = ({ username, avatar }) => {
  return (
    <div className="flex bg-white  justify-between h4 p-4 py-2">
      <div className="flex  items-center">
        <Link to={`/p/${username}`}>
          <img
            className="rounded-full w-8 h-8 flex mr-3"
            src={`images/avatars/${avatar}.jpg`}
            alt="Avatar"
          />
        </Link>
        <Link to={`/p/${username}`}>
          <p className="font-bold text-sm">{username}</p>
        </Link>
      </div>
      <div
        className="text-sm font-bold  items-center"
        onClick={() => console.log("open dialogbox")}
      >
        ...
      </div>
    </div>
  );
};

export default Header;

Header.propTypes = {
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};
