import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/mutations/auth";
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";
import { sidebarLinks } from "@/constants/links";
import { INavLink } from "@/types/other";
import { PROFILE_PATH, ROOT_PATH } from "@/constants/routes";
import { getUrl } from "@/lib/utils";

const LeftSidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) navigate(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);
  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to={ROOT_PATH} className="flex items-center gap-3">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={170}
            height={36}
          />
        </Link>

        <Link
          to={getUrl(PROFILE_PATH, ":id", user.id)}
          className="flex items-center gap-3"
        >
          <img
            src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
            alt="profile logo"
            className="h-14 w-14 rounded-full"
          />
          <div className="flex flex-col">
            <span className="body-bold">{user.name}</span>
            <span className="small-regular text-light-3">@{user.username}</span>
          </div>
        </Link>

        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;
            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${
                  isActive && "bg-primary-500"
                }`}
              >
                <NavLink
                  to={link.route}
                  className="flex items-center gap-4 p-4"
                >
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white ${
                      isActive && "invert-white"
                    }`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      <Button
        variant="ghost"
        className="shad-button_ghost"
        onClick={() => signOut()}
      >
        <img src="/assets/icons/logout.svg" alt="logout" />
        <span className="small-medium lg:base-medium">Logout</span>
      </Button>
    </nav>
  );
};

export default LeftSidebar;
