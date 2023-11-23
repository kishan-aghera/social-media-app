import { GridPostList } from "@/components/shared";
import { useGetSavedPosts } from "@/lib/react-query/queries/posts";
import { useGetCurrentUser } from "@/lib/react-query/queries/users";

const Saved = () => {
  const { data: currentUser } = useGetCurrentUser();
  const { data: savedPosts } = useGetSavedPosts(currentUser?.$id || "");

  return (
    <div className="saved-container">
      <div className="flex w-full max-w-5xl gap-2">
        <img
          src="/assets/icons/save.svg"
          alt="save"
          width={36}
          height={36}
          className="invert-white"
        />
        <h2 className="h3-bold md:h2-bold flex w-full gap-2">Saved Posts</h2>
      </div>

      {currentUser &&
        savedPosts &&
        (savedPosts.length > 0 ? (
          <GridPostList posts={savedPosts} showStats={false} />
        ) : (
          <p className="mt-10 w-full text-center text-light-4">
            No Posts Saved
          </p>
        ))}
    </div>
  );
};

export default Saved;
