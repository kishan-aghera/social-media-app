import { useUserContext } from "@/context/AuthContext";
import { getTags, getUrl, multiFormatDateString } from "@/lib/utils";
import { Models } from "appwrite";
import { Link } from "react-router-dom";
import { PostStats } from ".";
import {
  POST_DETAILS_PATH,
  PROFILE_PATH,
  UPDATE_POST_PATH,
} from "@/constants/routes";

type PostCardProps = {
  post: Models.Document;
};

const PostCard = ({ post }: PostCardProps) => {
  const { user } = useUserContext();

  if (!post.creator) return;

  const tags = getTags(post.tags);

  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <Link to={getUrl(PROFILE_PATH, ":id", post.creator.$id)}>
            <img
              src={
                post?.creator?.imageUrl ||
                "/assets/icons/profile-placeholder.svg"
              }
              alt={post?.creator?.name}
              className="w-12 rounded-full lg:h-12"
            />
          </Link>

          <div className="flex flex-col">
            <span className="base-medium lg:body-bold text-light-1">
              {post.creator.name}
            </span>
            <div className="flex-center gap-2 text-light-3">
              <span className="subtle-semibold lg:small-regular">
                {multiFormatDateString(post.$createdAt)}
              </span>
              -
              <span className="subtle-semibold lg:small-regular">
                {post.location}
              </span>
            </div>
          </div>
        </div>

        {user.id === post.creator.$id && (
          <Link to={getUrl(UPDATE_POST_PATH, ":id", post.$id)}>
            <img
              src="/assets/icons/edit.svg"
              alt="edit"
              width={20}
              height={20}
            />
          </Link>
        )}
      </div>

      <Link to={getUrl(POST_DETAILS_PATH, ":id", post.$id)}>
        <div className="small-medium lg:base-medium py-5">
          <p>{post.caption}</p>
          {tags.length > 0 && (
            <ul className="mt-2 flex gap-1">
              {tags.map((tag: string) => (
                <li key={tag} className="text-light-3">
                  #{tag}
                </li>
              ))}
            </ul>
          )}
        </div>

        <img
          src={post.imageUrl || "assets/icons/profile-placeholder.svg"}
          className="post-card_img"
          alt="post image"
        />
      </Link>

      <PostStats post={post} userId={user.id} />
    </div>
  );
};

export default PostCard;
