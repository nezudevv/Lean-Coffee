import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className='Header-Container'>
      <div className='Header-Content-Wrapper'>
        <Link to='/'>Home</Link>
        <Link to='/login'>Login</Link>
      </div>
    </div>
  );
}
