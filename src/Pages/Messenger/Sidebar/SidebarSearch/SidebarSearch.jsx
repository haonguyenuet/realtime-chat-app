import React, { useState } from "react";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import "./SidebarSearch.css";
function SidebarSearch() {
  // const [input, setInput] = useState("");

  return (
    <div className="sidebar__search">
      <SearchOutlinedIcon />
      <input
        type="text"
        className="search-input"
        placeholder="Search conversation..."
        // onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
}

export default SidebarSearch;
