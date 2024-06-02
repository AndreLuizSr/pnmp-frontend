import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';
import LogoImage from '../../assets/images/logos/logo.png';

const Logo = () => {
  return (
    <Link to="/" className="d-flex align-items-center gap-2">
      <img src={LogoImage} alt="Logo" />
    </Link>
  );
};

export default Logo;
