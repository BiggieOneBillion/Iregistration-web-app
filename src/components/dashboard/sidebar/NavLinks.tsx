import { ReactElement } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { analysisRoute, dashboardRoute } from "../../../utils/constants";
import { BsFillPeopleFill } from "react-icons/bs";
import { AiOutlineControl } from "react-icons/ai";
import { v4 } from "uuid";

type navTypes = {
  route: string;
  title: string;
  icon: ReactElement;
  activeFn: (location: any) => boolean;
  //   access: string;
};

const NavLinks = () => {
  const location = useLocation();
  const menunLinks: navTypes[] = [
    {
      route: dashboardRoute,
      title: "Add Event",
      icon: <BsFillPeopleFill />,
      activeFn: (location) => location.pathname === dashboardRoute,
      //   access: 'all'
    },
    {
      route: analysisRoute,
      title: "Analysis",
      icon: <AiOutlineControl />,
      activeFn: (location) => location.pathname.includes(analysisRoute),

      //   access: 'super_admin'
    },
  ];

  return (
    <menu className="space-y-5 w-full px-4 text-base font-semibold">
      {menunLinks.map((link) => (
        <NavLink
          style={{
            // display: link.access !== 'super_admin' ? 'flex' : user.role === 'SUPER_ADMIN' ? 'flex' : 'none',
            display: "flex",
            alignItems: "center",
            gap: "10px",
            paddingLeft: "30px",
          }}
          key={v4()}
          to={link.route}
          className={() =>
            link.activeFn(location)
              ? "bg-gray-200/50 border border-gray-800 text-gray-600 p-3 w-full block text-center rounded-lg font-medium"
              : "bg-gray-200/50 text-[#27324082]y text-bass text-slate-400 p-3 w-full block text-center rounded-lg"
          }
          end={link.route === "creator" ? false : true}
        >
          <span>{link.icon}</span>
          <span>{link.title}</span>
        </NavLink>
      ))}
    </menu>
  );
};

export default NavLinks;
