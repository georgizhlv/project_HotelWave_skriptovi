import React, { useState } from 'react';
import api from '../api';                   
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/accounts/register/', { email, password });

      const { data } = await api.post('/accounts/login/', { email, password });
      localStorage.setItem('token', data.access);

      navigate('/', { replace: true });
    } catch (err) {
      console.error('Register/login error', err);

      if (err.response?.data) {
        const messages = Object.entries(err.response.data)
          .map(([field, errs]) => `${field}: ${errs.join(' ')}`)
          .join('\n');
        return alert(messages);
      }

      alert('Unexpected error—see console');
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
            onChange={e => setEmail(e.target.value)}
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
            onChange={e => setPassword(e.target.value)}
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
