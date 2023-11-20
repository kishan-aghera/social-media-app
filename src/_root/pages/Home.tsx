import { Loader, PostCard } from "@/components/shared";
import { useGetRecentPosts } from "@/lib/react-query/queries_and_mutations";
import { Models } from "appwrite";

const Home = () => {
  const { data: posts, isPending: isPostLoading } = useGetRecentPosts();

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-bold w-full text-left">
            Home Feed
          </h2>
          {isPostLoading && !posts ? (
            <Loader />
          ) : (
            <ul className="flex w-full flex-1 flex-col gap-9">
              {posts?.documents.map((post: Models.Document) => (
                <li key={post.$id}>
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
