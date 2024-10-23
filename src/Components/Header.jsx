import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from "../Firebase/auth";
import '../CSS/Header.css';
import logo from '../Assets/logo.png';

function Header({ title }) {
    const [confirmingLogout, setConfirmingLogout] = useState(false);
    const navigate = useNavigate();

    const handleNavigate = (category) => {
        navigate(`/${category.toLowerCase()}`);
    };

    const confirmLogout = () => {
        setConfirmingLogout(true);
    };

    const cancelLogout = () => {
        setConfirmingLogout(false);
    };

    const proceedLogout = () => {
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
                {!confirmingLogout ? (
                    <div onClick={confirmLogout} className="header-link">
                        <i className="bi bi-box-arrow-right"></i>
                    </div>
                ) : (
                    <div className="logout-confirmation">
                        <span>Confirm Logout?</span>
                        <button className="confirm-btn" onClick={proceedLogout}>Yes</button>
                        <button className="cancel-btn" onClick={cancelLogout}>No</button>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;
