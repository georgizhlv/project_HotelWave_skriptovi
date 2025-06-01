// src/pages/Login.jsx

import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Изпращаме email+password → MyTokenObtainPairSerializer ще се погрижи да ги разпознае
      const { data } = await api.post('/api/accounts/login/', { email, password });
      localStorage.setItem('token', data.access);
      navigate('/', { replace: true });
    } catch (err) {
      console.error('Login error:', err);
      if (err.response) {
        const data = err.response.data;
        let messages = '';
        for (const key in data) {
          const fieldErrors = data[key];
          if (Array.isArray(fieldErrors)) {
            messages += `${key}: ${fieldErrors.join(' ')}\n`;
          } else {
            messages += `${key}: ${fieldErrors}\n`;
          }
        }
        return alert(messages.trim());
      }
      alert('Невалидни потребителски данни');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow p-6 rounded">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            className="w-full border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            className="w-full border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
