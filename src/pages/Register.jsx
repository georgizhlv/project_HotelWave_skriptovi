// src/pages/Register.jsx

import React, { useState } from 'react';
import api from '../api';                 // axios instance с baseURL: "/"
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1) Регистрация
      // CRA proxy ще препрати /api/accounts/register/ към http://localhost:8000
      await api.post('/api/accounts/register/', { email, password });

      // 2) Автоматичен login
      const { data } = await api.post('/api/accounts/login/', { email, password });
      localStorage.setItem('token', data.access);

      // 3) Пренасочване към началната страница
      navigate('/', { replace: true });
    } catch (err) {
      console.error('Full error object:', err);

      if (err.response) {
        // Django е върнал грешка (400, 401 и т.н.) с JSON payload
        console.log('Status:', err.response.status);
        console.log('Response data:', err.response.data);
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
      } else if (err.request) {
        // Няма отговор от сървъра
        console.error('No response received. Request was:', err.request);
        return alert('Няма отговор от сървъра. Проверете дали Django работи.');
      } else {
        // Нещо се обърка при настройката на заявката
        console.error('Error setting up request:', err.message);
        return alert('Грешка: ' + err.message);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow p-6 rounded">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        {/* Email */}
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

        {/* Password */}
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

        {/* Submit */}
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
