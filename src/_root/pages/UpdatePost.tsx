import { PostForm } from "@/components/forms";
import { Loader } from "@/components/shared";
import { useGetPostById } from "@/lib/react-query/queries_and_mutations";
import { useParams } from "react-router-dom";

const UpdatePost = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || "");

  if (isPending) return <Loader />;

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="flex-start w-full max-w-5xl justify-start gap-3">
          <img
            src="/assets/icons/add-post.svg"
            width={36}
            height={36}
            alt="add post"
          />
          <h2 className="h3-bold md:h2-bold w-full text-left">Edit Post</h2>
        </div>

        <PostForm post={post} action="Update" />
      </div>
    </div>
  );
};

export default UpdatePost;
