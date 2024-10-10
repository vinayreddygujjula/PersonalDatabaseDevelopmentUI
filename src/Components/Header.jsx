import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { logout } from "../Firebase/auth";
import '../CSS/Header.css';
import logo from '../Assets/logo.png'
function Header({title}) {

    const navigate = useNavigate();
    const handleNavigate = (category) => {
        navigate(`/${category.toLowerCase()}`); // Navigate to /category page
      };
    const handleLogout = () => {
        console.log('Logout clicked');
        logout();
        handleNavigate('');
      };
    return (
      <header className="header">
            <div className="header-left">
                <img
                    src={logo}
                    alt="Logo"
                    className="header-logo"
                />
            </div>
            <div className="header-middle">
                <h2>{title}</h2>
            </div>
            <div className="header-right">
                <Link to="/" className="header-link">
                    <i className="bi bi-box-arrow-right"></i>
                </Link>
            </div>
        </header>
  )
}

export default Header;