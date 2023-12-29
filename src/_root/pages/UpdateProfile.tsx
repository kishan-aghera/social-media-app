import ProfileForm from "@/components/forms/ProfileForm";
import { useGetUserById } from "@/lib/react-query/queries/users";
import { Loader } from "lucide-react";
import { useParams } from "react-router-dom";

const UpdateProfile = () => {
  const { id } = useParams();
  const { data: currentUser, isPending } = useGetUserById(id || "");

  if (isPending) return <Loader />;

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="flex-start w-full max-w-5xl justify-start gap-3">
          <img
            src="/assets/icons/edit.svg"
            width={36}
            height={36}
            className="invert-white"
            alt="edit profile"
          />
          <h2 className="h3-bold md:h2-bold w-full text-left">Edit Profile</h2>
        </div>
        <ProfileForm profile={currentUser!} action="Update" />
      </div>
    </div>
  );
};

export default UpdateProfile;
