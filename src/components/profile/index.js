import { useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import Header from "./header";
import Photos from "./photos";
import { getUserPhotosByUsername } from "../../services/firebase";

const reducer = (state, newState) => ({ ...state, ...newState });
const initialState = { profile: {}, photosCollection: [], followers: 0 };

export default function Profile({ user }) {
  const [{ profile, photosCollection, followers }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      const photos = await getUserPhotosByUsername(user.username);
      dispatch({
        profile: user,
        photosCollection: photos,
        followers: user.followers.length,
      });
    }
    getProfileInfoAndPhotos();
  }, [user]);
  return (
    <>
      <Header
        username={user.username}
        profile={profile}
        avatar={user.avatar}
        publications={photosCollection.length}
        followers={followers}
        setFollowers={dispatch}
      />
      <Photos photos={photosCollection} />
    </>
  );
}

Profile.propTypes = {
  user: PropTypes.shape({
    dateCreated: PropTypes.number.isRequired,
    emailAddress: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    followers: PropTypes.array.isRequired,
    following: PropTypes.array.isRequired,
    fullName: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
};
