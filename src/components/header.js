import { useContext, useState } from "react";
import useUser from "../hooks/useUser";
import { Link } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import UserContext from "../context/user";
import * as ROUTES from "../constants/routes";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {
  svgDashboard,
  svgDirect,
  svgTrouverPersonnes,
  svgFilActivite,
} from "../constants/svg";

const Header = () => {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [actif, setActif] = useState(1);
  const {
    user: { avatar },
  } = useUser();
  return (
    <header className="h-12 bg-white border-b border-gray-500 mb-8">
      <div className="container mx-auto max-w-screen-lg h-full">
        <div className="flex justify-between h-full">
          <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
            <h1 className="flex justify-center w-full">
              <Link to={ROUTES.DASHBOARD} aria-label="Instagram logo">
                <img
                  src="/images/logo.png"
                  alt="Instagram"
                  className="mt-2 w-6/12"
                />
              </Link>
            </h1>
          </div>
          <div className="text-gray-700 text-center flex items-center align-items ">
            <div className="ml-2">
              <Link to={ROUTES.DASHBOARD} onClick={() => setActif(1)}>
                {svgDashboard(actif)}
              </Link>
            </div>
            <div className="ml-2">
              <Link
                to={`/dashboard${ROUTES.DIRECT}`}
                onClick={() => setActif(2)}
              >
                {svgDirect(actif)}
              </Link>
            </div>
            <div className="ml-2">
              <Link
                to={`/dashboard${ROUTES.TROUVERPERSONNES}`}
                onClick={() => setActif(3)}
              >
                {svgTrouverPersonnes(actif)}
              </Link>
            </div>
            <div className="ml-2">
              <Link
                to={`/dashboard${ROUTES.FILACTIVITE}`}
                onClick={() => setActif(4)}
              >
                {svgFilActivite(actif)}
              </Link>
            </div>

            <div className="flex items-center cursor-pointer">
              <img
                className="rounded-full h-6 w-6 ml-2 flex"
                src={`/images/avatars/${avatar}.jpg`}
                alt="profil"
                onClick={handleClick}
              />
            </div>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <Link to={`/p/${user?.displayName}`}>
                <MenuItem>Profile</MenuItem>
              </Link>
              <MenuItem
                onClick={
                  (handleClose,
                  () => {
                    firebase.auth().signOut();
                  })
                }
              >
                Logout
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
