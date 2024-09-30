import React from 'react'
import { Tooltip, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from "../Firebase/auth";
import '../CSS/Header.css';
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
    <div>
        <div className="header">
          <h1>{title}</h1>
          <Tooltip title="Logout">
            <IconButton onClick={handleLogout} color="inherit" className="outlined-icon-button">
                <LogoutIcon />
            </IconButton>
        </Tooltip>
        </div>
    </div>
  )
}

export default Header;