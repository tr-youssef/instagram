import { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Header from "./header";
import Image from "./image";
import Actions from "./actions";
import Footer from "./footer";
import Comments from "./comments";
import { getUserByUsername } from "../../services/firebase.js";

const Index = ({ content }) => {
  const [avatar, setAvatar] = useState("");
  useEffect(() => {
    async function getTimelinePhotos() {
      const [{ avatar }] = await getUserByUsername(content.username);
      setAvatar(avatar);
    }

    getTimelinePhotos();
  }, [content.username]);
  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current.focus();
  return (
    <div className="container border border-gray-300 mb-8 col-span-4 rounded">
      <Header username={content.username} avatar={avatar} />
      <Image imageSrc={content.imageSrc} caption={content.caption} />
      <Actions
        docId={content.docId}
        totalLikes={content.likes.length}
        likedPhoto={content.userLikedPhoto}
        handleFocus={handleFocus}
      />
      <Footer caption={content.caption} username={content.username} />
      <Comments
        docId={content.docId}
        comments={content.comments}
        posted={content.dateCreated}
        commentInput={commentInput}
      />
    </div>
  );
};

export default Index;

postMessage.propTypes = {
  content: PropTypes.shape({
    username: PropTypes.string.isRequired,
    imagesrc: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    docId: PropTypes.string.isRequired,
    userLikedPhoto: PropTypes.bool.isRequired,
    likes: PropTypes.array.isRequired,
    comments: PropTypes.array.isRequired,
    dateCreated: PropTypes.number.isRequired,
  }),
};
