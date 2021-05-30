import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useUser from "../../hooks/useUser";
import { isUserFollowingProfile, toggleFollow } from "../../services/firebase";

export default function Header({
  username,
  profile,
  publications,
  followers,
  setFollowers,
}) {
  const { user } = useUser();
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const handleToggleFollow = async () => {
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
    setFollowers({
      followers: isFollowingProfile ? followers - 1 : followers + 1,
    });
    await toggleFollow(
      isFollowingProfile,
      user.docId,
      profile.docId,
      profile.userId,
      user.userId
    );
  };

  useEffect(() => {
    const isLoggedInUserFollowingProfile = async () => {
      const isFollowing = await isUserFollowingProfile(
        user.username,
        profile.userId
      );
      setIsFollowingProfile(isFollowing);
    };
    if (user?.username && profile.userId) {
      isLoggedInUserFollowingProfile();
    }
  }, [user?.username, profile]);
  return username && profile ? (
    <div>
      <div className="flex items-center  col-span-1 pb-8 justify-center">
        <img
          className="rounded-full w-24 flex mr-3"
          src={`/images/avatars/${username}.jpg`}
          alt="Avatar"
        />
        <div className="flex-col ml-32 items-center justify-center">
          <div className="flex">
            <div className="text-xl italic mb-4 mr-4">{username}</div>
            {user.userId !== profile.userId && (
              <button
                className="bg-blue-500 font-bold text-sm rounded text-white w-32 h-8"
                type="button"
                onClick={handleToggleFollow}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleToggleFollow();
                  }
                }}
              >
                {isFollowingProfile ? "Se désabonner" : "S'abonner"}
              </button>
            )}
          </div>
          <div className="text-sm flex  mb-4">
            <div className="mr-4">
              <span className="font-bold">{publications}</span> publications
            </div>
            <div className="mr-4">
              <span className="font-bold ">{followers}</span> abonnés
            </div>
            <div>
              <span className="font-bold">
                {profile.following ? profile.following.length : 0}
              </span>{" "}
              abonnements
            </div>
          </div>
          <div className="font-bold text-sm">{profile.fullName}</div>
        </div>
      </div>
    </div>
  ) : null;
}

Header.propTypes = {
  username: PropTypes.string.isRequired,
  publications: PropTypes.number.isRequired,
  followers: PropTypes.number.isRequired,
  setFollowers: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    docId: PropTypes.string,
    userId: PropTypes.string,
    fullName: PropTypes.string,
    following: PropTypes.array,
    followers: PropTypes.array,
  }).isRequired,
};
