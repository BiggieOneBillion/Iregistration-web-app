import React, { useState } from "react";
import Logo from "../components/dashboard/sidebar/Logo";
import NavLinks from "../components/dashboard/sidebar/NavLinks";
import { Button } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Popover from "../components/Popover";
import { RiMenuFold4Line } from "react-icons/ri";
import { CgClose } from "react-icons/cg";
import { authStore, authType, userStore } from "../store/GlobalStore";

const DashboardLayout = () => {
  const [showSideMenu, setShowSideMenu] = useState<boolean>(false);
  const updateIsAllowed = authStore(
    (state: unknown) => (state as authType).updateIsAllowed
  );
  const handleLogOut = () => {
    // clear the data of the user from the localstorage
    userStore.persist.clearStorage();
    // send the user back to the login page
    updateIsAllowed(false);
  };
  return (
    <section className="flex h-screen w-screen justify-start items-start">
      <nav
        className={`w-[300px] py-5 px-2 lg:py-10 lg:px-4 fixed bg-white top-0 left-0 h-screen z-10 lg:relative lg:w-[300px] border-r ${
          showSideMenu ? "block" : "hidden lg:block"
        }`}
      >
        {/* layout section for arranging the sidebar */}
        <section className="h-full flex flex-col gap-10">
          <div className="px-4 flex items-center justify-between">
            <Logo />
            <button
              onClick={() => setShowSideMenu(false)}
              className="text-xl p-1 inline-block md:hidden rounded-full border active:scale-95 transition-transform duration-200"
            >
              <CgClose />
            </button>
          </div>
          <NavLinks />
          {/* nav component goes here */}
        </section>
      </nav>
      <section className="flex-1 h-screen overflow-y-autoy flex flex-col">
        {/* top navigation for the main content */}
        <div className="h-16 md:h-20 flex items-center justify-between md:justify-end border-b px-2 md:px-10">
          {/* only displayed on mobile and it shows the side nav menu */}
          <button
            onClick={() => setShowSideMenu(true)}
            className="text-xl p-1 inline-block md:hidden border active:scale-95 transition-transform duration-200"
          >
            <RiMenuFold4Line />
          </button>
          <section className="flex items-center justify-end gap-2 md:gap-5">
            <p className="text-sm font-medium">Welcome John</p>
            {/* displays only on medium and large screens */}
            <div className="hidden md:block">
              <Button size={"xs"} variant="authSolid" onClick={handleLogOut}>
                Log Out
              </Button>
            </div>
            {/* displays only on small screens */}
            <div className="block md:hidden mt-1">
              <Popover />
            </div>
          </section>
        </div>
        {/* dashboard component goes here */}
        <main className="px-2 py-5 lg:p-10 overflow-y-auto flex-1">
          {/* The rest the dashboard */}
          <Outlet />
        </main>
      </section>
    </section>
  );
};

export default DashboardLayout;
