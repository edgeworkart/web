import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

const Login: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      await login(email, password);
      alert('Login successful!');
    } catch (error: any) {
      console.error('Login failed:', error);
      if (error.response) {
        alert(`Login failed: ${error.response.data.message}`);
      } else if (error.request) {
        alert('Login failed: No response from server.');
      } else {
        alert('Login failed: An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">Log In</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
            data-cy="email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
            data-cy="password"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded" data-cy="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login; 