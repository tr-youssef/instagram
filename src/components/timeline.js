import Skeleton from "react-loading-skeleton";
import UsePhotos from "../hooks/usePhotos";
import Post from "./post";

const Timeline = () => {
  const { photos } = UsePhotos();
  return (
    <div className="container col-span-2">
      {!photos ? (
        <Skeleton count={1} width={640} height={400} className="mb-5" />
      ) : photos?.length > 0 ? (
        photos.map((content) => (
          <Post
            key={content.docId}
            content={content}
          >{`${content.imageSrc} && ${content.dateCreated}`}</Post>
        ))
      ) : (
        <p className="text-center text-2xl">Follow people to see more images</p>
      )}
    </div>
  );
};

export default Timeline;
