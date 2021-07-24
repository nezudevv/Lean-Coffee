import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className='Header-Container'>
      <div className='Header-Content-Wrapper'>
        <div className='Home-Nav'>
          <Link to='/'>Home</Link>
        </div>
        <div className='Login-Nav'>
          <Link to='/login'>Login</Link>
        </div>
      </div>
    </div>
  );
}
