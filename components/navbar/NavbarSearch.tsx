import React from "react";
import { Input } from "../ui/input";

const NavbarSearch = () => {
  return (
    <div>
      <Input
        type="search"
        placeholder="find a property..."
        className="max-w-xs dark:bg-muted "
      />
    </div>
  );
};

export default NavbarSearch;
