import useUser from "../../hooks/useUser";
import User from "./user";
import Suggestions from "./suggestions";

const Sidebar = () => {
  const {
    user: { docId, fullName, username, userId, following, avatar },
  } = useUser();
  return (
    <div className="p-4">
      <User fullName={fullName} username={username} avatar={avatar} />
      <Suggestions
        userId={userId}
        following={following}
        loggedInUserDocId={docId}
      />
      <div className="text-gray-300 text-xs mt-5">
        A propos . Aide . Press . API . Emplois . Confidentialité . Conditions .
        Lieux . Comptes principaux . Hashtags . Langue
      </div>
      <div className="text-gray-300 text-xs mt-5">
        2021 INSTAGRAM PAR FACEBOOK
      </div>
    </div>
  );
};

export default Sidebar;
