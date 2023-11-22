import { useUserContext } from "@/context/AuthContext";
import { Models } from "appwrite";
import { Link } from "react-router-dom";
import { PostStats } from ".";
import { POST_DETAILS_PATH } from "@/constants/routes";
import { getUrl } from "@/lib/utils";

type GridPostListProps = {
  posts?: Models.Document[],
  showUser?: boolean,
  showStats?: boolean
}

const GridPostList = ({ posts, showUser = true, showStats = true }: GridPostListProps) => {
  const { user } = useUserContext();

  return (
    <ul className="grid-container">
      {posts?.map((post) => (
        <li key={post.$id} className="relative min-w-80 h-80">
          <Link to={getUrl(POST_DETAILS_PATH, ":id", post.$id)} className="grid-post_link">
            <img
              src={post.imageUrl}
              alt="post"
              className="h-full w-full object-cover"
            />
          </Link>

          <div className="grid-post_user">
            {showUser && (
              <div className="flex items-center justify-start gap-2">
                <img
                  src={post.creator.imageUrl || "/assets/icons/profile-placeholder.svg"}
                  alt={post.creator.name}
                  className="h-8 w-8 rounded-full"
                  loading="lazy"
                />
                <span className="line-clamp-1">
                  {post.creator.name}
                </span>
              </div>
            )}

            {showStats && <PostStats post={post} userId={user.id} />}
          </div>
        </li>
      ))}
    </ul>
  )
};

export default GridPostList;
