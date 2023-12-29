import { GridPostList, Loader } from "@/components/shared";
import Stat from "@/components/shared/Stat";
import {
  LIKED_POSTS_PATH,
  PROFILE_LIKED_POSTS_PATH,
  PROFILE_PATH,
  UPDATE_PROFILE_PATH,
} from "@/constants/routes";
import { useUserContext } from "@/context/AuthContext";
import { useGetUserById } from "@/lib/react-query/queries/users";
import { getUrl } from "@/lib/utils";
import {
  Link,
  Outlet,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import { LikedPosts } from ".";

const Profile = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const { pathname } = useLocation();

  const { data: currentUser } = useGetUserById(id || "");

  if (!currentUser) {
    return (
      <div className="flex-center h-full w-full">
        <Loader />
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        <div className="flex flex-1 flex-col gap-7 md:flex-row">
          <img
            src={
              currentUser.imageUrl || "/assets/icons/profile-placeholder.svg"
            }
            alt={currentUser.name}
            className="h-28 w-28 rounded-full lg:h-36 lg:w-36"
          />

          <div className="flex flex-1 flex-col justify-between md:mt-2">
            <div className="flex w-full flex-col">
              <h1 className="h3-bold md:h1-semibold w-full text-center md:text-left">
                {currentUser.name}
              </h1>
              <span className="small-regular md:body-medium text-center text-light-3 xl:text-left">
                @{currentUser.username}
              </span>
            </div>

            <div className="z-20 mt-7 flex flex-wrap items-center justify-center gap-8 xl:justify-start">
              <Stat value={currentUser.posts.length} label="Posts" />
            </div>

            <p className="small-medium md:base-medium mt-7 max-w-screen-sm text-center xl:text-left">
              {currentUser.bio}
            </p>
          </div>

          {currentUser.$id === user.id && (
            <div>
              <Link
                to={getUrl(UPDATE_PROFILE_PATH, ":id", user.id)}
                className="flex-center h-12 gap-2 rounded-lg bg-dark-4 px-5 text-light-1"
              >
                <img
                  src="/assets/icons/edit.svg"
                  alt="edit"
                  width={20}
                  height={20}
                />
                <span className="small-medium flex whitespace-nowrap">
                  Edit Profile
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="flex w-full max-w-5xl">
        <Link
          to={getUrl(PROFILE_PATH, ":id", id)}
          className={`profile-tab rounded-l-lg ${
            pathname === getUrl(PROFILE_PATH, ":id", id) && "!bg-dark-3"
          }`}
        >
          <img
            src={"/assets/icons/posts.svg"}
            alt="posts"
            width={20}
            height={20}
          />
          Posts
        </Link>

        {currentUser.$id === user.id && (
          <Link
            to={getUrl(PROFILE_LIKED_POSTS_PATH, ":id", id!)}
            className={`profile-tab rounded-lg ${
              pathname === getUrl(PROFILE_LIKED_POSTS_PATH, ":id", id!) &&
              "!bg-dark-3"
            }`}
          >
            <img
              src={"/assets/icons/like.svg"}
              alt="like"
              width={20}
              height={20}
            />
            Liked Posts
          </Link>
        )}
      </div>

      {/* Adding route for Liked Post */}
      <Routes>
        <Route
          index
          element={<GridPostList posts={currentUser.posts} showUser={false} />}
        />
        {currentUser.$id === user.id && (
          <Route path={LIKED_POSTS_PATH} element={<LikedPosts />} />
        )}
      </Routes>

      <Outlet />
    </div>
  );
};

export default Profile;
