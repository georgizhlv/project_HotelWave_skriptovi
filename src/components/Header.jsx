import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = async () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">HotelWave</h1>
      <nav>
        <Link className="mr-4" to="/">Home</Link>
        {token ? (
          <>
            <Link className="mr-4" to="/reservations">Reservations</Link>
            <Link className="mr-4" to="/my-reservation">My Reservation</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link className="mr-4" to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;