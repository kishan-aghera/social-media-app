import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/mutations/auth";
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";
import { PROFILE_PATH, ROOT_PATH } from "@/constants/routes";
import { getUrl } from "@/lib/utils";

const Topbar = () => {
  const navigate = useNavigate();
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) navigate(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <section className="topbar">
      <div className="flex-between px-5 py-4">
        <Link to={ROOT_PATH} className="flex items-center gap-3">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={130}
            height={325}
          />
        </Link>

        <div className="flex gap-4">
          <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => signOut()}
          >
            <img src="/assets/icons/logout.svg" alt="logout" />
          </Button>

          <Link
            to={getUrl(PROFILE_PATH, ":id", user.id)}
            className="flex-center gap-3"
          >
            <img
              src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="profile logo"
              className="h-8 w-8 rounded-full"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
