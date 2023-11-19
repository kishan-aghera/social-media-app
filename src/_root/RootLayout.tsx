import { BottomBar, LeftSidebar, Topbar } from "@/components/shared";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="w-full md:flex">
      <Topbar />
      <LeftSidebar />

      <section className="flex h-full flex-1">
        <Outlet />
      </section>

      <BottomBar />
    </div>
  );
};

export default RootLayout;
