import {
  ALL_USERS_PATH,
  CREATE_POST_PATH,
  EXPLORE_PATH,
  ROOT_PATH,
  SAVED_PATH,
} from "./routes";

export const sidebarLinks = [
  {
    imgURL: "/assets/icons/home.svg",
    route: ROOT_PATH,
    label: "Home",
  },
  {
    imgURL: "/assets/icons/wallpaper.svg",
    route: EXPLORE_PATH,
    label: "Explore",
  },
  {
    imgURL: "/assets/icons/people.svg",
    route: ALL_USERS_PATH,
    label: "People",
  },
  {
    imgURL: "/assets/icons/bookmark.svg",
    route: SAVED_PATH,
    label: "Saved",
  },
  {
    imgURL: "/assets/icons/gallery-add.svg",
    route: CREATE_POST_PATH,
    label: "Create Post",
  },
];

export const bottombarLinks = [
  {
    imgURL: "/assets/icons/home.svg",
    route: ROOT_PATH,
    label: "Home",
  },
  {
    imgURL: "/assets/icons/wallpaper.svg",
    route: EXPLORE_PATH,
    label: "Explore",
  },
  {
    imgURL: "/assets/icons/bookmark.svg",
    route: SAVED_PATH,
    label: "Saved",
  },
  {
    imgURL: "/assets/icons/gallery-add.svg",
    route: CREATE_POST_PATH,
    label: "Create",
  },
];
