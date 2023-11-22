import { Loader, PostStats } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { PROFILE_PATH, UPDATE_POST_PATH } from "@/constants/routes";
import { useUserContext } from "@/context/AuthContext";
import { useDeletePost } from "@/lib/react-query/mutations/posts";
import { useGetPostById } from "@/lib/react-query/queries/posts";
import { getTags, getUrl, multiFormatDateString } from "@/lib/utils";
import { Link, useNavigate, useParams } from "react-router-dom";

const PostDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || "");
  const { user } = useUserContext();

  const { mutate: deletePost } = useDeletePost();

  const tags = getTags(post?.tags);

  const handleDeletePost = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();

    deletePost({ postId: id || "", imageId: post?.imageId });
    navigate(-1);
  };

  return (
    <div className="post_details-container">
      <div className="hidden w-full max-w-5xl md:flex">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="shad-button_ghost"
        >
          <img
            src={"/assets/icons/back.svg"}
            alt="back"
            width={24}
            height={24}
          />
          <p className="small-medium lg:base-medium">Back</p>
        </Button>
      </div>
      {isPending || !post ? (
        <Loader />
      ) : (
        <div className="post_details-card">
          <img
            src={post?.imageUrl}
            alt="creator"
            className="post_details-img"
          />

          <div className="post_details-info">
            <div className="flex-between w-full">
              <Link
                to={getUrl(PROFILE_PATH, ":id", post?.creator.$id)}
                className="flex items-center gap-3"
              >
                <img
                  src={
                    post?.creator.imageUrl ||
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="h-8 w-8 rounded-full lg:h-12 lg:w-12"
                />
                <div className="flex flex-col gap-1">
                  <span className="base-medium lg:body-bold text-light-1">
                    {post?.creator.name}
                  </span>
                  <div className="flex-center gap-2 text-light-3">
                    <span className="subtle-semibold lg:small-regular ">
                      {multiFormatDateString(post?.$createdAt)}
                    </span>
                    •
                    <span className="subtle-semibold lg:small-regular">
                      {post?.location}
                    </span>
                  </div>
                </div>
              </Link>

              {user.id === post?.creator.$id && (
                <div className="flex-center">
                  <Link to={getUrl(UPDATE_POST_PATH, ":id", post?.$id)}>
                    <img
                      src={"/assets/icons/edit.svg"}
                      alt="edit"
                      width={24}
                      height={24}
                    />
                  </Link>

                  <Button onClick={handleDeletePost}>
                    <img
                      src={"/assets/icons/delete.svg"}
                      alt="delete"
                      width={24}
                      height={24}
                    />
                  </Button>
                </div>
              )}
            </div>

            <hr className="w-full border border-dark-4/80" />

            <div className="small-medium lg:base-regular flex w-full flex-1 flex-col">
              <p>{post?.caption}</p>
              <ul className="mt-2 flex gap-1">
                {tags.length > 0 && (
                  <ul className="mt-2 flex gap-1">
                    {tags.map((tag: string) => (
                      <li key={tag} className="text-light-3">
                        #{tag}
                      </li>
                    ))}
                  </ul>
                )}
              </ul>
            </div>

            <div className="w-full">
              <PostStats post={post} userId={user.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
