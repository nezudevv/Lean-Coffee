import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <div className='Left-Sidebar'>
        <div className='Left-Sidebar-Content'>
          <Link to='/'>Home</Link>
          <Link to='/login'>Login</Link>
        </div>
      </div>
    </div>
  );
}
