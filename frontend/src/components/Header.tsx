import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header: React.FC = () => {
  return (
    <div className="header">
      <Link to="/">Home</Link>
    </div>
  );
};

export default Header;
