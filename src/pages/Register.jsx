import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post(
        process.env.REACT_APP_API_URL + '/accounts/register/',
        { email, password }
      );
      alert('Registration successful, please log in.');
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert('Error registering user');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow p-6 rounded">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            className="w-full border p-2 rounded"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            className="w-full border p-2 rounded"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
