import { Route, Routes } from "react-router-dom";
import "./globals.css";
import {
  AllUsers,
  CreatePost,
  Explore,
  Home,
  PostDetails,
  Profile,
  Saved,
  UpdatePost,
  UpdateProfile,
} from "./_root/pages";
import { SignInForm, SignUpForm } from "./_auth/forms";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import { Toaster } from "@/components/ui/toaster";
import {
  ALL_USERS_PATH,
  CREATE_POST_PATH,
  EXPLORE_PATH,
  POST_DETAILS_PATH,
  PROFILE_PATH,
  SAVED_PATH,
  SIGN_IN_PATH,
  SIGN_UP_PATH,
  UPDATE_POST_PATH,
  UPDATE_PROFILE_PATH,
} from "./constants/routes";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* Public Routes */}
        <Route element={<AuthLayout />}>
          <Route path={SIGN_IN_PATH} element={<SignInForm />} />
          <Route path={SIGN_UP_PATH} element={<SignUpForm />} />
        </Route>

        {/* Private Routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />

          {/* User Routes */}
          <Route path={ALL_USERS_PATH} element={<AllUsers />} />
          <Route path={PROFILE_PATH} element={<Profile />} />
          <Route path={UPDATE_PROFILE_PATH} element={<UpdateProfile />} />

          {/* Post Routes */}
          <Route path={EXPLORE_PATH} element={<Explore />} />
          <Route path={SAVED_PATH} element={<Saved />} />
          <Route path={CREATE_POST_PATH} element={<CreatePost />} />
          <Route path={UPDATE_POST_PATH} element={<UpdatePost />} />
          <Route path={POST_DETAILS_PATH} element={<PostDetails />} />
        </Route>
      </Routes>

      <Toaster />
    </main>
  );
};

export default App;
