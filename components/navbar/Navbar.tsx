import React from "react";
import Logo from "./Logo";
import NavbarSearch from "./NavbarSearch";
import Darkmode from "./Darkmode";
import LinksDropdown from "./LinksDropdown";

const Navbar = () => {
  return (
    <nav className="border-b">
      <div className="container flex flex-col sm:flex-row  sm:justify-between sm:items-center flex-wrap gap-4 py-8">
        <Logo />
        <NavbarSearch />
        <div className="flex gap-4 items-center">
          <Darkmode />
          <LinksDropdown />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
