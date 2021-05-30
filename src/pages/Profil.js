import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getUserByUsername } from "../services/firebase";
import * as ROUTES from "../constants/routes";
import Header from "../components/header";
import Profile from "../components/profile";

const Profil = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    async function checkUserExists() {
      const [user] = await getUserByUsername(username);
      if (user?.userId) {
        setUser(user);
      } else {
        history.push(ROUTES.NOTFOUND);
      }
    }
    checkUserExists();
  }, [username, history]);
  return user?.username ? (
    <div className="bg-gray-200 h-screen">
      <Header />
      <div className="mx-auto max-w-screen-lg">
        <Profile user={user} />
      </div>
    </div>
  ) : null;
};

export default Profil;
