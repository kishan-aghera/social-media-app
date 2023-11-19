import { bottombarLinks } from "@/constants";
import { INavLink } from "@/types";
import { NavLink, useLocation } from "react-router-dom";

const BottomBar = () => {
  const { pathname } = useLocation();

  return (
    <section className="bottom-bar">
      {bottombarLinks.map((link: INavLink) => {
        const isActive = pathname === link.route;
        return (
          <NavLink
            to={link.route}
            key={link.label}
            className={`group ${
              isActive && "rounded-[10px] bg-primary-500"
            } flex-center flex-col gap-1 p-2 transition`}
          >
            <img
              src={link.imgURL}
              alt={link.label}
              className={`group-hover:invert-white ${
                isActive && "invert-white"
              }`}
              width={16}
              height={16}
            />
            <span className="tiny-medium text-light-2">{link.label}</span>
          </NavLink>
        );
      })}
    </section>
  );
};

export default BottomBar;
